import os
import sqlite3
import cv2
import numpy as np
import tensorflow as tf
from fastapi import FastAPI, HTTPException, Body, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

class ChatRequest(BaseModel):
    message: str

SYSTEM_PROMPT = """
You are NisaCare AI.

You are a safe Urdu women healthcare assistant for Pakistani women.

Rules:
- Reply ONLY in Urdu.
- Keep responses short and supportive.
- Give educational advice only.
- Do not diagnose diseases.
- Encourage doctor consultation if symptoms are serious.
"""

@app.post("/chat")
async def chat(data: ChatRequest):

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": data.message
            }
        ]
    )

    return {
        "reply": response.choices[0].message.content
    }



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


INJURY_CLASSES = [
    'Abrasion','Background', 'Bruises', 'Burn',  'Cut', 
    'Glass embedded wound', 'Laceration', 'Normal', 'Stab_wound'
]

INJURY_CLASSIFICATION_MODEL = tf.lite.Interpreter(model_path="mobilenet_model.tflite")
INJURY_CLASSIFICATION_MODEL.allocate_tensors()


DATABASE_PATH = "firstaid.db"

if not os.path.exists(DATABASE_PATH):
    raise Exception(f"⚠ Database file not found at {DATABASE_PATH}")

def get_db_connection():
    conn = sqlite3.connect(DATABASE_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

@app.post("/situation-details")
def get_situation_details(data: dict = Body(...)):
    title = data.get("title", "").strip()
    if not title:
        raise HTTPException(status_code=400, detail="Title is required")
    
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            SELECT description, instructions, precautions, video_path 
            FROM situations 
           WHERE LOWER(name) LIKE ?
            LIMIT 1
        """, (f"%{title.lower()}%",))
        situation = cursor.fetchone()
        
        if not situation:
            raise HTTPException(status_code=404, detail="Situation not found")
        
        cursor.execute("""
            SELECT i.name, i.image_path 
            FROM items i
            JOIN related_items ri ON i.item_id = ri.item_id
            JOIN situations s ON ri.situation_id = s.situation_id
            WHERE s.name = ?
        """, (title,))
        items = cursor.fetchall()
        return {
            "description": situation["description"],
            "instructions": situation["instructions"],
            "precautions": situation["precautions"],
            "video_path": situation["video_path"],
            "items": [dict(item) for item in items]
        }
    finally:
        conn.close()


@app.post("/item-details")
def get_item_details(data: dict = Body(...)):
    name = data.get("name", "").strip()
    
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            SELECT name, description, precautions AS safety_tips, 
                  usage_instructions, image_path, video_path 
            FROM items 
            WHERE LOWER(name) LIKE ?
            LIMIT 1
        """, (f"%{name.lower()}%",))
        item = cursor.fetchone()
        
        if not item:
            raise HTTPException(status_code=404, detail="Item not found")
            
        return {"type": "item", "data": dict(item)}
    finally:
        conn.close()


@app.post("/injury-details")
def get_injury_details(data: dict = Body(...)):
    name = data.get("name", "").strip()
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        
        cursor.execute("""
            SELECT injury_id, name, description, instructions, 
                   precautions, image_path, video_path 
            FROM injury
            WHERE LOWER(name) LIKE ?
            LIMIT 1
        """, (f"%{name.lower()}%",))
        injury = cursor.fetchone()
        
        if not injury:
            raise HTTPException(status_code=404, detail="Injury not found")
 
        cursor.execute("""
            SELECT i.name, i.image_path 
            FROM items i
            JOIN related_items ri ON i.item_id = ri.item_id
            WHERE ri.injury_id = ?
        """, (injury["injury_id"],))
        items = cursor.fetchall()
        
        return {
            "type": "injury",
            "data": dict(injury),
            "related_items": [dict(item) for item in items]
        }
    finally:
        conn.close()


@app.post("/classify-injury")
async def classify_injury(image: UploadFile = File(...)):
    try:
        
        image_data = await image.read()
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        
        img = cv2.resize(img, (224, 224))
        input_data = img.astype(np.float32)
        input_data = (input_data / 127.5) - 1.0
        input_data = np.expand_dims(input_data, axis=0)

        # Run inference
        INJURY_CLASSIFICATION_MODEL.set_tensor(
            INJURY_CLASSIFICATION_MODEL.get_input_details()[0]['index'], 
            input_data
        )
        INJURY_CLASSIFICATION_MODEL.invoke()

        # Get prediction
        output = INJURY_CLASSIFICATION_MODEL.get_tensor(
            INJURY_CLASSIFICATION_MODEL.get_output_details()[0]['index']
        )
        predicted_class = INJURY_CLASSES[np.argmax(output[0])]

        return {"injury": predicted_class}

    except Exception as e:
        raise HTTPException(500, f"Classification failed: {str(e)}")




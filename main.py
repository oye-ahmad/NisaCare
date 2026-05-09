# import os
# import sqlite3
# import cv2
# import numpy as np
# import tensorflow as tf
# from fastapi import FastAPI, HTTPException, Body, UploadFile, File
# from fastapi.responses import JSONResponse
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import FileResponse
# from pydantic import BaseModel
# from groq import Groq
# from dotenv import load_dotenv

# load_dotenv()

# app = FastAPI()

# client = Groq(
#     api_key=os.getenv("GROQ_API_KEY")
# )

# class ChatRequest(BaseModel):
#     message: str

# SYSTEM_PROMPT = """
# You are NisaCare AI.

# You are a safe Urdu women healthcare assistant for Pakistani women.

# Rules:
# - Reply ONLY in Urdu.
# - Keep responses short and supportive.
# - Give educational advice only.
# - Do not diagnose diseases.
# - Encourage doctor consultation if symptoms are serious.
# """

# @app.post("/chat")
# async def chat(data: ChatRequest):

#     response = client.chat.completions.create(
#         model="llama-3.3-70b-versatile",
#         messages=[
#             {
#                 "role": "system",
#                 "content": SYSTEM_PROMPT
#             },
#             {
#                 "role": "user",
#                 "content": data.message
#             }
#         ]
#     )

#     return {
#         "reply": response.choices[0].message.content
#     }



# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# INJURY_CLASSES = [
#     'Abrasion','Background', 'Bruises', 'Burn',  'Cut', 
#     'Glass embedded wound', 'Laceration', 'Normal', 'Stab_wound'
# ]

# INJURY_CLASSIFICATION_MODEL = tf.lite.Interpreter(model_path="mobilenet_model.tflite")
# INJURY_CLASSIFICATION_MODEL.allocate_tensors()


# DATABASE_PATH = "firstaid.db"

# if not os.path.exists(DATABASE_PATH):
#     raise Exception(f"⚠ Database file not found at {DATABASE_PATH}")

# def get_db_connection():
#     conn = sqlite3.connect(DATABASE_PATH, check_same_thread=False)
#     conn.row_factory = sqlite3.Row
#     return conn

# @app.post("/situation-details")
# def get_situation_details(data: dict = Body(...)):
#     title = data.get("title", "").strip()
#     if not title:
#         raise HTTPException(status_code=400, detail="Title is required")
    
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     try:
#         cursor.execute("""
#             SELECT description, instructions, precautions, video_path 
#             FROM situations 
#            WHERE LOWER(name) LIKE ?
#             LIMIT 1
#         """, (f"%{title.lower()}%",))
#         situation = cursor.fetchone()
        
#         if not situation:
#             raise HTTPException(status_code=404, detail="Situation not found")
        
#         cursor.execute("""
#             SELECT i.name, i.image_path 
#             FROM items i
#             JOIN related_items ri ON i.item_id = ri.item_id
#             JOIN situations s ON ri.situation_id = s.situation_id
#             WHERE s.name = ?
#         """, (title,))
#         items = cursor.fetchall()
#         return {
#             "description": situation["description"],
#             "instructions": situation["instructions"],
#             "precautions": situation["precautions"],
#             "video_path": situation["video_path"],
#             "items": [dict(item) for item in items]
#         }
#     finally:
#         conn.close()


# @app.post("/item-details")
# def get_item_details(data: dict = Body(...)):
#     name = data.get("name", "").strip()
    
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     try:
#         cursor.execute("""
#             SELECT name, description, precautions AS safety_tips, 
#                   usage_instructions, image_path, video_path 
#             FROM items 
#             WHERE LOWER(name) LIKE ?
#             LIMIT 1
#         """, (f"%{name.lower()}%",))
#         item = cursor.fetchone()
        
#         if not item:
#             raise HTTPException(status_code=404, detail="Item not found")
            
#         return {"type": "item", "data": dict(item)}
#     finally:
#         conn.close()


# @app.post("/injury-details")
# def get_injury_details(data: dict = Body(...)):
#     name = data.get("name", "").strip()
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     try:
        
#         cursor.execute("""
#             SELECT injury_id, name, description, instructions, 
#                    precautions, image_path, video_path 
#             FROM injury
#             WHERE LOWER(name) LIKE ?
#             LIMIT 1
#         """, (f"%{name.lower()}%",))
#         injury = cursor.fetchone()
        
#         if not injury:
#             raise HTTPException(status_code=404, detail="Injury not found")
 
#         cursor.execute("""
#             SELECT i.name, i.image_path 
#             FROM items i
#             JOIN related_items ri ON i.item_id = ri.item_id
#             WHERE ri.injury_id = ?
#         """, (injury["injury_id"],))
#         items = cursor.fetchall()
        
#         return {
#             "type": "injury",
#             "data": dict(injury),
#             "related_items": [dict(item) for item in items]
#         }
#     finally:
#         conn.close()


# @app.post("/classify-injury")
# async def classify_injury(image: UploadFile = File(...)):
#     try:
        
#         image_data = await image.read()
#         nparr = np.frombuffer(image_data, np.uint8)
#         img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
#         img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        
#         img = cv2.resize(img, (224, 224))
#         input_data = img.astype(np.float32)
#         input_data = (input_data / 127.5) - 1.0
#         input_data = np.expand_dims(input_data, axis=0)

#         # Run inference
#         INJURY_CLASSIFICATION_MODEL.set_tensor(
#             INJURY_CLASSIFICATION_MODEL.get_input_details()[0]['index'], 
#             input_data
#         )
#         INJURY_CLASSIFICATION_MODEL.invoke()

#         # Get prediction
#         output = INJURY_CLASSIFICATION_MODEL.get_tensor(
#             INJURY_CLASSIFICATION_MODEL.get_output_details()[0]['index']
#         )
#         predicted_class = INJURY_CLASSES[np.argmax(output[0])]

#         return {"injury": predicted_class}

#     except Exception as e:
#         raise HTTPException(500, f"Classification failed: {str(e)}")




import os
import sqlite3
import cv2
import numpy as np
import tensorflow as tf
from fastapi import FastAPI, HTTPException, Body, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ─────────────────────────────────────────────
#  MODELS
# ─────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str
    topic: str = "general"   # menstrual | maternal | mental | nutrition | safety | general

class CycleLogRequest(BaseModel):
    user_id: str
    start_date: str           # YYYY-MM-DD
    end_date: str | None = None
    flow_intensity: str = "medium"   # light | medium | heavy
    symptoms: str = ""        # comma-separated e.g. "cramps,bloating"
    notes: str = ""

class NutritionLogRequest(BaseModel):
    user_id: str
    date: str                 # YYYY-MM-DD
    food_items: str           # comma-separated
    iron_mg: float = 0.0
    vitamin_d_iu: float = 0.0
    notes: str = ""

# ─────────────────────────────────────────────
#  SYSTEM PROMPTS  (topic-aware Urdu)
# ─────────────────────────────────────────────

BASE_RULES = """
آپ NisaCare AI ہیں — پاکستانی خواتین کے لیے ایک محفوظ، ہمدرد اور قابلِ بھروسہ صحت ساتھی۔

بنیادی اصول:
- صرف اردو میں جواب دیں۔
- جواب مختصر، واضح اور سہارا دینے والا ہو۔
- صرف تعلیمی مشورہ دیں — بیماری کی تشخیص نہ کریں۔
- اگر علامات سنگین لگیں تو فوری طور پر ڈاکٹر سے ملنے کا مشورہ دیں۔
- شرم یا جھجھک کے بغیر ہر سوال کا احترام سے جواب دیں۔
- کوئی بھی سوال چھوٹا یا شرمناک نہیں — یہ آپ کی صحت ہے۔
"""

TOPIC_PROMPTS = {
    "menstrual": BASE_RULES + """
آپ ماہواری (حیض) کے موضوع پر ماہر ہیں۔ آپ ان موضوعات پر مدد کریں:
- ماہواری کا بے قاعدہ ہونا، درد، بہت زیادہ یا بہت کم خون آنا
- پی سی او ایس (PCOS) کی علامات اور انتظام
- ماہواری کے دوران صفائی اور صحت
- عام غلط فہمیاں اور توہمات کو دور کریں
- آئرن کی کمی جو ماہواری سے ہو سکتی ہے
یاد رہے: ماہواری قدرتی ہے، اس میں شرم نہیں۔
""",
    "maternal": BASE_RULES + """
آپ حمل اور زچگی کی صحت پر ماہر ہیں۔ آپ ان موضوعات پر مدد کریں:
- حمل کے دوران غذا، آرام اور احتیاط
- خطرے کی علامات جیسے بہت زیادہ سوجن، سر درد، خون آنا — فوری ڈاکٹر کو بتائیں
- زچگی کے بعد کی دیکھ بھال اور ڈپریشن
- دودھ پلانے کے فوائد اور مسائل
- قبل از پیدائش وٹامن اور فولک ایسڈ کی اہمیت
خطرناک علامات پر ہمیشہ فوری طبی مدد کا مشورہ دیں۔
""",
    "mental": BASE_RULES + """
آپ خواتین کی ذہنی صحت پر ہمدردی سے مدد کریں:
- اضطراب، ڈپریشن، تناؤ اور تھکاوٹ
- زچگی کے بعد کا ڈپریشن (Postpartum Depression)
- گھریلو دباؤ اور تعلقات کے مسائل
- خود کو بہتر محسوس کرنے کے آسان طریقے
- کب پیشہ ور مدد لینی چاہیے
کبھی بھی کسی کو اکیلا محسوس نہ ہونے دیں — ہمیشہ امید کا پیغام دیں۔
""",
    "nutrition": BASE_RULES + """
آپ پاکستانی خواتین کی غذائی ضروریات پر ماہر ہیں:
- آئرن کی کمی (خون کی کمی / anemia) — بہت عام مسئلہ
- وٹامن ڈی کی کمی — پاکستان میں 70% خواتین متاثر
- حمل اور دودھ پلانے کے دوران اضافی غذائی ضروریات
- آئرن سے بھرپور پاکستانی کھانے: پالک، دال، گوشت، چنے
- وٹامن ڈی کے ذرائع: سورج کی روشنی، مچھلی، انڈے
- کب خون کا ٹیسٹ کروانا ضروری ہے
عملی اور سستے پاکستانی غذائی مشورے دیں۔
""",
    "safety": BASE_RULES + """
آپ خواتین کی حفاظت اور حقوق کے بارے میں رہنمائی کریں:
- گھریلو تشدد کے بارے میں آگاہی اور مدد کے ذرائع
- پاکستانی ہیلپ لائنز:
  * روزان ہیلپ لائن: 051-2890505
  * Umang: 0317-4288665
  * Madadgaar: 1098
- کسی بھی تشدد یا خطرے میں محفوظ مدد کیسے لیں
- قانونی حقوق کے بارے میں بنیادی معلومات
ہمیشہ محفوظ رہنے کو ترجیح دیں — مدد مانگنا طاقت کی علامت ہے۔
""",
    "general": BASE_RULES + """
آپ خواتین کی عمومی صحت پر مدد کریں۔ اگر سوال ان موضوعات سے متعلق ہو تو خصوصی مشورہ دیں:
حیض، حمل، ذہنی صحت، غذا، حفاظت۔
ہر سوال کا احترام سے جواب دیں۔
"""
}


# ─────────────────────────────────────────────
#  EXISTING ENDPOINTS (unchanged)
# ─────────────────────────────────────────────

INJURY_CLASSES = [
    'Abrasion', 'Background', 'Bruises', 'Burn', 'Cut',
    'Glass embedded wound', 'Laceration', 'Normal', 'Stab_wound'
]

INJURY_CLASSIFICATION_MODEL = tf.lite.Interpreter(model_path="mobilenet_model.tflite")
INJURY_CLASSIFICATION_MODEL.allocate_tensors()

DATABASE_PATH = "firstaid.db"

def get_db_connection(db_path=DATABASE_PATH):
    conn = sqlite3.connect(db_path, check_same_thread=False)
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
            FROM situations WHERE LOWER(name) LIKE ? LIMIT 1
        """, (f"%{title.lower()}%",))
        situation = cursor.fetchone()
        if not situation:
            raise HTTPException(status_code=404, detail="Situation not found")
        cursor.execute("""
            SELECT i.name, i.image_path FROM items i
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
            FROM items WHERE LOWER(name) LIKE ? LIMIT 1
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
            FROM injury WHERE LOWER(name) LIKE ? LIMIT 1
        """, (f"%{name.lower()}%",))
        injury = cursor.fetchone()
        if not injury:
            raise HTTPException(status_code=404, detail="Injury not found")
        cursor.execute("""
            SELECT i.name, i.image_path FROM items i
            JOIN related_items ri ON i.item_id = ri.item_id
            WHERE ri.injury_id = ?
        """, (injury["injury_id"],))
        items = cursor.fetchall()
        return {"type": "injury", "data": dict(injury), "related_items": [dict(i) for i in items]}
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
        input_data = ((img.astype(np.float32) / 127.5) - 1.0)
        input_data = np.expand_dims(input_data, axis=0)
        INJURY_CLASSIFICATION_MODEL.set_tensor(
            INJURY_CLASSIFICATION_MODEL.get_input_details()[0]['index'], input_data)
        INJURY_CLASSIFICATION_MODEL.invoke()
        output = INJURY_CLASSIFICATION_MODEL.get_tensor(
            INJURY_CLASSIFICATION_MODEL.get_output_details()[0]['index'])
        predicted_class = INJURY_CLASSES[np.argmax(output[0])]
        return {"injury": predicted_class}
    except Exception as e:
        raise HTTPException(500, f"Classification failed: {str(e)}")


# ─────────────────────────────────────────────
#  NEW: ENHANCED URDU CHATBOT
# ─────────────────────────────────────────────

@app.post("/chat")
async def chat(data: ChatRequest):
    """
    Topic-aware Urdu chatbot.
    Pass topic = menstrual | maternal | mental | nutrition | safety | general
    """
    system_prompt = TOPIC_PROMPTS.get(data.topic, TOPIC_PROMPTS["general"])
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user",   "content": data.message}
            ]
        )
        return {"reply": response.choices[0].message.content, "topic": data.topic}
    except Exception as e:
        raise HTTPException(500, f"Chat failed: {str(e)}")


# ─────────────────────────────────────────────
#  NEW: MENSTRUAL CYCLE TRACKER
# ─────────────────────────────────────────────

def init_nisacare_db():
    conn = sqlite3.connect("firstaid.db", check_same_thread=False)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS cycle_logs (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id     TEXT    NOT NULL,
            start_date  TEXT    NOT NULL,
            end_date    TEXT,
            flow_intensity TEXT DEFAULT 'medium',
            symptoms    TEXT DEFAULT '',
            notes       TEXT DEFAULT '',
            created_at  TEXT DEFAULT (datetime('now'))
        )
    """)
    c.execute("""
        CREATE TABLE IF NOT EXISTS nutrition_logs (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id      TEXT    NOT NULL,
            date         TEXT    NOT NULL,
            food_items   TEXT    DEFAULT '',
            iron_mg      REAL    DEFAULT 0,
            vitamin_d_iu REAL    DEFAULT 0,
            notes        TEXT    DEFAULT '',
            created_at   TEXT    DEFAULT (datetime('now'))
        )
    """)
    conn.commit()
    conn.close()

init_nisacare_db()


@app.post("/cycle/log")
def log_cycle(data: CycleLogRequest):
    conn = sqlite3.connect("firstaid.db", check_same_thread=False)
    c = conn.cursor()
    try:
        c.execute("""
            INSERT INTO cycle_logs
                (user_id, start_date, end_date, flow_intensity, symptoms, notes)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (data.user_id, data.start_date, data.end_date,
              data.flow_intensity, data.symptoms, data.notes))
        conn.commit()
        return {"success": True, "message": "ماہواری کا ریکارڈ محفوظ ہو گیا"}
    except Exception as e:
        raise HTTPException(500, str(e))
    finally:
        conn.close()


@app.get("/cycle/history/{user_id}")
def get_cycle_history(user_id: str):
    conn = sqlite3.connect("firstaid.db", check_same_thread=False)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    try:
        c.execute("""
            SELECT * FROM cycle_logs
            WHERE user_id = ?
            ORDER BY start_date DESC
            LIMIT 6
        """, (user_id,))
        rows = c.fetchall()
        return {"cycles": [dict(r) for r in rows]}
    finally:
        conn.close()


@app.get("/cycle/predict/{user_id}")
def predict_next_cycle(user_id: str):
    """
    Simple average-based prediction.
    Returns predicted next start date and average cycle length.
    """
    conn = sqlite3.connect("firstaid.db", check_same_thread=False)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    try:
        c.execute("""
            SELECT start_date FROM cycle_logs
            WHERE user_id = ?
            ORDER BY start_date DESC
            LIMIT 4
        """, (user_id,))
        rows = [r["start_date"] for r in c.fetchall()]

        if len(rows) < 2:
            return {
                "predicted_next": None,
                "avg_cycle_days": None,
                "message": "کم از کم 2 ماہواری کا ریکارڈ درکار ہے"
            }

        from datetime import datetime, timedelta
        dates = [datetime.strptime(d, "%Y-%m-%d") for d in rows]
        gaps = [(dates[i] - dates[i+1]).days for i in range(len(dates)-1)]
        avg = int(sum(gaps) / len(gaps))
        next_date = dates[0] + timedelta(days=avg)

        return {
            "predicted_next": next_date.strftime("%Y-%m-%d"),
            "avg_cycle_days": avg,
            "message": f"آپ کی اگلی ماہواری تقریباً {next_date.strftime('%d %B %Y')} کو آ سکتی ہے"
        }
    finally:
        conn.close()


# ─────────────────────────────────────────────
#  NEW: NUTRITION TRACKER
# ─────────────────────────────────────────────

# Pakistani foods with approximate iron (mg) and vitamin D (IU) per 100g
PAKISTANI_FOOD_DB = {
    "palak":         {"iron": 2.7,  "vitamin_d": 0,   "name_urdu": "پالک"},
    "gosht":         {"iron": 2.6,  "vitamin_d": 15,  "name_urdu": "گوشت"},
    "murgh":         {"iron": 1.3,  "vitamin_d": 5,   "name_urdu": "مرغی"},
    "machli":        {"iron": 0.9,  "vitamin_d": 360, "name_urdu": "مچھلی"},
    "anda":          {"iron": 1.8,  "vitamin_d": 82,  "name_urdu": "انڈا"},
    "daal":          {"iron": 3.3,  "vitamin_d": 0,   "name_urdu": "دال"},
    "chana":         {"iron": 2.9,  "vitamin_d": 0,   "name_urdu": "چنے"},
    "rajma":         {"iron": 5.9,  "vitamin_d": 0,   "name_urdu": "راجما"},
    "kalejee":       {"iron": 6.5,  "vitamin_d": 49,  "name_urdu": "کلیجی"},
    "khajoor":       {"iron": 1.0,  "vitamin_d": 0,   "name_urdu": "کھجور"},
    "badam":         {"iron": 3.7,  "vitamin_d": 0,   "name_urdu": "بادام"},
    "dudh":          {"iron": 0.1,  "vitamin_d": 40,  "name_urdu": "دودھ"},
    "dahi":          {"iron": 0.1,  "vitamin_d": 2,   "name_urdu": "دہی"},
}

@app.get("/nutrition/foods")
def get_food_list():
    """Return list of all Pakistani foods with nutritional info."""
    return {
        "foods": [
            {"key": k, "name_urdu": v["name_urdu"],
             "iron_mg": v["iron"], "vitamin_d_iu": v["vitamin_d"]}
            for k, v in PAKISTANI_FOOD_DB.items()
        ]
    }


@app.post("/nutrition/log")
def log_nutrition(data: NutritionLogRequest):
    conn = sqlite3.connect("firstaid.db", check_same_thread=False)
    c = conn.cursor()
    try:
        # Auto-calculate from food_items if iron/vitamin_d not provided
        iron = data.iron_mg
        vit_d = data.vitamin_d_iu
        if data.food_items and (iron == 0 and vit_d == 0):
            for food in data.food_items.lower().split(","):
                food = food.strip()
                if food in PAKISTANI_FOOD_DB:
                    iron  += PAKISTANI_FOOD_DB[food]["iron"]
                    vit_d += PAKISTANI_FOOD_DB[food]["vitamin_d"]

        c.execute("""
            INSERT INTO nutrition_logs
                (user_id, date, food_items, iron_mg, vitamin_d_iu, notes)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (data.user_id, data.date, data.food_items, iron, vit_d, data.notes))
        conn.commit()

        # Recommended daily values for women
        iron_rda   = 18.0   # mg  (WHO for women 19-50)
        vit_d_rda  = 600.0  # IU

        iron_pct  = round((iron  / iron_rda)  * 100)
        vit_d_pct = round((vit_d / vit_d_rda) * 100)

        feedback = []
        if iron_pct < 50:
            feedback.append("آج آئرن بہت کم ہے — دال، پالک یا کلیجی کھائیں")
        if vit_d_pct < 30:
            feedback.append("وٹامن ڈی کم ہے — دھوپ میں 15 منٹ بیٹھیں یا مچھلی کھائیں")

        return {
            "success": True,
            "iron_mg": round(iron, 1),
            "vitamin_d_iu": round(vit_d, 1),
            "iron_pct_rda": iron_pct,
            "vitamin_d_pct_rda": vit_d_pct,
            "feedback": feedback,
            "message": "غذائی ریکارڈ محفوظ ہو گیا"
        }
    except Exception as e:
        raise HTTPException(500, str(e))
    finally:
        conn.close()


@app.get("/nutrition/history/{user_id}")
def get_nutrition_history(user_id: str):
    conn = sqlite3.connect("firstaid.db", check_same_thread=False)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    try:
        c.execute("""
            SELECT * FROM nutrition_logs
            WHERE user_id = ?
            ORDER BY date DESC
            LIMIT 7
        """, (user_id,))
        rows = c.fetchall()
        return {"logs": [dict(r) for r in rows]}
    finally:
        conn.close()


# ─────────────────────────────────────────────
#  NEW: LADY DOCTOR LOCATOR  (filter helper)
# ─────────────────────────────────────────────

@app.get("/doctors/search")
def search_lady_doctors(city: str = "Islamabad", query: str = "lady doctor female gynecologist"):
    """
    Returns a Google Places search URL.
    The React Native frontend calls Google Places API directly using this query.
    We keep the API key on the client side (in .env of the RN app).
    """
    search_query = f"{query} {city} Pakistan"
    return {
        "search_query": search_query,
        "google_maps_url": f"https://maps.google.com/?q={search_query.replace(' ', '+')}",
        "tip": "خواتین ڈاکٹر سے ملنے کے لیے پہلے وقت لینا بہتر ہے"
    }


# ─────────────────────────────────────────────
#  NEW: HEALTH TOPICS  (for homescreen topic cards)
# ─────────────────────────────────────────────

@app.get("/health-topics")
def get_health_topics():
    return {
        "topics": [
            {
                "id": "menstrual",
                "title": "ماہواری کی صحت",
                "title_en": "Menstrual Health",
                "icon": "calendar-heart",
                "color": "#D4537E",
                "description": "ماہواری، درد، PCOS اور صفائی",
                "quick_questions": [
                    "ماہواری میں بہت زیادہ درد ہوتا ہے کیا کروں؟",
                    "میری ماہواری بے قاعدہ ہے کیا یہ نارمل ہے؟",
                    "PCOS کیا ہوتا ہے؟",
                    "ماہواری کے دنوں میں کیا کھانا چاہیے؟"
                ]
            },
            {
                "id": "maternal",
                "title": "حمل کی دیکھ بھال",
                "title_en": "Maternal Care",
                "icon": "heart",
                "color": "#1D9E75",
                "description": "حمل، زچگی اور بچے کی نشوونما",
                "quick_questions": [
                    "حمل کے دوران کیا نہیں کھانا چاہیے؟",
                    "پہلے تین مہینوں میں کیا احتیاط کریں؟",
                    "حمل میں خطرناک علامات کون سی ہیں؟",
                    "فولک ایسڈ کیوں ضروری ہے؟"
                ]
            },
            {
                "id": "mental",
                "title": "ذہنی صحت",
                "title_en": "Mental Health",
                "icon": "brain",
                "color": "#7F77DD",
                "description": "اضطراب، ڈپریشن اور ذہنی سکون",
                "quick_questions": [
                    "مجھے بہت اداسی رہتی ہے کیا کروں؟",
                    "بچے کی پیدائش کے بعد مجھے اچھا نہیں لگتا؟",
                    "گھر کا دباؤ بہت زیادہ ہے، مدد چاہیے",
                    "نیند نہیں آتی، کیا کریں؟"
                ]
            },
            {
                "id": "nutrition",
                "title": "غذا اور صحت",
                "title_en": "Nutrition",
                "icon": "salad",
                "color": "#3B6D11",
                "description": "آئرن، وٹامن ڈی اور متوازن غذا",
                "quick_questions": [
                    "خون کی کمی میں کیا کھائیں؟",
                    "وٹامن ڈی کیسے پوری کریں؟",
                    "حمل میں کتنا آئرن چاہیے؟",
                    "سستے میں صحت مند کھانا کیسے بنائیں؟"
                ]
            },
            {
                "id": "safety",
                "title": "حفاظت اور مدد",
                "title_en": "Safety & Support",
                "icon": "shield",
                "color": "#854F0B",
                "description": "گھریلو تشدد، قانونی حقوق، ہیلپ لائنز",
                "quick_questions": [
                    "گھریلو تشدد میں مدد کہاں سے ملے گی؟",
                    "Rozan ہیلپ لائن کا نمبر کیا ہے؟",
                    "میں محفوظ نہیں ہوں، کیا کروں؟",
                    "خواتین کے قانونی حقوق کیا ہیں؟"
                ]
            }
        ]
    }



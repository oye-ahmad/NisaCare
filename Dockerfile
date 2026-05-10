# 1.  🇺🇸 Start with an official Python image
FROM python:3.12-slim

# 2.  🇺🇸 Set the working directory inside the container
WORKDIR /app

# 3.  🇺🇸 Copy the requirements file (we'll create this next)
COPY requirements.txt .

# 4.  🇺🇸 Install the Python dependencies from your requirements file
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# 5.  🇺🇸 Copy all your project files into the container's working directory
COPY . .

# 6.  🇺🇸 Expose the port that Hugging Face expects (7860)
EXPOSE 7860

# 7.  🇺🇸 Define the command to run your FastAPI application
# 🇺🇸 Uvicorn is the server that will run main:app
# 🇺🇸 --host 0.0.0.0 makes it accessible from outside the container
# 🇺🇸 --port 7860 is the port Hugging Face requires
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
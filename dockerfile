# 1. Use an official Python image
FROM python:3.9

# 2. Create a working directory inside the container
WORKDIR /code

# 3. Copy ONLY the requirements first (for faster building)
COPY ./ai-rag/requirements.txt /code/requirements.txt

# 4. Install the dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 5. Copy the rest of your ai-rag folder into the container
COPY ./ai-rag /code

# 6. Hugging Face Spaces uses port 7860 by default
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
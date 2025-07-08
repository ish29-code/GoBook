FROM python:3.10-slim

WORKDIR /app

COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Regenerate model files during build
RUN python train_flight_model.py && python train_hotel_model.py

EXPOSE 8003

CMD ["python", "app.py"]

# Use Python 3.10 to avoid incompatibility with scikit-learn and Cython
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy all files to container
COPY . .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose Flask port
EXPOSE 8003

# Run the Flask app
CMD ["python", "app.py"]


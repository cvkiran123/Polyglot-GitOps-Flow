# For Development
FROM python:3.11-slim

# 1. System updates (as root)
RUN apt-get update && apt-get upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. Create user and set WORKDIR
RUN useradd -m -u 1000 devopsuser
WORKDIR /app

# 3. Copy requirements and change ownership BEFORE switching user
COPY requirements.txt .
RUN chown -R devopsuser:devopsuser /app

# 4. Switch to non-root user
USER devopsuser

# 5. Install dependencies
# We add ~/.local/bin to PATH so 'uvicorn' can be found if called directly
ENV PATH="/home/devopsuser/.local/bin:${PATH}"
RUN pip install --user --no-cache-dir -r requirements.txt uvicorn

# 6. Copy source code
COPY --chown=devopsuser:devopsuser . .

EXPOSE 8000

# 7. Start using 'python -m' to guarantee it finds the uvicorn module
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
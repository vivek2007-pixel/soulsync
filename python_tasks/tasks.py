# Background tasks executed by Celery workers
from celery import Celery

import time
app = Celery(
 "tasks",
 broker="redis://localhost:6379/0",
 backend="redis://localhost:6379/0"
)
@app.task
def send_email_task(email, subject, body):
 print("\n=== Processing Email Task ===")
 print(f"To: {email}")
 print(f"Subject: {subject}")
 print(f"Body: {body}")
 time.sleep(2)
 print("Email sent!\n")
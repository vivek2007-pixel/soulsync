# Receives args from Node.js and queues Celery task
import sys
from tasks import send_email_task
email = sys.argv[1]
subject = sys.argv[2]
body = sys.argv[3]
send_email_task.delay(email, subject, body)
print(f"Queued task for {email}")

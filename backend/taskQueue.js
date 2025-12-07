import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// 1. Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function addEmailTask(email, subject, body) {
  
  // CHANGE THIS LINE: Point directly to your new venv python
  const pythonCommand = path.resolve(__dirname, "../venv/Scripts/python.exe");
  
  // Verify the path in logs to be sure
  console.log("Using Python at:", pythonCommand);

  const scriptPath = path.resolve(__dirname, "../python_tasks/add_task.py");

  const process = spawn(pythonCommand, [
    scriptPath, 
    email,
    subject,
    body,
  ]);
  process.stdout.on("data", (data) => console.log("PYTHON:", data.toString()));
  process.stderr.on("data", (data) => console.error("ERROR:", data.toString()));
}
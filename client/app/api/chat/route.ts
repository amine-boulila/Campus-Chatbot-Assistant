// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { spawn } from "child_process";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // This is where we'll connect to your Python script
    const response = await runPythonScript(message);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}

async function runPythonScript(message: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Specify the path to your Python script
    const pythonProcess = spawn("python", [
      "python/chatbot.py", // Update this path to match your Python script location
      message,
    ]);

    let result = "";
    let errorData = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorData += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        console.error(`Python process exited with code ${code}`);
        console.error(`Error: ${errorData}`);
        reject(new Error(`Process exited with code ${code}: ${errorData}`));
        return;
      }

      resolve(result.trim());
    });
  });
}

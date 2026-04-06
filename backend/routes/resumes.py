from fastapi import APIRouter, UploadFile, File, Form
from supabase import create_client
from groq import Groq
import os
import io
import json
import PyPDF2
import time
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def extract_text_from_pdf(contents: bytes) -> str:
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

def analyze_resume(resume_text: str, job_title: str, company: str) -> dict:
    response = groq_client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
               "role": "user",
                "content": f"""
                Analyze this resume for a {job_title} role at {company}.
                Return a JSON object with exactly these fields:
                - score: integer from 0 to 100
                - feedback: a 2-3 sentence summary of strengths and improvements

                Resume:
                {resume_text}

                Return only the JSON object. No markdown, no code blocks, no explanation.
                """
            }
        ]
    )
    content = response.choices[0].message.content or ""
    content = content.strip()
    if content.startswith("``"):
        content = content.split("``")[1]
        if content.startswith("json"):
            content = content[4:]
    content = content.strip()
    return json.loads(content)



@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    company: str = Form(...),
    job_title: str = Form(...),
    user_id: str = Form(...)
):
    try:
        contents = await file.read()
        print(f"File received: {file.filename}, size: {len(contents)}")

        filename = f"{user_id}/{int(time.time())}_{file.filename}"

        supabase.storage.from_("resumes").upload(filename, contents)
        print("File uploaded to storage")

        file_url = supabase.storage.from_("resumes").get_public_url(filename)
        print("Got file URL")

        resume_text = extract_text_from_pdf(contents)
        print(f"Extracted text length: {len(resume_text)}")

        if not resume_text.strip():
            return {
                "message": "uploaded successfully but could not extract text",
                "id": None,
                "score": 0,
                "feedback": "Could not extract text from PDF",
                "file_url": file_url
            }

        analysis = analyze_resume(resume_text, job_title, company)
        print(f"Analysis complete: {analysis}")

        result = supabase.table("resumes").insert({
            "user_id": user_id,
            "company": company,
            "job_title": job_title,
            "file_url": file_url,
            "score": analysis["score"],
            "feedback": analysis["feedback"]
        }).execute()
        print("Saved to database")

        return {
            "message": "uploaded and analyzed successfully",
            "id": result.data[0]["id"],
            "score": analysis["score"],
            "feedback": analysis["feedback"],
            "file_url": file_url
        }

    except Exception as e:
        print(f"Error: {e}")
        raise

@router.get('/{resume_id}')
def get_resume(resume_id: str):
    data = supabase.table("resumes").select("*").eq("id", resume_id).execute()
    if not data.data:
        return {"error": "Resume not found"}
    return data.data[0]

@router.delete("/{resume_id}")
def delete_resume(resume_id: str):
    supabase.table("resumes").delete().eq("id", resume_id).execute()
    return { "message": "deleted" }


from fastapi import APIRouter
from supabase import create_client
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@router.post("/generate")
def generate_cover_letter(data: dict):
    resume_id = data.get("resume_id")
    user_id = data.get("user_id")

    resume = supabase.table("resumes").select("*").eq("id", resume_id).execute()
    if not resume.data:
        return { "error": "Resume not found" }

    resume_data = resume.data[0]

    response = groq_client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": f"""
                Write a professional cover letter for a {resume_data['job_title']} 
                position at {resume_data['company']}.
                
                Based on this candidate feedback: {resume_data['feedback']}
                
                Write a compelling 3 paragraph cover letter.
                Return only the cover letter text, no subject line or extra formatting.
                """
            }
        ]
    )

    content = response.choices[0].message.content or ""

    result = supabase.table("cover_letters").insert({
        "user_id": user_id,
        "resume_id": resume_id,
        "content": content
    }).execute()

    return{
        "id": result.data[0]["id"],
        "content": content
    }

@router.get("/")
def get_cover_letters(user_id: str):
    data = supabase.table("cover_letters").select("*").eq("user_id", user_id).execute()
    return data.data
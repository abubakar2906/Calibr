import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "~/lib/useAuth";
import { API_BASE } from "~/lib/api";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Calibr" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [resumes, setResumes] = useState<any[]>([])
  const [loadingResumes, setLoadingResumes] = useState(false)

  // ALL hooks first, then effects
  useEffect(() => {
    if (!loading && !user) navigate('/auth')
  }, [user, loading])

  useEffect(() => {
    if (!user) return

    const loadResumes = async () => {
      setLoadingResumes(true)
      try {
        const response = await fetch(
          `${API_BASE}/resumes/?user_id=${user.id}`
        )
        const data = await response.json()
        setResumes(data || [])
      } catch (error) {
        console.error('Failed to load resumes:', error)
      }
      setLoadingResumes(false)
    }

    loadResumes()
  }, [user])

  // Early returns AFTER all hooks
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>
  )

  if (!user) return null

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
        )}
        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}
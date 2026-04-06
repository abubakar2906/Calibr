import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { Link, useNavigate } from "react-router";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "~/lib/useAuth";
import { API_BASE } from "~/lib/api";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Calibr | Dashboard" },
    { name: "description", content: "Track your resume scores and AI feedback" },
  ];
}

export default function Home() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [resumes, setResumes] = useState<any[]>([])
  const [loadingResumes, setLoadingResumes] = useState(false)

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

  const stats = useMemo(() => {
    if (!resumes.length) return null
    const scores = resumes.map(r => r.score || 0)
    return {
      total: resumes.length,
      avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      bestScore: Math.max(...scores),
    }
  }, [resumes])

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
        <div className="page-heading py-8 md:py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>

        {/* Stats bar */}
        {stats && !loadingResumes && (
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-sm">
            {[
              { value: stats.total, label: "Resumes" },
              { value: stats.avgScore, label: "Avg Score" },
              { value: stats.bestScore, label: "Best Score" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <p className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</p>
                <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Quick actions */}
        {!loadingResumes && resumes.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link to="/upload" className="primary-button w-fit text-sm font-semibold px-6">
              Upload New Resume
            </Link>
            <Link to="/cover-letters" className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors px-4 py-2">
              View Cover Letters →
            </Link>
          </div>
        )}

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[150px] md:w-[200px]" />
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
          <div className="flex flex-col items-center justify-center mt-6 md:mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-lg md:text-xl font-semibold px-8">
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}
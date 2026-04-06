import { Link, useParams } from "react-router"
import { useEffect, useState } from "react"
import { useAuth } from "~/lib/useAuth"
import { API_BASE } from "~/lib/api"

export const meta = () => ([
    { title: 'Calibr | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const [resume, setResume] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [generating, setGenerating] = useState(false)
    const [coverLetter, setCoverLetter] = useState('')

    useEffect(() => {
        const loadResume = async () => {
            try {
                const response = await fetch(
                    `${API_BASE}/resumes/${id}`
                )
                const data = await response.json()
                setResume(data)
            } catch (error) {
                console.error('Failed to load resume:', error)
            }
            setLoading(false)
        }

        if (id) loadResume()
    }, [id])

    const handleGenerateCoverLetter = async () => {
        if (!user || !resume) return
        setGenerating(true)
        try {
            const response = await fetch(`${API_BASE}/cover-letters/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    resume_id: resume.id,
                    user_id: user.id
                })
            })
            const data = await response.json()
            setCoverLetter(data.content)
        } catch (err) {
            console.error(err)
        }
        setGenerating(false)
    }

    if (loading) return (
        <main className="flex items-center justify-center min-h-screen">
            <img src="/images/resume-scan-2.gif" className="w-[150px] md:w-[200px]" />
        </main>
    )

    if (!resume) return (
        <main className="flex items-center justify-center min-h-screen">
            <p>Resume not found</p>
        </main>
    )

    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link to="/dashboard" className="back-button">
                    <img src="/icons/back.svg" alt="back" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-xs sm:text-sm font-semibold">Back</span>
                </Link>
                    <a
                    href={resume.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="primary-button w-fit text-sm"
                >
                    View PDF
                </a>
            </nav>
            <div className="flex flex-col gap-6 md:gap-8 px-4 md:px-8 py-6 max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="!text-2xl md:!text-4xl font-bold">{resume.company}</h1>
                        <p className="text-gray-500 text-base md:text-xl">{resume.job_title}</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 sm:gap-2 flex-shrink-0">
                        <p className="text-4xl md:text-5xl font-bold text-gradient">{resume.score}</p>
                        <p className="text-gray-500 text-sm">out of 100</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-5 md:p-6 flex flex-col gap-3 md:gap-4">
                    <h2 className="!text-xl md:!text-2xl font-bold !text-gray-900">AI Feedback</h2>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">{resume.feedback}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 md:p-6 flex flex-col gap-2">
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Uploaded</p>
                    <p className="text-gray-700">{new Date(resume.created_at).toLocaleDateString()}</p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-5 md:p-6 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <h2 className="!text-xl md:!text-2xl font-bold !text-gray-900">Cover Letter</h2>
                        <button
                            className="primary-button w-full sm:w-fit text-sm"
                            onClick={handleGenerateCoverLetter}
                            disabled={generating}
                        >
                            {generating ? 'Generating...' : 'Generate Cover Letter'}
                        </button>
                    </div>
                    {coverLetter ? (
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">{coverLetter}</p>
                    ) : (
                        <p className="text-gray-500 text-sm">Click generate to create a cover letter based on this resume and role.</p>
                    )}
                </div>
            </div>
        </main>
    )
}

export default Resume
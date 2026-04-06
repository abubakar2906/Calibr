import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Navbar from '~/components/Navbar'
import { useAuth } from '~/lib/useAuth'
import { API_BASE } from '~/lib/api'

export const meta = () => ([
    { title: 'Calibr | Cover Letters' }
])

const CoverLetters = () => {
    const { user, loading } = useAuth()
    const navigate = useNavigate()
    const [coverLetters, setCoverLetters] = useState<any[]>([])
    const [loadingLetters, setLoadingLetters] = useState(false)
    const [selected, setSelected] = useState<any>(null)

    useEffect(() => {
        if (!loading && !user) navigate('/auth')
    }, [user, loading])

    useEffect(() => {
        if (!user) return

        const load = async () => {
            setLoadingLetters(true)
            try {
                const response = await fetch(
                    `${API_BASE}/cover-letters/?user_id=${user.id}`
                )
                const data = await response.json()
                setCoverLetters(data || [])
            } catch (err) {
                console.error(err)
            }
            setLoadingLetters(false)
        }

        load()
    }, [user])

    if (loading) return <div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Cover Letters</h1>
                    <h2>AI-generated cover letters based on your resumes</h2>
                </div>

                {loadingLetters && (
                    <div className="flex items-center justify-center">
                        <img src="/images/resume-scan-2.gif" className="w-[200px]" />
                    </div>
                )}

                {!loadingLetters && coverLetters.length === 0 && (
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-gray-500">No cover letters yet. Generate one from a resume.</p>
                        <button
                            className="primary-button w-fit"
                            onClick={() => navigate('/')}
                        >
                            Go to Resumes
                        </button>
                    </div>
                )}

                {!loadingLetters && coverLetters.length > 0 && (
                    <div className="flex flex-col gap-4 w-full max-w-4xl">
                        {coverLetters.map((letter) => (
                            <div
                                key={letter.id}
                                className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4 cursor-pointer"
                                onClick={() => setSelected(selected?.id === letter.id ? null : letter)}
                            >
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-gray-700">
                                        {new Date(letter.created_at).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-blue-500">{selected?.id === letter.id ? 'Hide' : 'View'}</p>
                                </div>
                                {selected?.id === letter.id && (
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{letter.content}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}

export default CoverLetters
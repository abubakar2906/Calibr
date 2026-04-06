import { Link } from "react-router"
import { useAuth } from "~/lib/useAuth"

export const meta = () => ([
    { title: 'Calibr — AI Resume Analyzer' },
    { name: 'description', content: 'Get your resume scored by AI in seconds. Upload your resume, get an ATS score, and receive actionable feedback to land your dream job.' },
])

const Landing = () => {
    const { user } = useAuth()

    return (
        <main className="!pt-0 bg-white">
            {/* ────── Navbar ────── */}
            <nav className="flex items-center justify-between px-6 md:px-12 py-5 max-w-[1200px] mx-auto">
                <p className="text-2xl font-bold text-gradient">CALIBR</p>
                <div className="flex items-center gap-3">
                    {user ? (
                        <Link to="/dashboard" className="primary-button w-fit text-sm px-6">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link to="/auth" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                                Sign In
                            </Link>
                            <Link to="/auth" className="primary-button w-fit text-sm px-6">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* ────── Hero Section ────── */}
            <section className="relative overflow-hidden px-6 md:px-12 pt-12 md:pt-20 pb-16 md:pb-28">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ff] via-white to-[#fce4ec] opacity-60" />
                <div className="absolute top-20 -right-32 w-96 h-96 bg-gradient-to-br from-[#8e98ff33] to-[#fa718533] rounded-full blur-3xl" />
                <div className="absolute bottom-10 -left-20 w-72 h-72 bg-gradient-to-tr from-[#AB8C9522] to-[#8E97C522] rounded-full blur-3xl" />

                <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-6 md:gap-8">
                    <div className="inline-flex items-center gap-2 bg-[#f0f4ff] rounded-full px-4 py-1.5 text-sm font-medium text-[#606beb]">
                        <span className="w-2 h-2 bg-[#606beb] rounded-full animate-pulse" />
                        AI-Powered Resume Analysis
                    </div>

                    <h1 className="!text-4xl md:!text-6xl lg:!text-7xl !leading-[1.1] max-w-3xl">
                        Get Your Resume Scored by AI in Seconds
                    </h1>

                    <p className="text-gray-500 text-base md:text-xl max-w-2xl leading-relaxed">
                        Upload your resume, target a specific role, and get an instant ATS compatibility score
                        with actionable feedback to help you land interviews faster.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                        <Link to="/auth" className="primary-button w-fit text-base md:text-lg font-semibold px-8 py-3">
                            Start Free Analysis →
                        </Link>
                        <a href="#how-it-works" className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors px-4 py-3">
                            See how it works ↓
                        </a>
                    </div>

                    {/* Stats bar */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-8 md:mt-12 pt-8 border-t border-gray-100 w-full">
                        {[
                            { value: "500+", label: "Resumes Analyzed" },
                            { value: "85%", label: "Avg Score Improvement" },
                            { value: "< 30s", label: "Analysis Time" },
                        ].map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center gap-1">
                                <p className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</p>
                                <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ────── How It Works ────── */}
            <section id="how-it-works" className="px-6 md:px-12 py-16 md:py-24 bg-[#fafbff]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <p className="text-sm font-semibold text-[#606beb] uppercase tracking-wider mb-3">How it works</p>
                        <h2 className="!text-3xl md:!text-4xl font-bold !text-gray-900">Three steps to a better resume</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
                        {[
                            {
                                step: "01",
                                icon: "📄",
                                title: "Upload Your Resume",
                                desc: "Drag and drop your PDF resume. Tell us the target company and role."
                            },
                            {
                                step: "02",
                                icon: "🤖",
                                title: "AI Analyzes It",
                                desc: "Our AI engine scores your resume against real ATS criteria for your target role."
                            },
                            {
                                step: "03",
                                icon: "🎯",
                                title: "Get Your Score & Feedback",
                                desc: "Receive an instant score out of 100 plus specific suggestions to improve."
                            },
                        ].map((item, i) => (
                            <div
                                key={item.step}
                                className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#606beb22] transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-3 mb-5">
                                    <span className="text-3xl">{item.icon}</span>
                                    <span className="text-xs font-bold text-[#606beb] bg-[#606beb11] rounded-full px-3 py-1 uppercase tracking-wider">
                                        Step {item.step}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                                {i < 2 && (
                                    <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-gray-300 text-2xl">→</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ────── Features Grid ────── */}
            <section className="px-6 md:px-12 py-16 md:py-24">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <p className="text-sm font-semibold text-[#606beb] uppercase tracking-wider mb-3">Features</p>
                        <h2 className="!text-3xl md:!text-4xl font-bold !text-gray-900">Everything you need to land the interview</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            {
                                icon: "🎯",
                                title: "ATS Compatibility Score",
                                desc: "Get an instant score out of 100 based on how well your resume matches ATS scanning criteria for your target role.",
                                gradient: "from-[#606beb11] to-[#8e98ff11]"
                            },
                            {
                                icon: "💬",
                                title: "AI-Powered Feedback",
                                desc: "Receive specific, actionable suggestions on what to improve — not generic tips, but advice tailored to your resume.",
                                gradient: "from-[#fa718511] to-[#fce4ec44]"
                            },
                            {
                                icon: "📝",
                                title: "Cover Letter Generator",
                                desc: "Generate a professional cover letter in one click, customized for the role and company based on your resume content.",
                                gradient: "from-[#d5faf144] to-[#254d4a11]"
                            },
                            {
                                icon: "🔒",
                                title: "Private & Secure",
                                desc: "Your resume data is encrypted and stored securely. We never share your information with third parties.",
                                gradient: "from-[#fceed844] to-[#73321b11]"
                            },
                        ].map((feature) => (
                            <div
                                key={feature.title}
                                className={`bg-gradient-to-br ${feature.gradient} rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-all duration-300`}
                            >
                                <span className="text-3xl mb-4 block">{feature.icon}</span>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ────── Final CTA ────── */}
            <section className="px-6 md:px-12 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="bg-gradient-to-br from-[#f0f4ff] to-[#fce4ec] rounded-3xl p-10 md:p-16">
                        <h2 className="!text-3xl md:!text-4xl font-bold !text-gray-900 mb-4">
                            Ready to improve your resume?
                        </h2>
                        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                            Join hundreds of job seekers who've used Calibr to get higher ATS scores and land more interviews.
                        </p>
                        <Link to="/auth" className="primary-button w-fit text-base md:text-lg font-semibold px-10 py-3 mx-auto">
                            Start Your Free Analysis →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ────── Footer ────── */}
            <footer className="px-6 md:px-12 py-8 border-t border-gray-100">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm font-bold text-gradient">CALIBR</p>
                    <p className="text-xs text-gray-400">© {new Date().getFullYear()} Calibr. All rights reserved.</p>
                </div>
            </footer>
        </main>
    )
}

export default Landing

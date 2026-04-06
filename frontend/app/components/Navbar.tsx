import { Link } from "react-router"
import { useAuth } from "~/lib/useAuth"
import { useState } from "react"

const Navbar = () => {
    const { user, signOut } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="navbar relative">
            <Link to="/dashboard">
                <p className="text-2xl font-bold text-gradient">CALIBR</p>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex flex-row items-center gap-3">
                <Link to="/cover-letters" className="primary-button w-fit text-sm">
                    Cover Letters
                </Link>
                <Link to="/upload" className="primary-button w-fit text-sm">
                    Upload Resume
                </Link>
                {user && (
                    <button onClick={signOut} className="primary-button w-fit text-sm">
                        Sign out
                    </button>
                )}
            </div>

            {/* Mobile hamburger */}
            <button
                className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 md:hidden">
                    <Link
                        to="/cover-letters"
                        className="primary-button text-sm text-center"
                        onClick={() => setMenuOpen(false)}
                    >
                        Cover Letters
                    </Link>
                    <Link
                        to="/upload"
                        className="primary-button text-sm text-center"
                        onClick={() => setMenuOpen(false)}
                    >
                        Upload Resume
                    </Link>
                    {user && (
                        <button
                            onClick={() => { signOut(); setMenuOpen(false); }}
                            className="primary-button text-sm"
                        >
                            Sign out
                        </button>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar
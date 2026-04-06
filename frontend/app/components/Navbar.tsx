import { Link } from "react-router"
import { useAuth } from "~/lib/useAuth"

const Navbar = () => {
    const { user, signOut } = useAuth()

    return (
        <nav className="navbar">
            <Link to="/">
                <p className="text-2xl font-bold text-gradient">CALIBR</p>
            </Link>
            <div className="flex flex-row items-center gap-4">
                <Link to="/cover-letters" className="primary-button w-fit">
                    Cover Letters
                </Link>
                <Link to="/upload" className="primary-button w-fit">
                    Upload Resume
                </Link>
                {user && (
                    <button onClick={signOut} className="primary-button w-fit">
                        Sign out
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar
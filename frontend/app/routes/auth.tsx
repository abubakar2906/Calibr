import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '~/lib/useAuth'
import { getSupabase } from '~/lib/supabase'

export const meta = () => ([
    { title: 'Calibr | Login' },
    { name: 'description', content: 'Log in to Calibr' },
])

const Auth = () => {
    const { user, loading, signInWithGoogle } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (!loading && user) navigate('/')
    }, [user, loading])

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setMessage('')
        setSubmitting(true)

        const supabase = getSupabase()
        if (!supabase) return

        if (isSignUp) {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            })
            if (error) {
                setError(error.message)
            } else {
                setMessage('Check your email for a confirmation link.')
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) {
                setError(error.message)
            } else {
                navigate('/')
            }
        }

        setSubmitting(false)
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#fce4ec] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col gap-6">

                    <div className="flex flex-col items-center gap-2">
                        <p className="text-4xl font-bold text-gradient">CALIBR</p>
                        <p className="text-gray-400 text-sm">Smart feedback for your dream job</p>
                    </div>

                    <div className="flex flex-col gap-1 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            {isSignUp ? 'Create an account' : 'Welcome back'}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {isSignUp ? 'Sign up to get started' : 'Sign in to continue tracking your applications'}
                        </p>
                    </div>

                    <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-600 font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-4 min-h-[56px] rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-400 text-gray-800"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-600 font-medium">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-4 min-h-[56px] rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-400 text-gray-800"
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}
                        {message && (
                            <p className="text-green-500 text-sm text-center">{message}</p>
                        )}

                        <button
                            type="submit"
                            disabled={submitting}
                            className="primary-button w-full py-4 text-white font-semibold rounded-2xl disabled:opacity-50"
                        >
                            {submitting ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
                        </button>
                    </form>

                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-gray-200" />
                        <p className="text-gray-400 text-sm">or</p>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <button
                        onClick={signInWithGoogle}
                        disabled={loading}
                        className="flex items-center justify-center gap-3 w-full border border-gray-200 rounded-2xl py-4 px-6 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 cursor-pointer disabled:opacity-50"
                    >
                        <svg width="20" height="20" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                            <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
                            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                        </svg>
                        Continue with Google
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                        {' '}
                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp)
                                setError('')
                                setMessage('')
                            }}
                            className="text-blue-500 font-medium cursor-pointer"
                        >
                            {isSignUp ? 'Sign in' : 'Sign up'}
                        </button>
                    </p>

                    <p className="text-center text-xs text-gray-400">
                        By signing in you agree to our terms of service and privacy policy
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Auth

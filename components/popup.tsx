"use client"
import { useState } from "react"
import supabase from "@/app/auth/client"

export default function Popup({ onClose }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState(null)

  const handleAuth = async () => {
    setError(null)
    if (!email || !password) {
        return
    }
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        {/* Email/Password */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleAuth}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSignUp ? "Create Account" : "Login"}
        </button>

        {/* OAuth Section */}
        {/* <div className="my-4 flex flex-col gap-2">
          <button
            onClick={() => handleOAuth("google")}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Continue with Google
          </button>
          <button
            onClick={() => handleOAuth("github")}
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
          >
            Continue with GitHub
          </button>
        </div> */}

        {/* <p className="mt-2 text-sm text-center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p> */}

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:underline w-full"
        >
          Close
        </button>
      </div>
    </div>
  )
}

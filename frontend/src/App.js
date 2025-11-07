"use client"

import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import "./App.css"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null)

  const handleLogin = (token, userData) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))
    setToken(token)
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
        <Route
          path="/"
          element={token ? <Home token={token} user={user} onLogout={handleLogout} /> : <Navigate to="/signin" />}
        />
        <Route path="*" element={<Navigate to={token ? "/" : "/signin"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

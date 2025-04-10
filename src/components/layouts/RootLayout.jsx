"use client"

import { Outlet, NavLink, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import logo from "../../assets/logo.png" // Import du logo

const RootLayout = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
  
  // Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Effet pour appliquer le mode sombre
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header/Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white dark:bg-gray-800 shadow-md py-2" 
            : "bg-[#f05050] dark:bg-[#b03030] py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo et nom */}
            <div className="flex items-center">
              <div className="mr-2">
                <img src={logo} alt="E-mergency Logo" className="h-8 w-8" />
              </div>
              <span className={`text-xl font-bold ${scrolled ? "text-[#f05050] dark:text-[#ff6060]" : "text-white"}`}>E-mergency</span>
            </div>

            {/* Navigation centrale - Desktop */}
            <nav className="hidden md:flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) => `
                  flex items-center hover:text-gray-200 transition duration-300
                  ${
                    scrolled
                      ? isActive
                        ? "text-[#f05050] dark:text-[#ff6060]"
                        : "text-gray-700 dark:text-gray-300 hover:text-[#f05050] dark:hover:text-[#ff6060]"
                      : isActive
                        ? "text-white"
                        : "text-white/90 hover:text-white"
                  }
                `}
              >
                <span className="mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </span>
                Home
              </NavLink>
              <NavLink
                to="/features"
                className={({ isActive }) => `
                  flex items-center hover:text-gray-200 transition duration-300
                  ${
                    scrolled
                      ? isActive
                        ? "text-[#f05050] dark:text-[#ff6060]"
                        : "text-gray-700 dark:text-gray-300 hover:text-[#f05050] dark:hover:text-[#ff6060]"
                      : isActive
                        ? "text-white"
                        : "text-white/90 hover:text-white"
                  }
                `}
              >
                <span className="mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </span>
                Features
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => `
                  flex items-center hover:text-gray-200 transition duration-300
                  ${
                    scrolled
                      ? isActive
                        ? "text-[#f05050] dark:text-[#ff6060]"
                        : "text-gray-700 dark:text-gray-300 hover:text-[#f05050] dark:hover:text-[#ff6060]"
                      : isActive
                        ? "text-white"
                        : "text-white/90 hover:text-white"
                  }
                `}
              >
                <span className="mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                Contact
              </NavLink>
            </nav>

            {/* Auth Buttons et Toggle */}
            <div className="hidden md:flex items-center">
              {/* Toggle dark mode button */}
              <button 
                onClick={toggleDarkMode} 
                className="mr-4 bg-white dark:bg-gray-700 rounded-full p-1 flex items-center w-12 h-6 relative transition-colors duration-300"
                aria-label={darkMode ? "Passer au mode clair" : "Passer au mode sombre"}
              >
                <div 
                  className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
                    darkMode 
                      ? "bg-blue-400 translate-x-6" 
                      : "bg-yellow-400 translate-x-1"
                  }`}
                ></div>
              </button>

              {/* Boutons de connexion */}
              <div
                className={`${scrolled ? "bg-[#f05050] text-white" : "bg-white text-[#f05050]"} dark:bg-gray-700 dark:text-white rounded-full px-4 py-1 flex items-center transition-colors duration-300`}
              >
                <Link to="/login" className="mr-1">
                  Log In
                </Link>
                <span className="mx-1">|</span>
                <Link to="/LoginSig">Sign Up</Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${scrolled ? "text-gray-700 dark:text-white" : "text-white"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-96 py-4" : "max-h-0"}`}
          >
            <div className="flex flex-col space-y-3">
              <NavLink
                to="/"
                className={({ isActive }) => `
                  flex items-center py-2 px-4 rounded-md
                  ${
                    scrolled
                      ? isActive
                        ? "bg-red-50 dark:bg-red-900/30 text-[#f05050] dark:text-[#ff6060]"
                        : "text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-[#f05050] dark:hover:text-[#ff6060]"
                      : isActive
                        ? "bg-white/10 text-white"
                        : "text-white hover:bg-white/10"
                  }
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </span>
                Home
              </NavLink>
              <NavLink
                to="/features"
                className={({ isActive }) => `
                  flex items-center py-2 px-4 rounded-md
                  ${
                    scrolled
                      ? isActive
                        ? "bg-red-50 dark:bg-red-900/30 text-[#f05050] dark:text-[#ff6060]"
                        : "text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-[#f05050] dark:hover:text-[#ff6060]"
                      : isActive
                        ? "bg-white/10 text-white"
                        : "text-white hover:bg-white/10"
                  }
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </span>
                Features
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => `
                  flex items-center py-2 px-4 rounded-md
                  ${
                    scrolled
                      ? isActive
                        ? "bg-red-50 dark:bg-red-900/30 text-[#f05050] dark:text-[#ff6060]"
                        : "text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-[#f05050] dark:hover:text-[#ff6060]"
                      : isActive
                        ? "bg-white/10 text-white"
                        : "text-white hover:bg-white/10"
                  }
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                Contact
              </NavLink>

              <div className="flex items-center justify-between py-2 px-4">
                {/* Toggle dark mode button - mobile */}
                <button 
                  onClick={toggleDarkMode} 
                  className="bg-white dark:bg-gray-700 rounded-full p-1 flex items-center w-12 h-6 relative transition-colors duration-300"
                  aria-label={darkMode ? "Passer au mode clair" : "Passer au mode sombre"}
                >
                  <div 
                    className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
                      darkMode 
                        ? "bg-blue-400 translate-x-6" 
                        : "bg-yellow-400 translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex space-x-2 py-2 px-4">
                <Link
                  to="/login"
                  className={`flex-1 py-2 text-center rounded-full ${
                    scrolled 
                      ? "bg-[#f05050] text-white" 
                      : "bg-white text-[#f05050]"
                  } dark:bg-gray-700 dark:text-white`}
                >
                  Log In
                </Link>
                <Link
                  to="/LoginSig"
                  className={`flex-1 py-2 text-center rounded-full ${
                    scrolled 
                      ? "bg-white dark:bg-gray-800 text-[#f05050] dark:text-[#ff6060] border border-[#f05050] dark:border-[#ff6060]" 
                      : "bg-white/90 dark:bg-gray-800 text-[#f05050] dark:text-[#ff6060]"
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8 transition-colors duration-300">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#f05050] dark:bg-[#b03030] text-white py-4 shadow-inner border-t border-red-400 dark:border-red-700 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo et nom */}
            <div className="flex items-center mb-4 md:mb-0">
              <div className="mr-2">
                <img src={logo} alt="E-mergency Logo" className="h-8 w-8" />
              </div>
              <span className="text-xl font-bold">E-mergency</span>
            </div>

            {/* Navigation centrale */}
            <nav className="flex space-x-6 mb-4 md:mb-0">
              <Link to="/" className="flex items-center hover:text-gray-200 transition duration-300">
                <span className="mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </span>
                Home
              </Link>
              <Link to="/features" className="flex items-center hover:text-gray-200 transition duration-300">
                <span className="mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </span>
                Features
              </Link>
              <Link to="/contact" className="flex items-center hover:text-gray-200 transition duration-300">
                <span className="mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                Contact
              </Link>
            </nav>

            {/* Toggle et boutons auth */}
            <div className="flex items-center">
              {/* Toggle dark mode button */}
              <button 
                onClick={toggleDarkMode} 
                className="mr-4 bg-white dark:bg-gray-700 rounded-full p-1 flex items-center w-12 h-6 relative transition-colors duration-300"
                aria-label={darkMode ? "Passer au mode clair" : "Passer au mode sombre"}
              >
                <div 
                  className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
                    darkMode 
                      ? "bg-blue-400 translate-x-6" 
                      : "bg-yellow-400 translate-x-1"
                  }`}
                ></div>
              </button>
              
              <div className="bg-white dark:bg-gray-700 text-[#f05050] dark:text-white rounded-full px-4 py-1 flex items-center transition-colors duration-300">
                <Link to="/login" className="mr-1">
                  Log In
                </Link>
                <span className="mx-1">|</span>
                <Link to="/LoginSig">Sign Up</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-red-400 dark:border-red-700 mt-6 pt-4 text-center text-white/80">
            <p>&copy; {new Date().getFullYear()} E-mergency. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default RootLayout


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/*const Home = () => {
  const [data, setData] = useState(null); // Stocker les données de l'API
  const [loading, setLoading] = useState(true); // Gérer le chargement
  const [error, setError] = useState(null); // Gérer les erreurs

  useEffect(() => {
    // Remplace l'URL par celle de ton API ASP.NET
    axios.get("http://localhost:5002/api/test/json") 
      .then((response) => {
        setData(response.data); // Stocker les données reçues
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);*/

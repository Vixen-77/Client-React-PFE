import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-200">
      <div className="relative w-[768px] max-w-full min-h-[480px] bg-white rounded-[30px] shadow-lg overflow-hidden">
        {/* Form Containers */}
        <div
          className={`absolute top-0 w-1/2 h-full transition-all duration-500 ${
            isSignUp ? "translate-x-full opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Form type="signup" />
        </div>
        <div
          className={`absolute top-0 w-1/2 h-full transition-all duration-500 ${
            isSignUp ? "translate-x-full opacity-0 z-0" : "opacity-100 z-10"
          }`}
        >
          <Form type="signin" />
        </div>

        {/* Toggle Container */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-500 rounded-r-[150px] ${
            isSignUp ? "-translate-x-full rounded-l-[150px]" : ""
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#F05050] to-[#D32F2F] text-white">
            <div className="text-center">
              <h1 className="text-2xl font-bold" style={{ color: "#FFFAF0" }}>
                {isSignUp ? "Hello, Friend!" : "Welcome Back!"}
              </h1>
              <p className="mt-2 text-sm" style={{ color: "#FFFAF0" }}>
                {isSignUp
                  ? "Register with your details to access all features."
                  : "Enter your details to use all site features."}
              </p>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="mt-4 px-6 py-2 border border-white rounded-md text-white uppercase text-xs hover:bg-white hover:text-[#F05050] transition"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Form Component
const Form = ({ type }) => {
  const [formData, setFormData] = useState({
    accounttype: "",
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Gestion des champs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (type === "signup") {
        await axios.post("http://localhost:5000/api/register", formData);
        alert("Inscription réussie ! Veuillez vous connecter.");
      } else {
        const res = await axios.post("http://localhost:5000/api/login", formData);
        localStorage.setItem("token", res.data.token);
        alert("Connexion réussie !");
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-full p-10">
      <h1 className="text-2xl font-bold" style={{ color: "#F05050" }}>
        {type === "signup" ? "Create Account" : "Sign In"}
      </h1>
      <div className="flex gap-3 mt-4">
        <SocialIcon icon="fa-google-plus-g" />
        <SocialIcon icon="fa-facebook-f" />
        <SocialIcon icon="fa-github" />
        <SocialIcon icon="fa-linkedin-in" />
      </div>
      <span className="text-xs mt-2" style={{ color: "#FFFAF0" }}>
        {type === "signup" ? "or use your email for registration" : "or use your email password"}
      </span>
      {type === "signup" && (
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="input-field" />
      )}
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input-field" />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input-field" />
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      {type === "signin" && (
        <a href="#" className="text-xs text-gray-500 mt-2">
          Forgot Your Password?
        </a>
      )}
      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md uppercase text-xs hover:bg-red-700 transition"
        disabled={loading}
      >
        {loading ? "Loading..." : type === "signup" ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
};

// Social Icon Component
const SocialIcon = ({ icon }) => (
  <a href="#" className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition">
    <i className={`fab ${icon}`}></i>
  </a>
);

// Export du composant principal
export default LoginPage;

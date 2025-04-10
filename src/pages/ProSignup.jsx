"use client"
import { useState, useRef } from "react"

const ProSignup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [previewIdCard, setPreviewIdCard] = useState(null)
  const [previewMedCert, setPreviewMedCert] = useState(null)
  const idCardRef = useRef(null)
  const medCertRef = useRef(null)

  const handleIdCardChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewIdCard(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMedCertChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewMedCert(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formValues = Object.fromEntries(formData.entries())
    console.log("Données du formulaire:", formValues)
    alert("Formulaire soumis avec succès!")
  }

  // Validation pour empêcher les chiffres dans les champs nom et prénom
  const preventNumbers = (e) => {
    if (/\d/.test(e.key)) {
      e.preventDefault()
    }
  }

  return (
    <div className="flex items-center justify-center pb-16 px-4">
      <div className="w-full max-w-4xl flex overflow-hidden rounded-2xl shadow-xl">
        {/* Section gauche - Image/Bannière */}
        <div className="hidden md:block w-2/5 bg-gradient-to-b from-[#F05050] to-[#D32F2F] p-12 text-white">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6">Bienvenue chez E-mergency</h2>
              <p className="text-white/90 mb-8">Créez votre compte "professionel de santé" pour sauver des vies.</p>
            </div>
            <div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="italic text-sm">"test"</p>
                <p className="mt-2 font-semibold"> 1 2 3 </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section droite - Formulaire */}
        <div className="w-full md:w-3/5 bg-white p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#F05050] mb-2">Inscription Professionel de santé</h1>
            <p className="text-gray-500">Remplissez le formulaire pour créer votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all"
                  required
                  onKeyPress={preventNumbers}
                />
              </div>

              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all"
                  required
                  onKeyPress={preventNumbers}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700 mb-1">
                  Date de naissance
                </label>
                <input
                  type="date"
                  id="dateNaissance"
                  name="dateNaissance"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
                  Genre
                </label>
                <select
                  id="genre"
                  name="genre"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all"
                  required
                >
                  <option value="">Sélectionnez</option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse
              </label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="codePostal" className="block text-sm font-medium text-gray-700 mb-1">
                  Code Postal
                </label>
                <input
                  type="text"
                  id="codePostal"
                  name="codePostal"
                  pattern="[0-9]{5}"
                  maxLength="5"
                  placeholder="Ex: 75001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Exactement 5 chiffres</p>
              </div>

              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  placeholder="Ex: 0612345678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Exactement 10 chiffres</p>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="motDePasse"
                  name="motDePasse"
                  minLength="8"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#F05050] transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Le mot de passe doit contenir au moins 8 caractères</p>
            </div>

            <div>
              <label htmlFor="carteIdentite" className="block text-sm font-medium text-gray-700 mb-1">
                Carte d'identité
              </label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#F05050] transition-colors"
                onClick={() => idCardRef.current.click()}
              >
                {previewIdCard ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={previewIdCard || "/placeholder.svg"}
                      alt="Aperçu carte d'identité"
                      className="h-32 object-contain mb-2 rounded"
                    />
                    <p className="text-sm text-gray-500">Cliquez pour changer l'image</p>
                  </div>
                ) : (
                  <div className="py-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 mx-auto text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-500">Cliquez pour télécharger votre carte d'identité</p>
                    <p className="text-xs text-gray-400 mt-1">Formats acceptés: JPG, PNG</p>
                  </div>
                )}
                <input
                  type="file"
                  id="carteIdentite"
                  name="carteIdentite"
                  ref={idCardRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleIdCardChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="certificatMedical" className="block text-sm font-medium text-gray-700 mb-1">
                Certificat médical
              </label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#F05050] transition-colors"
                onClick={() => medCertRef.current.click()}
              >
                {previewMedCert ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={previewMedCert || "/placeholder.svg"}
                      alt="Aperçu certificat médical"
                      className="h-32 object-contain mb-2 rounded"
                    />
                    <p className="text-sm text-gray-500">Cliquez pour changer l'image</p>
                  </div>
                ) : (
                  <div className="py-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 mx-auto text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-500">Cliquez pour télécharger votre certificat médical</p>
                    <p className="text-xs text-gray-400 mt-1">Formats acceptés: JPG, PNG</p>
                  </div>
                )}
                <input
                  type="file"
                  id="certificatMedical"
                  name="certificatMedical"
                  ref={medCertRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleMedCertChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                className="h-4 w-4 text-[#F05050] focus:ring-[#F05050] border-gray-300 rounded"
                required
              />
              <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
                J'accepte les{" "}
                <a href="#" className="text-[#F05050] hover:underline">
                  conditions d'utilisation
                </a>{" "}
                et la{" "}
                <a href="#" className="text-[#F05050] hover:underline">
                  politique de confidentialité
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#F05050] text-white font-medium rounded-lg hover:bg-[#D32F2F] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Créer mon compte
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">
              Vous avez déjà un compte?{" "}
              <a href="/ProSignin" className="text-[#F05050] hover:underline font-medium">
                Connectez-vous
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProSignup
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[100%] min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800">
        Bienvenue sur notre plateforme
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        Une solution innovante pour la gestion et le suivi des données médicales
        en toute sécurité. Accédez facilement à vos informations et interagissez
        avec notre système intelligent.
      </p>
      <img
        src=""
        alt="Présentation de la plateforme"
        className="mt-6 w-full max-w-lg rounded-lg shadow-lg"
      />
      <Link
        to="/loginSig"
        className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
      >
        Accéder à la plateforme
      </Link>
    </div>
  );
};

export default Home;

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

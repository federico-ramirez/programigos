import { ImCross } from "react-icons/all";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-100">
      <ImCross className="text-8xl m-4 text-red-600" />
      <h1 className="text-6xl font-roboto text-center mb-6 text-red-600">404</h1>
      <h2 className="text-3xl font-roboto text-center text-red-600">Página no encontrada</h2>
      <p className="text-xl font-roboto text-center text-red-600">
        Algo salió mal. La página que buscas no existe.
      </p>
      <button
        className="font-roboto bg-gray-300 m-4 py-2 px-4 rounded"
        onClick={(e) => onClick(e)}
      >
        Ir al inicio de sesión
      </button>
    </div>
  );
};

export default NotFound;
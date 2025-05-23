import { Link } from "react-router-dom";

export const Banner = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70 h-full"
        style={{ backgroundImage: "url(/img/goku.webp)" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />
      {/* contenido */}
      <div className="relative z-10 flex-col items-center justify-center py-20 px-4 text-center lg:py-40 lg:px-8">
        <h1 className="text-4xl font-bold mb-4 lg:text-6xl">
          Los mejores funkos del 2024
        </h1>

        <p className="text-lg mb-8 lg:text-2xl">
          Descubre las ofertas exclusivas y las ultimas novedades en funkos
        </p>

        <Link to="/celulares" className="bg-gray-900 hover:bg-gray-950 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out">
          Ver funkos
        </Link>
      </div>
    </div>
  );
};

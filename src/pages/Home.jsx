import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import staticMovies from "./movies";


export default function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("movies"));
    if (storedMovies && storedMovies.length > 0) {
      setMovies(storedMovies);
    } else {
      setMovies(staticMovies);
      localStorage.setItem("movies", JSON.stringify(staticMovies));
    }
  }, []);

  const handleDelete = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  const handleUpdate = (index) => {
    navigate(`/add?edit=${index}`);
  };

  if (movies.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-400">
        <p>No movies Found</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 leading-relaxed font-sans">
      <div className="relative w-full h-[500px] overflow-hidden shadow-xl">
        <img
          src="https://img10.hotstar.com/image/upload/f_auto,q_auto/sources/r1/cms/prod/983/1120983-i-633ec2bcc241"
          alt="Featured Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute bottom-12 left-12 max-w-xl text-white">
          <h2 className="text-6xl font-extrabold">Avengers</h2>
          <p className="text-gray-300 mt-3 leading-relaxed">
            The Avengers are a team of superheroes and the protagonists of the Marvel Cinematic Universe (MCU) media franchise, based on the eponymous team from Marvel ...
          </p>
          <div className="flex gap-4 mt-5">
            <button className="px-6 py-2 bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition font-semibold">
              Watch Now
            </button>
            <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 font-semibold">
              + My List
            </button>
          </div>
        </div>
      </div>

     <div>
  <h2 className="text-2xl font-bold mb-6">New Releases</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    {movies.map((movie, index) => (
      <div
        key={index}
        // onClick={() => navigate(`/movie/${index}`)}
        className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-101 transform transition cursor-pointer flex flex-col"
      >
        {movie.image && (
          <img
            src={movie.image}
            alt={movie.name}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-4 flex-1">
          <h3 className="text-lg font-bold text-white truncate">
            {movie.name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-3 mt-2">
            {movie.description}
          </p>

          <div className="flex  gap-2 mt-3 text-xs text-gray-200">
            <span className="px-2 py-1 bg-gray-800 rounded">{movie.genre}</span>
            <span className="px-2  py-1 bg-gray-800 rounded"> {movie.language}</span>
            <span className="px-2 py-1 bg-gray-800 rounded"> {movie.duration}</span>
          </div>
        </div>

        <div className="flex justify-between p-4 border-t border-gray-800">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUpdate(index);
            }}
            className="flex-1 mr-2 py-2  bg-gray-800 rounded text-white text-sm flex items-center justify-center gap-2"
          >
            <BiSolidPencil /> Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(index);
            }}
            className="flex-1 ml-2 py-2 bg-gray-800 rounded text-white text-sm flex items-center justify-center gap-2"
          >
            <MdDelete /> Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>

  );
}

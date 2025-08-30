import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddMovie() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const editIndex =
    params.get("edit") !== null ? parseInt(params.get("edit"), 10) : null;

  const [form, setForm] = useState({
    name: "",
    genre: "",
    language: "",
    duration: "",
    date: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (editIndex !== null && !isNaN(editIndex)) {
      const movies = JSON.parse(localStorage.getItem("movies")) || [];
      const movieToEdit = movies[editIndex];
      if (movieToEdit) {
        setForm(movieToEdit);
      }
    }
  }, [editIndex]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const movies = JSON.parse(localStorage.getItem("movies")) || [];

    if (editIndex !== null) {
      movies[editIndex] = form;
      localStorage.setItem("movies", JSON.stringify(movies));
      alert("Movie updated successfully!");
    } else {
      movies.push(form);
      localStorage.setItem("movies", JSON.stringify(movies));
      alert("Movie added successfully!");
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen   flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 shadow-2xl rounded-2xl w-full max-w-2xl p-8 text-white space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-teal-400">
          {editIndex !== null ? "Edit Movie " : "Add a New Movie "}
        </h2>

        {/* {form.image && (
          <div className="flex justify-center">
            <img
              src={form.image}
              alt="Preview"
              className="w-40 h-56 object-cover rounded-lg shadow-lg border border-zinc-700"
            />
          </div>
        )} */}

        <div className="grid md:grid-cols-2 gap-4">
          {["name", "language", "duration", "genre"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="mb-1 text-sm text-gray-400">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "date" ? "date" : "text"}
                name={field}
                placeholder={field}
                value={form[field]}
                onChange={handleChange}
                className="p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-teal-500 outline-none"
                required
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-400">Description</label>
          <textarea
            name="description"
            rows="3"
            placeholder="Enter movie description..."
            value={form.description}
            onChange={handleChange}
            className="p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-400">Upload Poster</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="p-2 rounded-lg bg-zinc-800 text-gray-300   file:text-white file:px-3 file:py-1 file:rounded-lg cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-800 hover:from-teal-500 hover:to-teal-700 font-bold transition-all shadow-lg"
        >
          {editIndex !== null ? "Update Movie" : "Add Movie"}
        </button>
      </form>
    </div>
  );
}

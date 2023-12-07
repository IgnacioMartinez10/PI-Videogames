import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./create.styles.css";
import { getGenres, postGame } from "../../redux/actions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Create() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    background_image: "",
    description: "",
    platforms: "",
    released: "",
    rating: "",
    genres: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    background_image: "",
    description: "",
    platforms: "",
    released: "",
    rating: "",
    genres: [],
  });

  const allGenres = useSelector((state) => state.genres);

  useEffect(() => {
    if (allGenres.length === 0) {
      dispatch(getGenres());
    }
  }, [dispatch, allGenres.length]);
  console.log(allGenres);

  const validate = (form) => {
    const updatedErrors = {};
    //VALIDACION DEL NOMBRE
    if (!/^[a-zA-Z0-9\s]+$/.test(form.name)) {
      updatedErrors.name = "Sólo puede contener letras y/o números";
    } else {
      updatedErrors.name = "";
    }
    const nameMaxLength = 40; // Reemplaza 100 con el valor máximo admitido por el modelo
    if (form.name.length > nameMaxLength) {
      updatedErrors.name = `El nombre no puede superar los ${nameMaxLength} caracteres.`;
    }
    if (form.name === "") updatedErrors.name = "";
    //VALIDACION DE IMAGEN (URL)
    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(form.background_image)) {
      updatedErrors.background_image = "Debe ingresar una URL válida";
    } else {
      updatedErrors.background_image = "";
    }
    if (form.background_image === "") updatedErrors.background_image = "";
    //VALIDACION DE PLATAFORMAS
    if (!/^[a-zA-Z0-9\s!-]+$/.test(form.platforms)) {
      updatedErrors.platforms = "Sólo puede contener texto y números";
    } else {
      updatedErrors.platforms = "";
    }
    if (form.platforms === "") updatedErrors.platforms = "";
    //VALIDACION DE FECHA DE LANZAMIENTO
    if (!/^[0-9/]*$/.test(form.released)) {
      updatedErrors.released =
        "Formato de fecha inválido. Utilice solo números y /";
    } else {
      // Verificar la entrada del día
      if (form.released.length >= 1 && form.released.length <= 2) {
        const day = parseInt(form.released);
        if (isNaN(day) || day <= 0 || day > 31) {
          updatedErrors.released = "Día inválido";
        } else {
          updatedErrors.released = "";
        }
      }

      // Verificar la entrada del mes
      if (form.released.length >= 4 && form.released.length <= 5) {
        const month = parseInt(form.released.substring(3));
        if (isNaN(month) || month <= 0 || month > 12) {
          updatedErrors.released = "Mes inválido";
        } else {
          updatedErrors.released = "";
        }
      }

      // Verificar la entrada del año
      if (form.released.length === 10) {
        const dateParts = form.released.split("/");
        const day = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const year = parseInt(dateParts[2]);

        if (
          isNaN(day) ||
          isNaN(month) ||
          isNaN(year) ||
          day < 1 ||
          day > 31 ||
          month < 1 ||
          month > 12 ||
          year < 1900 ||
          year > 2100
        ) {
          updatedErrors.released = "Fecha inválida";
        } else {
          updatedErrors.released = "";
        }
      } else {
        updatedErrors.released =
          "Formato de fecha inválido. Utilice dd/mm/yyyy";
      }

      // Verificar el formato completo de la fecha
      if (form.released.length === 8) {
        if (
          !/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/.test(form.released)
        ) {
          updatedErrors.released =
            "Formato de fecha inválido. Utilice yyyy/mm/dd";
        } else {
          updatedErrors.released = "";
        }
      }
    }
    // Validar el rating
    if (!/^([0-5](\.[0-9])?|[0-4]\.)$/.test(form.rating)) {
      updatedErrors.rating = "Ingrese un número válido entre 0 y 5";
    } else {
      updatedErrors.rating = "";
    }

    if (form.rating === "") updatedErrors.rating = "";

    setErrors(updatedErrors);
  };

  const hasErrors = () => {
    const noGenresSelected = form.genres.length === 0;
    return (
      Object.values(errors).some((error) => error !== "") || noGenresSelected
    );
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === "genres") {
      const { checked } = event.target;
      const genre = event.target.value;
      console.log(genre);

      if (checked) {
        setForm((form) => ({
          ...form,
          genres: [...form.genres, genre],
        }));
      } else {
        setForm((prevForm) => ({
          ...prevForm,
          genres: prevForm.genres.filter((g) => g !== genre),
        }));
      }
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [property]: value,
      }));
    }
    console.log(form);
    validate({
      ...form,
      [property]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(form);
    try {
      dispatch(postGame(form));
      alert("Juego creado");
      window.location.reload();
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <>
      <div className="backHome">
        <Link to="/home"> Volver al Home</Link>
      </div>
      <div className="formWrapper">
        <h2>Crear Videojuego</h2>
        <form className="form" onSubmit={submitHandler}>
          <div className="inputGroup">
            <div>
              <label className="formText"> NOMBRE: </label>
              <input
                className="contentInput"
                type="text"
                value={form.name}
                onChange={changeHandler}
                name="name"
              />
              {errors.name && <span className="formText">{errors.name}</span>}
            </div>
            <div>
              <label className="formText"> IMAGEN: </label>
              <input
                className="contentInput"
                type="text"
                value={form.background_image}
                onChange={changeHandler}
                name="background_image"
              />
              {errors.background_image && (
                <span className="formText">{errors.background_image}</span>
              )}
            </div>
          </div>
          <div>
            <label className="formText"> DESCRIPCION: </label>
            <input
              className="contentInput"
              type="text"
              value={form.description}
              onChange={changeHandler}
              name="description"
            />
            {errors.description && (
              <span className="formText">{errors.description}</span>
            )}
          </div>
          <div>
            <label className="formText"> PLATAFORMAS: </label>
            <input
              className="contentInput"
              type="text"
              value={form.platforms}
              onChange={changeHandler}
              name="platforms"
            />
            {errors.platforms && (
              <span className="formText">{errors.platforms}</span>
            )}
          </div>
          <div>
            <label className="formText"> FECHA DE LANZAMIENTO: </label>
            <input
              className="contentInput"
              type="text" //date
              value={form.released}
              onChange={changeHandler}
              name="released"
            />
            {errors.released && (
              <span className="formText">{errors.released}</span>
            )}
          </div>
          <div>
            <label className="formText"> RATING: </label>
            <input
              className="contentInput"
              type="text"
              value={form.rating}
              onChange={changeHandler}
              name="rating"
            />
            {errors.rating && <span className="formText">{errors.rating}</span>}
          </div>
          <div className="genreContainer">
            {allGenres?.map((genre) => (
              <span>
                {genre}
                <input
                  type="checkbox"
                  name="genres"
                  value={genre}
                  onChange={changeHandler}
                ></input>
              </span>
            ))}
          </div>
          <button
            className="submitVideogames"
            type="submit"
            disabled={
              !Object.values(form).every((value) => value !== "") || hasErrors()
            }
          >
            Crear
          </button>
        </form>
      </div>
    </>
  );
}

export default Create;

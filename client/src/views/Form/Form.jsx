import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Form.module.css";
import { getGenres, postGame } from "../../redux/actions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Form() {
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

  const validate = (form) => {
    const updatedErrors = {};
    //VALIDACION DEL NOMBRE
    if (!/^[a-zA-Z0-9\s]+$/.test(form.name)) {
      updatedErrors.name = "Sólo puede contener letras y/o números";
    } else {
      updatedErrors.name = "";
    }
    const nameMaxLength = 40;
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
      if (form.released.length >= 7 && form.released.length <= 8) {
        const year = parseInt(form.released.substring(6));
        if (isNaN(year)) {
          updatedErrors.released = "Año inválido";
        } else {
          updatedErrors.released = "";
        }
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

    validate({
      ...form,
      [property]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    try {
      dispatch(postGame(form));
      alert("Juego creado");
      window.location.reload();
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div className={style.formWrapper}>
      <Link to="/home" className={style.estiloLinks}>
        {" "}
        Back Home
      </Link>
      <form onSubmit={submitHandler}>
        <div className={style.inputGroup}>
          <div>
            <label className={style.formText}> Nombre: </label>
            <input
              className={style.contentInput}
              type="text"
              value={form.name}
              onChange={changeHandler}
              name="name"
            />
            {errors.name && (
              <span className={style.errorText}>{errors.name}</span>
            )}
          </div>
          <div>
            <label className={style.formText}> Image: </label>
            <input
              className={style.contentInput}
              type="text"
              value={form.background_image}
              onChange={changeHandler}
              name="background_image"
            />
            {errors.background_image && (
              <span className={style.errorText}>{errors.background_image}</span>
            )}
          </div>
        </div>
        <div>
          <label className={style.formText}> Descripción: </label>
          <input
            className={style.contentInput}
            type="text"
            value={form.description}
            onChange={changeHandler}
            name="description"
          />
          {errors.description && (
            <span className={style.errorText}>{errors.description}</span>
          )}
        </div>
        <div>
          <label className={style.formText}> Plataformas: </label>
          <input
            className="contentInput"
            type="text"
            value={form.platforms}
            onChange={changeHandler}
            name="platforms"
          />
          {errors.platforms && (
            <span className={style.errorText}>{errors.platforms}</span>
          )}
        </div>
        <div>
          <label className={style.formText}> Fecha de lanzamiento: </label>
          <input
            className="contentInput"
            type="text" //date
            value={form.released}
            onChange={changeHandler}
            name="released"
          />
          {errors.released && (
            <span className={style.errorText}>{errors.released}</span>
          )}
        </div>
        <div>
          <label className={style.formText}> Rating: </label>
          <input
            className="contentInput"
            type="text"
            value={form.rating}
            onChange={changeHandler}
            name="rating"
          />
          {errors.rating && (
            <span className={style.errorText}>{errors.rating}</span>
          )}
        </div>
        <div className={style.genreContainer}>
          {allGenres?.map((genre) => (
            <div key={genre.id}>
              <span>{genre.name}</span>
              <input
                type="checkbox"
                name="genres"
                value={genre.name}
                onChange={changeHandler}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={
            !Object.values(form).every((value) => value !== "") || hasErrors()
          }
        >
          {" "}
          SUBMIT{" "}
        </button>
      </form>
    </div>
  );
}

export default Form;

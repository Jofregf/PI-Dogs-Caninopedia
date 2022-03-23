import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postBreed, getTemperaments } from "../../Action/index";
import { validation } from "./errors";
import "./create.css";

const deleteSelection = (input, selection) => {
  if (input.includes(selection)) {
    const array1 = input.filter((num) => num !== selection);
    return array1;
  } else {
    const array2 = input.concat(selection);
    return array2;
  }
};
function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperaments = useSelector((state) => state.temperaments).sort(
    function (a, b) {
      if (a.name < b.name) return -1;
      else return 1;
    }
  );
  
  const [errors, setErrors] = useState("");

  const [input, setInput] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span_min: "",
    life_span_max: "",
    temperament: [],
    image:
      "https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/6124cf315cafe8c3101f8bab/perro-slide_0.jpg",
    
  });

  function handleTemperaments(event) {
    setInput({
      ...input,
      temperament: deleteSelection(input.temperament, event.target.value),
    });
  }

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validation({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  }

  function handleSubmit(event) {
    if (
      !errors.name &&
      !errors.height_min &&
      !errors.height_min &&
      !errors.weight_min &&
      !errors.weight_max &&
      !errors.image &&
      !errors.life_span_min &&
      !errors.life_span_max &&
      !errors.temperament
    ) {
      event.preventDefault();
      console.log(input, "submit");
      dispatch(postBreed(input));
      alert("Raza creada exitosamente");
      setInput({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span_min: "",
        life_span_max: "",
        temperament: [],
        image: "https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg",
      });
      navigate("/home");
    } else {
      alert("Hay datos sin completar");
    }
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className="create-container">
      <h2 className="form-title">Cree su propia raza</h2>
      <div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="form-body">
            <div className="form-texts">
              <div className="form-fields">
                <label className="label" htmlFor="id.name">
                  Nombre
                </label>
                <input
                  className="input-buscar"
                  id="id.name"
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={(event) => handleChange(event)}
                />
                <p className="errores">{errors.name}</p>
              </div>
              <div className="form-fields">
                <label className="label">Altura Minima</label>
                <input
                  className="input-buscar"
                  type="number"
                  min="0"
                  name="height_min"
                  value={input.height_min}
                  onChange={(event) => handleChange(event)}
                />
                <p className="errores">{errors.height_min}</p>
              </div>
              <div className="form-fields">
                <label className="label">Altura Maxima</label>
                <input
                  className="input-buscar"
                  type="number"
                  min="0"
                  name="height_max"
                  value={input.height_max}
                  onChange={(event) => handleChange(event)}
                />
                <p className="errores">{errors.height_max}</p>
              </div>
              <div className="form-fields">
                <label className="label">Peso Minimo</label>
                <input
                  className="input-buscar"
                  type="number"
                  min="0"
                  name="weight_min"
                  value={input.weight_min}
                  onChange={(event) => handleChange(event)}
                />
                <p className="errores">{errors.weight_min}</p>
              </div>
              <div className="form-fields">
                <label className="label">Peso Maximo</label>
                <input
                  className="input-buscar"
                  type="number"
                  min="0"
                  name="weight_max"
                  value={input.weight_max}
                  onChange={(event) => handleChange(event)}
                />
                <p className="errores">{errors.weight_max}</p>
              </div>
              <div className="form-fields">
                <label className="label">Promedio de Vida Minimo </label>
                <input
                  className="input-buscar"
                  type="number"
                  min="0"
                  name="life_span_min"
                  value={input.life_span_min}
                  onChange={(event) => handleChange(event)}
                />
                <p className="errores">{errors.life_span_min}</p>
              </div>
              <div className="form-fields">
                <label className="label">Promedio de Vida Maximo </label>
                <input
                  className="input-buscar"
                  type="number"
                  min="0"
                  name="life_span_max"
                  value={input.life_span_max}
                  onChange={(event) => handleChange(event)}
                />
                <p className="errores">{errors.life_span_max}</p>
              </div>
              <div className="form-fields">
                <label className="label">Imagen</label>
                <input
                  className="input-buscar"
                  type="url"
                  name="image"
                  value={input.image}
                  onChange={(event) => handleChange(event)}
                />
                <p className="errores">{errors.image}</p>
              </div>
            </div>
            <div className="form-checks">
              <h4 className="title-temper">Temperamentos</h4>
              <div className="type-form">
                {temperaments.map((temp) => (
                  <div className="checkbox-types" key={temp.id}>
                    <input
                      type="checkbox"
                      name="temperaments"
                      value={temp.name}
                      onChange={(event) => handleTemperaments(event)}
                    />
                    {temp.name}
                  </div>
                ))}
                <p className="errores">{errors.temperament}</p>
              </div>
            </div>
            <div className="btns-container">
              <div className="btn-form">
                <button
                  disabled={
                    input.temperament.length === 0 ||
                    errors.name ||
                    errors.height_min ||
                    errors.height_max ||
                    errors.weight_min ||
                    errors.weight_max ||
                    errors.image ||
                    errors.life_span_min ||
                    errors.life_span_max
                  }
                  type="submit"
                  className="btn-create"
                >
                  Crear 🐶
                </button>
              </div>
              <div className="btn-form">
                <Link to="/home">
                  <button className="btn-create">Cancel ❌</button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;

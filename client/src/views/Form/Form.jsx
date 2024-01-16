import { useEffect, useState } from 'react';
import { Link, } from 'react-router-dom';  //useHistory
import { postDriver, getTeams } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import style from './Form.module.css'
const isValid = /^[a-zA-Z]+$/;
const dobFormat = /^\d{4}-\d{2}-\d{2}$/;
const onlyNumbersAndDashes = /^[0-9-]+$/;
const url = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
const imageExtension = /\.(jpg|jpeg|png)$/;



// Validaciones
function validate(input) {
  const errors = {};

  if (input.name.trim().length === 0) {
    errors.name = 'ingresar un nombre';
  }

  if (input.name.length < 12 || input.name.length > 56) {
    errors.name = 'El nombre debe contener de 12 a 56 letras';
  }
  if(!isValid.test(input.name)){
    errors.name = 'El nombre solo debe contener letras'
  }

  if (!input.nationality) {
        errors.nationality = "Falta la Nacionalidad de tu Driver"
  } else if (input.nationality.length < 5) {
        errors.nationality = "La Nacionaliad debe tener al menos 5 letras"
  }
  
  if (input.dob.length === 0) {
        errors.dob = "Falta la fecha de nacimiento de tu Driver "
  } else if (!onlyNumbersAndDashes.test(input.dob)) {
        errors.dob = "Solo numeros y guiones"
  } else if (!dobFormat.test(input.dob) || input.dob.length !== 10) {
        errors.dob = "Formato de fecha de nacimiento: yy--mm--dd. Incluir guiones"
  } else {
        
    const [year, month, day] = input.dob.split('-').map(Number);

        if (month < 1 || month > 12) {
            errors.dob = "Ingresar mes entre 1 y 12.";
        } else {
            const totalDays = new Date(year, month, 0).getDate();
            if (day < 1 || day > totalDays) {
                errors.dob = `Ingresar dias validos entre 1 y ${totalDays}.`;
            }
        }
  }
  
  if (!input.image) {
        errors.image = "Inserta una imagen de tu Driver"
  } else if (!url.test(input.image)) {
        errors.image = "Ingresa un url valido"
  } else if (!imageExtension.test(input.image)) {
        errors.image = "solo se aceptan extensiones .jpg, .jpeg y .png "
  }
  
  if (!input.description) {
        errors.description = "Ingresa la descripcion de tu Driver"
  } else if(input.description.length < 15 || input.description.length >2500) {
        errors.description = "la descripcion de tu Driver debe tener entre 15 y 2500 caracteres"
  }

  if (input.teams.length === 0 || input.teams.length > 4 ) {
        errors.teams = "Elige entre 1 y 4 teams para tu Driver"
  }
  
  return errors;
}

const Form = () => {
  const dispatch = useDispatch();
  const driversTeams = useSelector((state) => state.allTeams);
  // Ahora puede acceder al historial de rutas a través del objeto `history`.
  // const history = useHistory();

 
  const [errors, setErrors] = useState({});

  const [initialFormState, setInitialFormState] = useState({
    name: '',
    nationality: '',
    image: '',
    dob: '',
    description: '',
    teams: [],
    createdInDb: true,
  });

  const [input, setInput] = useState({ ...initialFormState });

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const handleInputChange = (event) => {
  setInput({
    ...input,
    [event.target.name]: event.target.value,
  });
  setErrors(validate({
    ...input,
    [event.target.name]: event.target.value,
  }))
};

  const handleSubmit = (event) => {
    event.preventDefault();
    const { errors, ...sinErrors } = initialFormState;
    const result = validate(sinErrors);
    setInput({
      ...input,
      errors: result,
    });
    dispatch(postDriver(input));
    setInput({ ...initialFormState });
    history.push('/home');
    setInitialFormState()
  };

  return (
    <div className={style.formBack}>
    <div className={style.searchInput}>
      <Link to="/home" style={{ textDecoration: "none" }}>
        <button>To Home</button>
      </Link>
      <h1>Crear un nuevo Driver</h1>
      <form onSubmit={handleSubmit}>
        <div >
          <input
            type="text"
            name="name"
            value={input.name}
            placeholder="Nombre"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <input
            type="text"
            name="nationality"
            value={input.nationality}
            placeholder="Nationality"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {errors.nationality && <p>{errors.nationality}</p>}
        </div>
        <div>
          <input
            type="text"
            name="image"
            value={input.image}
            placeholder="Imagen URL"
            onChange={handleInputChange}
            autoComplete="off"
            //required
          />
          {errors.image && <p>{errors.image}</p>}
        </div>
        <div>
          <input
            type="text"
            name="dob"
            value={input.dob}
            placeholder="Date of Birth 'dd--mm--yy'"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {errors.dob && <p>{errors.dob}</p>}
        </div>
        <div>
          <input
            type="text"
            name="description"
            value={input.description}
            placeholder="Description"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div>
          <select
            className="teams"
            value={input.teams}
            onChange={handleInputChange}
            autoComplete="off"
            name="teams"
            required
            //multiple
          >
            <option value="">Select Teams</option>
            {driversTeams &&
              driversTeams.map((driver) => (
                <option key={driver.id} value={driver.name}>
                  {driver.name}
                </option>
              ))}
          </select>
          {errors.teams && <p>{errors.teams}</p>}
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
    </div>
  );
};

export default Form;


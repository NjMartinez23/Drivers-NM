import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByTeams, filterCreatedDriver, getAllDrivers, getTeams, orderByName, orderByDOB } from '../../redux/actions'
import { Link } from 'react-router-dom'
import SearchBar from '../../components/searchBar/SearchBar'
import Paginate from '../../components/paginate/Paginate'
import Card from '../../components/card/Card'
import style from './Home.module.css'


export default function Home() {

  const dispatch = useDispatch()
  const Drivers = useSelector((state) => state.allDrivers)
  const Teams = useSelector((state) => state.allTeams)
  console.log(Teams, 'hola');
  //Estados del paginado
  const [currentPage, setCurrentPage] = useState(1) //pagina actual y me setea esta 
  const [driversPerPage] = useState(9) // va a setear cuantos pokes quiero por pagina
  //constantes del paginado donde asocio las pag con los pokes por pag
  const indexOfLastDriver = currentPage * driversPerPage //12
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage //0 
  const currentDriver = Drivers?.slice(indexOfFirstDriver, indexOfLastDriver)

  // me va a ayudar al renderizado
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  //fin de paginado
  
  // ciclo que maneja todos los Drivers
  useEffect(() => {
    dispatch(getAllDrivers())
  }, [dispatch])

 

  //ciclo que busca por teams
  useEffect(() => {
    dispatch(getTeams())
  }, [dispatch])



  //permite volver a cargar todos los Drivers 
  function handlerClick(event) {
    event.preventDefault(); // para que no se recargue por defecto y asi no me rompa
    dispatch(getAllDrivers());
  }

  //filtro de los teams
  function handlerFilterStatus(event) {
    event.preventDefault();
    dispatch(filterByTeams(event.target.value))
    setCurrentPage(1)
  }

  //Filtrado por creado

  function handleFilterCreated(e) {
    dispatch(filterCreatedDriver(e.target.value)) /* --> lo que viene del select que es el payload  */
    setCurrentPage(1)
  }

  // ordenamiento descendente y ascendente
  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
  }

  function handleSortDOB(e) {
    e.preventDefault();
    dispatch(orderByDOB(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className={style.containerHome}>

      <div className={style.allOrder}>
        {/* name */}
        <div className={`${style.selectWrapper} ${style.selectOption}`}>
          <select className="order" onChange={(e) => handleSortName(e)}>
            <option>Select Order Alphabetical</option>
            <option value="asc">Ascendent</option>
            <option value="desc">Descendent</option>
          </select>
        </div>

        <div className={`${style.selectWrapper} ${style.selectOption}`}>
      <select className="dob" onChange={(e) => handleSortDOB(e)}>
        <option>Select dob Order</option>
        <option value="asc">Ascendent dob</option>
        <option value="desc">Descendent dob</option>
      </select>
    </div>

     {/* mapeo de teams */}
    <div className={`${style.selectWrapper} ${style.selectOption}`}>
    <select key="uniqueKey" onChange={(e)=> handlerFilterStatus(e)} defaultValue='default'>
    <option value="default" disabled>Select by teams</option>
    {Teams.map((driver) => (
        <option key={driver.id} value={driver.name}>
            {driver.name}
        </option>
    ))}
</select>
    </div>

    {/* filtro por procedencia */}

    <div className={`${style.selectWrapper} ${style.selectOption}`}>
      <select onChange={(e) => handleFilterCreated(e)}>
        <option>Select Driver</option>
        <option value="all">All Driver</option>
        <option value="api">Driver Api</option>
        <option value="dataBase">created Driver</option>          
        </select>
    </div>
    <SearchBar />
  </div>

  <div className={style.buttonR}>
    <button><Link to='/create' style={{ textDecoration: "none" }}>Create Driver</Link></button>
    <button onClick={handlerClick}>Reload Driver</button>
  </div>

  <div>
    <Paginate
      currentPage={currentPage}
      driversPerPage={driversPerPage}
      Drivers={Drivers.length}
      paginate={paginate}
    />
  </div>

  <div className={style.cardTas}>
    {currentDriver?.map(driver => (
        <Card
            key={driver.id}
            id={driver.id}
            name={`${driver.name.forename} ${driver.name.surname}`}
            teams={driver.teams}
            image={driver.image}
            nationality={driver.nationality}
            description={driver.description}
            dob={driver.dob}
        />
    ))}
  </div>

  <div>
    <Paginate
      currentPage={currentPage}
      driversPerPage={driversPerPage}
      Drivers={Drivers.length}
      paginate={paginate}
    />
  </div>
</div>
  )
}

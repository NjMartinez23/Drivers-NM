import { useEffect } from 'react'
import {useParams, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getDetailDrivers } from '../../redux/actions'
import style from './Detail.module.css'


export default function Detail() {

  const dispatch = useDispatch()
  const {id} = useParams()
  
  
  useEffect(()=>{
    dispatch(getDetailDrivers(id))
  },[dispatch, id])
     
  
  const detailDrivers = useSelector((state) => state?.details);

  const selectedDriver = detailDrivers?.find(driver => driver.id === parseInt(id));
  

  return (
    <div className={style.detailContainer}>
    <div className={style.detailInfo}>
      {/* <h1>Id: {detailPokemon.id}</h1> */}
      <h1>Name: {`${selectedDriver?.name.forename} ${selectedDriver?.name.surname}`}</h1>
      <h1>Nationality: {selectedDriver?.nationality}</h1>
      <h1>Description: {selectedDriver?.description}</h1>
      <h1>Date of birth: {selectedDriver?.dob}</h1>
      <h1>Teams: {selectedDriver?.allTeams && selectedDriver.allTeams.map(p => (p.charAt(0).toUpperCase() + p.slice(1))).join(' / ')}</h1>
    </div>
      <div className={style.detailImage}>
      <img src={selectedDriver?.image} alt="" className="card-image" />
      <button>
        <Link to='/home' style={{ textDecoration: "none" }}>Home</Link>
      </button>
    </div>
    </div>
  )
}

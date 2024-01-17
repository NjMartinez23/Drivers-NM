import "./landing.css"
import { Link } from 'react-router-dom'

const Landing = () => {
  return (

<div className="frames-1">
  <div className="group-button">
    <div className="frames-2">
    <Link to={`/home`}>
      <div className="button">INICIAR</div>
    </Link>
    </div>
  </div>
  <div className="group-text">
    <div className="welcome">Bienvenidos a</div>
    <div className="title">F1 Drivers</div>
  </div>
</div>


  )
}

export default Landing
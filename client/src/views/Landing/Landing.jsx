import { Link } from 'react-router-dom'
import style from './Landing.module.css'

export default function Landing() {
  return (
    <div className={`${style.Landing}`}>
      <Link to = '/home'>
        <button className={`${style.buttonLanding}`}><span></span>To Enter</button>
      </Link>
    </div>
  )
}
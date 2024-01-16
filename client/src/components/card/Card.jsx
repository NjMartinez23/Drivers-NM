import { Link } from "react-router-dom";
import style from "./card.module.css"

export default function Card({ id, name, image, dob, teams }){
   return (
    <div>
      <div className={style.cardN} >
        <Link to={`/detail/${id}`} style={{ textDecoration: "none" }}>
          <div className="card-img">
            <img src={image} alt='Not Found' />
            <div className={style.cardInfo}>
              <h3>Name: {name}</h3>
              <p>Date Of Birth: {dob}</p>
              <p>Teams: {teams}</p>
            </div>
            <div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
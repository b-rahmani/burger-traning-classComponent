import burgerImage from "../../assets/image/burger-logo.png";
import style from "./Logo.module.css";

const Logo = (props) => 
     (
        <div className={style.Logo}>
            <img src={burgerImage} alt="myBurger"/>
        </div>
    );


export default Logo;

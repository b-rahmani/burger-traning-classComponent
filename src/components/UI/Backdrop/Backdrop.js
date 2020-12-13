
import style from "./Backdrop.module.css"; 
const Backdrop = (props) => 
     (
        props.show ? <div className={style.Backdrop}
        
        onClick={props.clicked}
        ></div> : null
    );

export default Backdrop;

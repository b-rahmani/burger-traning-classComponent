import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import style from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/auxliarry";

const SideDrawer = (props) => {
  let attechedClasses = [style.SideDrawer, style.Close];
  if (props.open) {
    attechedClasses = [style.SideDrawer, style.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attechedClasses.join(" ")} onClick={props.closed}>
        <div className={style.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;

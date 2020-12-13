import style from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import PropTypes from "prop-types";

const Toolbar = (props) => {
  return (
    <header className={style.Toolbar}>
      <DrawerToggle DrawerToggleClicked={props.DrawerToggleClicked} />

      <div className={style.Logo}>
        <Logo />
      </div>
      <nav className={style.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth}/>
      </nav>
    </header>
  );
};

export default Toolbar;

Toolbar.propTypes = {
  DrawerToggleClicked: PropTypes.func,
};

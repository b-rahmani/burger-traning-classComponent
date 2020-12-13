import style from "./DrawerToggle.module.css";

const DrawerToggle = (props) => {
  return (
    <div onClick={props.DrawerToggleClicked} className={style.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DrawerToggle;

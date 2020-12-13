import style from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className={style.NavigationItems}>
        <NavigationItem link="/" exact > Burger Builder </NavigationItem>
        {props.isAuthenticated?<NavigationItem link="/orders" > Orders </NavigationItem>:null}

        {!props.isAuthenticated?
            <NavigationItem link="/auth" >Authentication  </NavigationItem>:
            <NavigationItem link="/logout" > Log out </NavigationItem>}
    </ul>
  );
};

export default NavigationItems;

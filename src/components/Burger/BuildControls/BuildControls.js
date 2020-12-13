import BuildControl from "./BuildControl/BuildControl";
import style from "./BuildControls.module.css";

const controls = [
    {
        label: "Salad",
        type: "salad",
    },
    {
        label: "Bacon",
        type: "bacon",
    },
    {
        label: "Cheese",
        type: "cheese",
    },
    {
        label: "Meat",
        type: "meat",
    },
];
const buildControls = (props) => (
    <div className={style.buildControls}>
        <p>
            current price: <strong>{props.price.toFixed(2)}</strong>
        </p>
        {controls.map((ctrl) => (
            <BuildControl
                label={ctrl.label}
                key={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemove(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button className={style.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>
           {props.isAuth? "ORDER NOW":"SIGN UP TO ORDER"}
        </button>
    </div>
);

export default buildControls;

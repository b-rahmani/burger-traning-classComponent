
 import Aux from "../../../hoc/Auxiliary/auxliarry";
import Button from "../../UI/Button/Button";

const OrderSummary =(props)=> {

 
    const ingredientsSummary = Object.keys(props.ingredients).map((ingkey) => {
      return (
        <li key={ingkey}>
          <span style={{ textTransform: "capitalize" }}>{ingkey}</span>:
          {props.ingredients[ingkey]}
        </li>
      );
    });
 
    return (<Aux>
      <h3>your order</h3>
      <p>A delicious burger with the following ingedients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>Total Price : <strong>{props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.CancelPurchace}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.ContinuePurchase}>
        CONTINUE
      </Button>
    </Aux>)
  
}

export default OrderSummary;

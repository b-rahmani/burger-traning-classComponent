import React from 'react';
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import style from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
    return (
        <div className={style.CheckoutSummary}>
            <h1>we hope it tastes well!</h1>
            <div style={{width: "100%", margin: "auto"}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
                btnType="Danger"
                clicked={props.CheckoutCanceled}
            >CANCEL
            </Button>
            <Button
                btnType="Success"
                clicked={props.CheckoutContinued}
            >CONTINUE
            </Button>
        </div>
    );
};

export default CheckoutSummary;
import React, {Component} from "react";
import {connect} from "react-redux";
import Aux from "../../hoc/Auxiliary/auxliarry";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/action/index";



class BurgerBuilder extends Component {
    state = {

        purchasing: false,

    };

    componentDidMount() {
this.props.onInitIngredients();

    }


    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map((igkey) => {
                return ingredients[igkey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    //
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //     //const updatedcnt={...this.state.ingredients,[type]:this.state.ingredients[type]+1};
    //
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     let oldPrice = this.state.totalPrice;
    //     let newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // };
    //
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return false;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     let oldPrice = this.state.totalPrice;
    //     let newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // };

    purchaseHandler = () => {
        if(this.props.isAutenticated){

        this.setState({purchasing: true});
        }else{
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {

this.props.onInitPurchase();
this.props.history.push("/checkout");

    };

    render() {
        const disableInfo = {...this.props.ings};

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;


        if (this.props.ings) {
            burger = (<Aux>
                <Burger ingredients={this.props.ings}/>

                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemove={this.props.onIngredientRemoved}
                    disabled={disableInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAutenticated}
                />
            </Aux>);
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                CancelPurchace={this.purchaseCancelHandler}
                ContinuePurchase={this.purchaseContinueHandler}
                price={this.props.price}
            />;
        }
        // if (this.state.loading) {
        //     orderSummary = <Spinner/>
        // }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}

                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAutenticated:state.auth.token!==null
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase:()=>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

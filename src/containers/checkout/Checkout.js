import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/checkoutSummary/CheckoutSummary";
import {Route, Redirect} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";



class Checkout extends Component {




    CheckoutCanceled = () => {
        this.props.history.goBack();
    };
    CheckoutContinued = () => {
        this.props.history.replace("/checkout/contact-data");

    };

    render() {
        let summary = <Redirect to="/"/>;

        if (this.props.ings) {
            const purchaseRedirect=this.props.purchased? <Redirect to="/"/>:null;
            summary =
                <div>
                    {purchaseRedirect}
                <CheckoutSummary
                ingredients={this.props.ings}
                CheckoutCanceled={this.CheckoutCanceled}
                CheckoutContinued={this.CheckoutContinued}
            />
                <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
            />
                </div>
        }
        return summary;





    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,

    }
};

export default connect(mapStateToProps)(Checkout);
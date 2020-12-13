import React, {Component} from 'react';
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/action/index";
import {connect} from "react-redux";
import Spinner from "../../components/UI/spinner/spinner";


class Orders extends Component {


    componentDidMount() {
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    render() {
        let orders = <Spinner/>;
        if (!this.props.loading) {
            orders =
                this.props.orders.map(order =>
                    <Order
                        ingredients={order.ingredients}
                        price={+order.price}
                        key={order.id}/>
                )
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId)),
    }
};

export default connect(mapStateToProps, mapDispatchProps)(withErrorHandler(Orders, axios))
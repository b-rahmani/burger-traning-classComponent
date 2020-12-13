import React, { Component } from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";
// import Checkout from "./containers/checkout/Checkout";
import {Route,Switch,withRouter,Redirect} from "react-router-dom";
// import Orders from "./containers/orders/Orders";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from "react-redux";
import * as actions from "./store/action/index";
import AsyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout =AsyncComponent(()=>{
    return import("./containers/checkout/Checkout");
});
const asyncOrders =AsyncComponent(()=>{
    return import("./containers/orders/Orders");
});
const asyncAuth =AsyncComponent(()=>{
    return import("./containers/Auth/Auth");
});

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {

        let routes=(
            <Switch>
            <Route path="/auth" exact component={asyncAuth}/>
            <Route path="/" exact component={BurgerBuilder }/>
            <Redirect to="/"/>
                </Switch>
        );
        if(this.props.isAuthenticated){
            routes=(
                <Switch>

                    <Route path="/checkout" component={asyncCheckout } />
                    <Route path="/orders" exact component={asyncOrders }/>
                    <Route path="/auth" exact component={asyncAuth}/>
                    <Route path="/logout" exact component={Logout}/>
                    <Route path="/" exact component={BurgerBuilder }/>
                    <Redirect to="/"/>

                </Switch>
            )
        }

    return (
      <div className="App">
        <Layout>
            {routes}

        </Layout>
      </div>
    );
  }
}
const mapStateToProps=state=>{
    return {
isAuthenticated: state.auth.token!==null
}};


const mapDispatchToProps= dispatch=>{
    return{
onTryAutoSignup:()=>dispatch(actions.authCheckState())
    }
};



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));

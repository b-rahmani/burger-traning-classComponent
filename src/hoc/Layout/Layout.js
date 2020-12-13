import React, { Component } from "react";
import {connect} from "react-redux";
import Aux from "../Auxiliary/auxliarry";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";
import PropTypes from "prop-types";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  SideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  SideDrawerToggleHandler = () => {
    this.setState((prev) => ({ showSideDrawer: !prev.showSideDrawer }));
  };

  render() {
    return (
      <Aux>
          <Toolbar
              isAuth={this.props.isAuthenticated}
              DrawerToggleClicked={this.SideDrawerToggleHandler}
              open={this.state.showSideDrawer}
          />
        <SideDrawer
            isAuth={this.props.isAuthenticated}
          closed={this.SideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />


        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps= state=>{
    return{
        isAuthenticated:state.auth.token !==null
    }
};


export default connect(mapStateToProps)(Layout);

Layout.propTypes = {
  children: PropTypes.element,
};

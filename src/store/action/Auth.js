import * as actionTypes from "./actionTypes";
import axios from "axios";


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};
export const authSuccess = (token, userId) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,

    }
};

export const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT,


    }
};

export const checkAuthTimeout = (exprationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, exprationTime * 1000)
    }
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4apLxYNY5AZsjCvPCRG01b9GAHXQB9uc";

        if (!isSignup) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4apLxYNY5AZsjCvPCRG01b9GAHXQB9uc\n";
        }
        axios.post(url, authData)
            .then(
                res => {
                    const exDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                    localStorage.setItem("auth", res.data.idToken);
                    localStorage.setItem("expirationDate", exDate);
                    localStorage.setItem("userId", res.data.localId);
                    dispatch(authSuccess(res.data.idToken, res.data.localId));
                    dispatch(checkAuthTimeout(res.data.expiresIn))
                }
            )
            .catch(error => {


                dispatch(authFail(error.response.data.error));
            })

    }
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("auth");
        if (!token) {
            dispatch(logout());

        } else {
            const exprationDate =new Date(localStorage.getItem("expirationDate")) ;
            if(exprationDate<= new Date()){
                dispatch(logout());
            }else{
               const  userId=localStorage.getItem("userId");
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((exprationDate.getTime()-new Date().getTime())/1000))
            }

        }
    }
};
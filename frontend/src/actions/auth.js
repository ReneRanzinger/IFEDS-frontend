import * as actionTypes from "../types";
import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn = user => ({
  type: actionTypes.USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: actionTypes.USER_LOGGED_OUT
});

const execute404Handler = (props) => {
    return {
        type: actionTypes.HTTP_404_ERROR,
        props: props
    }
}

const execute500Handler = (props) => {
    return {
        type: actionTypes.HTTP_500_ERROR,
        props: props
    }
}

const executeOtherErrorHandler = (error) => {
    return {
        type: actionTypes.HTTP_OTHER_ERROR,
        error: error
    }
}



export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.ifedsAuthJWT = user.token;
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem("ifedsAuthJWT");
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};

export const confirm = token => dispatch =>
  api.user.confirm(token).then(user => {
    localStorage.ifedsAuthJWT = user.token;
    dispatch(userLoggedIn(user));
  });

export const handleHTTPError = (error, props) => {
  if (error.response.status === 404) {
    return execute404Handler(props);
  }
  else if (error.response.status === 500) {
    return execute500Handler(props);
  }
  else {
    return executeOtherErrorHandler(error);
  }
  }

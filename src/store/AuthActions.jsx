import { loginApi, logoutApi, whoami } from "../services/AuthService";
export const AUTH_CHECK_CONFIRMED_ACTION = "[Auth Action] auth ckeck confirmed";
export const LOGIN_CONFIRMED_ACTION = "[Auth Action] confirmed login";
export const LOGIN_FAILED_ACTION = "[Auth Action] failed login";
export const LOADING_TOGGLE_ACTION = "[Auth Action] toggle loading";
export const LOGOUT_ACTION = "[Auth Action] logout action";
export const UPDATE_PROFILE = "UPDATE PROFILE";
export const NAVTOGGLE = "NAVTOGGLE";
export const TOGGLE_EMAIL_NOTIFICATION = "TOGGLE_EMAIL_NOTIFICATION";
export const TOGGLE_WHATSAPP_NOTIFICATION = "TOGGLE_WHATSAPP_NOTIFICATION";
const IS_HEADER_TOKEN = import.meta.env.REACT_APP_HEADER_TOKEN;

// export function checkAutoLoginAction(navigate) {
//   return (dispatch, getState) => {
//     const user = getState().auth.user;
//     console.log("user", user);
//     if (!user) {
//       dispatch(authCheckConfirmAction(true));
//       whoami()
//         .then((response) => {
//           const { data } = response.data;
//           dispatch(loginConfirmedAction(data));
//         })
//         .catch((error) => {
//           console.log(error);
//           dispatch(Logout(navigate));
//           // navigate('/'); //login
//         })
//         .finally(() => {
//           dispatch(authCheckConfirmAction(false));
//         });
//     }
//   };
// }

export function Logout(navigate) {
  function dispatchCallBack() {
    return { type: LOGOUT_ACTION };
  }
  return (dispatch) => {
    logoutApi()
      .then((response) => {
        dispatch(dispatchCallBack());

        if (IS_HEADER_TOKEN === "LOCALSTORAGE") {
          localStorage.removeItem("TOKEN");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        const openUlrList = [
          "/audit"
        ];
        if (!openUlrList.includes(window.location.pathname)) {
          navigate("/"); //login
        }
      });
  };
}

export function loginAction(email, password, navigate) {
  return (dispatch) => {
    const postData = {
      email,
      password,
    };
    loginApi(postData)
      .then((response) => {
        const { data, token } = response.data;
        //saveTokenInLocalStorage({ access_token, refresh_token, data });
        if (IS_HEADER_TOKEN === "LOCALSTORAGE") {
          localStorage.setItem("TOKEN", token);
        }
        dispatch(loginConfirmedAction({ ...data }));
        setTimeout(() => {
          navigate("/");
        }, 300);
      })
      .catch((error) => {
        dispatch(loginFailedAction(error.response.data.message));
      });
  };
}

export function signupAction(email, password, navigate) {
  return (dispatch) => {
    loginApi(email, password)
      .then((response) => {
        const { data } = response.data;
        //saveTokenInLocalStorage({ access_token, refresh_token, data });
        dispatch(loginConfirmedAction({ ...data }));
        navigate("/");
      })
      .catch((error) => {
        dispatch(loginFailedAction(error.response.data.message));
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function authCheckConfirmAction(payload) {
  return {
    type: AUTH_CHECK_CONFIRMED_ACTION,
    payload,
  };
}





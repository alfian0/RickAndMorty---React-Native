// authReducer.js
import User from "@/src/types/user";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  AUTH_STATE_CHANGED,
} from "../types/actionTypes";

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case LOGOUT_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
    case AUTH_STATE_CHANGED:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;

import axios from "axios";
import { navigate } from "../history";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const UPDATE_BALANCE = "UPDATE_BALANCE";

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = payload => ({ type: GET_USER, payload });
const removeUser = () => ({ type: REMOVE_USER });
export const updateBalance = payload => ({ type: UPDATE_BALANCE, payload });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get("/auth/me");
    dispatch(getUser(res.data || defaultUser));
  } catch (error) {
    console.error(error);
  }
};

export const auth = (
  email,
  password,
  method,
  firstName,
  lastName
) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstName,
      lastName
    });
  } catch (authError) {
    dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    navigate("/");
  } catch (error) {
    console.error(error);
  }
};

export const logoutThunk = () => async dispatch => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
    navigate("/login");
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_BALANCE:
      return { ...state, balance: action.payload };
    default:
      return state;
  }
}

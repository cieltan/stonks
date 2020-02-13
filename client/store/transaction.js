import axios from "axios";

import { updateBalance } from "./user";

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = "GET_TRANSACTIONS";
export const BUY_TRANSACTIONS = "BUY_TRANSACTIONS";

/**
 * INITIAL STATE
 */
const defaultTransactions = [];

const getTransactions = payload => ({ type: GET_TRANSACTIONS, payload });
const buyTransactions = payload => ({ type: BUY_TRANSACTIONS, payload });

export const getTransactionsThunk = id => async dispatch => {
  try {
    const response = await axios.get(`/api/transaction/${id}`);
    const { data } = response;
    dispatch(getTransactions(data));
  } catch (error) {
    console.error(error);
  }
};

export const buyTransactionsThunk = stock => async dispatch => {
  try {
    const response = await axios.post(`/api/transaction`, stock);
    const { data } = response;
    const { user, newTransaction } = data;
    dispatch(buyTransactions(newTransaction));
    dispatch(updateBalance(user.balance));
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.payload;
    case BUY_TRANSACTIONS:
      return [...state, action.payload];
    default:
      return state;
  }
}

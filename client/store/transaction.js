import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = "GET_TRANSACTIONS";

/**
 * INITIAL STATE
 */
const defaultTransactions = [];

const getTransactions = payload => ({ type: GET_TRANSACTIONS, payload });

export const getTransactionsThunk = id => async dispatch => {
  try {
    const response = await axios.get(`/api/transaction/${id}`);
    const { data } = response;
    dispatch(getTransactions(data));
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
    default:
      return state;
  }
}

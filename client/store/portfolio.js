import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_PORTFOLIO = "GET_PORTFOLIO";

/**
 * INITIAL STATE
 */
const defaultPortfolio = {};

const getPortfolio = payload => ({ type: GET_PORTFOLIO, payload });

export const getPortfolioThunk = id => async dispatch => {
  try {
    const portfolio = await axios.get(`/api/portfolio/${id}`);
    console.log(portfolio);
    dispatch(getPortfolio(portfolio));
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return action.payload;
    default:
      return state;
  }
}

import * as actionTypes from './actionTypes';

const initialState = {
  city: '',
  cities: [],
};

const reducer = (
  state: StoreState = initialState,
  action: StoreAction,
): StoreState => {
  switch (action.type) {
    case actionTypes.CITY_TO_SEARCH:
      return {
        ...state,
        city: action.city,
        cities: [...state.cities, action.city],
      };
  }

  return state;
};

export default reducer;

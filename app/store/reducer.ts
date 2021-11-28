import * as actionTypes from './actionTypes';
import {StoreAction, StoreState} from './type';

const initialState = {
  city: '',
  location: undefined,
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
        cities: [...state.cities, action.city!],
      };

    case actionTypes.LOCATION_TO_SEARCH:
      return {
        ...state,
        location: action.location,
      };
  }

  return state;
};

export default reducer;

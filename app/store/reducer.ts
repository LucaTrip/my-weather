import * as actionTypes from './actionTypes';
import {StoreAction, StoreState} from './type';

const initialState = {
  city: undefined,
  location: undefined,
  qrScannerStatus: undefined,
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
        location: undefined,
        cities: [...state.cities, action.city!],
      };

    case actionTypes.LOCATION_TO_SEARCH:
      return {
        ...state,
        city: undefined,
        location: action.location,
      };

    case actionTypes.SET_QR_SCANNER_STATUS:
      return {
        ...state,
        city: undefined,
        location: undefined,
        qrScannerStatus: action.qrScannerStatus,
      };
  }

  return state;
};

export default reducer;

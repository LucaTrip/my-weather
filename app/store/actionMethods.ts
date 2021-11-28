import {Location} from '../models/Location';
import * as actionTypes from './actionTypes';
import {DispatchType, StoreAction} from './type';

export function addCityToSearch(city: string) {
  const action: StoreAction = {
    type: actionTypes.CITY_TO_SEARCH,
    city,
    location: undefined,
  };

  return (dispatch: DispatchType) => dispatch(action);
}

export function addLocationToSearch(location: Location) {
  const action: StoreAction = {
    type: actionTypes.LOCATION_TO_SEARCH,
    location,
    city: undefined,
  };

  return (dispatch: DispatchType) => dispatch(action);
}

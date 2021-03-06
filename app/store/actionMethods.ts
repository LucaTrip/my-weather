import {Location} from '../models/Location';
import * as actionTypes from './actionTypes';
import {DispatchType, StoreAction} from './type';

export function addCityToSearch(city: string) {
  const action: StoreAction = {
    type: actionTypes.CITY_TO_SEARCH,
    city,
    location: undefined,
    qrScannerStatus: undefined,
  };

  return (dispatch: DispatchType) => dispatch(action);
}

export function addLocationToSearch(location: Location) {
  const action: StoreAction = {
    type: actionTypes.LOCATION_TO_SEARCH,
    location,
    city: undefined,
    qrScannerStatus: undefined,
  };

  return (dispatch: DispatchType) => dispatch(action);
}

export function setQrScannerStatus(status: boolean) {
  const action: StoreAction = {
    type: actionTypes.SET_QR_SCANNER_STATUS,
    location: undefined,
    city: undefined,
    qrScannerStatus: status,
  };

  return (dispatch: DispatchType) => dispatch(action);
}

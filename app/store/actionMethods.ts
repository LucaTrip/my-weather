import * as actionTypes from './actionTypes';

export function addCityToSearch(city: string) {
  const action: StoreAction = {
    type: actionTypes.CITY_TO_SEARCH,
    city,
  };

  return (dispatch: DispatchType) => dispatch(action);
}

import {Location} from '../models/Location';

type StoreState = {
  city: string | undefined;
  location: Location | undefined;
  qrScannerStatus: boolean | undefined;
  cities: string[];
};

type StoreAction = {
  type: string;
  city: string | undefined;
  location: Location | undefined;
  qrScannerStatus: boolean | undefined;
};

type DispatchType = (args: StoreAction) => StoreAction;

type StoreState = {
  city: string;
  cities: string[];
};

type StoreAction = {
  type: string;
  city: string;
};

type DispatchType = (args: StoreAction) => StoreAction;

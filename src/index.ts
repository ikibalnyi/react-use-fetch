import { Reducer, useEffect, useReducer } from 'react';

interface State<P, E> {
  isLoading: boolean;
  error: null|E;
  data: null|P;
}

const REQUEST: 'REQUEST' = 'REQUEST';
const SUCCESS: 'SUCCESS' = 'SUCCESS';
const FAILURE: 'FAILURE' = 'FAILURE';

const fetchActions = {
  request: () => ({ type: REQUEST }),
  success: <P>(payload: P) => ({ type: REQUEST, payload }),
  failure: <E>(error: E) => ({ type: REQUEST, error }),
};

type Action<P, E> =
  | { type: typeof REQUEST }
  | { type: typeof SUCCESS, payload: P }
  | { type: typeof FAILURE, error: E };

function reducer<P, E>(state: State<P, E>, action: Action<P, E>) {
  switch (action.type) {
    case REQUEST:
      return { ...state, isLoading: true };
    case SUCCESS:
      return { ...initialState, data: action.payload };
    case FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}

type FetchData<S> = (...args: any[]) => Promise<S>;
type FetchReducer<S, E extends Error> = Reducer<State<S, E>, Action<S, E>>;
type UseFetchReturnType<S, E extends Error> = State<S,E> & { refetch: FetchData<S> };

const initialState: State<null, null> = {
  isLoading: false,
  data: null,
  error: null,
};

function useFetch<S = any, E extends Error = Error>
(fetchData: FetchData<S>, args?: any): UseFetchReturnType<S, E> {
  const [state, dispatch] = useReducer<FetchReducer<S, E>>(reducer, initialState);

  const fetchAction = async(...args: any[]) => {
    dispatch(fetchActions.request());

    try {
      const data = await fetchData(...args);
      dispatch(fetchActions.success(data));
      return data;
    } catch(error) {
      dispatch(fetchActions.failure(error));
      throw error;
    }
  };

  useEffect(() => {
    fetchAction(args);
  }, []);

  (state as UseFetchReturnType<S, E>).refetch = fetchAction;

  return state as UseFetchReturnType<S, E>;
}

export default useFetch;

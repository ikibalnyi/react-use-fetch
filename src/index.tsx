import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import ensureAsyncGenerator from "./utils/ensureAsyncGenerator";

export type PopulateState = {
  isFetching: boolean;
};

export type InjectedPopulateProps<P> = PopulateState & {
  repopulate(props: P): void;
};

export type FetchData<P, S> = (props: P & S) => AsyncIterable<S>| AsyncIterable<Promise<S>> | Promise<S> | S;
export type GetInitialState<P, S> = (props: P) => S;

type PopulateReturnType<P, S> =
  (WrappedComponent: React.ComponentType<P & S & InjectedPopulateProps<P>>) =>
    React.ComponentType<P>

function populate<P extends object, S extends object = any>(
  fetchData: FetchData<P, S>,
  getInitialState?: GetInitialState<P, S>
): PopulateReturnType<P, S> {
  return (WrappedComponent: React.ComponentType<P & S & InjectedPopulateProps<P>>): React.FunctionComponent<P> => {
    return (props: P) => {
      const initialState = getInitialState ? getInitialState(props) : {};
      const [fetchedData, setFetchedData] = useState({ ...initialState, isFetching: true });

      const populate = useCallback(async (props) => {
        for await (const data of ensureAsyncGenerator(fetchData, props)) {
          setFetchedData(prevState => ({
            ...prevState,
            ...data,
            isFetching: true,
          }));
        }

        setFetchedData(prevState => ({ ...prevState, isFetching: false }));
      }, []);

      useEffect(() => {
        populate({ ...props as object, ...fetchedData });
      }, []);

      return <WrappedComponent { ...props } { ...fetchedData } repopulate={populate} />;
    };
  };
}

export default populate;

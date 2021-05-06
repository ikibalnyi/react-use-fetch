# react-use-fetch-hook

> React hook for fetching data

[![NPM](https://img.shields.io/npm/v/react-use-fetch-hook.svg)](https://www.npmjs.com/package/react-use-fetch-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-use-fetch-hook
```

## Usage

```tsx
import * as React from 'react'

import { useFetch } from 'react-use-fetch-hook'

const fetchUser = () => fetch('/api/me')

interface UserData {
  id: string;
  name: string;
}

const MyComponent = () => {
  const { isLoading, data, error, refetch } = useFetch<UserData>(fetchUser);

  if (isLoading) return <div>I'm loading...</div>;
  if (error) return <div>Something went wrong :(</div>;
  return <div>{user.id}</div>;
};
```
[![Edit react-use-fetch](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/solitary-sea-jem6d?fontsize=14)

## API

#### useFetch\<S, E\>(fetchData: (...args: any\[\]) => Promise\<S\>, ...args: any[])
 
 - `fetchData` Fetch function that returns a promise.
 - `...args` Arguments to be passed to fetchData function.

 Returns
 `{ data: S, isLoading, boolean, error: E, refetch: (...args: any[]) => Promise<S> }`

 - `data` The response data object resolved by fetchData function.
 - `isLoading` Boolean to indicate if request is still loading.
 - `error` Error object rejected or thrown by fetchData function.
 - `refetch` Function to make a new request.


## License

MIT © [ikibalnyi](https://github.com/ikibalnyi)

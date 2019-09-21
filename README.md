# @kibatus/react-use-fetch

> React hook for fetching data

[![NPM](https://img.shields.io/npm/v/@kibatus/react-use-fetch.svg)](https://www.npmjs.com/package/@kibatus/react-use-fetch) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @kibatus/react-use-fetch
```

## Usage

```tsx
import * as React from 'react'

import { useFetch } from '@kibatus/react-use-fetch'

const fetchUser = () => fetch('/api/me')

interface UserData {
  id: string;
  name: string;
}

const MyComponent = ({ isLoading, user, error }) => {
  const { isLoading, data, error, refetch } = useFetch<UserData>(fetchUser);

  if (isLoading) return <div>I'm loading...</div>;
  if (error) return <div>Something went wrong :(</div>;
  return <div>{user.id}</div>;
};
```
[![Edit react-use-fetch](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/solitary-sea-jem6d?fontsize=14)

## API

#### useFetch\<S, E\>(fetchData: (...args: any\[\]) => Promise\<S\> )
 
 - `fetchData` Fetch function that returns a promise.

 Returns
 `{ data: S, isLoading, boolean, error: E, refetch: (...args: any[]) => Promise<S> }`

 - `data` The response data object resolved by fetchData function.
 - `isLoading` Boolean to indicate if request is still loading.
 - `error` Error object rejected or thrown by fetchData function.
 - `refetch` Function to make a new request.


## License

MIT © [ikibalnyi](https://github.com/ikibalnyi)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).

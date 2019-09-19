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

const MyComponent = ({ isLoading, user, error }) => {
  const { isLoading, data, error, refetch } = useFetch<User>(fetchUser);

  if (isLoading) return 'I\'m loading...';
  if (error) return 'Something went wrong :(';
  return (
    <div>
      {user.id}
    </div>
  );
};
```

## License

MIT © [ikibalnyi](https://github.com/ikibalnyi)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).

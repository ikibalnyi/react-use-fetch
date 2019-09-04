import { renderHook } from "@testing-library/react-hooks";

import useFetch from "./";

describe('useFetch', () => {
  it('should return state reference', () => {
    const mock = jest.fn(() => Promise.resolve('test'));
    const { result } = renderHook(() => useFetch(mock));
    const oldState = result.current;

    expect(oldState).toBe(result.current)
  });
});

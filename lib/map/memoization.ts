import { useRef } from 'react';

export const useMemoizedValue = <T>(value: T, dependencies: any[]): T => {
  const ref = useRef<T>(value);

  if (!areDependenciesEqual(ref.current, dependencies)) {
    ref.current = value;
  }

  return ref.current;
};

const areDependenciesEqual = (prevDeps: any[], nextDeps: any[]): boolean => {
  if (prevDeps.length !== nextDeps.length) return false;
  return prevDeps.every((dep, i) => dep === nextDeps[i]);
};

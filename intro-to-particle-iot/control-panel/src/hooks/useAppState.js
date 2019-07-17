import { useContext, useMemo } from 'react';
import AppContext from '../AppContext';

export default function useAppState(mapState = (v) => v) {
  const [state, dispatch] = useContext(AppContext);
  const memoizedState = useMemo(() => mapState(state), [state]);
  return [memoizedState, dispatch];
}

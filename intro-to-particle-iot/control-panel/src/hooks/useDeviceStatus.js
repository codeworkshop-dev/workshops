import { useEffect, useRef } from 'react';
import useAppState from './useAppState';
import useInterval from '../hooks/useInterval';
import getDeviceStatus from '../utils/getDeviceStatus';
import { actions } from '../reducer';

export default function useDeviceStatus(deviceId) {
  const [{ token }, dispatch] = useAppState();
  const mountedRef = useRef(true);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    [],
  );

  useInterval(async () => {
    try {
      const nextStatus = await getDeviceStatus(deviceId, token);
      // TODO: Need to check if another response after this one
      // returned before this one did so we don't wipe it out.
      if (mountedRef.current) {
        dispatch(actions.setDeviceStatus(deviceId, nextStatus));
      }
    } catch (ex) {}
  }, 1000);
}

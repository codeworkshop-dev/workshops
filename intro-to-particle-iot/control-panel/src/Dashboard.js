import React from 'react';
import InternetButton from './InternetButton';
import useAppState from './hooks/useAppState';

export default function({ devices }) {
  const [{ token }] = useAppState();

  if (!devices || !devices.length) {
    return null;
  }

  return (
    <div>
      {devices.map((device) => (
        <InternetButton
          key={device.id}
          device={device}
          // onLightClick={(i) => setSelected()}
          lights={[{ selected: true, color: 'red' }]}
        />
      ))}
    </div>
  );
}

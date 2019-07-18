import React from 'react';
import styles from './InternetButtonLights.module.css';

export default function InternetButtonLights(props) {
  // There's 11 lights. We might not always get 11 in an array
  // so we iterate over our light array and check the index
  // of the light array passed.
  const lights = [...Array(11)];

  const { lights: passedLights = [], brightness = 255, onLightClick } = props;
  return (
    <React.Fragment>
      {lights.map((_, i) => {
        const light = passedLights[i] || {};
        const color = `rgb(${light || '200,200,200'})`;
        return (
          <div
            key={i}
            className={styles.root}
            style={{
              transform: `rotate(${i / 2 + 0.625}rad)`,
            }}
          >
            <div
              className={styles.label}
              onClick={() => onLightClick && onLightClick(i + 1)}
            >
              <div
                className={styles.light}
                style={{
                  opacity: brightness / 255,
                  background: color,
                  boxShadow: `0 0 24px 26px ${color}`,
                }}
              />
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
}

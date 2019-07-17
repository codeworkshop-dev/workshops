import React from 'react';
import styles from './InternetButtonLights.module.css';

export default function InternetButtonLights(props) {
  // There's 11 lights. We might not always get 11 in an array
  // so we iterate over our light array and check the index
  // of the light array passed.
  const lights = [...Array(11)];

  const { lights: passedLights = [] } = props;
  return (
    <React.Fragment>
      {lights.map((_, i) => {
        const light = passedLights[i] || {};
        const color = light.color || 'red';
        return (
          <div
            key={i}
            className={styles.root}
            style={{
              transform: `rotate(${i / 2 + 0.625}rad)`,
            }}
          >
            <label
              className={styles.label}
              onClick={() => {
                // props.onLightClick(i)
              }}
            >
              <input type="checkbox" className={styles.checkbox} />
              <div
                className={styles.light}
                style={{
                  background: color,
                  boxShadow: `0 0 24px 26px ${color}`,
                }}
              />
            </label>
          </div>
        );
      })}
    </React.Fragment>
  );
}

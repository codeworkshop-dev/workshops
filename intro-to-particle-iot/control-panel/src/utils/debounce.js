// Quick and simple debounce function.
// Does not implement scope.
// Does not implement return values.
export default function debouce(callback, waitMs) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback.bind(this), waitMs, ...args);
  };
}

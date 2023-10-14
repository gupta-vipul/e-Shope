export const debounce = (fnc, delay) => {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fnc(...args);
      }, delay);
    };
  };
  
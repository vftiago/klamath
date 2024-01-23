const debounce = <Params extends unknown[]>(
  callback: (...args: Params) => unknown,
  duration: number,
): ((...args: Params) => void) => {
  let timer: NodeJS.Timeout;

  return (...args: Params) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, duration);
  };
};

export default debounce;

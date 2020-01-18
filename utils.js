// reusable function for delay
const debounse = (func, delay = 1000) => {
  let timeoutId;
  // we use ... to spread arg or args to array and use 'apply' function to use it (if we would have arg)
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

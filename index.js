// get data from API using axios lib.
const fetchData = async search => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "a596eaf0",
      s: search
    }
  });
  console.log(response.data);
};
const input = document.querySelector("input");
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

// onInput function help us to delay search input for 1 sec
const onInput = e => {
  fetchData(e.target.value);
};
input.addEventListener("input", debounse(onInput, 500));

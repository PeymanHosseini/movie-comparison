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
// get input from user and send it to API
const input = document.querySelector("input");
let timeoutId;
const onInput = e => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    fetchData(e.target.value);
  }, 1000);
};
input.addEventListener("input", onInput);

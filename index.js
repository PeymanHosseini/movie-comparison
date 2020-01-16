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
input.addEventListener("input", e => {
  fetchData(e.target.value);
});

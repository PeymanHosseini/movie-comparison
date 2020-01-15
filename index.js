const fetchData = async () => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "a596eaf0",
      i: "tt00848228"
    }
  });
  console.log(response.data);
};
fetchData();

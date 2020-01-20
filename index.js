// get data from API using axios lib.
const fetchData = async search => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "a596eaf0",
      s: search
    }
  });
  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};
const input = document.querySelector("input");

// onInput function help us to delay search input for 1 sec
const onInput = async e => {
  const movies = await fetchData(e.target.value);
  for (let movie of movies) {
    const div = document.createElement("div");
    div.innerHTML = `
    <img src="${movie.Poster}"></img>
    <h1>${movie.Title}</h1>
    `;

    document.querySelector("#target").appendChild(div);
  }
};
input.addEventListener("input", debounse(onInput, 500));

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
const root = document.querySelector(".autocomplete");
root.innerHTML = `
<label><b>Search for the movie</b></label>
<input class="input" />
<div class="dropdown">
  <div class="dropdown-menu">
      <div class="dropdown-content results">
      </div>
  </div>
</div>
`;
const input = document.querySelector("input");
const dropDown = document.querySelector(".dropdown");
const resultWrapper = document.querySelector(".results");

// onInput function help us to delay search input for 1 sec
const onInput = async e => {
  const movies = await fetchData(e.target.value);

  dropDown.classList.add("is-active");
  for (let movie of movies) {
    const option = document.createElement("a");
    option.classList.add("dropdown-item");
    option.innerHTML = `
    <img src="${movie.Poster}"></img>
    ${movie.Title}
    `;

    resultWrapper.appendChild(option);
  }
};
input.addEventListener("input", debounse(onInput, 500));

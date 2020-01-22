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
//creating autoComplete dropDown
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
  // closing dropdown if input section is empty
  if (!movies.length) {
    dropDown.classList.remove("is-active");
    return;
  }

  resultWrapper.innerHTML = "";
  dropDown.classList.add("is-active");

  for (let movie of movies) {
    const option = document.createElement("a");
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    option.classList.add("dropdown-item");
    option.innerHTML = `
    <img src="${imgSrc}"></img>
    ${movie.Title}
    `;
    // when user click the movie link we send followup req to API
    option.addEventListener("click", () => {
      dropDown.classList.remove("is-active");
      input.value = movie.Title;
      onClickMovie(movie);
    });

    resultWrapper.appendChild(option);
  }
};
input.addEventListener("input", debounse(onInput, 500));

// closing dropdown menu by clicking somewhere empty on browser
document.addEventListener("click", e => {
  if (!root.contains(e.target)) {
    dropDown.classList.remove("is-active");
  }
});

const onClickMovie = async movie => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "a596eaf0",
      i: movie.imdbID
    }
  });
  console.log(response.data);
};

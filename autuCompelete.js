// reusable autoCompelete function
const createAutoCompelete = ({ root }) => {
  //'root' is elemenet that autocompelete should be rendered into
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
  const input = root.querySelector("input");
  const dropDown = root.querySelector(".dropdown");
  const resultWrapper = root.querySelector(".results");

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
};

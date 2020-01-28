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
createAutoCompelete({
  root: document.querySelector(".autocomplete"),
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
    <img src="${imgSrc}"></img>
    ${movie.Title} (${movie.Year})
    `;
  }
});

// folowup req function
const onClickMovie = async movie => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "a596eaf0",
      i: movie.imdbID
    }
  });
  document.querySelector("#summary").innerHTML = movieTemplate(response.data);
};

const movieTemplate = movieDetail => {
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};

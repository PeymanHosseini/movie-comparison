// reusable autoCompelete function
const createAutoCompelete = ({
  //'root' is elemenet that autocompelete should be rendered into
  // 'renderOption' function that knows how to render each item like each movie
  // 'onItemSelect' when user click on option or item on dropdown menu it gets invoked
  // 'inputValue' item title assign to search box when user click on item
  // 'fetchdata' get data from API using axios lib.
  root,
  renderOption,
  onItemSelect,
  inputValue,
  fetchData
}) => {
  root.innerHTML = `
<label><b>Search </b></label>
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
    const items = await fetchData(e.target.value);
    // closing dropdown if input section is empty
    if (!items.length) {
      dropDown.classList.remove("is-active");
      return;
    }

    resultWrapper.innerHTML = "";
    dropDown.classList.add("is-active");

    for (let item of items) {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      // when user click the item link we send followup req to API
      option.addEventListener("click", () => {
        dropDown.classList.remove("is-active");
        input.value = inputValue(item);
        onItemSelect(item);
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

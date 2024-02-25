// SELECT ITEMS

// CONTAINER FOR ROWS AND SEATS
const container = document.querySelector(".container");

// SELECT BOX CONTAINS MOVIE PRICES
const selectMovie = document.querySelector("#movie-list");

// EDITABLE TEXT CONTENTS
const seatCount = document.querySelector(`#seat-count`);
const price = document.querySelector("#price");

// Inside the container add an event listener
container.addEventListener("click", (e) => {
  // Check if clicked element is a seat and not reserved
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    // If it's toggle the selected class
    e.target.classList.toggle("selected");
  }
});

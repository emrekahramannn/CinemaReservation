// SELECT ITEMS
/* CONTAINER FOR SEATS */
const container = document.querySelector(".container");

/* INFORMATION TO BE UPDATED */
const count = document.querySelector("#seatCount");
const amount = document.querySelector("#price");

/* MOVIE LIST */
const select = document.querySelector("#movie-list");

/* NONE RESERVED SEATS */
const seats = document.querySelectorAll(".seat:not(.reserved)");

/* Function Calls to update screen when page is loaded */
getFromLocalStorage();
calculateTotal();

// Add click event to container
container.addEventListener("click", (e) => {
  // Select the none reserved clicked seats
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    // Toggle selected class to clicked seats
    e.target.classList.toggle("selected");
    calculateTotal();
  }
});

// Add change event listener to selectbox
select.addEventListener("change", (e) => {
  // Calculate price according to selected movie
  calculateTotal();
});

// Calculate price and selected seats then inform the user
function calculateTotal() {
  // Select all selected seats
  const selectedSeats = container.querySelectorAll(".seat.selected");

  // Make them array to use map method (nodelist -> array)
  const selectedSeatsArray = [...selectedSeats];
  const seatsArray = [...seats];

  // Find the index(es) of the selected element(s) inside the seatsArray (all of the seats except the reserved ones)
  let selectedSeatIndexes = selectedSeatsArray.map((seat) => {
    return seatsArray.indexOf(seat);
  });

  // Update information according to these new values
  let selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * select.value;

  saveToLocalStorage(selectedSeatIndexes);
}

// Continue where you left when you refresh the page
function getFromLocalStorage() {
  // Get information from local storage and convert them to JSON format
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  // If returned object is not null or have items in it
  if (selectedSeats != null && selectedSeats.length > 0) {
    // Iterate over each seat and its index
    seats.forEach((seat, index) => {
      // If item present
      if (selectedSeats.indexOf(index) > -1) {
        // Add selected class to the item
        seat.classList.add("selected");
      }
    });
  }
  // Get information about the selected movie from local storage
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  // If the returned value is not null
  if (selectedMovieIndex != null) {
    // Update the select box option to returned value
    select.selectedIndex = selectedMovieIndex;
  }
}

// ADD CHANGES TO LOCAL STORAGE
function saveToLocalStorage(indexes) {
  // Save indexes to local storage {selectedSeats: [....]}
  localStorage.setItem("selectedSeats", JSON.stringify(indexes));
  // Save selected movie to local storage {selectedMovieIndex: x}
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}

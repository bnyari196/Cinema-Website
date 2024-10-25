$(document).ready(function(){
});


$(document).ready(function() {
    $("#loadPage").click(function() {
        // AJAX request to load test.html content
        $.ajax({
            url: "test/test.html",
            type: "GET",
            success: function(response) {
                // On success, load the content into the modal body
                $("#pageContent").html(response);
                // Add a class to the modal body to scope the CSS rules
                $("#pageContent").addClass("popup-content");
                // Show the modal
                $("#popupContent").modal('show');
            },
            error: function(xhr, status, error) {
                console.error("Error loading page:", error);
            }
        });
    });
});

$(document).ready(function() {
    const container = document.querySelector(".container");
    const seats = document.querySelectorAll(".row .seat:not(.sold)");

    // Seat click event
    container.addEventListener("click", function(e) {
        if (e.target.classList.contains("seat") && !e.target.classList.contains("sold")) {
            e.target.classList.toggle("selected"); // Toggle the 'selected' class
        }
    });
});


$(document).ready(function() {
    // Function to calculate the total price
    function calculateTotalPrice() {
        // Get the quantity and price of each product
        var adultQty = parseInt($("input[name='adultQty']").val());
        var studentQty = parseInt($("input[name='studentQty']").val());
        var childQty = parseInt($("input[name='childQty']").val());

        // Calculate the total price
        var totalPrice = (adultQty * 12.5) + (studentQty * 10.5) + (childQty * 7.5);

        // Display the total
        $("#totalPrice").text("Total Price: £" + totalPrice.toFixed(2));
    }

    // Call calculateTotalPrice function when the page loads
    calculateTotalPrice();

    // Call calculateTotalPrice function whenever a quantity input changes
    $(".qty").on("input", function() {
        calculateTotalPrice();
    });

    // Handle quantity increment button
    $(".button-container").on("click", ".cart-qty-plus", function() {
        var input = $(this).siblings("input.qty");
        var value = parseInt(input.val());
        input.val(value + 1);
        calculateTotalPrice();
    });

    // Handle quantity decrement button
    $(".button-container").on("click", ".cart-qty-minus", function() {
        var input = $(this).siblings("input.qty");
        var value = parseInt(input.val());
        if (value > 0) {
            input.val(value - 1);
            calculateTotalPrice();
        }
    });

    // Handle Add To Cart button click
    $(".listProduct").on("click", "button", function() {
        var priceText = $(this).siblings(".price").text();
        var price = parseFloat(priceText.replace('£', '')); // Parse price from text
        var currentTotalText = $("#totalPrice").text();
        var currentTotal = parseFloat(currentTotalText.replace('Total Price: £', '')); // Parse total from text
        var newTotal = currentTotal + price;
        $("#totalPrice").text("Total Price: £" + newTotal.toFixed(2));
    });
});





var incrementMinus;

var buttonPlus  = $(".cart-qty-plus");
var buttonMinus = $(".cart-qty-minus");

var incrementPlus = buttonPlus.click(function() {
	var $n = $(this)
		.parent(".button-container")
		.parent(".container")
		.find(".qty");
	$n.val(Number($n.val())+1 );
});

var incrementMinus = buttonMinus.click(function() {
		var $n = $(this)
		.parent(".button-container")
		.parent(".container")
		.find(".qty");
	var amount = Number($n.val());
	if (amount > 0) {
		$n.val(amount-1);
	}
});

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}


// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        console.log(seat.classList.add("selected"));
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    console.log(selectedMovieIndex)
  }
}
console.log(populateUI())
// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();

function validateCheckout() {
    // Get the total price
    var totalPrice = parseFloat(document.getElementById('totalPrice').innerText.replace('Total Price: £', ''));

    // Check if the total price is 0
    if (totalPrice === 0) {
        // If the total price is 0, prompt the user
        var proceed = confirm('Your total price is £0. Are you sure you want to proceed to checkout?');

        // If the user chooses not to proceed, return false
        if (!proceed) {
            return false;
        }
    }

    // If the total price is not 0 or the user chooses to proceed, navigate to the checkout page
    window.location.href = 'checkout.html';
}
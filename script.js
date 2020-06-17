const movies = document.querySelector("#movies-name");
const img = document.querySelector("#movies-img");
const aside = document.querySelector("aside");
const tickets = document.querySelector("#tickets");
const payment = document.querySelector("#you-pay");
const main = document.querySelector(".main");
const bookTickets = document.querySelector(".confirmTickets");
const allSeats = document.querySelectorAll("i");

let selectedSeats = 0; //Can't declare this down coz of hoisting or something like that (CHECK LATER)
let movie;

aside.style.visibility='hidden';
main.style.visibility = 'hidden';
bookTickets.style.visibility = 'hidden';

// Button Book Tickets Event Listener
function ticketsBooked() {
  alert("Your Tickets have been confirmed.");
}

movies.addEventListener("input", function displayImage() {
  aside.classList.add('animated', 'fadeInRight');
  console.log(img.classList);
  let movie = movies.value;
  //Turning animation On using Javascript
  document.querySelector('.header').style.animationPlayState = 'running';
  //Setting Css using Javascript
  img.style.setProperty("border", "1px solid black");
  // Setting Image src attribute
  // Double Slash due to escape sequence problem
  if (movie === "Select-A-Movie") {
    document.querySelector('.header').style.animationPlayState = 'paused';
    aside.style.visibility = "hidden";
    main.style.visibility = "hidden";
    bookTickets.style.visibility = "hidden";
  } else {
    let movieSelected;  //boolean for movie selected
    console.log(movie);
    aside.style.visibility = "visible";
    if (movie === "Avengers Infinity War") {
      img.setAttribute("src", "Images\\Infinity-War-Poster.png");
      movieSelected = true;
      img.classList.add('animated', 'fadeIn');
    } else if (movie === "Joker") {
      img.setAttribute("src", "Images\\Joker-Poster.png");
      movieSelected = true;
    } else if (movie === "Interstellar") {
      img.setAttribute("src", "Images\\Interstellar-Poster.png");
      movieSelected = true;
    } else if (movie === "Jurrasic World") {
      img.setAttribute("src", "Images\\Jurrasic-World-Poster.png");
      movieSelected = true;
    } else if (movie === "The Martian") {
      img.setAttribute("src", "Images\\The-Martian-Poster.png");
      movieSelected = true;
    }
    movies.addEventListener('change', () => {
      if (movieSelected == true) {
        main.style.visibility = "hidden";
        bookTickets.style.visibility = "hidden";
        tickets.value = 1;
        payment.value = `$15.00`;
      }
    })
  }
});

document.addEventListener("input", appendPayment);
function appendPayment() {
  let costOfTickets = tickets.value * 15;
  payment.value = `$${costOfTickets}.00`;
}

let counter = 1;
document.querySelector(".selectSeats").addEventListener("click", () => {
  main.classList.add('animated', 'headShake')
  main.style.visibility = "visible";
  bookTickets.style.visibility = "visible";
  counter === 1 && randomizeSeatColor();
  counter++;
  seatsFunctionality();
});

// Selecting Seats Code Starts Here
function randomizeSeatColor() {
  for (let i = 0; i < 13; i++) {
    let randomSeat = Math.floor(Math.random() * (44 - 1) + 1);
    allSeats[randomSeat].style.color = "red";
    allSeats[randomSeat].classList.add("unavailable"); //adds unavailable class to the unavailable seats
  }
}

function seatsFunctionality() {
  let availableSeats = document.querySelectorAll(
    "i:not(.unavailable):not(.fa-film)"
  ); //selects the i tags, without the following classes

  availableSeats.forEach((item, index) => {

    item.addEventListener("mouseenter", () => {
      item.style.opacity = "0.5";
    });
    item.addEventListener("mouseleave", () => {
            item.style.opacity = "1";
        if (!item.classList.contains('selected')) {
            item.style.color = 'black';
            item.style.opacity = "1";
            }
    });
    item.addEventListener("click", function selectSeats() {
        const numberOfSeats = tickets.value;
        if (item.classList.contains('selected')) {
            item.style.color = 'black';
            item.classList.remove('selected');
            selectedSeats--;
        }
        else if (numberOfSeats > selectedSeats) {
            item.style.color = 'blue';
            item.style.opacity = "1";
            item.classList.add('selected');
            selectedSeats++;
        } else {
            console.log(`You have already selected ${numberOfSeats} seats!`);
        }
    });
  });
}

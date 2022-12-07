export default (function checkAvailableSpots() {
  const availableSpots = document.querySelector('.available-spots');
  const parkingSpot = document.querySelectorAll('.parking-spot');

  async function checkAvailability() {
    const spots = await fetch(
      'https://tcc-parking-iot.herokuapp.com/parking-spots/available-parkingspot',
      {
        method: 'GET',
        mode: 'cors',
      },
    );

    const responseSpots = await spots.json();

    availableSpots.textContent = responseSpots;

    const data = await fetch(
      'https://tcc-parking-iot.herokuapp.com/parking-spots',
      {
        method: 'GET',
        mode: 'cors',
      },
    );
    const responseRental = await data.json();
    responseRental.forEach((rental) => {
      parkingSpot.forEach((spot) => {
        if (
          rental.plate &&
          rental.name == `A${spot.getAttribute('id')}` &&
          !rental.availableSpots
        ) {
          const div = document.createElement('div');
          div.classList.add('car-img');
          const img = document.createElement('img');
          img.setAttribute('src', './img/png/car-top-view-icon.svg');
          div.append(img);
          if (spot.childNodes[1]) spot.childNodes[1].remove();
          spot.append(div);
        }
      });
    });
  }

  checkAvailability();
  setInterval(checkAvailability, 3000);
})();

export default (function checkAvailableSpots() {
  const availableSpots = document.querySelector('.available-spots');
  const parkingSpot = document.querySelectorAll('.parking-spot');
  let spots = 6;

  async function checkAvailability() {
    spots = 6;
    const data = await fetch(
      'https://tcc-parking-iot.herokuapp.com/parking-rentals',
      {
        method: 'GET',
        mode: 'cors',
      },
    );
    const response = await data.json();

    response.forEach((rental) => {
      const div = document.createElement('div');
      div.classList.add('car-img');
      const img = document.createElement('img');
      img.setAttribute('src', '../img/car-top-view-icon.svg');
      div.append(img);
      parkingSpot.forEach((spot) => {
        if (rental.id == spot.getAttribute('id') && rental.endDate == null) {
          spots -= 1;
          if (spot.childNodes[1]) spot.childNodes[1].remove();
          spot.append(div);
        }
      });
    });
    availableSpots.textContent = spots;
  }

  checkAvailability();
  setInterval(checkAvailability, 3000);
})();

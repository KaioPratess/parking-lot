export default (function checkAvailableSpots() {
  const availableSpots = document.querySelector('.available-spots');
  const parkingSpot = document.querySelectorAll('.parking-spot');
  const spots = 12;

  const div = document.createElement('div');
  div.classList.add('car-img');
  const img = document.createElement('img');
  img.setAttribute('src', '../img/SeekPng.com_car-png-top_601117.png');
  div.append(img);

  async function checkAvailability() {
    const data = await fetch(
      'https://tcc-parking-iot.herokuapp.com/parking-rentals',
      {
        method: 'GET',
        mode: 'cors',
      },
    );
    const response = await data.json();
    const length = response.length;

    response.forEach((rental) => {
      parkingSpot.forEach((spot) => {
        if (rental.id == spot.getAttribute('id')) {
          if (rental.id < 7) {
            img.style.transform = 'rotate(180deg)';
          }
          div.remove();
          spot.append(div);
        }
      });
    });
    availableSpots.textContent = spots - length;
  }

  checkAvailability();
  setInterval(checkAvailability, 3000);
})();

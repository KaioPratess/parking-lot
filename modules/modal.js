export default (function showModal() {
  const modalBg = document.querySelector('.modal-bg');
  const manageBtn = document.querySelector('.manage-btn');
  const closeModal = document.querySelector('.close-modal');
  const tbody = document.querySelector('.tbody');
  let startDate;
  let endDate;
  let hours;
  const hourValue = 10;

  async function getData() {
    const data = await fetch(
      'https://tcc-parking-iot.herokuapp.com/parking-rentals',
      {
        method: 'GET',
        mode: 'cors',
      },
    );

    const response = await data.json();

    response.sort((a, b) => a.id - b.id);
    response.forEach((rental) => {
      const tr = document.createElement('tr');
      const keys = Object.keys(rental);

      keys.forEach((key) => {
        const td = document.createElement('td');
        if (typeof rental[key] !== 'object') {
          td.textContent = rental[key];
          if (key == 'startDate') {
            startDate = new Date(rental[key]);
          } else if (key == 'endDate' && rental[key] !== null) {
            endDate = new Date(rental[key]);
          }
        } else {
          if (rental[key]) {
            td.textContent = rental[key].plateNumber;
          }
        }
        tr.append(td);
      });

      const hour = document.createElement('td');
      const value = document.createElement('td');
      if (rental.endDate) {
        const startHour = startDate.getUTCHours();
        const endHour = endDate.getUTCHours();
        hours = endHour - startHour;
        hour.textContent = `${hours}h`;
        value.textContent = `R$ ${hours * hourValue}`;
      } else {
        hour.textContent = `0h`;
        value.textContent = `R$ 0`;
      }

      tr.append(hour);
      tr.append(value);

      tbody.append(tr);
    });
  }

  manageBtn.addEventListener('click', () => {
    tbody.textContent = '';
    modalBg.style.display = 'flex';
    getData();
  });

  closeModal.addEventListener('click', () => {
    modalBg.style.display = 'none';
  });
})();

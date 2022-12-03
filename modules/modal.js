export default (function showModal() {
  const modalBg = document.querySelector('.modal-bg');
  const manageBtn = document.querySelector('.manage-btn');
  const closeModal = document.querySelector('.close-modal');
  const tbody = document.querySelector('.tbody');

  async function getData() {
    const data = await fetch(
      'https://tcc-parking-iot.herokuapp.com/parking-rentals',
      {
        method: 'GET',
        mode: 'cors',
      },
    );

    const response = await data.json();
    response.forEach((rental) => {
      const tr = document.createElement('tr');
      const keys = Object.keys(rental);
      keys.forEach((key) => {
        const td = document.createElement('td');
        if (typeof rental[key] !== 'object') {
          td.textContent = rental[key];
        } else {
          if (rental[key]) {
            td.textContent = rental[key].plateNumber;
          }
        }
        tr.append(td);
      });

      const td = document.createElement('td');
      td.textContent = `A${rental.id}`;
      tr.append(td);

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

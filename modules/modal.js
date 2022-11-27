export default (function showModal() {
  const modalBg = document.querySelector('.modal-bg');
  const manageBtn = document.querySelector('.manage-btn');
  const closeModal = document.querySelector('.close-modal');
  const tr = document.querySelectorAll('tr');

  async function getData() {
    const tbody = document.querySelector('.tbody');
    if (tr) {
      console.log(tr);
    }
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
          td.textContent = rental[key].plateNumber;
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
    getData();
    modalBg.style.display = 'flex';
  });

  closeModal.addEventListener('click', () => {
    modalBg.style.display = 'none';
  });
})();

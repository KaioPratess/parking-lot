export default (function searchPlate() {
  // Busca carro por placa
  const searchBtn = document.querySelector('.search-btn');
  const searchDiv = document.querySelector('.search-input');
  const searchInput = document.querySelector('.search-input input');
  const searchResponse = document.querySelector('.search-response');
  const parkingSpot = document.querySelectorAll('.parking-spot');
  const p = document.createElement('p');

  async function getCarByPlate(e) {
    if (e.key == 'Enter' || e.type == 'click') {
      if (searchInput.value.split('').length < 7) {
        // Validação do campo de input
        searchResponse.textContent = '';
        p.classList.add('validation');
        p.textContent = '* O nome da placa deve conter 7 caracteres.';
        searchDiv.appendChild(p);
        parkingSpot.forEach((spot) => {
          spot.style.background = 'transparent';
        });
      } else {
        // Fetch e display das informações
        try {
          p.remove();
          const data = await fetch(
            `https://tcc-parking-iot.herokuapp.com/parking-rentals/findByPlateNumber?plateNumber=${searchInput.value}`,
            {
              method: 'GET',
              mode: 'cors',
            },
          );
          const response = await data.json();
          if (response.length) {
            // Pintar vaga
            parkingSpot.forEach((spot) => {
              const id = spot.getAttribute('id');
              if (id == response[0].id) {
                spot.style.background = 'yellow';
              }
            });
            // Preencher info da placa pesquisada
            searchResponse.innerHTML = `
        <ul>
        <li class="id">
          <p>ID: </p>
          <span>${response[0].plate.id}</span>
        </li>
        <li class="vaga">
          <p>Vaga: </p>
          <span>A${response[0].id}</span>
        </li>
        <li class="entrada">
          <p>Entrada: </p>
          <span>${response[0].startDate}</span>
        </li>
        <li class="saida">
          <p>Saída: </p>
          <span>${response[0].endDate}</span>
        </li>
        <li class="Horas">
          <p>Horas: </p>
          <span>${response[0].hour}</span>
        </li>
        <li class="valor">
          <p>Valor: </p>
          <span>${response[0].value}</span>
        </li>
        </ul>
        `;
          } else {
            searchResponse.textContent = 'Placa não encontrada!';
            parkingSpot.forEach((spot) => {
              spot.style.background = 'transparent';
            });
          }
        } catch (error) {
          alert(error);
        }
      }
    }
  }

  searchBtn.addEventListener('click', getCarByPlate);
  searchInput.addEventListener('keydown', getCarByPlate);
})();

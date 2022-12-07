export default (function searchPlate() {
  // Busca carro por placa
  const searchBtn = document.querySelector('.search-btn');
  const searchDiv = document.querySelector('.search-input');
  const searchInput = document.querySelector('.search-input input');
  const searchResponse = document.querySelector('.search-response');
  const parkingSpot = document.querySelectorAll('.parking-spot');
  const p = document.createElement('p');

  async function getCarByPlate(e) {
    parkingSpot.forEach((spot) => {
      spot.style.background = 'black';
    });
    if (e.key == 'Enter' || e.type == 'click') {
      if (searchInput.value.split('').length < 7) {
        // Validação do campo de input
        searchResponse.textContent = '';
        p.classList.add('validation');
        p.textContent = '* O nome da placa deve conter 7 caracteres.';
        searchDiv.appendChild(p);
        parkingSpot.forEach((spot) => {
          spot.style.background = 'black';
        });
      } else {
        // Fetch e display das informações
        try {
          p.remove();
          const data = await fetch(
            `https://tcc-parking-iot.herokuapp.com/parking-spots/find-by-plate?plateNumber=${searchInput.value}`,
            {
              method: 'GET',
              mode: 'cors',
            },
          );
          const response = await data.json();

          if (response) {
            // Preencher info da placa pesquisada
            searchResponse.innerHTML = `
        <ul>
        <li class="id">
          <p>ID: </p>
          <span>${response.plate.id}</span>
        </li>
        <li class="vaga">
          <p>Vaga: </p>
          <span>${response.name}</span>
        </li>
        </ul>
        `;

            const fetchData = await fetch(
              'https://tcc-parking-iot.herokuapp.com/parking-spots',
              {
                method: 'GET',
                mode: 'cors',
              },
            );
            const responseData = await fetchData.json();

            responseData.forEach((data) => {
              if (
                data.plate &&
                response.plate.plateNumber == data.plate.plateNumber &&
                !data.available
              ) {
                parkingSpot.forEach((spot) => {
                  const id = `A${spot.getAttribute('id')}`;
                  spot.style.background = 'black';
                  if (id == data.name) {
                    spot.style.background = 'orange';
                  }
                });
              }
            });
          } else {
            searchResponse.textContent = 'Placa não encontrada!';
            parkingSpot.forEach((spot) => {
              spot.style.background = 'black';
            });
          }
        } catch (error) {
          searchResponse.textContent = 'Placa não encontrada!';
          console.log('O fetch não retornou nada');
        }
      }
    }
  }

  searchBtn.addEventListener('click', getCarByPlate);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
      getCarByPlate(e);
    } else {
      return;
    }
  });
})();

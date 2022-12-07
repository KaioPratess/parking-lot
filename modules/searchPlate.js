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
            `https://tcc-parking-iot.herokuapp.com/parking-rentals/findByPlateNumber?plateNumber=${searchInput.value}`,
            {
              method: 'GET',
              mode: 'cors',
            },
          );
          const response = await data.json();

          let startDate;
          let endDate;
          let hours;
          const hourValue = 10;

          if (response.length) {
            startDate = new Date(response[0].startDate);
            const startHour = startDate.getUTCHours();
            let endHour;
            if (response[0].endDate) {
              endDate = new Date(response[0].endDate);
              endHour = endDate.getUTCHours();
            }

            if (endHour) {
              hours = endHour - startHour;
            } else {
              hours = 0;
            }
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
          <span>${hours}h</span>
        </li>
        <li class="valor">
          <p>Valor: </p>
          <span>R$ ${hourValue * hours}</span>
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
                response[0].plate.plateNumber == data.plate.plateNumber &&
                !data.available
              ) {
                parkingSpot.forEach((spot) => {
                  const id = spot.getAttribute('id');
                  spot.style.background = 'black';
                  if (id == data.plate.id) {
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
          alert(error);
        }
      }
    }
  }

  searchBtn.addEventListener('click', getCarByPlate);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') getCarByPlate;
    else return;
  });
})();

// Selecionar a seção do estacionamento
const parkingSec = document.querySelector('.parking-sec');

// Criar as vagas do estacionamento
for (let i = 0; i < 12; i++) {
  const div = document.createElement('div');
  div.classList.add('parking-spot');
  div.setAttribute('id', i + 1);
  const span = document.createElement('span');
  span.classList.add('spot-number');
  let spotNumber = `A${i + 1}`;
  span.textContent = spotNumber;
  div.append(span);
  parkingSec.append(div);
}

// Busca carro por placa
const searchBtn = document.querySelector('.search-btn');
const searchDiv = document.querySelector('.search-input');
const searchInput = document.querySelector('.search-input input');
const searchResponse = document.querySelector('.search-response');
const p = document.createElement('p');

async function getCarByPlate() {
  if (searchInput.value.split('').length < 7) {
    searchResponse.textContent = '';
    p.classList.add('validation');
    p.textContent = '* O nome da placa deve conter 7 caracteres.';
    searchDiv.appendChild(p);
  } else {
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
        console.log(response);
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
        return;
      } else {
        searchResponse.textContent = 'Placa não encontrada!';
      }
    } catch (error) {
      alert(error);
    }
  }
}

searchBtn.addEventListener('click', getCarByPlate);

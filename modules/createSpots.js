export default (function createSpots() {
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
})();

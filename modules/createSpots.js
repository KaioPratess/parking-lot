export default (function createSpots() {
  // Selecionar a seção do estacionamento
  const parkingSec = document.querySelector('.parking-sec');

  // Criar as vagas do estacionamento
  for (let i = 0; i < 6; i++) {
    const div = document.createElement('div');
    div.classList.add('parking-spot');
    div.setAttribute('id', i + 1);
    const p = document.createElement('p');
    p.classList.add('spot-number');
    let spotNumber = `A${i + 1}`;
    p.textContent = spotNumber;
    div.append(p);
    parkingSec.append(div);
  }
})();

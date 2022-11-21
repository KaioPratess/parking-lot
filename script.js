const parkingSec = document.querySelector('.parking-sec');

for (let i = 0; i < 12; i++) {
  const div = document.createElement('div');
  div.classList.add('parking-spot');
  const span = document.createElement('span');
  span.classList.add('spot-number');
  let spotNumber = `A${i + 1}`;
  span.textContent = spotNumber;
  div.append(span);
  parkingSec.append(div);
}

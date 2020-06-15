function publishInfo(info) {
  const parent = document.querySelector('.information');
  const infoMessage = document.createElement('span');
  infoMessage.classList.add('info');
  infoMessage.textContent = `${info}. `;
  parent.prepend(infoMessage);
  return this;
}

export default {
  publishInfo,
};

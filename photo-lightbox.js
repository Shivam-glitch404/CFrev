(function () {
  var dialog = document.createElement('dialog');
  dialog.className = 'photo-viewer';
  dialog.setAttribute('aria-label', 'Full-size wedding photograph');

  var closeButton = document.createElement('button');
  closeButton.className = 'photo-viewer-close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Close image');
  closeButton.textContent = '\u00d7';

  var fullImage = document.createElement('img');
  dialog.append(closeButton, fullImage);
  document.body.appendChild(dialog);

  function openPhoto(figure) {
    var thumbnail = figure.querySelector('.ph img');
    if (!thumbnail) return;

    fullImage.src = thumbnail.currentSrc || thumbnail.src;
    fullImage.alt = thumbnail.alt;
    dialog.showModal();
  }

  document.querySelectorAll('.cards:not(.films) figure').forEach(function (figure) {
    if (!figure.querySelector('.ph img')) return;
    figure.tabIndex = 0;
    figure.setAttribute('role', 'button');
    figure.setAttribute('aria-label', 'View full-size photograph');
  });

  document.addEventListener('click', function (event) {
    var figure = event.target.closest('.cards:not(.films) figure');
    if (figure) openPhoto(figure);
  });

  document.addEventListener('keydown', function (event) {
    var figure = event.target.closest && event.target.closest('.cards:not(.films) figure');
    if (figure && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      openPhoto(figure);
    }
  });

  closeButton.addEventListener('click', function () {
    dialog.close();
  });

  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) dialog.close();
  });
})();

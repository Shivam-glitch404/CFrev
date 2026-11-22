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
    var thumbnail = figure.querySelector('img');
    if (!thumbnail) return;

    fullImage.src = thumbnail.currentSrc || thumbnail.src;
    fullImage.alt = thumbnail.alt;
    dialog.showModal();
  }

  document.querySelectorAll('figure, .pf-strip .strip-item').forEach(function (figure) {
    if (!figure.querySelector('img')) return;
    figure.tabIndex = 0;
    figure.setAttribute('role', 'button');
    figure.setAttribute('aria-label', 'View full-size photograph');
  });

  document.addEventListener('click', function (event) {
    var figure = event.target.closest('figure, .pf-strip .strip-item');
    if (figure) {
      if (figure.matches('.pf-strip .strip-item')) {
        event.preventDefault();
      }
      openPhoto(figure);
    }
  });

  document.addEventListener('keydown', function (event) {
    var figure = event.target.closest && event.target.closest('figure, .pf-strip .strip-item');
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

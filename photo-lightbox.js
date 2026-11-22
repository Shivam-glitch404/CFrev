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
      if (figure.matches('.films .pf-strip .strip-item')) {
        var img = figure.querySelector('img');
        if (img) {
          var filename = img.src.split('/').pop();
          window.location.href = 'blogs.html?img=' + encodeURIComponent(filename);
          return;
        }
      }
      if (figure.matches('.pf-strip .strip-item') && !window.location.pathname.endsWith('films.html')) {
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

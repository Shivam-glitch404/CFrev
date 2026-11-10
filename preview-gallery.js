(function () {
  var photos = [
    'A 03.webp', 'A 12.webp', 'A 18.webp', 'A 22.webp', 'A.webp', 'AKL04.webp',
    'AM05.webp', 'am10.webp', 'AM11.webp', 'ARN 02.webp', 'ARN 06.webp', 'ash 003.webp',
    'BAR 01.webp', 'BAR 03.webp', 'BAR 06.webp'
  ];

  function makeImage(file, alt) {
    var image = document.createElement('img');
    image.src = 'media/portfolio/' + encodeURIComponent(file);
    image.alt = alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    return image;
  }

  var gallery = document.querySelector('#v-blogs .cards');
  if (gallery) {
    gallery.replaceChildren();
    photos.forEach(function (file) {
      var figure = document.createElement('figure');
      var media = document.createElement('div');
      media.className = 'ph';
      media.appendChild(makeImage(file, 'Wedding photograph from Cherish Forever'));
      figure.appendChild(media);
      gallery.appendChild(figure);
    });
  }

  document.querySelectorAll('.form .ph').forEach(function (media) {
    media.replaceChildren(makeImage('SHRE09.webp', 'Wedding portrait photographed by Cherish Forever'));
  });
})();
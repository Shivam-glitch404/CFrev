(function () {
  var photos = [
    'A 03.jpg', 'A 12.jpg', 'A 18.jpg', 'A 22.jpg', 'A.jpg', 'AKL04.jpg',
    'AM05.jpg', 'am10.jpg', 'AM11.jpg', 'ARN 02.jpg', 'ARN 06.jpg', 'ash 003.jpg',
    'BAR 01.jpg', 'BAR 03.jpg', 'BAR 06.jpg'
  ];

  function makeImage(file, alt) {
    var image = document.createElement('img');
    image.src = 'media/photos/' + encodeURIComponent(file);
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
    media.replaceChildren(makeImage('SHRE09.jpg', 'Wedding portrait photographed by Cherish Forever'));
  });
})();
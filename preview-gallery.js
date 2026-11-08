(function () {
  var photos = [
    'A 03.jpg', 'A 12.jpg', 'A 18.jpg', 'A 22.jpg', 'A.jpg', 'AKL04.jpg',
    'AM05.jpg', 'am10.jpg', 'AM11.jpg', 'ARN 02.jpg', 'ARN 06.jpg', 'ash 003.jpg',
    'BAR 01.jpg', 'BAR 03.jpg', 'BAR 06.jpg', 'BAR 08.jpg', 'BAR 10.jpg',
    'DSC05344.jpg', 'DSC08061.jpg', 'DSC09872.jpg', 'DSC09947.jpg', 'DSC_7678-2.jpg',
    'DSC_7693-2.jpg', 'DSC_7699.jpg', 'LUC003.jpg', 'luc08.jpg', 'NITIN05.jpg',
    'san 04.jpg', 'SHAB 005.jpg', 'SHRE09.jpg', 'SUB03282.jpg', 'suc 04.jpg',
    'suc 09.jpg', 'sw 02.jpg', 'sw 04.jpg', 'sw 06.jpg', 'sw 07.jpg', 'SWAY03.jpg',
    'sway04.jpg', 'WhatsApp Image 2026-10-31 at 2.53.40 PM.jpeg',
    'WhatsApp Image 2026-10-31 at 2.56.22 PM.jpeg',
    'WhatsApp Image 2026-11-05 at 10.38.10 PM (1).jpeg',
    'WhatsApp Image 2026-11-05 at 9.26.23 PM.jpeg',
    'WhatsApp Image 2026-11-05 at 9.27.55 PM.jpeg',
    'WhatsApp Image 2026-11-06 at 10.56.27 AM.jpeg',
    'WhatsApp Image 2026-11-06 at 12.34.36 PM.jpeg',
    'WhatsApp Image 2026-11-06 at 12.49.13 PM.jpeg',
    'WhatsApp Image 2026-11-06 at 12.55.40 PM.jpeg',
    'WhatsApp Image 2026-11-06 at 2.23.36 PM (1).jpeg',
    'WhatsApp Image 2026-11-06 at 2.23.36 PM.jpeg',
    'WhatsApp Image 2026-11-06 at 2.40.01 PM (1).jpeg', 'ZEE 09.jpg', 'ZEE 13.jpg'
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
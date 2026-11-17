(function () {
  var photos = [
    'A.webp', 'AKL04.webp', 'AM11.webp', 'ARN 02.webp', 'ash 003.webp', 'BAR 01.webp',
    'DSC_7699.webp', 'SHRE09.webp', 'sway04.webp'
  ];
  var videos = [
    { file: 'Wed.mp4', label: 'Wedding film' },
    { file: 'Sanamitra Wed T .mp4', label: 'Sanamitra wedding film' },
    { file: 'Ambrita x Rahul Wed -farooq bhai.mp4', label: 'Ambrita and Rahul wedding film' },
    { file: '1.mp4', label: 'Wedding film 1' },
    { file: '2.mp4', label: 'Wedding film 2' }
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
    gallery.classList.add('portfolio-columns');
    function makeColumn(className) {
      var column = document.createElement('div');
      column.className = 'portfolio-column ' + className;
      return column;
    }

    function addPhotos(target, files) {
      files.forEach(function (file) {
        var figure = document.createElement('figure');
        figure.className = 'portfolio-photo';
        var media = document.createElement('div');
        media.className = 'ph';
        media.appendChild(makeImage(file, 'Wedding photograph from Cherish Forever'));
        figure.appendChild(media);
        target.appendChild(figure);
      });
    }

    var leftColumn = makeColumn('portfolio-left');
    var videoColumn = makeColumn('portfolio-center');
    var rightColumn = makeColumn('portfolio-right');
    videoColumn.setAttribute('aria-label', 'Local wedding films');
    gallery.append(leftColumn, videoColumn, rightColumn);
    addPhotos(leftColumn, photos.slice(0, 5));

    videos.forEach(function (item) {
      var figure = document.createElement('figure');
      figure.className = 'portfolio-video';
      var video = document.createElement('video');
      var source = document.createElement('source');
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', item.label);
      source.src = 'media/video/Cherish Forever Insta/' + encodeURIComponent(item.file);
      source.type = 'video/mp4';
      video.appendChild(source);
      figure.appendChild(video);
      videoColumn.appendChild(figure);
    });
    addPhotos(rightColumn, photos.slice(5));
  }

  document.querySelectorAll('.form .ph').forEach(function (media) {
    media.replaceChildren(makeImage('SHRE09.webp', 'Wedding portrait photographed by Cherish Forever'));
  });
})();
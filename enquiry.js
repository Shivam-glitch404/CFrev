/* Cherish Forever: send the enquiry form to WhatsApp.
   Put the business owner's WhatsApp number below: country code + number, digits only (India example: 919876543210). */
var WHATSAPP_NUMBER = '917008568764';

(function () {
  var valid = /^\d{10,15}$/.test(WHATSAPP_NUMBER);
  var base = valid ? 'https://wa.me/' + WHATSAPP_NUMBER : 'https://wa.me/';

  // the floating WhatsApp button uses the same number
  document.querySelectorAll('.wa').forEach(function (a) { a.href = base; });

  function niceDate(v) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || '');
    if (!m) return v;
    var mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m[2] - 1];
    return +m[3] + ' ' + mo + ' ' + m[1];
  }

  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var rows = [
        ['Couple', d.get('couple')], ['Phone', d.get('phone')], ['Email', d.get('email')],
        ['Wedding date', niceDate(d.get('date'))], ['Location', d.get('location')],
        ['Events', d.get('events')], ['Package', d.get('package')], ['Guests', d.get('guests')],
        ['Heard about us from', d.get('source')]
      ];
      var text = 'New wedding enquiry (Cherish Forever website)\n\n' + rows
        .filter(function (r) { return r[1] && String(r[1]).trim(); })
        .map(function (r) { return r[0] + ': ' + String(r[1]).trim(); }).join('\n');
      var url = base + '?text=' + encodeURIComponent(text);
      var note = form.querySelector('.sent');
      if (!note) { note = document.createElement('p'); note.className = 'sent'; note.setAttribute('role', 'status'); form.appendChild(note); }
      note.replaceChildren();

      var w = window.open('', '_blank');
      if (w) {
        w.opener = null;
        w.location.href = url;
        note.textContent = 'WhatsApp opened in a new tab. Please press Send there to finish.';
      } else {
        note.appendChild(document.createTextNode('Your message is ready. '));
        var link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = 'Open WhatsApp to send your enquiry.';
        note.appendChild(link);
      }
    });
  });
})();

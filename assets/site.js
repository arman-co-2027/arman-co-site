(function () {
  var d = document;

  // Mobile menu
  var btn = d.querySelector('.menu-btn');
  var nav = d.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Project filter
  var chips = d.querySelectorAll('[data-filter]');
  var cards = d.querySelectorAll('[data-cat]');
  var count = d.getElementById('proj-count');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      var shown = 0;
      cards.forEach(function (card) {
        var on = f === 'all' || card.getAttribute('data-cat') === f;
        card.hidden = !on;
        if (on) shown++;
      });
      if (count) {
        count.textContent = count.getAttribute('data-template').replace('{n}', shown).replace('{t}', cards.length);
      }
    });
  });

  // Copy buttons
  function selectText(el) {
    try {
      var r = d.createRange(); r.selectNodeContents(el);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    } catch (e) {}
  }
  d.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      var target = b.getAttribute('data-target') ? d.getElementById(b.getAttribute('data-target')) : null;
      if (target && !text) text = target.value;
      var label = b.textContent;
      var done = function () {
        b.textContent = b.getAttribute('data-done') || 'Copied';
        setTimeout(function () { b.textContent = label; }, 1800);
      };
      var fallback = function () {
        if (target && target.select) { target.focus(); target.select(); }
        else if (b.previousElementSibling) selectText(b.previousElementSibling);
      };
      try {
        navigator.clipboard.writeText(text).then(done, fallback);
      } catch (e) { fallback(); }
    });
  });

  // Contact form: compose an email, no server needed
  var form = d.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var name = d.getElementById('f-name').value.trim();
      var from = d.getElementById('f-email').value.trim();
      var topicSel = d.getElementById('f-topic');
      var topic = topicSel.options[topicSel.selectedIndex];
      var msg = d.getElementById('f-msg').value.trim();
      var route = topic.getAttribute('data-to');
      var a = form.getAttribute('data-armando'), n = form.getAttribute('data-nida');
      var to = route === 'nida' ? n : a;
      var cc = route === 'both' ? n : (route === 'armando' ? n : '');
      var subject = '[Website] ' + topic.textContent.trim() + ' - ' + name;
      var body = msg + '\n\n--\n' + name + '\n' + from;
      var out = d.getElementById('f-out');
      out.value = 'To: ' + to + (cc ? '\nCc: ' + cc : '') + '\nSubject: ' + subject + '\n\n' + body;
      var link = d.getElementById('mail-link');
      var href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body) + (cc ? '&cc=' + encodeURIComponent(cc) : '');
      link.setAttribute('href', href);
      d.getElementById('f-result').hidden = false;
      d.getElementById('f-result').scrollIntoView({ block: 'nearest' });
      window.location.href = href;
    });
  }
})();

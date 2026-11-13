// Mobile menu toggle
(function () {
  var btn = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Close' : 'Menu';
  });
})();

// Section numbers in headings become badges: "1.1 Background" -> [1.1] Background
(function () {
  document.querySelectorAll('.cards h2, .cards h3').forEach(function (h) {
    var text = h.textContent;
    var m = text.match(/^\s*(\d+(?:\.\d+)+)\s+/) || text.match(/^\s*Appendix ([A-Z]):\s*/);
    if (!m) return;
    var first = h.firstChild;
    if (!first || first.nodeType !== 3) return;
    first.nodeValue = first.nodeValue.replace(m[0], '');
    var badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = m[1];
    h.insertBefore(badge, h.firstChild);
    h.classList.add('has-badge');
  });
})();

// Citations like [8] or [26, 27] become superscript links to the reference list
(function () {
  if (document.body.classList.contains('page-references')) return;
  var css = document.querySelector('link[href*="assets/css/style.css"]');
  var base = css ? css.getAttribute('href').replace('assets/css/style.css', '') : '/';
  var root = document.querySelector('.cards');
  if (!root) return;
  // Expand ranges: [21]-[24] or [21-24] become [21][22][23][24]
  function expandRanges(text) {
    function list(a, b) {
      a = parseInt(a, 10); b = parseInt(b, 10);
      if (b < a || b - a > 30) return null;
      var out = '';
      for (var i = a; i <= b; i++) out += '[' + i + ']';
      return out;
    }
    return text
      .replace(/\[(\d+)\]\s*[-\u2013\u2014]\s*\[(\d+)\]/g, function (m, a, b) { return list(a, b) || m; })
      .replace(/\[(\d+)\s*[-\u2013\u2014]\s*(\d+)\]/g, function (m, a, b) { return list(a, b) || m; });
  }
  var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  var nodes = [];
  while (walker.nextNode()) {
    var n = walker.currentNode;
    if (n.parentNode.closest('a, code, .MathJax, mjx-container')) continue;
    var expanded = expandRanges(n.nodeValue);
    if (expanded !== n.nodeValue) n.nodeValue = expanded;
    if (/\[\d+(?:\s*,\s*\d+)*\]/.test(n.nodeValue)) nodes.push(n);
  }
  nodes.forEach(function (n) {
    var frag = document.createDocumentFragment();
    var parts = n.nodeValue.split(/(\[\d+(?:\s*,\s*\d+)*\])/);
    parts.forEach(function (p, idx) {
      var m = p.match(/^\[(\d+(?:\s*,\s*\d+)*)\]$/);
      if (!m) {
        // drop the space before a citation so it sits against the word
        if (idx + 1 < parts.length && /^\[\d/.test(parts[idx + 1])) p = p.replace(/\s+$/, '');
        frag.appendChild(document.createTextNode(p));
        return;
      }
      var sup = document.createElement('sup');
      sup.className = 'cite';
      m[1].split(/\s*,\s*/).forEach(function (num, i) {
        if (i) sup.appendChild(document.createTextNode(','));
        var a = document.createElement('a');
        a.href = base + 'references.html#ref-' + num;
        a.textContent = num;
        a.setAttribute('aria-label', 'Reference ' + num);
        sup.appendChild(a);
      });
      frag.appendChild(sup);
    });
    n.parentNode.replaceChild(frag, n);
  });
})();

// Reference list: give each entry an id (ref-1, ref-2, ...) and jump to it
(function () {
  if (!document.body.classList.contains('page-references')) return;
  var list = document.querySelector('.cards ol');
  if (!list) return;
  list.querySelectorAll(':scope > li').forEach(function (li, i) { li.id = 'ref-' + (i + 1); });
  if (location.hash) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) { target.scrollIntoView(); target.classList.add('is-target'); }
  }
})();

(function () {
  "use strict";
  var key = "mozaiq-sis-lang";
  function get() { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(key, v); } catch (e) {} }
  function apply(l) {
    document.documentElement.setAttribute("data-lang", l);
    document.documentElement.lang = l;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.set === l));
    });
  }
  var start = get() || ((navigator.language || "").toLowerCase().indexOf("id") === 0 ? "id" : "en");
  apply(start);
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest(".lang button");
    if (b) { set(b.dataset.set); apply(b.dataset.set); return; }
    var x = ev.target.closest("[data-expand]");
    if (x) {
      var all = document.querySelectorAll("details.ses");
      var open = Array.prototype.some.call(all, function (d) { return !d.open; });
      all.forEach(function (d) { d.open = open; });
    }
  });
})();

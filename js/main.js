/* Just My Fit — interactions: mobile nav, scroll reveal, FAQ accordion, year */
(function () {
  "use strict";

  /* ----- Mobile navigation ----- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----- Scroll reveal ----- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ----- FAQ accordion ----- */
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var ans = item.querySelector(".faq-a");
      var isOpen = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      ans.style.maxHeight = isOpen ? ans.scrollHeight + "px" : null;
    });
  });

  /* ----- Footer year ----- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ----- Gallery filters ----- */
  var allItems = Array.prototype.slice.call(document.querySelectorAll(".g-item"));
  var filterBtns = Array.prototype.slice.call(document.querySelectorAll(".filter-btn"));
  var emptyMsg = document.querySelector(".gallery-empty");
  if (filterBtns.length && allItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter");
        filterBtns.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        var shown = 0;
        allItems.forEach(function (el) {
          var cats = (el.getAttribute("data-cat") || "").split(/\s+/);
          var match = f === "all" || cats.indexOf(f) !== -1;
          el.classList.toggle("is-hidden", !match);
          if (match) shown++;
        });
        if (emptyMsg) emptyMsg.hidden = shown !== 0;
      });
    });
  }

  /* ----- Gallery lightbox ----- */
  var lb = document.getElementById("lightbox");
  if (allItems.length && lb) {
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector(".lb-cap");
    var active = [];   // currently-visible items being browsed
    var current = 0;

    function visible() {
      return allItems.filter(function (el) { return !el.classList.contains("is-hidden"); });
    }
    function render() {
      var el = active[current];
      if (!el) return;
      var full = el.getAttribute("data-full") || el.querySelector("img").getAttribute("src");
      var title = el.getAttribute("data-title") || "";
      var sub = el.getAttribute("data-sub") || "";
      lbImg.setAttribute("src", full);
      lbImg.setAttribute("alt", title);
      lbCap.innerHTML = title ? "<b>" + title + "</b>" + (sub ? " — " + sub : "") : "";
    }
    function step(d) {
      if (!active.length) return;
      current = (current + d + active.length) % active.length;
      render();
    }
    function open(el) {
      active = visible();
      current = Math.max(0, active.indexOf(el));
      render();
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    allItems.forEach(function (el) {
      el.addEventListener("click", function (e) { e.preventDefault(); open(el); });
    });
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-next").addEventListener("click", function () { step(1); });
    lb.querySelector(".lb-prev").addEventListener("click", function () { step(-1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    });
  }
})();

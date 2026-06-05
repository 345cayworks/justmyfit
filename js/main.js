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

  /* ----- Gallery lightbox ----- */
  var items = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  var lb = document.getElementById("lightbox");
  if (items.length && lb) {
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector(".lb-cap");
    var current = 0;

    function show(i) {
      current = (i + items.length) % items.length;
      var el = items[current];
      var full = el.getAttribute("data-full") || el.querySelector("img").getAttribute("src");
      var title = el.getAttribute("data-title") || "";
      var sub = el.getAttribute("data-sub") || "";
      lbImg.setAttribute("src", full);
      lbImg.setAttribute("alt", title);
      lbCap.innerHTML = title ? "<b>" + title + "</b>" + (sub ? " — " + sub : "") : "";
    }
    function open(i) {
      show(i);
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    items.forEach(function (el, i) {
      el.addEventListener("click", function (e) { e.preventDefault(); open(i); });
    });
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
    lb.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(current + 1);
      else if (e.key === "ArrowLeft") show(current - 1);
    });
  }
})();

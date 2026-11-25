// The appearance choice, applied before the first paint: the wasm that owns
// the control lands much later, and a stored choice must not flash the other
// way first. Each shell loads this as a classic script in its <head> — not
// async, not deferred, not a module — so it runs before the body is painted.
// It is a file rather than inline because relayd serves the pages under a
// Content-Security-Policy that refuses inline scripts. tests/shells.rs pins
// the key and the values to the constants the rest of the code uses. Storage
// can throw (a browser set to block site data), and the page is fine without
// it.
try {
  var choice = localStorage.getItem("theme");
  if (choice === "light" || choice === "dark") {
    document.documentElement.setAttribute("data-theme", choice);
  }
} catch (e) {}

// The control, on a site without the wasm (the blog, the pricing demo): the
// pasted theme-switch.html, found by data-theme-switch, which the Leptos
// ThemeSwitch never renders, so on the product's own pages this finds
// nothing and the wasm's control is left alone. A press does what the
// component's `choose` does: store light or dark, or for Auto remove the
// key and the attribute so the system decides; no reload, since the
// stylesheet repaints from the attribute alone.
(function () {
  function stored() {
    try {
      var value = localStorage.getItem("theme");
      return value === "light" || value === "dark" ? value : "auto";
    } catch (e) {
      return "auto";
    }
  }

  function mark(groups, state) {
    for (var g = 0; g < groups.length; g++) {
      var buttons = groups[g].querySelectorAll("button[value]");
      for (var b = 0; b < buttons.length; b++) {
        var pressed = buttons[b].value === state;
        buttons[b].setAttribute("aria-pressed", pressed ? "true" : "false");
      }
    }
  }

  function choose(groups, value) {
    var state = value === "light" || value === "dark" ? value : "auto";
    try {
      if (state === "auto") {
        localStorage.removeItem("theme");
      } else {
        localStorage.setItem("theme", state);
      }
    } catch (e) {}
    if (state === "auto") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", state);
    }
    mark(groups, state);
  }

  function wire() {
    var groups = document.querySelectorAll("[data-theme-switch]");
    if (groups.length === 0) {
      return;
    }
    mark(groups, stored());
    for (var g = 0; g < groups.length; g++) {
      groups[g].addEventListener("click", function (event) {
        var button = event.target.closest("button[value]");
        if (button) {
          choose(groups, button.value);
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wire);
  } else {
    wire();
  }
})();

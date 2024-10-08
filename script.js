document.addEventListener("DOMContentLoaded", function () {
  // Accordion functionality
  const accordionTriggers = document.querySelectorAll(".accordion-trigger");

  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      const content = document.getElementById(
        this.getAttribute("aria-controls")
      );

      if (content) {
        if (isExpanded) {
          this.setAttribute("aria-expanded", "false");
          content.classList.remove("open");
          content.style.maxHeight = null;
          content.setAttribute("aria-hidden", "true");
        } else {
          // Close all other accordions
          accordionTriggers.forEach((btn) => {
            btn.setAttribute("aria-expanded", "false");
            const panel = document.getElementById(
              btn.getAttribute("aria-controls")
            );
            if (panel) {
              panel.classList.remove("open");
              panel.style.maxHeight = null;
              panel.setAttribute("aria-hidden", "true");
            }
          });

          // Open the clicked accordion
          this.setAttribute("aria-expanded", "true");
          content.classList.add("open");
          content.style.maxHeight = content.scrollHeight + "px";
          content.setAttribute("aria-hidden", "false");
        }
      }
    });

    trigger.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.click();
      }
    });
  });

  // Existing dropdown menu functionality
  const dropdownButtons = document.querySelectorAll(
    ".navigation-toggle-dropdown"
  );

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      toggleSubMenu(button);
      event.stopPropagation();
    });

    button.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        toggleSubMenu(button);
        event.preventDefault();
      }
    });
  });

  // Close submenus when clicking outside
  document.addEventListener("click", function () {
    closeAllSubMenus();
  });

  function toggleSubMenu(button) {
    const submenu = button.nextElementSibling;
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    closeAllSubMenus(); // Close other submenus

    if (!isExpanded) {
      openSubMenu(button, submenu);
    }
  }

  function openSubMenu(button, submenu) {
    submenu.classList.add("show");
    button.classList.add("chevron-up");
    button.setAttribute("aria-expanded", "true");
  }

  function closeSubMenu(button, submenu) {
    submenu.classList.remove("show");
    button.classList.remove("chevron-up");
    button.setAttribute("aria-expanded", "false");
  }

  function closeAllSubMenus() {
    dropdownButtons.forEach((button) => {
      const submenu = button.nextElementSibling;
      closeSubMenu(button, submenu);
    });
  }

  // Toggle the drawer menu open and close
  document.querySelector(".menu-button").addEventListener("click", function () {
    document.body.classList.toggle("drawer-open");
    const icon = document.querySelector(
      ".menu-button .material-symbols-rounded"
    );
    const drawerMenu = document.querySelector(".drawer-menu");
    const drawerLinks = document.querySelectorAll(".drawer-link");

    // Check if the drawer menu is open
    if (document.body.classList.contains("drawer-open")) {
      icon.textContent = "close";
      drawerMenu.setAttribute("aria-hidden", "false");
      drawerLinks.forEach((link) => link.setAttribute("tabindex", "0"));
    } else {
      icon.textContent = "menu";
      drawerMenu.setAttribute("aria-hidden", "true");
      drawerLinks.forEach((link) => link.setAttribute("tabindex", "-1"));
    }
  });

  // Make the menu button accessible via keyboard
  document
    .querySelector(".menu-button")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.click();
      }
    });
});

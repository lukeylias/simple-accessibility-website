document.addEventListener("DOMContentLoaded", function () {
  // Attach event listeners to all dropdown buttons
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
});

// Toggle the drawer menu open and close
document.querySelector(".menu-button").addEventListener("click", function () {
  document.body.classList.toggle("drawer-open");
  const icon = document.querySelector(".menu-button .material-symbols-rounded");
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

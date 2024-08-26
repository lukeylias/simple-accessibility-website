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

// Submenu functionality (if needed)
function toggleSubMenu(event) {
  const submenu = document.querySelector(".submenu");
  const dropdownButton = document.querySelector(".navigation-toggle-dropdown");
  submenu.classList.toggle("show");
  dropdownButton.classList.toggle("chevron-up");

  const isExpanded = dropdownButton.getAttribute("aria-expanded") === "true";
  dropdownButton.setAttribute("aria-expanded", !isExpanded);

  if (submenu.classList.contains("show")) {
    document.addEventListener("click", closeSubMenuOnClickOutside);
  } else {
    document.removeEventListener("click", closeSubMenuOnClickOutside);
  }

  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
}

// Close the submenu when clicking outside of it
function closeSubMenuOnClickOutside(event) {
  const submenu = document.querySelector(".submenu");
  const dropdownButton = document.querySelector(".navigation-toggle-dropdown");

  if (
    !dropdownButton.contains(event.target) &&
    !submenu.contains(event.target)
  ) {
    submenu.classList.remove("show");
    dropdownButton.classList.remove("chevron-up");
    dropdownButton.setAttribute("aria-expanded", "false");
    document.removeEventListener("click", closeSubMenuOnClickOutside);
  }
}

// Handle keyboard interaction for the dropdown menu
function handleDropdownKeydown(event) {
  const dropdownButton = event.target;

  if (event.key === "Enter" || event.key === " ") {
    toggleSubMenu(event);
  }

  if (event.key === "Escape") {
    const submenu = document.querySelector(".submenu");

    submenu.classList.remove("show");
    dropdownButton.classList.remove("chevron-up");
    dropdownButton.setAttribute("aria-expanded", "false");
    document.removeEventListener("click", closeSubMenuOnClickOutside);
  }
}

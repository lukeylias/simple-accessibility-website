document.querySelector(".menu-button").addEventListener("click", function () {
  // Toggle the drawer-open class
  document.body.classList.toggle("drawer-open");

  // Get the span inside the menu button
  const icon = document.querySelector(".menu-button .material-symbols-rounded");

  // Toggle the icon between 'menu' and 'close'
  if (document.body.classList.contains("drawer-open")) {
    icon.textContent = "close";
  } else {
    icon.textContent = "menu";
  }
});

function toggleSubMenu() {
  const submenu = document.querySelector(".submenu");
  const dropdown = document.querySelector(".navigation-toggle-dropdown");

  submenu.classList.toggle("show");
  dropdown.classList.toggle("chevron-up");
}

function toggleDarkMode() {
  let element = document.body;
  const button = document.getElementById("darkModeButton");
  if (button.textContent === "Dark Mode") {
    button.textContent = "Light Mode";
  } else {
    button.textContent = "Dark Mode";
  }
  element.classList.toggle("dark-mode");
}

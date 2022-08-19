const addBookBtn = document.querySelector(".add-button");
const closeModalBtn = document.querySelector(".close-button");
const modal = document.querySelector("#modal");
const overlay = document.querySelector("#overlay");

addBookBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

function openModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

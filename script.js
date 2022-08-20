const addBookBtn = document.querySelector(".add-button");
const mainContainer = document.querySelector("main");
const form = document.querySelector(".add-book-form");
const submitButton = document.querySelector(".submit-button");

const closeModalBtn = document.querySelector(".close-button");
const modal = document.querySelector("#modal");
const overlay = document.querySelector("#overlay");

addBookBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  form.reset();
  closeModal();
});

function Book(title, author, page, score, state) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.score = score;
  this.state = state;
}

// Create book object from the given form data
function createBook(formData) {
  const title = formData.get("title");
  const author = formData.get("author");
  const page = formData.get("page");
  const score = formData.get("score");
  const state = formData.get("state");

  return new Book(title, author, page, score, state);
}

//Create new book object and display
function addBookToLibrary() {
  const formData = new FormData(form);
  const newBook = createBook(formData);
  display(newBook);
}

function display(newBook) {
  const stateBtnContent = newBook.state ? "Read" : "Not Read";
  const isRead = newBook.state ? "read" : "not-read";
  const pageContent = newBook.page + " pages";
  const scoreContent = newBook.score + "/10";
  const titleContent = capitalize(newBook.title);
  const authorContent = capitalize(newBook.author);

  const bookContainer = createDomElement("div", "", "book-container");
  const title = createDomElement("span", titleContent, "title");
  const author = createDomElement("span", authorContent, "author");
  const page = createDomElement("span", pageContent, "page");
  const score = createDomElement("span", scoreContent, "score");
  const stateBtn = createDomElement(
    "button",
    stateBtnContent,
    "change-state-button",
    isRead
  );
  const removeBtn = createDomElement("button", "Remove", "remove-button");

  stateBtn.addEventListener("click", changeState);
  removeBtn.addEventListener("click", removeBook);

  bookContainer.appendChild(title);
  bookContainer.appendChild(author);
  bookContainer.appendChild(page);
  bookContainer.appendChild(score);
  bookContainer.appendChild(stateBtn);
  bookContainer.appendChild(removeBtn);

  mainContainer.appendChild(bookContainer);
}

// UTILITY FUNCTIONS

//Create a DOM element with given type, content and classes
function createDomElement(type, content, ...classes) {
  const element = document.createElement(type);
  element.textContent = content;

  for (let elClass of classes) {
    element.classList.add(elClass);
  }

  return element;
}

function changeState(e) {
  if (e.target.classList.contains("read")) {
    e.target.classList.add("not-read");
    e.target.classList.remove("read");
  } else {
    e.target.classList.add("read");
    e.target.classList.remove("not-read");
  }
}

function removeBook(e) {
  const btn = e.target;
  const bookContainer = btn.parentElement;
  mainContainer.removeChild(bookContainer);
}

function openModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function capitalize(str) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

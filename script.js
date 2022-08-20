const addBookBtn = document.querySelector(".add-button");
const mainContainer = document.querySelector("main");
const form = document.querySelector(".add-book-form");
const submitButton = document.querySelector(".submit-button");

const closeModalBtn = document.querySelector(".close-button");
const modal = document.querySelector("#modal");
const overlay = document.querySelector("#overlay");

let myLibrary = [];

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
  myLibrary.push(newBook);
  display(newBook);
}

function display(newBook) {
  const stateBtnContent = newBook.state ? "Read" : "Not Read";
  const pageContent = newBook.page + " pages";
  const scoreContent = newBook.score + "/10";

  const bookContainer = createDomElement("div", "", "book-container");
  const title = createDomElement("span", newBook.title, "title");
  const author = createDomElement("span", newBook.author, "author");
  const page = createDomElement("span", pageContent, "page");
  const score = createDomElement("span", scoreContent, "score");
  const stateBtn = createDomElement(
    "button",
    stateBtnContent,
    "change-state-button"
  );
  const removeBtn = createDomElement("button", "Remove", "remove-button");

  bookContainer.appendChild(title);
  bookContainer.appendChild(author);
  bookContainer.appendChild(page);
  bookContainer.appendChild(score);
  bookContainer.appendChild(stateBtn);
  bookContainer.appendChild(removeBtn);

  mainContainer.appendChild(bookContainer);
}

//Create a DOM element with given type, content and classes
function createDomElement(type, content, ...classes) {
  const element = document.createElement(type);
  element.textContent = content;

  for (let elClass of classes) {
    element.classList.add(elClass);
  }

  return element;
}

function openModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

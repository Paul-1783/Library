const libElement = document.querySelector(".library");
let myLibrary = [];
let count = 0;

function Book(title, author, year_of_publication, number_of_pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.year_of_publication = year_of_publication;
  this.number_of_pages = number_of_pages;
  this.read = read;
}

function haveRead(book) {
  book.read = !book.read;
  return book.read;
}

function addBookToLibrary(library, book) {
  // do stuff here
  myLibrary.push(book);
}

function buildCard(elem) {
  const card = document.createElement("div");
  card.classList.add("card");
  const status = elem.read ? "yes" : "no";
  count++;
  card.insertAdjacentHTML(
    "beforeend",
    `<span class="index">${count}</span
    ><h1 class="title"> ${elem.title}</h1>
     <div class="author">Name of Author: <div class="spacer"></div>${elem.author}</div>
     <div class="date_of_pub">Year of publication: <div class="spacer"></div>${elem.year_of_publication}</div>
     <div class="number_of_pages">Pages: <div class="spacer"></div><span >${elem.number_of_pages}</span></div>
     <div>Already read: <div class="spacer"></div><span class="reading_status">${status}</span></div>
     <div class="buttons">
       <button class="remove">Remove</button>
       <button class="read">Read</button>
     </div>
     `
  );

  let readButton = card.querySelector(".read");
  let removeButton = card.querySelector(".remove");

  readButton.addEventListener("click", () => {
    let index = card.querySelector(".index").textContent;
    const readingStatus = card.querySelector(".reading_status");
    readingStatus.textContent = haveRead(myLibrary[index - 1]) ? "yes" : "no";
  });

  removeButton.addEventListener("click", () => {
    let index = card.querySelector(".index").textContent;
    console.log("index: ", index);
    myLibrary.splice(index - 1, 1);
    card.remove();
    let indices = libElement.querySelectorAll(".index");
    let count2 = 0;
    indices.forEach((index) => {
      index.textContent = ++count2;
    });
  });
  libElement.appendChild(card);
}

addBookToLibrary(myLibrary, new Book("thomas", "peter", 1983, 874, true));
addBookToLibrary(myLibrary, new Book("ghanda", "laslowz", 1983, 130, false));
addBookToLibrary(myLibrary, new Book("hart", "kid", 18733, 453, true));
addBookToLibrary(myLibrary, new Book("king", "klong", 7525, 123, false));
addBookToLibrary(myLibrary, new Book("bing", "dong", 641, 887, false));
addBookToLibrary(myLibrary, new Book("schwip", "scbwap", 874, 232, false));
addBookToLibrary(myLibrary, new Book("klip", "klar", 111, 413, false));

myLibrary.forEach((elem) => {
  buildCard(elem);
});

const newbookButton = document.querySelector(".new_book");
const cancelButton = document.getElementById("cancel");
const submitButton = document.getElementById("submit");
const dialogForm = document.getElementById("dialogForm");

const dialog = document.getElementById("newBookDialog");
dialog.returnValue = "newBook";

newbookButton.addEventListener("click", () => {
  dialog.showModal();
});

cancelButton.addEventListener("click", () => {
  dialog.close("noNewBook");
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const new_book_title = document.querySelector(".new_book_title").value;
  const new_book_author = document.querySelector(".new_book_author").value;
  const new_book_year = document.querySelector(".new_book_year").value;
  const new_book_pages = document.querySelector(".new_book_pages").value;
  const new_book_read = document.querySelector(".new_book_read").value;

  const newEntry = new Book(
    new_book_title,
    new_book_author,
    new_book_year,
    new_book_pages,
    new_book_read
  );
  myLibrary.push(newEntry);
  buildCard(newEntry);
  dialogForm.reset();
  dialog.close();
});

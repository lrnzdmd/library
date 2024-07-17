// Create the library array
const myLibrary = [];

// Variables for all the elements needed 
const addDialog = document.getElementById("addbookdialog");
const removeDialog = document.querySelector(".removedialog");
const addButton = document.getElementById("addbookbutton");
const dialogCloseBtn = document.querySelectorAll(".cancelbutton");
const removeConfirmBtn = document.getElementById("confirmbutton");
const bookForm = document.getElementById("bookform");
const cardGrid = document.getElementById("cardgrid");
const cardTemplate = document.getElementById("cardtemplate");

// Listener on the add book button, all the dialog close and on the remove confirmation button inside the modal 
addButton.addEventListener("click", () => addDialog.showModal());
dialogCloseBtn.forEach(btn => btn.addEventListener("click", closeDialog));
bookForm.addEventListener("submit", readForm);
removeConfirmBtn.addEventListener("click", removeBook);


function addBookToLibrary(library, book) {
    library.push(book);
}

// Called to refresh the DOM with the books in the library.
function refreshCards(library) {

    cleanLibraryEvents();
    cardGrid.innerHTML = "";

    library.forEach((book, index) => {
        const newCard = createCard(book, index);
        cardGrid.appendChild(newCard);         
    });
}

function createCard(book, index) {

    const newCard = cardTemplate.content.cloneNode(true);
    newCard.querySelector(".title").textContent = book.title
    newCard.querySelector(".author").textContent = book.author;
    newCard.querySelector(".pages").textContent = book.pages;
    newCard.querySelector(".readbutton").textContent = book.read ? "Read: Yes" : "Read: No";
    newCard.querySelector(".bookcard").setAttribute("id", `${index}`);
    newCard.querySelector(".readbutton").addEventListener("click", toggleRead);
    addRemoveButtonEventListener(newCard.querySelector(".removebutton"), book.title);
    return newCard;
}

// Not sure this part is needed.
function cleanLibraryEvents() {
    rdbuttons = cardGrid.querySelectorAll(".readbutton");
    rmbuttons = cardGrid.querySelectorAll(".removebutton");
    rdbuttons.forEach(function (btn) {
        btn.removeEventListener("click", toggleRead);
    });
    rmbuttons.forEach(function (btn) {
        btn.removeEventListener("click", function () {
            removeDialog.querySelector("b").textContent = bookName;
            removeDialog.showModal();
        });
});
}


// Adds event listeners to each cards remove button to open the confirm dialog
// and writes the name of the book inside the html of the dialog so i can get it back
// when i have to delete the book, still don't know if this solution is good
// but it feels better than the one before.
function addRemoveButtonEventListener(button, bookName) {
    button.addEventListener("click", function (){
        removeDialog.querySelector("b").textContent = bookName;
        removeDialog.showModal();
    })

}


function readForm(event) {
    event.preventDefault();
    const formData = new FormData(bookForm);
    const data = Object.fromEntries(formData.entries());
    data.isread = formData.has("isread");
    const newBook = new Book(data.title, data.author, data.pages, data.isread)
    addBookToLibrary(myLibrary, newBook);
    refreshCards(myLibrary);
    bookForm.reset();
    closeDialog(event);
    
}

// Toggles the read status, used by the book cards read button
function toggleRead(event) {
    const btn = event.target;
    const book = myLibrary[btn.closest(".bookcard").id];
    book.readSwitch();
    btn.textContent = book.read ? "Read: Yes" : "Read: No";
}

function removeBook(event) {
    let title = event.target.closest("dialog").querySelector("b").textContent
    const index = myLibrary.findIndex(book => book.title === title);
    myLibrary.splice(index, 1);
    refreshCards(myLibrary);
    closeDialog(event);

}
class Book {
    constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    }

    readSwitch() { this.read = !this.read; }
}

// Closes the closest dialog window, called by every cancel button in a modal
function closeDialog(event) {
    const dialog = event.target.closest("dialog");
    dialog.close();
}


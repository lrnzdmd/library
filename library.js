const myLibrary = [];
let cardGrid;
let cardTemplate;

document.addEventListener("DOMContentLoaded", function() {
    const addDialog = document.getElementById("addbookdialog");
    const addButton = document.getElementById("addbookbutton");
    const dialogCloseBtn = document.getElementById("cancelbutton");
    const bookForm = document.getElementById("bookform");
    cardGrid = document.getElementById("cardgrid");
    cardTemplate = document.getElementById("cardtemplate");

    addButton.addEventListener("click", function(){
        addDialog.showModal();
    });

    dialogCloseBtn.addEventListener("click", function(event){
        const dialog = event.target.closest("dialog");
        dialog.close();
    });
    
    // Creates a new book from the form data when submitted
    bookForm.addEventListener("submit", function(event){
        event.preventDefault();
        const formData = new FormData(bookForm);
        const data = Object.fromEntries(formData.entries());
        data.isRead = formData.has("isread");
        const dialog = event.target.closest("dialog");
        const newBook = new Book(data.title, data.author, data.pages, data.isRead)
        addBookToLibrary(myLibrary, newBook);
        addBookCard(newBook, myLibrary.length-1);
        bookForm.reset();
        dialog.close();
    });


});

function addBookToLibrary(library, book) {
    library.push(book);
}

function addBookCard(book, index) {
    const newCard = cardTemplate.content.cloneNode(true);
    newCard.querySelector('.title').textContent = book.title;
    newCard.querySelector('.author').textContent = `Author: ${book.author}`;
    newCard.querySelector('.pages').textContent = `Pages: ${book.pages}`;
    newCard.querySelector('.readbutton').textContent = book.isRead ? 'Read: Yes' : 'Read: No';
    newCard.querySelector('.bookcard').setAttribute('id', `${index}`);
    cardGrid.appendChild(newCard);
    console.log("just added book index " + index);
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (this.read === false) {
            return this.title + " by " + this.author + ", " + this.pages + " pages, not read yet";
        } else {
            return this.title + " by " + this.author + ", " + this.pages + " pages, read";
        }
    }
    this.readSwitch = function() {
        this.read = !this.read;
    }
}



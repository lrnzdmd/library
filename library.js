const myLibrary = [];

document.addEventListener("DOMContentLoaded", function() {
    const addDialog = document.getElementById("addbookdialog");
    const addButton = document.getElementById("addbookbutton");
    const dialogCloseBtn = document.getElementById("cancelbutton");
    const bookForm = document.getElementById("bookform");

    addButton.addEventListener("click", function(){
        addDialog.showModal();
    });

    dialogCloseBtn.addEventListener("click", function(){
        addDialog.close();
    });
    
    // Creates a new book from the form data when submitted
    bookForm.addEventListener("submit", function(event){
        event.preventDefault();
        const formData = new FormData(bookForm);
        const data = Object.fromEntries(formData.entries());
        data.isRead = formData.has("isread");
        const newBook = new Book(data.title, data.author, data.pages, data.isRead)
        addBookToLibrary(myLibrary, newBook);
        bookForm.reset();
        addDialog.close();
    });
});

function addBookToLibrary(library, book) {
    library.push(book);
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
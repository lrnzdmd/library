
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
let myLibrary = [];

let hobbit = new Book("hobbit","stocazzo","8818",false);

document.addEventListener("DOMContentLoaded", function() {
    
});

function changeContent(string) {
        content.innerHTML = string;
}

function addBookToLibrary(library, book) {
    library.push(book);
}
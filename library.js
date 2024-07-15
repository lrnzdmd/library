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

//Called to refresh the DOM with the books in the library
function refreshCards(library) {

    cleanLibraryEvents();
    cardGrid.innerHTML = "";

    for (let i = 0; i < library.length; i++) {
        const newCard = cardTemplate.content.cloneNode(true);
        newCard.querySelector(".title").textContent = library[i].title;
        newCard.querySelector(".author").textContent = library[i].author;
        newCard.querySelector(".pages").textContent = library[i].pages;
        newCard.querySelector(".readbutton").textContent = library[i].read ? "Read: Yes" : "Read: No";
        newCard.querySelector(".bookcard").setAttribute("id", `${i}`);
        newCard.querySelector(".readbutton").addEventListener("click", toggleRead);
        addRemoveButtonEventListener(newCard.querySelector(".removebutton"), i);
        cardGrid.appendChild(newCard);         
    }
}
function cleanLibraryEvents() {
    rdbuttons = cardGrid.querySelectorAll(".readbutton");
    rmbuttons = cardGrid.querySelectorAll(".removebutton");
    rdbuttons.forEach(function (btn) {
        btn.removeEventListener("click", toggleRead);
    });
    rmbuttons.forEach(function (btn) {
        btn.removeEventListener("click", function (event) {
            removeDialog.id = i;
            removeDialog.showModal();
        });
});
}


// Adds event listeners to each cards remove button to open the confirm dialog
// and passes the index of the book in the array to the modal windows's id because
// i am dumb and couldnt find a better way to delete the right book :(
function addRemoveButtonEventListener(button, index) {
    button.addEventListener("click", function (){
        removeDialog.id = index;
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
    const book = myLibrary[event.target.closest(".bookcard").id];
    book.readSwitch();
    if (book.read) { event.target.textContent = "Read: Yes"; }
    else { event.target.textContent = "Read: No"; }
}

function removeBook(event) {
    const dialog = event.target.closest("dialog");
    myLibrary.splice(event.target.closest("dialog").id, 1);
    refreshCards(myLibrary);
    dialog.close();

}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        if (this.read === false) {
            return this.title + " by " + this.author + ", " + this.pages + " pages, not read yet";
        } else {
            return this.title + " by " + this.author + ", " + this.pages + " pages, read";
        }
    }
    this.readSwitch = function () {
        this.read = !this.read;
    }
}

// Closes the closest dialog window, called by every cancel button in a modal
function closeDialog(event) {
    const dialog = event.target.closest("dialog");
    dialog.close();
}


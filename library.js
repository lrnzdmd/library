const myLibrary = [];


const addDialog = document.getElementById("addbookdialog");
const removeDialog = document.querySelector(".removedialog");
const addButton = document.getElementById("addbookbutton");
const dialogCloseBtn = document.querySelectorAll(".cancelbutton");
const removeConfirmBtn = document.getElementById("confirmbutton");
const bookForm = document.getElementById("bookform");
const cardGrid = document.getElementById("cardgrid");
const cardTemplate = document.getElementById("cardtemplate");

addButton.addEventListener("click", function () {
    addDialog.showModal();
});

dialogCloseBtn.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
        const dialog = event.target.closest("dialog");
        dialog.close();
    });
});


bookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(bookForm);
    const data = Object.fromEntries(formData.entries());
    data.isread = formData.has("isread");
    const dialog = event.target.closest("dialog");
    const newBook = new Book(data.title, data.author, data.pages, data.isread)
    addBookToLibrary(myLibrary, newBook);
    refreshCards(myLibrary);
    bookForm.reset();
    dialog.close();
});

removeConfirmBtn.addEventListener("click", function (event) {
    removeCard(event);
});




function addBookToLibrary(library, book) {
    library.push(book);

}

function refreshCards(library) {
    cardGrid.innerHTML = "";
    for (let i = 0; i < library.length; i++) {
        const newCard = cardTemplate.content.cloneNode(true);
        newCard.querySelector(".title").textContent = library[i].title;
        newCard.querySelector(".author").textContent = library[i].author;
        newCard.querySelector(".pages").textContent = library[i].pages;
        newCard.querySelector(".readbutton").textContent = library[i].read ? "Read: Yes" : "Read: No";
        newCard.querySelector(".bookcard").setAttribute("id", `${i}`);
        newCard.querySelector(".readbutton").addEventListener("click", function (event) {
            toggleRead(event);
        });
        newCard.querySelector(".removebutton").addEventListener("click", function (event) {
            removeDialog.id = i;
            removeDialog.showModal();
        });
        cardGrid.appendChild(newCard);
    }
}

function toggleRead(event) {
    const book = myLibrary[event.target.closest(".bookcard").id];
    book.readSwitch();
    if (book.read) { event.target.textContent = "Read: Yes"; }
    else { event.target.textContent = "Read: No"; }
}

function removeCard(event) {
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



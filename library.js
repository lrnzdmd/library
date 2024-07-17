
class Library {
    constructor() {
      this.collection = [];
      this.DisplayManager = new DisplayManager();
      this.addBook = this.addBook.bind(this);
      this.removeBook = this.removeBook.bind(this);
      this.closeDialog = this.closeDialog.bind(this);
      this.dBtnToggleRead = this.dBtnToggleRead.bind(this)

    }
    
    // Will be used at the beginning to create all the listeners on the page minus the ones that will be created with the cards

    createListeners() {
      this.DisplayManager.addButton.addEventListener("click", () => this.DisplayManager.addDialog.showModal());
      this.DisplayManager.dialogCloseBtn.forEach(btn => btn.addEventListener("click", this.closeDialog));
      this.DisplayManager.bookForm.addEventListener("submit", this.addBook)
      this.DisplayManager.removeConfirmBtn.addEventListener("click", this.removeBook)
    }

    addBook(event) {
      event.preventDefault();
      const formData = new FormData(this.DisplayManager.bookForm);
      const book = Object.fromEntries(formData.entries());
      book.isread = formData.has("isread");
      const newBook = new Book(book.title, book.author, book.pages, book.isread);
      this.DisplayManager.bookForm.reset();
      this.collection.push(newBook);
      this.closeDialog(event);
      this.dUpdateDisplay();
    }
    
    // removes the book, still have to change it from console only to the ui,
    // maybe i will change how this whole thing work

    removeBook(event) {
        let title = event.target.closest("dialog").querySelector("b").textContent
        
      const index = this.collection.findIndex(bk => bk.name === title);
      this.collection.splice(index, 1);
      this.closeDialog(event);
      this.dUpdateDisplay();
    }
  
    closeDialog(event) {
      const dialog = event.target.closest("dialog");
      dialog.close();
    }

    dUpdateDisplay() {
        this.DisplayManager.cardGrid.innerHTML = "";
        this.collection.forEach(book => {
            this.dNewBookCard(book);
        });
    }

    dNewBookCard(book) {
        const newCard = this.DisplayManager.cardTemplate.content.cloneNode(true);
        newCard.querySelector(".title").textContent = book.title;
        newCard.querySelector(".author").textContent = book.author;
        newCard.querySelector(".pages").textContent = book.pages;
        newCard.querySelector(".readbutton").textContent = book.read ? "Read: Yes" : "Read: No";
        newCard.querySelector(".readbutton").addEventListener("click", this.dBtnToggleRead);
        newCard.querySelector(".removebutton").addEventListener("click", () => {
            this.DisplayManager.removeDialog.querySelector("b").textContent = book.title;
            this.DisplayManager.removeDialog.showModal();
        });
        this.DisplayManager.cardGrid.appendChild(newCard);
    }

    dBtnToggleRead(event) {
        const btn = event.target;
        const bookTitle = btn.closest(".bookcard").querySelector(".title").innerHTML;
        const bookid = this.collection.findIndex(book => book.title === bookTitle);
        this.collection[bookid].readSwitch();
        btn.textContent = this.collection[bookid].read ? "Read: Yes" : "Read: No";
    }
    
  }
  
  // all the references to dom elements i might need are bundled up in here
  // (except those that will get created on the fly)

  class DisplayManager {
      constructor() {
          this.addDialog = document.getElementById("addbookdialog");
          this.addButton = document.getElementById("addbookbutton");
          this.removeDialog = document.querySelector(".removedialog");
          this.removeConfirmBtn = document.getElementById("confirmbutton");
          this.dialogCloseBtn = document.querySelectorAll(".cancelbutton");
          this.cardGrid = document.getElementById("cardgrid");
          this.bookForm = document.getElementById("bookform");
          this.cardTemplate = document.getElementById("cardtemplate");
      }
  }
  
  class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
  
    readSwitch() {
      this.read = !this.read;
    }
  }

  const myLibrary = new Library();
  myLibrary.createListeners();
  
  
  
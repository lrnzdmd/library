
class Library {
    constructor() {
      this.collection = [];
      this.DisplayManager = new DisplayManager();
    }
    
    // Will be used at the beginning to create all the listeners on the page minus the ones that will be created with the cards

    createListeners() {
      this.DisplayManager.addButton.addEventListener("click", () => this.DisplayManager.addDialog.showModal());
      this.DisplayManager.dialogCloseBtn.forEach(btn => btn.addEventListener("click", this.closeDialog));
      this.DisplayManager.bookForm.addEventListener("submit", this.addBook)
      //this.DisplayManager.removeConfirmBtn.addEventListener("click", removeBook)
    }

    addBook(event) {
      event.preventDefault();
      const formData = new FormData(this.DisplayManager.bookForm);
      const book = Object.fromEntries(formData.entries());
      book.isread = formData.has("isread");
      const newBook = new Book(book.title, book.author, book.pages, book.isread);
      this.DisplayManager.bookForm.reset();
      this.collection.push(newBook);
      this.closeDialog();
    }
    
    // removes the book, still have to change it from console only to the ui,
    // maybe i will change how this whole thing work

    removeBook() {
      let name = prompt("enter title of book to remove (case sensitve)");
      const index = this.collection.findIndex((bk) => bk.name === name);
      this.collection.splice(index, 1);
    }
  
    printCollection() {
      console.log(this.collection);
    }
  
    closeDialog(event) {
      const dialog = event.target.closest("dialog");
      dialog.close();
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
  
  
  
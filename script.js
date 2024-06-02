function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

let library = [
    new Book("Think and Grow Rich", "Napoleon Hill", "238", "yes"),
    new Book("As a Man Thinketh", "james Allen", "60-80", "No")
];

const main = document.querySelector("#main");

initialize();

function initialize() {
    for(let book of library) {
        if(book instanceof Book) {
            console.log("This is a book");
        } else {
            console.log("Not a book");
        }
        let card = document.createElement("div");
        card.classList.add("book-container");

        let title = document.createElement("p");
        if(book.title.length > 10) {
            title.textContent = "Title: " + book.title.slice(0, 11) + "...";
        }else {
            title.textContent = "Title : " + book.title;
        }

        let author = document.createElement("p");
        author.textContent = "Author: " + book.author;

        let pages = document.createElement("p");
        pages.textContent = "Number of Pages:  " + book.pages;

        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        let readButton = document.createElement("button");
        readButton.classList.add("book-button", "read-button");

        if(book.read === "Yes") {
            readButton.textContent = "Read";
            readButton.style.backgroundColor = "#2E3047";
            readButton.style.border = "none";
            readButton.style.padding = "0.5rem";
            readButton.style.borderRadius = "10px";
            readButton.style.color = "#3BBA9C";
            readButton.style.fontWeight = "bold";
        } else if (book.read === "No") {
            readButton.textContent = "Not Read";
            readButton.style.backgroundColor = "#19745e";
            readButton.style.border = "none";
            readButton.style.padding = "0.5rem";
            readButton.style.borderRadius = "10px";
            readButton.style.color = "#67c9b0";
            readButton.style.fontWeight = "bold";
        }
        readButton.setAttribute("data-index", library.indexOf(book));
        readButton.addEventListener("click", readOrNot);

        let removeButton = document.createElement("button");
        removeButton.classList.add("book-button", "remove-button");
        removeButton.setAttribute("data-index", library.indexOf(book));
        removeButton.textContent = "remove";
        removeButton.addEventListener("click", removeFromLibrary);

        buttonContainer.appendChild(readButton);
        buttonContainer.appendChild(removeButton);

        card.append(title);
        card.append(author);
        card.append(pages);
        card.append(buttonContainer);

        main.appendChild(card);
    }
}

const dialogButton = document.querySelector("#add");
const dialog = document.querySelector("#dialog-form");
const closeDialog =  document.querySelector("#close-form");
dialogButton.addEventListener("click", (event) => {
    event.preventDefault;
    dialog.showModal();
});
closeDialog.addEventListener("click", (event) => {
    event.preventDefault;
    dialog.close();
});

const addBook = document.querySelector("#add-book");
addBook.addEventListener("click", addtoLibrary);





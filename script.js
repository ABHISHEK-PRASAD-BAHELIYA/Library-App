function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

let library = [
    new Book("Think and Grow Rich", "Napoleon Hill", "238", "Yes"),
    new Book("As a Man Thinketh", "James Allen", "60-80", "No")
];

const main = document.querySelector("#main");

initialize();

function initialize() {
    main.innerHTML = ''; // Clear existing content
    library.forEach((book, index) => {
        if (book instanceof Book) {
            console.log("This is a book");
        } else {
            console.log("Not a book");
        }
        let card = document.createElement("div");
        card.classList.add("book-container");

        let title = document.createElement("p");
        title.textContent = book.title.length > 16 ? `Title: ${book.title.slice(0, 17)}...` : `Title: ${book.title}`;

        let author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        let pages = document.createElement("p");
        pages.textContent = `Number of Pages: ${book.pages}`;

        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        let readButton = document.createElement("button");
        readButton.classList.add("book-button", "read-button");
        readButton.textContent = book.read === "Yes" ? "Read" : "Not Read";
        styleReadButton(readButton, book.read === "Yes");

        readButton.setAttribute("data-index", index);

        let removeButton = document.createElement("button");
        removeButton.classList.add("book-button", "remove-button");
        removeButton.setAttribute("data-index", index);
        removeButton.textContent = "Remove";

        buttonContainer.appendChild(readButton);
        buttonContainer.appendChild(removeButton);

        card.append(title);
        card.append(author);
        card.append(pages);
        card.append(buttonContainer);

        main.appendChild(card);
    });
}

const dialogButton = document.querySelector("#add");
const dialog = document.querySelector("#dialog-form");
const closeDialog = document.querySelector("#close-form");
dialogButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.showModal();
});
closeDialog.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});

const addBook = document.querySelector("#add-book");
addBook.addEventListener("click", addToLibrary);

function clear() {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

function addToLibrary(event) {
    event.preventDefault();
    const titleInput = document.querySelector('input[name="title"]');
    const authorInput = document.querySelector('input[name="author"]');
    const pageInput = document.querySelector('input[name="pages"]');
    const readStatus = document.querySelector('select[name="read-status"]');

    if (!titleInput.value || !authorInput.value || !pageInput.value) {
        alert("Please fill in all fields");
        return;
    }

    let book = new Book(
        titleInput.value,
        authorInput.value,
        pageInput.value,
        readStatus.value
    );

    library.push(book);

    // Clear the input fields after adding the book
    titleInput.value = "";
    authorInput.value = "";
    pageInput.value = "";
    readStatus.value = "Yes"; // Assuming "Yes" is the default value

    dialog.close();
    initialize();
    console.log(library);
}

main.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-button")) {
        removeFromLibrary(event);
    } else if (event.target.classList.contains("read-button")) {
        readOrNot(event);
    }
});

function removeFromLibrary(event) {
    const index = event.target.getAttribute("data-index");
    library.splice(index, 1);
    initialize();
}

function readOrNot(event) {
    const button = event.target;
    const index = button.getAttribute('data-index');
    const book = library[index];
    book.read = book.read === 'Yes' ? 'No' : 'Yes';
    button.textContent = book.read === 'Yes' ? 'Read' : 'Not Read';
    styleReadButton(button, book.read === 'Yes');
}

function styleReadButton(button, isRead) {
    if (isRead) {
        button.style.backgroundColor = "#2E3047";
        button.style.color = "#3BBA9C";
    } else {
        button.style.backgroundColor = "#19745e";
        button.style.color = "#67c9b0";
    }
    button.style.border = "none";
    button.style.padding = "0.5rem";
    button.style.borderRadius = "10px";
    button.style.fontWeight = "bold";
}

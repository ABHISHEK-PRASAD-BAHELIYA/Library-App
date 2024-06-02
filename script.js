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
        if(book.title.length > 16) {
            title.textContent = "Title: " + book.title.slice(0, 17) + "...";
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

function clear() {
    let child = main.firstChild;
    while(child) {
        main.removeChild(remove);
        child = main.firstChild;
    }
}

function addtoLibrary(event) {
    clear();
    event.preventDefault();
    const titleInput = document.querySelector('input[name="title"]');
    const authorInput = document.querySelector('input[name="author"]');
    const pageInput = document.querySelector('input[name="pages"]');
    const readStatus = document.querySelector('select');
    
    let book = new Book(
        titleInput.value,
        authorInput.value,
        pageInput.value,
        readStatus.value
    );

    library.push(book);

    titleInput.value = "";
    authorInput.value = "";
    pageInput.value = "";
    readStatus.value = "";

    dialog.close();
    initialize();
    console.log(library);
}

function removeFromLibrary(event) {
    console.log("Hello from remove button");
    const index = event.target.getAttribute("data-index");
    if(library.length === 1)
        library = [];
    else if(index === 0)
        library = library.slice(1);
    else if(index === library.length-1)
        library = library.slice(0,index);
    else
        library = library.slice(0,index).concat(library.slice(index+1));
    clear();
    initialize();
}

function readOrNot(event) {
    const button = event.target;
    const index = button.getAttribute('data-index');
    if(button.textContent === 'Read') {
        button.textContent = 'Not Read';
        library[index].read = 'No';
        button.style.backgroundColor = "#19745e";
        button.style.border = "2px #3BBA9C solid";
        button.style.padding = "0.5rem";
        button.style.borderRadius = "5px";
        button.style.color = "#67c9b0";
        button.style.fontWeight = "bold";
    } else if(button.textContent === 'Not Read') {
        button.textContent = 'Read';
        library[index].read = 'Yes';
        button.style.backgroundColor = "#2E3047";
        button.style.border = "2px #3BBA9C solid";
        button.style.padding = "0.5rem";
        button.style.borderRadius = "5px";
        button.style.color = "#3BBA9C";
        button.style.fontWeight = "bold";
    }
    
}





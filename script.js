//ADD BOOK POPUP
const addBook = document.getElementsByClassName('add-btn')
const popup = document.getElementsByClassName('popup');
const titleInput = document.getElementsByClassName('title-input');
const authorInput = document.getElementsByClassName('author-input');
const pagesInput = document.getElementsByClassName('pages-input');
const radioInputRead = document.getElementById('read');
const tbody = document.getElementsByClassName('book-listing');

addBook[0].addEventListener('click', () => {
    popup[0].style.visibility = 'visible';
    titleInput[0].value = '';
    authorInput[0].value = '';
    pagesInput[0].value = '';
    radioInputRead.checked = false;
});

//ADDING BOOKS
const addButton = document.getElementsByClassName('submit-input');

addButton[0].addEventListener('click', () => {
    if(titleInput[0].value != '') {
        if(authorInput[0].value != '') {
            if(pagesInput[0].value != '') {
                addBookToLibrary();

                popUpClose();
            }
        }
    }   
});

//CLOSING POPUP
const clearPopUp = document.getElementsByClassName('close-icon');

clearPopUp[0].addEventListener('click', () => {
    popup[0].style.visibility = 'hidden';
});

function popUpClose() {
    popup[0].style.visibility = 'hidden';
}

//LIBRARY
let myLibrary = [];

class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

function renderBook(arrayOfBooks) {
    let bookListing = document.getElementsByClassName('book-listing');

    bookListing[0].innerHTML = null;

    for(i = 0; i < arrayOfBooks.length; i++) {
        let newRow = document.createElement('tr');
        newRow.className = 'books-table';
        newRow.setAttribute("index", i);

        let newCell = document.createElement('td');
        newCell.className = 'title-list';
        newCell.innerHTML = arrayOfBooks[i].title;

        newRow.appendChild(newCell);

        newCell = document.createElement('td');
        newCell.className = 'author-list';
        newCell.innerHTML = arrayOfBooks[i].author;

        newRow.appendChild(newCell);

        newCell = document.createElement('td');
        newCell.className = 'pages-list';
        newCell.innerHTML = arrayOfBooks[i].pages;

        newRow.appendChild(newCell);

        newCell = document.createElement('td');
        newCell.className = 'status-list';
        
        if (arrayOfBooks[i].status == "true") {
            newCell.innerHTML = 'Read';
        } else {
            let toggleButton = document.createElement('button');
            toggleButton.className = 'toggle-button';
            toggleButton.innerHTML = 'Not read';
            toggleButton.setAttribute("index-button", i);
            toggleButton.addEventListener('click', toggleStatus);

            newCell.appendChild(toggleButton);
        }

        newRow.appendChild(newCell);

        let deleteIcon = document.createElement('span');
        deleteIcon.className = 'material-icons';
        deleteIcon.innerHTML = 'delete';
        deleteIcon.addEventListener('click', deleteBook);

        newCell = document.createElement('td');
        newCell.className = 'delete-option';

        newCell.appendChild(deleteIcon);
        
        newRow.appendChild(newCell);

        bookListing[0].appendChild(newRow);
    }
}

document.addEventListener('DOMContentLoaded', renderBook(myLibrary));

function addBookToLibrary() {
    title = titleInput[0].value; 
    author = authorInput[0].value; 
    pages = pagesInput[0].value; 
    status = radioInputRead.checked;

    myLibrary.push(new Book(title, author, pages, status));

    renderBook(myLibrary);
}

//Delete book
function deleteBook(event) {
    if(event.target.classList.contains('material-icons')) {
        event.target.parentElement.parentElement.remove();

        const index = event.target.parentElement.parentElement.getAttribute('index');
        myLibrary.splice(index, 1);

        renderBook(myLibrary);
    }
}

//Toggle button
function toggleStatus(event) {
    if (event.target.classList.contains('toggle-button')) {
        let indexOfButton = event.target.getAttribute('index-button');

        if (event.target.innerHTML === "Not read") {
            event.target.innerHTML = "Read";

            myLibrary[indexOfButton].status = "true";

            renderBook(myLibrary);
        }
    }
}
// Kendra Brauer
// ICT-4570-1 Webscripting with JavaScript
// Week 10 Final Project: Fictional Library
// Summer Quarter 2020
// js/finalProject.js

// Search Form and submission process

const searchText = document.getElementById('searchText');
const searchButton = document.getElementById('searchButton');
const ul = document.getElementById('ul');
const searchStatus = document.getElementById('search-results');

let searching = false;
let searchTextPrev;
let index = 0;
let responseSave;

searchButton.onclick = function () {
    if(searchText.value != '' && !searching)
    search(searchText.value);
}

// Create function named “search”
function search(searchText) {
    if(searchTextPrev == searchText) {
        index++;
        gotResponse(responseSave);
        return;
    }
    else
    index = 0;

    searchTextPrev = searchText;
    searching = true;
    searchStatus.innerText = 'Searching...';

    searchText = searchText.replace(/ /gi, '+');
    let url = 'http://openlibrary.org/search.json?q=' + searchText;
    fetch(url)
    .then(response => response.json())
    .then(data => gotResponse(data));
}

function gotResponse(response) {
    responseSave = response;
    searching = false;

    let book = responseSave.docs[index];

    if(book == undefined) {
        searchStatus.innerText = 'No such book available.';
        ul.innerHTML = '';
    }
    else {
        searchStatus.innerText = 'Search success!';
        let title = book.title == undefined ? 'N/A' : book.title;
        let author = book.author_name == undefined ? 'N/A' : book.author_name;
        let year = book.publish_date == undefined ? 'N/A' : book.publish_date;
        let isbn = book.isbn == undefined ? 'N/A' : book.isbn;
        let olid = book.cover_edition_key;

        ul.innerHTML =
        `<li>Title : ${title}</li>
        <li>Author : ${author}</li>
        <li>Publish Year : ${year}</li>
        <li>ISBN : ${isbn}</li>
        <img src="http://covers.openlibrary.org/b/olid/${olid}-M.jpg">`;

        console.log('Current book');
        console.log(book);
    }
}

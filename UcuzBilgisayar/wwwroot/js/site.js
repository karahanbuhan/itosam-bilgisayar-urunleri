// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var searchBar = document.getElementById("search-bar");

var inputHandler = function (e) {
    var cards = document.getElementsByClassName("card");
    var input = searchBar.value;    

    console.log(input);

    for (var i = 0; i < cards.length; i++) {
        cardHtml = cards[i].innerHTML.toString();
        if (cardHtml.includes(input)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }

}

searchBar.addEventListener("input", inputHandler);

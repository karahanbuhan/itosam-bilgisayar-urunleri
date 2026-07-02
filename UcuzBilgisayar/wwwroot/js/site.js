// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var searchBar = document.getElementById("search-bar");
var inputHandler = function (e) {
    var cards = document.getElementsByClassName("card");
    var input = searchBar.value;

    for (var i = 0; i < cards.length; i++) {
        cardHtml = cards[i].innerHTML.toString();
        if (cardHtml.toLowerCase().includes(input.toLowerCase())) {
            cards[i].style.display = "inline-block";
        } else {
            cards[i].style.display = "none";
        }
    }

}


var sortButton = document.getElementById("sort-button");
var sortOptions = document.getElementsByClassName("sort-options")[0];

var modes = ["default", "lowest_price", "highest_price", "highest_reviews", "highest_ratings"];

var sortButtonHandler = function (e) {
    console.log("merhaba");

    var display = sortOptions.style.display;
    if (display == "inline-block") {
        sortOptions.style.display = "none";
    } else {
        sortOptions.style.display = "inline-block";
    }

        // TODO: use order property
}

searchBar.addEventListener("input", inputHandler);
sortButton.onclick = sortButtonHandler;
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
        if (cardHtml.toLowerCase().includes(input.toLowerCase())) {
            cards[i].style.display = "inline-block";
        } else {
            cards[i].style.display = "none";
        }
    }

}
searchBar.addEventListener("input", inputHandler);

var sortButton = document.getElementById("sort-button");
var modes = ["default", "lowest_price", "highest_price", "highest_reviews", "highest_rating"];

var sortHandler = function (e) {
    // Show 5 options
    var 
    // use order property
}
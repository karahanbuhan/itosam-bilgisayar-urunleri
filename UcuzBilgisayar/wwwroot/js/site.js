// Arama Barı
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
searchBar.addEventListener("input", inputHandler);



// Sıralama Modları
const SortModes = {
    DEFAULT: "Varsayılan sıraya göre",
    LOWEST_PRICE: "En düşük fiyat",
    HIGHEST_PRICE: "En yüksek fiyat",
    HIGHEST_REVIEWS: "En çok değerlendirilenler",
    HIGHEST_RATINGS: "En yüksek puanlılar"
}
var mode = SortModes.DEFAULT;


// Sıralama Butonları

// En üstteki ana sıralama butonu
var sortButton = document.getElementById("sort-button");
var sortButtonA = sortButton.getElementsByTagName("a");
var sortOptions = document.getElementsByClassName("sort-options")[0];

// Sıralama butonunun ismini mevcut moda göre değiştirir
function updateSortButtonName() {
    sortButton.innerHTML = "<a>" + mode + "</a>";
}

// Diğer sıralama seçeneklerini gizler
function toggleSortOptionsMenu() {
    var display = sortOptions.style.display;
    if (display == "inline-block") {
        sortOptions.style.display = "none";
    } else {
        sortOptions.style.display = "inline-block";
    }
}

// Ana sıralama butonuna basınca menüyü açar veya kapatır
var sortButtonHandler = function (e) {
    toggleSortOptionsMenu();
    updateSortButtonName();
}
sortButton.onclick = sortButtonHandler;


var sortOptionButtons = document.getElementsByClassName("sort-button");
var sortOptionsButtonHandler = function (e) {
    var modeCls = e.currentTarget.classList[0];

    if (modeCls == "sort-lowest-price") {
        mode = SortModes.LOWEST_PRICE;
    } else if (modeCls == "sort-highest-price") {
        mode = SortModes.HIGHEST_PRICE;
    } else if (modeCls == "sort-highest-reviews") {
        mode = SortModes.HIGHEST_REVIEWS;
    } else if (modeCls == "sort-highest-ratings") {
        mode = SortModes.HIGHEST_RATINGS;
    }

    updateSortButtonName();
}

for (var i = 0; i < sortOptionButtons.length; i++) {
    sortOptionButtons[i].onclick = sortOptionsButtonHandler;
}
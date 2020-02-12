"use strict";


// establishing global variables
let category = 'animal';

const refreshButton = document.querySelector("#refresh"),
    selectCategory = document.querySelector("#selectCategory");


// function pulls categories from chuck norris api and appends to html/select
// option on page
function buildCategories() {
    const categoryUrl = `https://api.chucknorris.io/jokes/categories`;
    const selectCategory = document.querySelector("#selectCategory");
    get(categoryUrl).then(function(response) {
        response.forEach (function(element) {
            if (element != "explicit") {
                const categoryElement = document.createElement("button");
                categoryElement.value = element;
                categoryElement.classList.add("dropdown-item");
                categoryElement.id = "categoryElement"
                categoryElement.type = "button";
                categoryElement.innerHTML += element[0].toUpperCase() + element.substring(1);
                selectCategory.appendChild(categoryElement)
                console.log(categoryElement.value);
            }
        })
    })
}

// function pulls quote from chuck norris api based on changeable variable and
// toggles modal window
function getQuote(category) {
    const apiUrl = `https://api.chucknorris.io/jokes/random?category=${category}`;
    const chuckSays = document.querySelector("#chuckSays");
    get(apiUrl).then(function(response) {
        chuckSays.innerHTML = response.value;
        $("chuckSaysModal").modal("toggle");
    });
}

// event listener added to refresh button with quote pull action
$("#refreshButton").click(function(event) {
    event.preventDefault();
    getQuote(category);
    if ($("#refreshButton").html() == "Click for wisdom") {
        $("#refreshButton").html(function() {
            return "Refresh if you dare!";
        });
    }
});

// event listener added to select category list with quote pull action if
// category is changed
$("#selectCategory").on("click", "#categoryElement", function() {
    let elementValue = $(this).attr("value"),
        elementText = $(this).html();
    console.log("Category chosen: ", elementValue);
    if (category != elementValue) {
        category = elementValue;
        getQuote(category);
    };
    console.log($("#dropdownMenuButton").html())
    $("#dropdownMenuButton").html(function() {
        return elementText;
    })
});

// run key functions to start page
buildCategories();
getQuote(category);
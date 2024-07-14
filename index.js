// Jquery sidenavbar animation (open)
function openNav() {
    $(".side-nav-bar").animate({
        left: 0
    }, 1000)
    // switch icons
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
}
// Jquery sidenavbar animation (close)
function closeNav() {
    let x = $(".side-nav-bar .nav-body").outerWidth()
    $(".side-nav-bar").animate({
        left: -x
    }, 1000)
    // switch icons
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
}

closeNav()
$(".side-nav-bar i.open-close-icon").click(() => {
    if ($(".side-nav-bar").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})

let rowId = document.getElementById("rowId");

function displayMeals(arr) {
    let container = "";
    for (let i = 0; i < arr.length; i++) {
        container += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="inner position-relative overflow-hidden rounded cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}">
                    <div class="layer position-absolute d-flex justify-content-center align-items-center text-black">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    rowId.innerHTML = container;
}

async function getCategory() {
    rowId.innerHTML = ""
    searchField.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    displayCategory(response.categories)
}

function displayCategory(arr) {
    let container = "";
    for (let i = 0; i < arr.length; i++) {
        container += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="inner position-relative overflow-hidden rounded cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}">
                    <div class="layer position-absolute text-center text-black">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }
    rowId.innerHTML = container
}
let searchField = document.getElementById("searchField");

async function getArea() {
    rowId.innerHTML = ""
    searchField.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json();
    displayArea(respone.meals)
}


function displayArea(arr) {
    let container = "";

    for (let i = 0; i < arr.length; i++) {
        container += `
        <div class="col-md-3 text-white ">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded text-center cursor-pointer">
                        <i class="fa-solid fa-location-dot fa-4xl"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }
    rowId.innerHTML = container
}


async function getIngredients() {
    rowId.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchField.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);
    displayIngredients(respone.meals.slice(0, 20))
}


function displayIngredients(arr) {
    let container = "";
    for (let i = 0; i < arr.length; i++) {
        container += `
        <div class="col-md-3 text-white text-center">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="cursor-pointer ">
                        <i class="fa-solid fa-bowl-food fa-2xl"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }
    rowId.innerHTML = container;
}


async function getCategoryMeals(category) {
    rowId.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
}



async function getAreaMeals(area) {
    rowId.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
}


async function getIngredientsMeals(ingredients) {
    rowId.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
}

async function getMealDetails(mealID) {
    closeNav()
    rowId.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchField.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
}


function displayMealDetails(meal) {
    searchField.innerHTML = "";
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let container = `
    <div class="col-md-4">
                <img class="w-100" src="${meal.strMealThumb}">
                    <h4>${meal.strMeal}</h4>
            </div>
            <div class="col-md-8">
                <h4>instructions:</h4>
                <p>${meal.strInstructions}</p>
                <h4>Area :${meal.strArea}</h4>
                <h4>Category :${meal.strCategory}</h4>
                <h5>recipes :</h5>
                <ul class="list-unstyled d-flex flex-wrap">
                    ${ingredients}
                </ul>

                <h6>Tags :</h6>
                <ul class="list-unstyled d-flex flex-wrap">
                    ${tagsStr}
                </ul>

                <a href="${meal.strSource}" class="btn btn-success">Source</a>
                <a href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`
    rowId.innerHTML = container;
}


function showSearchInputs() {
    searchField.innerHTML = `
    <div class="row py-2">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control text-white" type="text" placeholder="Search by Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control text-white" type="text" placeholder="Search by First Letter">
        </div>
    </div>`
    rowId.innerHTML = "";
}

async function searchByName(term) {
    closeNav()
    rowId.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
}


async function searchByFirstLetter(term) {
    closeNav()
    rowId.innerHTML = ""
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
}













function showContacts() {
    rowId.innerHTML = `<div class="contact vh-100 d-flex justify-content-center align-items-center">
    <div class="container">
        <div class="row g-1">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-1 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-1 d-none">
                    Email is not valid yourname@example.com
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-1 d-none">
                    Enter a valid PhoneNumber
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-1 d-none">
                    Enter a valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter a valid password Min eight characters and at least one letter and one number
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    password doesn't match
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger py-3 mt-2 text-center d-block">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
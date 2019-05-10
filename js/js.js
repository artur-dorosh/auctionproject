/* JSON */

var products = JSON.parse('[ {"amountHours": 4, "picture": "img/prod1.jpg", "price": 123, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver", "description": "dsgdsg dsghdsfgh sdf gdfhs tr hrts hrt hrth tsr hrst hTest description description description description description", "category": "laptop"},{"amountHours": 1, "picture": "img/prod1.jpg", "price": 123, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver", "description": "dsgdsg dsghdsfgh sdf gdfhs tr hrts hrt hrth tsr hrst hTest description description description description description", "category": "laptop"},{"amountHours": 1, "picture": "img/prod1.jpg", "price": 123, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver", "description": "dsgdsg dsghdsfgh sdf gdfhs tr hrts hrt hrth tsr hrst hTest description description description description description", "category": "laptop"},{"amountHours": 1, "picture": "img/prod1.jpg", "price": 123, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver", "description": "dsgdsg dsghdsfgh sdf gdfhs tr hrts hrt hrth tsr hrst hTest description description description description description", "category": "laptop"},{"amountHours": 2, "picture": "img/prod2.jpg", "price": 156, "finishPrice": 471, "priceStep": 15, "prodName": "Angle iPhone 6s 32 Gb Silver", "description": "dsgdsg dsghdsfgh sdf gdfhs tr hrts hrt hrth tsr hrst hTest description description description description description", "category": "sweetshot"},{"amountHours": 3, "picture": "img/prod4.jpg", "price": 17, "finishPrice": 471, "priceStep": 15, "prodName": "Whose iPhone 6s 32 Gb Silver", "description": "dsgdsg dsghdsfgh sdf gdfhs tr hrts hrt hrth tsr hrst hTest description description description description description", "category": "boots"} ]');
localStorage.products = localStorage.products ? localStorage.products : JSON.stringify(products);

var posts = document.getElementById("posts");

function generatePosts(array) {
    posts.innerHTML = "";
    for (var i = 0; i < array.length; i++) {
        var post = document.createElement("div");
        post.classList.add("current-post");

        var countdown = document.createElement("div");
        countdown.classList.add("post-countdown");

        var amount = document.createElement("span");
        amount.classList.add("countdown-amount");
        var date = new Date(null);
        date.setSeconds(array[i]["amountHours"]*3600 - secondsFromStart);
        var result = date.toISOString().substr(11, 8);
        amount.innerText = result;

        var picture = document.createElement("img");
        picture.classList.add("post-img");
        picture.setAttribute("src", "" + array[i]["picture"]);

        var price = document.createElement("p");
        price.classList.add("post-price");
        price.innerText = "Price: $" + array[i]["price"];
        var finishPrice = document.createElement("span");
        finishPrice.classList.add("finish-price");
        finishPrice.innerText = "Final: $" + array[i]["finishPrice"];

        var priceStep = document.createElement("p");
        priceStep.classList.add("post-step");
        priceStep.innerText = array[i]["priceStep"];

        var prodBlock = document.createElement("div");
        prodBlock.classList.add("prod-block");
        var prodName = document.createElement("a");
        prodName.classList.add("post-name");
        prodName.innerText = "" + array[i]["prodName"];
        var prodDesc = document.createElement("p");
        prodDesc.classList.add("post-desc");
        prodDesc.innerText = "" + array[i]["description"];

        var bid = document.createElement("a");
        bid.classList.add("post-submit");
        bid.innerText = "Submit a bid";

        var buy = document.createElement("a");
        buy.classList.add("post-buy");
        buy.innerText = "Buy now";

        countdown.appendChild(amount);
        post.appendChild(countdown);
        post.appendChild(picture);
        price.appendChild(finishPrice);
        post.appendChild(price);
        post.appendChild(priceStep);
        prodBlock.appendChild(prodName);
        prodBlock.appendChild(prodDesc);
        post.appendChild(prodBlock);
        post.appendChild(bid);
        post.appendChild(buy);

        posts.appendChild(post);
    }
}

/* timer */

var secondsFromStart = 0;
var start = setInterval(function() {
    secondsFromStart++;
}, 1000);

function setTimer(array) {
    var ctdown = document.querySelectorAll('.countdown-amount');
    var searchCtdown = document.querySelectorAll('.ctdamount-search');
    for (var i = 0; i < ctdown.length; i++) {
        timer(ctdown[i], array[i].amountHours);
    }
    for (var i = 0; i < searchCtdown.length; i++) {
        timer(searchCtdown[i], array[i].amountHours);
    }

    function timer(item, time) {
        var count = time * 3600 - secondsFromStart;
        var interval = setInterval(function() {
            var newTime = new Date(null);
            newTime.setSeconds(count);
            var result = newTime.toISOString().substr(11, 8);
            item.innerText = result;
            count--;
            if (count < 0) {
                clearInterval(interval);
            }
        }, 1000);
    }
}

/* sell */

var toSell = document.getElementById("toSell");

toSell.addEventListener("click", function() {
    if (localStorage.signed == "false") {
        sign.click();
        return;
    }

    var sell = document.getElementById("sell");
    var sellModal = document.querySelector(".sell-modal");
    var selClose = document.querySelector(".closesell-btn");

    sell.style.display = "flex";
    sellModal.classList.add("centered");
    selClose.onclick = function() {
        sell.style.display = "none";
        sellModal.classList.remove("centered");
    }
});

var sellBtn = document.querySelector(".sell-btn");

sellBtn.addEventListener("click", function(e) {
    e.preventDefault();
    var name = document.querySelector(".product-name").value;
    var price = document.querySelector(".product-price").value;
    var finalprice = document.querySelector(".product-finalprice").value;
    var step = document.querySelector(".product-step").value;
    var category = document.querySelector(".select-ctg").value.toLowerCase();
    var img = document.querySelector(".product-img").value.substr(12);
    var prods = JSON.parse(localStorage.products);

    var result = {
        "amountHours": 12,
        "picture": "img/" + img,
        "price": price,
        "finishPrice": finalprice,
        "priceStep": step,
        "prodName": "" + name,
        "category": "" + category
    }


    prods.unshift(result);
    localStorage.products = JSON.stringify(prods);

    generatePosts(JSON.parse(localStorage.products));
    paginate(JSON.parse(localStorage.products));
    setTimer(JSON.parse(localStorage.products));

    location.reload();
});

/* registration */

    /* signed */
var sign = document.querySelector(".btn-sign");

sign.addEventListener("click", function() {
    var sign = document.getElementById("signin");
    var signModal = document.querySelector(".signin-modal");
    var signClose = document.querySelector(".close-btn");
    var error = document.querySelector(".signin-error");

    sign.style.display = "flex";
    signModal.classList.add("centered");
    signClose.onclick = function() {
        sign.style.display = "none";
        signModal.classList.remove("centered");
        error.style.display = "none";
    }
});

var users = [ {"login": "test", "pass": "123"} ];

if (!localStorage.users) {
    localStorage.users = JSON.stringify(users);
}

var enter = document.querySelector(".signin-btn");

enter.addEventListener("click", function(e) {
    e.preventDefault();
    var users = JSON.parse(localStorage.users);
    var login = document.querySelector(".loginin").value;
    var password = document.querySelector(".passwordin").value;
    var error = document.querySelector(".signin-error");

    for (var i = 0; i < users.length; i++) {
        if (users[i].login === login) {
            if (users[i].pass === password) {
                welcome(login);
                break;
            } else {
                error.innerText = "Incorrect password";
                error.style.display = "block";
                break;
            }
        } else if (i == users.length - 1) {
            error.innerText = "Incorrect login";
            error.style.display = "block";
        }
    }
});

function welcome(name) {
    var signModal = document.querySelector(".signin-modal");
    var success = document.querySelector(".success");
    var user = document.querySelector(".user");

    signModal.style.display = "none";
    success.style.display = "flex";
    user.innerText = name;
    localStorage.signed = "true";

    var close = setTimeout(function() {
        localStorage.user = name;
        location.reload();
    }, 2000);
}

function isSigned() {
    var register = document.querySelector(".register");
    var signed = document.querySelector(".signed-user");
    var userWelc = document.querySelector(".signed-user_name");

    if (localStorage.signed === "true") {
        register.style.display = "none";
        signed.style.display = "block";
        userWelc.innerText = "Welcome, " + localStorage.user;
    } else {
        register.style.display = "block";
        signed.style.display = "none";
    }
}

    /* logout */

var logout = document.querySelector(".btn-logout");

logout.addEventListener("click", function() {
    localStorage.signed = "false";
    location.reload();
});

    /* registrate */

var regist = document.querySelector(".btn-reg");
var regist2 = document.querySelector(".slider-btn");

regist.addEventListener("click", function() {
    var reg = document.getElementById("registerin");
    var regModal = document.querySelector(".register-modal");
    var regClose = document.querySelector(".closereg-btn");

    reg.style.display = "flex";
    regModal.classList.add("centered");
    regClose.onclick = function() {
        reg.style.display = "none";
        regModal.classList.remove("centered");
    }
});

regist2.addEventListener("click", function() {
    regist.click();
})

var regEnter = document.querySelector(".register-btn");

regEnter.addEventListener("click", function(e) {
    e.preventDefault();
    var login = document.querySelector(".loginreg").value;
    var password = document.querySelector(".passwordreg").value;
    var users = JSON.parse(localStorage.users);
    var newUser = {
        "login": login,
        "pass": password
    }
    users.unshift(newUser);
    localStorage.users = JSON.stringify(users);

    var regModal = document.querySelector(".register-modal");
    var regSuccess = document.querySelector(".successreg");
    regModal.style.display = "none";
    regSuccess.style.display = "flex";

    var close = setTimeout(function() {
        location.reload();
    }, 2000);
});

/* filters */

    /* sort */

var sorting = document.querySelector(".sorting");
var sortList = document.querySelector(".sorting-list");

sorting.addEventListener("click", function() {
    sortList.classList.toggle("hidden")
});

var sortItems = document.querySelectorAll(".sorting-item");

localStorage.sorting = "";
for (var k = 0; k < sortItems.length; k++) {
    sortItems[k].addEventListener("click", function(e) {
        deactivate();
        if (localStorage.sorting == e.target.innerText.toLowerCase()) {
            e.target.classList.remove("active");
            localStorage.sorting = "";
        } else {
            e.target.classList.add("active");
            localStorage.sorting = e.target.innerText.toLowerCase();
        }
    });
}

function deactivate() {
    for (var i = 0; i < sortItems.length; i++) {
        sortItems[i].classList.remove("active");
    }
}

function comparePrice (objOne, objTwo) {
    if (objOne.price < objTwo.price) {
        return -1;
    } else if (objOne.price > objTwo.price) {
        return 1;
    } else {
        return 0;
    }
}
function comparePriceReverse (objOne, objTwo) {
    if (objOne.price < objTwo.price) {
        return 1;
    } else if (objOne.price > objTwo.price) {
        return -1;
    } else {
        return 0;
    }
}
function compareName (objOne, objTwo) {
    if (objOne.prodName < objTwo.prodName) {
        return -1;
    } else if (objOne.prodName > objTwo.prodName) {
        return 1;
    } else {
        return 0;
    }
}
function compareNameReverse (objOne, objTwo) {
    if (objOne.prodName < objTwo.prodName) {
        return 1;
    } else if (objOne.prodName > objTwo.prodName) {
        return -1;
    } else {
        return 0;
    }
}

Array.prototype.sortByPrice = function() {
    return this.sort(comparePrice);
}
Array.prototype.sortByPriceReverse = function() {
    return this.sort(comparePriceReverse);
}
Array.prototype.sortByName = function() {
    return this.sort(compareName);
}
Array.prototype.sortByNameReverse = function() {
    return this.sort(compareNameReverse);
}

var pricedes = document.getElementById("pricedes");
var priceas = document.getElementById("priceas");
var namedes = document.getElementById("namedes");
var nameas = document.getElementById("nameas");

pricedes.addEventListener("click", function(e) {
    var result = JSON.parse(localStorage.products);
    if (e.target.classList.contains("active")) {
        result.sortByPriceReverse();
    }
    generatePosts(result);
    paginate(result);
    setTimer(result);
});
priceas.addEventListener("click", function(e) {
    var result = JSON.parse(localStorage.products);
    if (e.target.classList.contains("active")) {
        result.sortByPrice();
    }
    generatePosts(result);
    paginate(result);
    setTimer(result);
})
namedes.addEventListener("click", function(e) {
    var result = JSON.parse(localStorage.products);
    if (e.target.classList.contains("active")) {
        result.sortByNameReverse();
    }
    generatePosts(result);
    paginate(result);
    setTimer(result);
})
nameas.addEventListener("click", function(e) {
    var result = JSON.parse(localStorage.products);
    if (e.target.classList.contains("active")) {
        result.sortByName();
    }
    generatePosts(result);
    paginate(result);
    setTimer(result);
})

    /* filter-price */

var priceFilter = document.querySelector(".filter-price");
var priceInputs = document.querySelector(".price-inputs");

priceFilter.addEventListener("click", function(e) {
    if (e.target == priceFilter) {
        priceInputs.classList.toggle("hidden");
    }
});

var applyPrice = document.querySelector(".apply-btn");
var clearPrice = document.querySelector(".clear-btn");

applyPrice.addEventListener("click", function() {
    var from = document.querySelector(".price-from").value;
    var to = document.querySelector(".price-to").value;

    priceFiltrate(from, to);
});
clearPrice.addEventListener("click", function() {
    document.querySelector(".price-from").value = "";
    document.querySelector(".price-to").value = "";

    applyPrice.click();
});

function priceFiltrate(from, to) {
    var result = [];
    for (var i = 0; i < JSON.parse(localStorage.products).length; i++) {
        if (from) {
            if (JSON.parse(localStorage.products)[i].price >= from) {
                if (to) {
                    if (JSON.parse(localStorage.products)[i].price <= to) {
                        result.push(products[i]);
                    }
                } else {
                    result.push(JSON.parse(localStorage.products)[i]);
                }
            }
        } else if (to) {
            if (JSON.parse(localStorage.products)[i].price <= to) {
                result.push(JSON.parse(localStorage.products)[i]);
            }
        } else {
            result.push(JSON.parse(localStorage.products)[i]);
        }
    }

    generatePosts(result);
    paginate(result);
    setTimer(result);
    priceFilter.click();
}

    /* filter-category */

var ctgFilter = document.querySelector(".filter-category");
var ctgList = document.querySelector(".category-list");

ctgFilter.addEventListener("click", function() {
    ctgList.classList.toggle("hidden")
});

var ctgItems = document.querySelectorAll(".category-item");


localStorage.category = "";
for (var i = 0; i < ctgItems.length; i++) {
    ctgItems[i].addEventListener("click", function(e) {
        deactivateCtg();
        if (localStorage.category == e.target.innerHTML.toLowerCase()) {
            e.target.classList.remove("active");
            localStorage.category = "";
        } else {
            e.target.classList.add("active");
            localStorage.category = e.target.innerHTML.toLowerCase();
        }
        ctgFiltrate(e.target.innerHTML.toLowerCase(), e);
    });
}

function deactivateCtg() {
    for (var i = 0; i < ctgItems.length; i++) {
        ctgItems[i].classList.remove("active");
    }
}

function ctgFiltrate(ctgName, event) {
    var result = [];
    if (event.target.classList.contains("active")) {
        for (var i = 0; i < JSON.parse(localStorage.products).length; i++) {
            if (JSON.parse(localStorage.products)[i].category === ctgName) {
                result.push(JSON.parse(localStorage.products)[i]);
            }
        }
    } else {
        result = JSON.parse(localStorage.products);
    }

    generatePosts(result);
    paginate(result);
    setTimer(result);
}

document.addEventListener("click", function(e) {
    if (e.target != sorting) {
        if (!sortList.classList.contains("hidden")) {
            sortList.classList.add("hidden");
        }
    }

    if (e.target != priceFilter) {
        if (e.path[1] != priceInputs) {
            if (!priceInputs.classList.contains("hidden")) {
                priceInputs.classList.add("hidden");
            }
        }
    }

    if (e.target != ctgFilter) {
        if (!ctgList.classList.contains("hidden")) {
            ctgList.classList.add("hidden");
        }
    }
});

/* submenu */

var buyLinks = document.querySelectorAll(".buy-link");

for (var m = 0; m < buyLinks.length; m++) {
    buyLinks[m].addEventListener("click", function(e) {
        document.getElementById("goToBuy").click();
        for (var j = 0; j < ctgItems.length; j++) {
            if (e.target.innerText == ctgItems[j].innerHTML) {
                ctgItems[j].click();
            }
        }
    });
}

/* slider */

var slideIndex = 1;
var slides = document.getElementsByClassName("slider");
var dots = document.getElementsByClassName("dot");

var intervalId = setInterval(nextSlide, 4000);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    if (n > slides.length)
        slideIndex = 1;
    if (n < 1)
        slideIndex = slides.length;

    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("fade");
    }

    for (var i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].classList.add("fade");
    dots[slideIndex-1].classList.add("active");
}

function nextSlide(){
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("fade");
    }

    for (var i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

	slides[slideIndex-1].style.display = 'none';
	slides[slideIndex-1].classList.remove("fade");
    dots[slideIndex-1].classList.remove("active");

	slideIndex++;
    if (slideIndex > slides.length)
        slideIndex = 1;
    if (slideIndex < 1)
        slideIndex = slides.length;

	slides[slideIndex-1].style.display = 'block';
	slides[slideIndex-1].classList.add("fade");
    dots[slideIndex-1].classList.add("active");
}

/* search */

function find(query) {
    var prods = JSON.parse(localStorage.products), result = [];

    var desc = document.querySelector(".search-desc");
    desc.innerText = 'Search Output Form. Your query "' + query + '"';

    for (var i = 0; i < prods.length; i++) {
        if (prods[i].prodName.toLowerCase().indexOf(query.toLowerCase()) >= 0 || prods[i].description.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
            result.push(prods[i]);
        }
    }

    return result;
}

var searchBtn = document.querySelector(".search-btn");
var searchLine = document.querySelector(".search-line");
var output = document.querySelector(".search-output");

searchLine.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        searchBtn.click();
    }
});

searchBtn.addEventListener("click", function() {
    var query = document.querySelector(".search-line").value;

    output.style.display = "block";
    generateSearchOutput(find(query.toLowerCase()));
});

var closeSearch = document.querySelector(".closesearch-btn");

closeSearch.addEventListener("click", function() {
    output.style.display = "none";
});

var searchPosts = document.getElementById("search-posts")

function generateSearchOutput(array) {
    searchPosts.innerHTML = "";
    for (var i = 0; i < array.length; i++) {
        var post = document.createElement("div");
        post.classList.add("search-post");

        var countdown = document.createElement("div");
        countdown.classList.add("search-countdown");

        var amount = document.createElement("span");
        amount.classList.add("ctdamount-search");
        var date = new Date(null);
        date.setSeconds(array[i]["amountHours"]*3600 - secondsFromStart);
        var result = date.toISOString().substr(11, 8);
        amount.innerText = result;

        var picture = document.createElement("img");
        picture.classList.add("search-img");
        picture.setAttribute("src", "" + array[i]["picture"]);

        var price = document.createElement("p");
        price.classList.add("search-price");
        price.innerText = "Price: $" + array[i]["price"];
        var finishPrice = document.createElement("span");
        finishPrice.classList.add("search-finish");
        finishPrice.innerText = "Final: $" + array[i]["finishPrice"];

        var priceStep = document.createElement("p");
        priceStep.classList.add("post-step");
        priceStep.innerText = array[i]["priceStep"];

        var prodName = document.createElement("a");
        prodName.classList.add("search-name");
        prodName.innerText = "" + array[i]["prodName"];

        var prodDescription = document.createElement("p");
        prodDescription.classList.add("search-description");
        prodDescription.innerText = "" + array[i]["description"];

        var bid = document.createElement("a");
        bid.classList.add("post-submit");
        bid.innerText = "Submit a bid";

        var buy = document.createElement("a");
        buy.classList.add("post-buy");
        buy.innerText = "Buy now";

        var photoBlock = document.createElement("div");
        photoBlock.classList.add("photo-block");
        var buyBlock = document.createElement("div");
        buyBlock.classList.add("buy-block");
        var buyBtns = document.createElement("div");
        buyBtns.classList.add("buy-btns");
        var buyDesc = document.createElement("div");
        buyDesc.classList.add("buy-desc");

        countdown.appendChild(amount);
        photoBlock.appendChild(countdown);
        photoBlock.appendChild(picture);
        post.appendChild(photoBlock);
        price.appendChild(finishPrice);
        buyBlock.appendChild(price);
        buyBlock.appendChild(priceStep);
        buyBtns.appendChild(bid);
        buyBtns.appendChild(buy);
        buyBlock.appendChild(buyBtns);
        post.appendChild(buyBlock);
        buyDesc.appendChild(prodName);
        buyDesc.appendChild(prodDescription);
        post.appendChild(buyDesc);

        searchPosts.appendChild(post);
    }
}

/* pagination */

function paginate(array) {
    var postsCount = array.length;
    var postsPerPage = 8;
    var pagesCount = Math.ceil(postsCount / postsPerPage);

    var cur_posts = document.querySelectorAll(".current-post");
    var paginat = document.querySelector(".pagination");
    var page = "";

    for (var i = 0; i < pagesCount; i++) {
        page += "<div class='pagination-item' onclick='pagination(event, " + postsPerPage + ")' data-page=" + i * postsPerPage + " id='page" + (i + 1) + "'>" + (i + 1) + "</div>";
    }
    paginat.innerHTML = page;

    for (var i = 0; i < cur_posts.length; i++) {
        cur_posts[i].style.display = "none";
        cur_posts[i].classList.remove("fade");
    }

    if (postsCount < postsPerPage) {
        postsPerPage = postsCount;
    }
    for (var i = 0; i < postsPerPage; i++) {
        cur_posts[i].style.display = "block";
        cur_posts[i].classList.add("fade");
    }

    var active_page = document.getElementById("page1");
    active_page.classList.add("active");
}

function pagination(event, postsPerPage) {
    var e = event || window.event;
    var target = e.target;
    var id = target.id;

    if (target.tagName.toLowerCase() != "div") return;

    var pagItems = document.querySelectorAll(".pagination-item");

    for (var i = 0; i < pagItems.length; i++) {
        if (pagItems[i].classList.contains("active")) {
            var active_page = pagItems[i];
        }
    }

    var pageNumber = id.substr(4);
    var data_page = +target.dataset.page;
    active_page.classList.remove("active");
    active_page = document.getElementById(id);
    active_page.classList.add("active");

    var j = 0;
    var cur_posts = document.querySelectorAll(".current-post");
    for (var i = 0; i < cur_posts.length; i++) {
        cur_posts[i].style.display = "none";
        cur_posts[i].classList.remove("fade");
    }

    for (var i = data_page; i < cur_posts.length; i++) {
        if (j >= postsPerPage) break;
        cur_posts[i].style.display = "block";
        cur_posts[i].classList.add("fade");
        j++;
    }
}

/* scrolling */

var anchorLinks = document.querySelectorAll('[href^="#"]');
for (var n = 0; n < anchorLinks.length; n++) {
    anchorLinks[n].addEventListener('click', function(e) {
        e.preventDefault();
        var scrolled = window.pageYOffset || document.documentElement.scrollTop, hash = this.hash,
        topOfAnchor = document.querySelector(hash).getBoundingClientRect().top + scrolled, start = performance.now();
        requestAnimationFrame(step);

        function step(time) {
            var progress = (time - start) / 900;
            if (progress > 1) {
                progress = 1;
            }
            window.scrollTo(0, scrolled + ((topOfAnchor - 80 - scrolled) * progress));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
    });
}

/* toTop */

window.onscroll = function() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > 500) {
        document.getElementById("toTop").classList.add("active");
    } else {
        document.getElementById("toTop").classList.remove("active");
    }

    /* fixed navbar */

    if (scrolled > 130) {
        document.querySelector(".navbar-main__outer").classList.add("fixed");
        document.querySelector(".navbar-main__outer").classList.remove("unfix");
        document.querySelector(".navbar-main__outer").classList.add("fix");
        document.querySelector("main").style.marginTop = "130px";

    } else {
        document.querySelector(".navbar-main__outer").classList.remove("fixed");
        document.querySelector(".navbar-main__outer").classList.remove("fix");
        document.querySelector(".navbar-main__outer").classList.add("unfix");
        document.querySelector("main").style.marginTop = "";
    }
}

/* maps */

function initMap() {
    var location = {lat: 50.4486136, lng: 30.4564757};
    var map = new google.maps.Map(document.getElementById("map"), {
      center: location,
      zoom: 17,
      disableDefaultUI: true
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP
    });
}


generatePosts(JSON.parse(localStorage.products));
paginate(JSON.parse(localStorage.products));
setTimer(JSON.parse(localStorage.products));

isSigned();
showSlides(slideIndex);

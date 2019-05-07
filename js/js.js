/* JSON */

var products = JSON.parse('[ {"amountHours": 1, "picture": "img/prod1.jpg", "price": 123, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver", "category": "laptop"},{"amountHours": 2, "picture": "img/prod2.jpg", "price": 156, "finishPrice": 471, "priceStep": 15, "prodName": "Angle iPhone 6s 32 Gb Silver", "category": "sweetshot"},{"amountHours": 3, "picture": "img/prod4.jpg", "price": 17, "finishPrice": 471, "priceStep": 15, "prodName": "Whose iPhone 6s 32 Gb Silver", "category": "boots"} ]');
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

        var prodName = document.createElement("a");
        prodName.classList.add("post-name");
        prodName.setAttribute("href", "#");
        prodName.innerText = "" + array[i]["prodName"];

        var bid = document.createElement("a");
        bid.classList.add("post-submit");
        bid.setAttribute("href", "#");
        bid.innerText = "Submit a bid";

        var buy = document.createElement("a");
        buy.classList.add("post-buy");
        buy.setAttribute("href", "#");
        buy.innerText = "Buy now";

        countdown.appendChild(amount);
        post.appendChild(countdown);
        post.appendChild(picture);
        price.appendChild(finishPrice);
        post.appendChild(price);
        post.appendChild(priceStep);
        post.appendChild(prodName);
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
    for (var i = 0; i < ctdown.length; i++) {
        timer(ctdown[i], array[i].amountHours);
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

/* pagination */

function paginate(array) {
    var postsCount = array.length;
    var postsPerPage = 3;
    var pagesCount = Math.ceil(postsCount / postsPerPage);

    var paginat = document.querySelector(".pagination");
    var page = "";

    for (var i = 0; i < pagesCount; i++) {
        page += "<div class='pagination-item' onclick='pagination(event)' data-page=" + i * postsPerPage + " id='page" + (i + 1) + "'>" + (i + 1) + "</div>";
    }
    paginat.innerHTML = page;

    var cur_posts = document.querySelectorAll(".current-post");
    for (var i = 0; i < postsPerPage; i++) {
        cur_posts[i].style.display = "block";
        cur_posts[i].classList.add("fade");
    }

    var active_page = document.getElementById("page1");
    active_page.classList.add("active");

    function pagination(event) {
        var e = event || window.event;
        var target = e.target;
        var id = target.id;

        if (target.tagName.toLowerCase() != "div") return;

        var pageNumber = id.substr(4);
        var data_page = +target.dataset.page;
        active_page.classList.remove("active");
        active_page = document.getElementById(id);
        active_page.classList.add("active");

        var j = 0;
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
}

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
for (var i = 0; i < sortItems.length; i++) {
    sortItems[i].addEventListener("click", function(e) {
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
    setTimer(result);
});
priceas.addEventListener("click", function(e) {
    var result = JSON.parse(localStorage.products);
    if (e.target.classList.contains("active")) {
        result.sortByPrice();
    }
    generatePosts(result);
    setTimer(result);
})
namedes.addEventListener("click", function(e) {
    var result = JSON.parse(localStorage.products);
    if (e.target.classList.contains("active")) {
        result.sortByNameReverse();
    }
    generatePosts(result);
    setTimer(result);
})
nameas.addEventListener("click", function(e) {
    var result = JSON.parse(localStorage.products);
    if (e.target.classList.contains("active")) {
        result.sortByName();
    }
    generatePosts(result);
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
        if (localStorage.category == e.target.innerText.toLowerCase()) {
            e.target.classList.remove("active");
            localStorage.category = "";
        } else {
            e.target.classList.add("active");
            localStorage.category = e.target.innerText.toLowerCase();
        }
        ctgFiltrate(e.target.innerText.toLowerCase(), e);
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
    setTimer(result);
}
/*
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
*/
/* scrolling */

var anchorLinks = document.querySelectorAll('[href^="#"]');
for (var i = 0; i < anchorLinks.length; i++) {
    anchorLinks[i].addEventListener('click', function(e) {
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

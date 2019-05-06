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

/* JSON */

var products = JSON.parse('[ {"amountHours": 12, "picture": "img/prod1.jpg", "price": 350, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver"},{"amountHours": 12, "picture": "img/prod2.jpg", "price": 350, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver"},{"amountHours": 12, "picture": "img/prod4.jpg", "price": 350, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver"},{"amountHours": 12, "picture": "img/prod1.jpg", "price": 350, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver"},{"amountHours": 12, "picture": "img/prod3.jpg", "price": 350, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver"},{"amountHours": 12, "picture": "img/prod4.jpg", "price": 350, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver"},{"amountHours": 12, "picture": "img/prod1.jpg", "price": 350, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver"},{"amountHours": 12, "picture": "img/prod2.jpg", "price": 350, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver"},{"amountHours": 12, "picture": "img/prod1.jpg", "price": 350, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver"},{"amountHours": 12, "picture": "img/prod2.jpg", "price": 350, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver"},{"amountHours": 12, "picture": "img/prod3.jpg", "price": 350, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver"},{"amountHours": 12, "picture": "img/prod4.jpg", "price": 350, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver"},{"amountHours": 12, "picture": "img/prod2.jpg", "price": 350, "finishPrice": 471, "priceStep": 15, "prodName": "Apple iPhone 6s 32 Gb Silver"} ]');

var posts = document.getElementById("posts");

for (var i = 0; i < products.length; i++) {
    var post = document.createElement("div");
    post.classList.add("current-post");

    var countdown = document.createElement("div");
    countdown.classList.add("post-countdown");

    var amount = document.createElement("span");
    amount.classList.add("countdown-amount");
    var date = new Date(null);
    date.setSeconds(products[i]["amountHours"]*3600);
    var result = date.toISOString().substr(11, 8);
    amount.innerText = result;

    var picture = document.createElement("img");
    picture.classList.add("post-img");
    picture.setAttribute("src", "" + products[i]["picture"]);

    var price = document.createElement("p");
    price.classList.add("post-price");
    price.innerText = "Price: $" + products[i]["price"];
    var finishPrice = document.createElement("span");
    finishPrice.classList.add("finish-price");
    finishPrice.innerText = "Final: $" + products[i]["finishPrice"];

    var priceStep = document.createElement("p");
    priceStep.classList.add("post-step");
    priceStep.innerText = products[i]["priceStep"];

    var prodName = document.createElement("a");
    prodName.classList.add("post-name");
    prodName.setAttribute("href", "#");
    prodName.innerText = "" + products[i]["prodName"];

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

/* timer */

var ctdown = document.querySelectorAll('.countdown-amount');
for (var i = 0; i < ctdown.length; i++) {
    timer(ctdown[i], products[i].amountHours);
}

function timer(item, time) {
    var count = time * 3600;
    var interval = setInterval(function() {
        var chas = new Date(null);
        chas.setSeconds(count);
        var result = chas.toISOString().substr(11, 8);
        item.innerText = result;
        count--;
        if (count < 0) {
            clearInterval(interval);
        }
    }, 1000);
}

/* pagination */

var postsCount = products.length;
var postsPerPage = 8;
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

isSigned();

    /* logout */

var logout = document.querySelector(".btn-logout");

logout.addEventListener("click", function() {
    localStorage.signed = "false";
    location.reload();
});

    /* registrate */

var regist = document.querySelector(".btn-reg");

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

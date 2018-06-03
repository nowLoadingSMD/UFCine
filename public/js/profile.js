var posted = document.getElementById("posted");
var favorites = document.getElementById("favorites");
var watchlist = document.getElementById("watchlist");

var btnPosted = document.getElementById("btn-posted");
var btnFavorites = document.getElementById("btn-favorites");
var btnWatchlist = document.getElementById("btn-watchlist");

btnFavorites.onclick = function(){
    favorites.style.display = "block";
    posted.style.display = "none";
    watchlist.style.display = "none";
    btnFavorites.className = "active";
    btnPosted.className = "";
    btnWatchlist.className = "";
};

btnPosted.onclick = function(){
    favorites.style.display = "none";
    posted.style.display = "block";
    watchlist.style.display = "none";
    btnFavorites.className = "";
    btnPosted.className = "active";
    btnWatchlist.className = "";
};

btnWatchlist.onclick = function(){
    favorites.style.display = "none";
    posted.style.display = "none";
    watchlist.style.display = "block";
    btnFavorites.className = "";
    btnPosted.className = "";
    btnWatchlist.className = "active";
};

// MENU NOTIFICATIONS

var answered = document.getElementById("answered");
var unanswered = document.getElementById("unanswered");
var comments = document.getElementById("comments");

var btnAnswered = document.getElementById("btn-answered");
var btnUnanswered = document.getElementById("btn-unanswered");
var btnComments = document.getElementById("btn-comments");

btnAnswered.onclick = function(){
    answered.style.display = "block";
    unanswered.style.display = "none";
    comments.style.display = "none";
    btnAnswered.className = "active";
    btnUnanswered.className = "";
    btnComments.className = "";
};

btnUnanswered.onclick = function(){
    answered.style.display = "none";
    unanswered.style.display = "block";
    comments.style.display = "none";
    btnAnswered.className = "";
    btnUnanswered.className = "active";
    btnComments.className = "";
};

btnComments.onclick = function(){
    answered.style.display = "none";
    unanswered.style.display = "none";
    comments.style.display = "block";
    btnAnswered.className = "";
    btnUnanswered.className = "";
    btnComments.className = "active";
};

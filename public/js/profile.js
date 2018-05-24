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


$(document).ready(function(){

    var url_string = window.location.href;
    var url = new URL(url_string);
    var userID = url.searchParams.get("id");

    let minhaListaAnchor = document.getElementById("minhaListaAnchor")
    let videosEnviadosAnchor = document.getElementById("videosEnviadosAnchor")

    minhaListaAnchor.setAttribute("href", `watchlist.html?id=${userID}`)
    videosEnviadosAnchor.setAttribute("href", `uploadedFilms.html?id=${userID}`)

})

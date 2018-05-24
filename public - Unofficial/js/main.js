let logged = false

async function checkLogged() {
    const tokenToCheck = {
        token: getCookie("token")
    }

    if (tokenToCheck.token === "") {

        return {
            valid: false
        }
    }

    let valid

    await $.post("/auth/verifyToken", tokenToCheck, async function(data) { 
        valid = await data
    })

    return valid

}

function logout(){
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}

(async function (){

    listVideos()

    $("#FeedbackUploadVideo").hide()

    logged =  await checkLogged()

    console.log(logged)

    if (logged.valid) {

        $("#login").hide()
        $("#register").hide()

        $("#formVideoUpload").show()

    } else {
        
        $("#formVideoUpload").hide()
        $("#perfil").hide()
        $("#logoutButton").hide()

    }
}())

async function uploadVideo(){
    
    console.log(getCookie("userId"))

    const video = {
        name: document.getElementById("videoName").value,
        publisher: getCookie("userId")
    }

    $.post("/api/video/uploadVideo", video, async (data) => {
        const error = await data.error

        if (error) {
            console.log("error")
        }
        
        $("#FeedbackUploadVideo").show()
    })


}

function listVideos() {

    $.post("/api/video/", 100, async (data) => {
        const dataToDisplay = await data
        console.log(dataToDisplay)
        displayVideos(dataToDisplay)
    })

}

function displayVideos(videos) {

    const videoDiv = document.getElementById("videosList")

    $("#videosList").empty()

    videos.forEach(video => {

        let item = ` 
        <ul class="videoItem">
            <h3 class="video-name">${video.name}</h3>
            <p class="video-publisher">${video.publisher}</p>
        <u/>
        `

        let itemNode = document.createElement("div");
        itemNode.innerHTML = item

        function encapsulateID() {
            function returnID() {
                return video._id
            }
            return returnID
        }

        let nodeID = encapsulateID()

        itemNode.addEventListener("click", function(){
            const id = {id : nodeID()}
            window.location.replace(`/api/video/videPlayer?id=${id.id}`);
        })

        $("#videosList").append(itemNode)

    })


}
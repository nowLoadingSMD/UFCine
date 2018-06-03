var btnComment = document.getElementById("btn-comment")

jQuery(document).ready(async function($){

    // let logged = await checkLogged();
    // if (!logged) {
    //     // document.getElementById().style.display = "none";
    //     console.log("he")
    //     $(".block-logged").css("display", "none");
        
    // } 

    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");

    // var id = "5b09a72be6643d78fc55f11a"

    let video;
    let productionInfo;
    let comments; 

    await $.get(`/api/video/getVideoByID?id=${id}`, (data) => {
       video = data;
    }) 

    await $.get(`/api/productionInfo/?videoID=${video._id}`, (data) => {
        productionInfo = data
    });

    await $.get(`/api/comment/?videoID=${video._id}`, (data) => {
        comments = data
    })

    videoID = video.videoID;
    displayVideo(video, productionInfo, comments);
   
});


var displayVideo = function(video, productionInfo, comments) {

    let videoName = document.getElementById("videoName");
    let productionInfoDescription = document.getElementById("productionInfoDescription");

    videoName.innerHTML = video.name;
    productionInfoDescription.innerHTML = productionInfo.description;

    $("#videoPlayer source").attr("src", `/api/video/videoStream?id=${video._id}`);
    document.getElementById("videoPlayer").load()


    populateCommentList(comments);
    
}

btnComment.onclick = async function(){

    let commentContent = document.getElementById("commentContent").value;

    var url_string = window.location.href;
    var url = new URL(url_string)
    var id = url.searchParams.get("id");
    
    const comment = {
        videoID: id,
        userID: getCookie("userId"),
        content: commentContent
    };

    $.post("/api/comment/createComment", comment, (data) => {
        const err = data.err

        if (err) {
            alert("Problema ao enviar comentário");
        } else {
            alert("Comentário enviado");
        }
    });

    await $.get(`/api/comment/?videoID=${id}`, (data) => {
        populateCommentList(data);
    })

}

var populateCommentList = function(comments) {

    console.log(comments)

    comments.forEach( comment => {

        let item = `		
            <article class="imgProfile"><img src="../img/authors/Camila.jpg"></article>
            <h1>Nome de usuário</h1>
            <div class="contentComment">
                <p>${comment.content}</p>
            </div>
            <button class="btn-comment">Responder</button>
        `

        let itemNode = document.createElement("div");
        itemNode.className = "comment";
        itemNode.innerHTML = item;

        $("#commentList").append(itemNode);
    });

}
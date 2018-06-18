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

    // await $.get(`/api/productionInfo/?videoID=${video._id}`, (data) => {
    //     productionInfo = data
    // });

    await $.get(`/api/comment/?videoID=${video._id}`, (data) => {
        comments = data
    })

    videoID = video.videoID;
    // displayVideo(video, productionInfo, comments);
    populateCommentList(comments);

    var valor = 0;
    var applauses = 0;

    await $.get(`/api/video/getApplauses?id=${video._id}`, (data) => {
        applauses = data.applauses
    })

    console.log(applauses);

    $("#applauseIcon").hover(function() {
        $("#viewApplauses").show();
      })
      $("#applauseIcon").mouseleave(function() {
        $("#viewApplauses").hide();
      })

    $("#applauseIcon").mousedown(function(){
        if(valor<50){
            valor++
            applauses++
            $("#viewApplauses").text("+"+valor);
        }
        interval = setInterval(function() {
            if(valor<50){
                valor++
                applauses++
                $("#viewApplauses").text("+"+valor);
            }
         }, 200);
    })

    $(document).mouseup(function() {
        clearInterval(interval);

        $("#applauses").text(applauses + " aplausos");

        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
    
        const data = {
            applauses: valor,
            videoID: id,
            userID: getCookie("userId")
        }
    
        $.post("/api/video/setApplauses", data, (response) => {

        })

    })
   
});


// var displayVideo = function(video, productionInfo, comments) {

//     let videoName = document.getElementById("videoName");
//     let productionInfoDescription = document.getElementById("productionInfoDescription");

//     videoName.innerHTML = video.name;
//     productionInfoDescription.innerHTML = productionInfo.description;

//     $("#videoPlayer source").attr("src", `/api/video/videoStream?id=${video._id}`);
//     document.getElementById("videoPlayer").load()


//     populateCommentList(comments);
    
// }

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
                <p class="Comments">${comment.content}</p>
            </div>
        `

        let itemNode = document.createElement("div");
        itemNode.className = "comment newComments";
        itemNode.innerHTML = item;

        $("#commentList").append(itemNode);
    });

}

var watchListIcon = document.getElementById("watchListIcon")

watchListIcon.onclick = function() {

    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");

    const data = {
        videoID: id,
        userID: getCookie("userId")
    }

    $.post("/api/user/addToWatchlist", data, (response) => {
        const err = response.err
        const addedToWatchList = response.addedToWatchList

        if (err) {
            alert("Problema a adicioanr na watchlist");
        } else if (addedToWatchList) {
            $("#textFeedback").text("Vídeo adicionado na lista");
            $("#feedbackBar").animate({opacity: '1'});
            $("#feedbackBar").show();
            function esconder(){
                $("#feedbackBar").animate({opacity: '0'});
            }
            setTimeout(esconder, 3000);
        } else {
            $("#textFeedback").text("Vídeo removido da lista");
            $("#feedbackBar").animate({opacity: '1'});
            $("#feedbackBar").show();
            function esconder(){
                $("#feedbackBar").animate({opacity: '0'});
            }
            setTimeout(esconder, 3000);
        }
    })

}

// var applauseIcon = document.getElementById("applauseIcon");
  




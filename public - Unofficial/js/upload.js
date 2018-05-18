function upload() {
    console.log(getCookie("token"))
    
    const token = {
        token: getCookie("token")
    }

    $.post("/api/video/uploadVideo", token, function(data){
        var error = data.error 

        if (error === undefined) {
            console.log("Upload concluido")
        } else {
            console.log(error)
        }
    })
}

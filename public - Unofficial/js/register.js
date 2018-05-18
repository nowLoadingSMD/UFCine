function register(){

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }

    $.post("/auth/register", user, (data) => {
        const error = data.error

        if (error === undefined) {
            setCookie("userId", data.user._id, 1)
            setCookie("token", "Bearer " + data.token, 1)
            $("#FeedbackRegistrado").show()

            window.location.replace("../index.html");
        } else {
            $("#FeedbackError").show()
        }

    })


}

(function (){

    $("#FeedbackError").hide()
    $("#FeedbackRegistrado").hide()

}())
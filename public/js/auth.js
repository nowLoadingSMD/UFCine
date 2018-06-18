var login = async function() {

    const user = {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value
    };
 
    let logged;

    await $.post("/auth/authenticate", user, (data) => {
      const err = data.err

      if (!err) {
          setCookie("userId", data.user._id, 1)
          setCookie("token", "Bearer " + data.token, 1)
          logged = true 
      } else {

          if (err === "User not found") {
            document.getElementById("errorEmail").style.display = "block";
          } else if (err === "Invalid password") {
            document.getElementById("errorPassword").style.display = "block";
          }
          
        logged = false
      }
    })

    return logged
}

var signUp = async function(){

  const user = {
    name: document.getElementById("signUpName").value,
    userName: document.getElementById("signUpUserName").value,
    email: document.getElementById("signUpEmail").value,
    password: document.getElementById("signUpPassword").value,
    accountActivated: true,
    favorites: [],
    watchList: [],
    isProducer: false,
    isPortfolioActivated: false,
    portfolioDescription: ""
  }

  console.log(user)

  let signed;

  await $.post("/auth/register", user, (data) => {
    const err = data.err

    console.log(err)

    if (!err) {
        setCookie("userId", data.user._id, 1)
        setCookie("token", "Bearer " + data.token, 1)
        signed = true
    } else {
        signed = false
    }

  })

  return signed

}

var checkLogged = async function() {

    const tokenToCheck = {
        token: getCookie("token")
    }

    if (tokenToCheck.token === "") {

        return false
    }

    let valid

    await $.post("/auth/verifyToken", tokenToCheck, async function(data) { 
        valid = await data.valid
    })

    return valid

}

var logout = function(){
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}
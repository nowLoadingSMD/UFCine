var logar = document.getElementById("btn-goLogin");

logar.onclick = async function(){

    document.getElementById("errorEmail").style.display = "none";
    document.getElementById("errorPassword").style.display = "none";
  
    if ( await login() ){  
        window.location.href = "/pages/home.html"
    } 
    // else {
    //   document.getElementById("errorEmail").style.display = "block";
    //   document.getElementById("errorPassword").style.display = "block";
    // }
  
  }
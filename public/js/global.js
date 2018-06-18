jQuery(document).ready(async function($) { 
    $(".scroll").click(function(event){        
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 600);
    });

    console.log(await checkLogged())

    if (await checkLogged()) {
      document.getElementById("btn-login").style.display = "none";
      document.getElementById("btn-user").style.display = "block";
      document.getElementById("showDropdown").style.display = "block";
      document.getElementById("uploadVideo").style.display = "block";

      $(".block-logged").css("display", "block");

      document.getElementById("profileAnchor").href = `/pages/profile.html?id=${getCookie('userId')}`;
      // document.uploadForm.action = `/api/video/uploadVideo?id=${getCookie('userId')}`;
    } else {
      $(".block-logged").css("display", "none");
    }

});

$(document).ready(async function(){
  if ( await checkLogged()) {
    

      const userID = getCookie("userId");

      $.get(`/api/user/getWatchList?id=${userID}`, (response) => {

          $(".actionLabel").each(function(){

              const videoID = $(this).attr("id").replace("ActionLabel", "");

              console.log(videoID);

              if ( response.watchList.indexOf(videoID) == -1 ) {
              
                 $(this).html("Adicionar a lista");

              } else if ( response.watchList.indexOf(videoID) != -1 ) {

                  $(this).html("Remover da lista");
      
              }
          })

      })

  } else {
      $(".addBlock").hide();
  }

  

})
// Get the modal
var modal = document.getElementById('myModal');
		
// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
// var span2 = document.getElementsByClassName("close")[1];
// var span3 = document.getElementsByClassName("close")[2];

// var btnSignUp = document.getElementById("btn-modal-signUp");
// var btnLogin = document.getElementById("btn-modal-login");
// var btnUpload = document.getElementById("btn-upload");
// var modalLogin = document.getElementById("modal-login");
// var modalSignUp = document.getElementById("modal-signUp");
// var modalUpload = document.getElementById("modal-upload");

// var modalContent = document.getElementsByClassName('modal-content')[0];

// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }
// span2.onclick = function() {
//   modal.style.display = "none";
// }
// span3.onclick = function() {
//   modal.style.display = "none";
// }

// btnSignUp.onclick = function(){
//   modalLogin.style.display = "none";
//   modalSignUp.style.display = "block";
//   modalUpload.style.display = "none";
// }

// btnLogin.onclick = function(){
//   modalLogin.style.display = "block";
//   modalSignUp.style.display = "none";
//   modalUpload.style.display = "none";
// }

// btnUpload.onclick = function(){
//   modalContent.style.width = "80%";
//   modalContent.style.height = "auto";
//   modalContent.style.marginTop = "-50px";
//   modalLogin.style.display = "none";
//   modalSignUp.style.display = "none";
//   modal.style.display = "block";
//   modalUpload.style.display = "block";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// 

// var logarMobile = document.getElementById("iconLogin");

var showModal = document.getElementById("btn-logout");
var modal = document.getElementById("myModal");
var cancelLogout = document.getElementById("btn-cancelLogout");
var btnLogout = document.getElementById("btn-confirmLogout");
var user = document.getElementById("btn-user");
var uploadVideo = document.getElementById("uploadVideo");
// // Get the button that opens the login
var btn = document.getElementById("btn-login");
var showDropdown = document.getElementById("showDropdown");
var dropdown = document.getElementById("dropdown-content");

showModal.onclick = function(){
  modal.style.display = "block";
}
cancelLogout.onclick = function(){
  modal.style.display = "none";
}
btnLogout.onclick = function(e){
  // e.preventDefault()
  logout();
  modal.style.display = "none";
  btn.style.display = "block";
  user.style.display = "none";
  showDropdown.style.display = "none";
  dropdown.style.display = "none";
  uploadVideo.style.display = "none"
  // modalLogin.style.display = "block";
  // modalUpload.style.display = "none";
  // modalContent.style.width = "40%";
  // modalContent.style.height = "350px";
  // modalContent.style.marginTop = "auto";
}

// var addItem = document.getElementById("addItem");
// var list = document.getElementById("list");
// // var addItem2 = document.getElementById("addItem2");
// // var list2 = document.getElementById("list2");

// addItem.onclick = function(){
//   var textfield = document.createElement("input");
//   textfield.type = "text";
//   textfield.placeholder = "Nome";
//   list.appendChild(textfield);
// }

// addItem2.onclick = function(){
//   var textfield = document.createElement("input");
//   textfield.type = "text";
//   textfield.placeholder = "Nome";
//   list2.appendChild(textfield);

//   // $(".block-logged").css("display", "none");
// }

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        console.log()
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
      });
}
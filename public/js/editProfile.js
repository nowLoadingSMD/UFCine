function checkPortfolio() {
    // Get the checkbox
    var checkBox = document.getElementById("slideOne");
    // Get the output text
    var btnDisplay = document.getElementById("btn-edit");
  
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
        btnDisplay.style.display = "block";
    } else {
        btnDisplay.style.display = "none";
    }
}
showModalType = document.getElementById("btn-editType");
showModalConfirm = document.getElementById("btn-confirmModal");
showModalPortfolio = document.getElementById("btn-edit");

modalEdit = document.getElementById("modalEditType");
modalEditConfirm = document.getElementById("modalEditTypeConfirm");
modalEditPortfolio = document.getElementById("modalEditPortfolio");

exitModalType = document.getElementById("btn-cancelModal");
exitModalConfirm = document.getElementById("btn-ok");
exitModalPortfolio = document.getElementById("btn-cancelPortfolio");

showModalType.onclick = function(){
    modalEdit.style.display = "block";
}

showModalConfirm.onclick = function(){
    modalEditConfirm.style.display = "block";
    modalEdit.style.display = "none";
}

showModalPortfolio.onclick = function(){
    modalEditPortfolio.style.display = "block";
}


exitModalConfirm.onclick = function(){
    modalEditConfirm.style.display = "none";
}

exitModalType.onclick = function(){
    modalEdit.style.display = "none";
}

exitModalPortfolio.onclick = function(){
    modalEditPortfolio.style.display = "none";
}
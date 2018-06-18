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
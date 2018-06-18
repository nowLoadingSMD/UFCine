var qtdListItens; 
const tagsOnServer = []
const sugestedTags = []
const selectedTags = []

jQuery(document).ready(async function($) { 
      document.uploadForm.action = `/api/video/uploadVideo?id=${getCookie('userId')}`;

      $("#descriptionList").hide();
      $("#colaborativeList").hide();

      qtdListItens = 0;
      
      await $.get("/api/tag", (data) => {
        tags = data.map((item) => { 
          return item.name
        })
        console.log(tags)
        autocomplete(document.getElementById("tagsInput"), tags);
      })      

      $("#helpIcon").hover(function() {
        $("#helpInfo").show();
      })
      $("#helpIcon").mouseleave(function() {
        $("#helpInfo").hide();
      })
});

var addItem = document.getElementById("addItem");
var list = document.getElementById("descriptionList");

addItem.onclick = function(){

  // <div class="descriptionListItem">
  // <i class="fas fa-plus-circle" id="addItem"></i>
  // <select id="role" name="role">
  //         <option value="">Função</option>
  //         <option value="director">Diretor</option>
  //         <option value="script">Roteiro</option>
  //         <option value="actor">Ator(a)</option>
  // </select>
  // <input type="text" name="studentName" class="textfield" placeholder="Nome do aluno(a)"/>
  // </div>

  var div = document.createElement("div");

  div.setAttribute("class", "descriptionListItem");

  var icon = document.createElement("img");
  icon.setAttribute("id", "addItem");

  icon.addEventListener("click", function(){
    this.parentNode.parentNode.removeChild(this.parentElement);
  })

  var select = document.createElement("select");
  select.setAttribute("id", "role");
  select.setAttribute("name", `role${qtdListItens}`);

  var op1 = document.createElement("option");
  op1.setAttribute("value", "");
  op1.text = "Função";

  var op2 = document.createElement("option");
  op2.setAttribute("value", "director");
  op2.text = "Diretor";

  var op3 = document.createElement("option");
  op3.setAttribute("value", "script");
  op3.text = "Roteiro";

  var op4 = document.createElement("option");
  op4.setAttribute("value", "actor");
  op4.text = "Ator(a)";

  select.appendChild(op1);
  select.appendChild(op2);
  select.appendChild(op3);
  select.appendChild(op4);

  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", `studentName${qtdListItens}`);
  input.setAttribute("class", "textfield");
  input.setAttribute("placeholder", "Nome do aluno(a)");
  


  div.appendChild(icon);
  div.appendChild(select);
  div.appendChild(input);

  list.appendChild(div);
  qtdListItens++;
}

$('#btn-cancel').on('click', function (){
  $('#uploadForm').submit(function(e){
    return false;
  }); //.trigger('submit');
});

$('#btn-publish').on('click', function (){

  let errors = 0;

  if( document.getElementById("videoMP4").files.length == 0 ){
    $("#errorVideo").show();
    errors++
  } else {
    $("#errorVideo").hide();
  }

  if( document.getElementById("thumbnail1").files.length == 0 ){
    $("#errorBanner1").show();
    errors++
  } else {
    $("#errorBanner1").hide();
  }

  if( document.getElementById("thumbnail2").files.length == 0 ){
    $("#errorBanner2").show();
    errors++
  } else {
    $("#errorBanner2").hide();
  }

  if( document.getElementById("titleFilm").value == "" ){
    $("#errorTitle").show();
    errors++
  } else {
    $("#errorTitle").hide();
  }

  if( document.getElementById("description").value == "" ){
    $("#errorDescription").show();
    errors++
  } else {
    $("#errorDescription").hide();
  }
  
  if( document.getElementById("year").value == "" ){
    $("#errorYear").show();
    errors++
  } else {
    $("#errorYear").hide();
  }

  if( document.getElementById("classification").value == "" ){
    $("#errorClassification").show();
    errors++
  } else {
    $("#errorClassification").hide();
  }

  if( document.getElementById("genre").value == "" ){
    $("#errorGenre").show();
    errors++
  } else {
    $("#errorGenre").hide();
  }

  console.log(errors)

  if (errors == 0) {
    
    document.getElementById("uploadForm").submit();

  } else {
    $('#uploadForm').submit(function(e){
      return false
    });
  }



  // $('#uploadForm').submit(); //.trigger('submit');
});

$('#castType').change(function(){

  let selectValue = $(this).val();

  if (selectValue === "descriptionList") {
    $("#descriptionList").show();
    $("#colaborativeList").hide();
  } else if (selectValue === "colaborativeList") {
    $("#descriptionList").hide();
    $("#colaborativeList").show();
  } else {
    $("#descriptionList").hide();
    $("#colaborativeList").hide();
  }

});

var tagsInput = document.getElementById("tagsInput");

let checkIcon = document.getElementById("checkIcon");

checkIcon.onclick = function() {

  const tag = {
    name: tagsInput.value
  }

  selectedTags.push(tag)

  document.getElementById("tagsInputForSending").value = "";
    
  selectedTags.forEach(function(tag) {
    document.getElementById("tagsInputForSending").value += tag.name + ",";
  })

  let div = document.createElement("div");
  div.setAttribute("class", "tag tagLabel");

  let p = document.createElement("p");
  p.innerHTML = tagsInput.value;

  div.appendChild(p);

  let img = document.createElement("img");
  img.setAttribute("src", "../img/icons/removeFilm.svg");
  img.setAttribute("class", "tagIcon");
  div.appendChild(img);

  document.getElementById("selectedTags").appendChild(div)

  tagsInput.value = ""

  img.addEventListener("click", function(){
    selectedTags.pop(tag);
    this.parentNode.parentNode.removeChild(this.parentElement);

    document.getElementById("tagsInputForSending").value = "";

    selectedTags.forEach(function(tag) {
      document.getElementById("tagsInputForSending").value += tag.name + ",";
    })
 
  })
 
}

$("#videoMP4").change(function(){

  $("input[name='videoMP4']").each(function() {
    var fileName = $(this).val().split('/').pop().split('\\').pop();
    $("#videoName").text(fileName)
  });

  readURL(this)

})

function readURL(input, id) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(`#${id}`)
        .attr('src', e.target.result)
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function check() {
  // Get the checkbox
  var checkBox = document.getElementById("slideOne");
  // Get the output text
  // var btnDisplay = document.getElementById("editPortfolio");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
      // btnDisplay.style.display = "block";
      alert(true)
  } else {
      // btnDisplay.style.display = "none";
      alert(false)
  }
}

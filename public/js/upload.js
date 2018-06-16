jQuery(document).ready(function($) { 
      // document.uploadForm.action = `/api/video/uploadVideo?id=${getCookie('userId')}`;

      $("#descriptionList").hide();
      $("#colaborativeList").hide();
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

  var icon = document.createElement("i");
  icon.classList.add("fas");
  icon.classList.add("fa-plus-circle");
  icon.setAttribute("id", "addItem");

  icon.addEventListener("click", function(){
    this.parentNode.parentNode.removeChild(this.parentElement);
  })

  var select = document.createElement("select");
  select.setAttribute("id", "role");
  select.setAttribute("name", "role");

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
  input.setAttribute("name", "studentName");
  input.setAttribute("class", "textfield");
  input.setAttribute("placeholder", "Nome do aluno(a)");
  


  div.appendChild(icon);
  div.appendChild(select);
  div.appendChild(input);

  list.appendChild(div);
}

$('#btn-publish').on('click', function (){
  $('#uploadForm').submit(); //.trigger('submit');
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

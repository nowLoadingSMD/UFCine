jQuery(document).ready(function($) { 
      document.uploadForm.action = `/api/video/uploadVideo?id=${getCookie('userId')}`;
});

var addItem = document.getElementById("addItem");
var list = document.getElementById("list");

addItem.onclick = function(){
  var textfield = document.createElement("input");
  textfield.type = "text";
  textfield.placeholder = "Nome";
  textfield.className = "listNames";
  list.appendChild(textfield);
}

$('#btn-publish').on('click', function (){
  $('#uploadForm').submit(); //.trigger('submit');
});

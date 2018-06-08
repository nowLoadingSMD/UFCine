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

// $('.upload-btn').on('click', function (){
//     $('#upload-input').click();
//     $('.progress-bar').text('0%');
//     $('.progress-bar').width('0%');
// });

// $('#fileupload').bind('fileuploadsubmit', function (e, data) {
//     data.formData = {
//         userID: getCookie("userId"),
//         name: document.getElementById("titleFilm").value,
//         description: document.getElementById("description").value,
//         director: document.getElementById("director").value,
//         script: document.getElementById("script").value,
//         classification: document.getElementById("classification").value,
//         year: document.getElementById("year").value,
//         genre: document.getElementById("genre").value
//     };
//     if (!data.formData.name) {
//       return false;
//     }
// });

// $(function () {
//     $('#fileupload').fileupload({
//         dataType: 'json',
//         add: function (e, data) {
//             $("#btn-publish").off('click').on('click', function () {
//                 alert("enviar");
//                 data.submit();
//             });
//         },
//         done: function (e, data) {
//             $.each(data.result.files, function (index, file) {
//                 console.log("done")
//             });
//         },
//         progressall: function (e, data) {
//             var progress = parseInt(data.loaded / data.total * 100, 10);
//             $('#progress .bar').css(
//                 'width',
//                 progress + '%'
//             );
//         }
//     });
// });

// $('#upload-input').on('change', function(){

//     var files = $(this).get(0).files;
  
//     if (files.length > 0){
//       // One or more files selected, process the file upload

//             // create a FormData object which will be sent as the data payload in the
//         // AJAX request
//         var formData = new FormData();

//         // loop through all the selected files
//         for (var i = 0; i < files.length; i++) {
//         var file = files[i];

//         // add the files to formData object for the data payload
//         formData.append('uploads[]', file, file.name);
//         }

//         $.ajax({
//             url: '/api/video/upload',
//             type: 'POST',
//             data: formData,
//             processData: false,
//             contentType: false,
//             success: function(data){
//                 alert('upload successful!');
//             },
//             xhr: function() {
//                 // create an XMLHttpRequest
//                 var xhr = new XMLHttpRequest();
              
//                 // listen to the 'progress' event
//                 xhr.upload.addEventListener('progress', function(evt) {
              
//                   if (evt.lengthComputable) {
//                     // calculate the percentage of upload completed
//                     var percentComplete = evt.loaded / evt.total;
//                     percentComplete = parseInt(percentComplete * 100);
              
//                     // update the Bootstrap progress bar with the new percentage
//                     $('.progress-bar').text(percentComplete + '%');
//                     $('.progress-bar').width(percentComplete + '%');
              
//                     // once the upload reaches 100%, set the progress bar text to done
//                     if (percentComplete === 100) {
//                       $('.progress-bar').html('Done');
//                     }
              
//                   }
              
//                 }, false);
              
//                 return xhr;
//               }
//           });        

//     }
  
//   });
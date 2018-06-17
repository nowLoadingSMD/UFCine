const selectedTags = []

jQuery(document).ready(async function($) { 

  await $.get("/api/tag", (data) => {
    tags = data.map((item) => { 
      return item.name
    })
    console.log(tags)
    autocomplete(document.getElementById("tagsInput"), tags);
  })
  
});

var words = [
    {text: "Lorem", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Ipsum", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Dolor", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Dolor", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Lorem", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Ipsum", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Dolor", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Dolor", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Lorem", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Ipsum", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Dolor", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Dolor", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Lorem", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Ipsum", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Dolor", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Dolor", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Lorem", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Ipsum", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Dolor", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Dolor", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Lorem", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Ipsum", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Dolor", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Dolor", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Lorem", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Ipsum", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Dolor", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Dolor", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Lorem", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Ipsum", weight: (Math.random() * 5) + 1, link: 'tag.html'},
    {text: "Dolor", weight: (Math.random() * 5) + 1, link: 'tag.html'},
  
    /* ... */
  ];
    
  $('.grid-tags').jQCloud(words, {
    delay: 10,
    fontSize: {
        from: 0.15,
        to: 0.04
      }
  }); 

  var checkIcon = document.getElementById("checkIconBrowse");

  checkIcon.onclick = function() {
  
    console.log("hie")
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
document.addEventListener("DOMContentLoaded", function(){
const sidebar = document.getElementById("sidebarUl")
const mainBody = document.getElementById("mainBody")
const titleBar = document.getElementsByClassName("titleText")[0]
titleBar.addEventListener('click', event => deleteNote(event))
fetch('http://localhost:3000/api/v1/users').then(resp => resp.json()).then(data => data[0].notes).then(notes => createLi(notes))

//creates li elements from an array of note objects, adds event listeners for rendering notes in main page on click
function createLi(arr){
  arr.forEach(function(el) {
    const li = document.createElement("li")
    li.innerHTML = `<li style="color: white; font-family:Helvetica" id="${el.id}">${el.title}</li>`
    li.addEventListener('click', event => findAndRenderNote(event))
    sidebar.appendChild(li)
  })
}

//finds note that was clicked on by element id and calls renderNote on the note object
function findAndRenderNote(e){
  let id = e.target.id
  fetch(`http://localhost:3000/api/v1/notes/${id}`).then(resp => resp.json()).then(obj => renderNote(obj))
}

//renders and appends a note's text to the main body of the page
function renderNote(n){
  mainBody.innerHTML=''
  titleBar.innerHTML=''
  const deleter = document.createElement("p")
  deleter.innerHTML = `<p id="delete-${n.id}">Delete This Note</p>`
  const h2 = document.createElement("h2")
  const p = document.createElement("p")
  h2.innerHTML = `<h2 style="color:black">${n.title}</h2>`
  p.innerText = n.body
  titleBar.appendChild(h2)
  titleBar.append(deleter)
  mainBody.appendChild(p)
}


//deletes a note by id
function deleteNote(e){
  if (e.target.id.includes('delete-')){
    const stringId = e.target.id.slice(7)
    fetch(`http://localhost:3000/api/v1/notes/${stringId}`, {method: "DELETE"})
    location.reload()
  }
}


})



fetch('http://localhost:3000/api/v1/users').then(function(request) {console.log(request)})
//
// let config = {
//   method:"POST",
//   body: JSON.stringify({name: "marcus aurelius", notes:[{ title: "Meditations", body:"Soon you will die, and you are not yet simple"}]}),
//   headers: {
//     "content-type": "application/json"
//   }
// }
//
// fetch('http://localhost:3000/api/v1/users', config).then(console.log("marcus"))

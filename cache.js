function createLi(arr){
  arr.forEach(function(el) {
    const li = document.createElement("li")
    li.innerHTML = `<li id="${el.title}">${el.title}</li>`
    sidebar.appendChild(li)
  })
}

let elList = document.querySelector("#list");
let elbtnPrev = document.querySelector("#prev")
let elbtnNext = document.querySelector("#next")
let elInput = document.querySelector("#input")

let searchFilim = "hulk"

let apiKey = '8930fd2a'

let filimPage = 1;

elInput.addEventListener("change", (x) => {
    let searchInput = elInput.value.trim()

    searchFilim = searchInput

    fetchReder()

    elInput.value = ""
})

function renderFilim(x,){
    x.forEach((elem) => {

        let newLi = document.createElement("li")
        newLi.setAttribute("class", "template-list")
        let newImg = document.createElement("img")
        newImg.onerror = (e) => {
            e.target.src = 'http://via.placeholder.com/200x250'
        }
        newImg.setAttribute("src", elem.Poster)
        newImg.setAttribute("class", "template-img")
        let newTitle = document.createElement("h2")
        newTitle.setAttribute("class", "template-title")
        newTitle.textContent = elem.Title
        let newLorem = document.createElement("P")
        newLorem.setAttribute("class", "template-lorem")
        newLorem.textContent = elem.Type
        let newYers = document.createElement("span")
        newYers.setAttribute("class", "template-span")
        newYers.textContent= elem.Year
        let newId = document.createElement("p")
        newId.setAttribute("class", "template-lorem2")
        newId.textContent = elem.imdbID

        newLi.appendChild(newImg)
        newLi.appendChild(newTitle)
        newLi.appendChild(newLorem)
        newLi.appendChild(newYers)
        newLi.appendChild(newId)
        elList.appendChild(newLi)
    })
    if(filimPage <= 1){
        elbtnPrev.disabled = true;
    }else{
        elbtnPrev.disabled = false
    }

}

async function fetchReder(){
    elList.innerHTML = null
    const rec = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchFilim}&page=${filimPage}`);
    let data = await rec.json();

    let totl = Math.ceil(data.totalResults / 10)

    if(filimPage == totl){
        console.log("ok")
        elbtnNext.disabled = true;
    }else{
        console.log("ok")
        elbtnNext.disabled = false;
    }
    renderFilim(data.Search, elList)
}
fetchReder()

elbtnPrev.addEventListener("click", () => {
        filimPage--
    fetchReder()
})
elbtnNext.addEventListener("click", () => {
    filimPage++
    fetchReder()
})
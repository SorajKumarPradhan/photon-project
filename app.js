const auth="IpfvwtmisF9NUeyQgcvU2KMWbShoJxnwDd8mWCC3A7YkAgESZ4CAuhF3";
const gallery=document.querySelector(".gallery");
const searchInput=document.querySelector(".search-input");
const form=document.querySelector(".search-form");
const img=document.querySelector("img");
const more=document.querySelector(".more")
let page=0;
let fetchLink;
let currentSearch;
let searchValue;
//adding event listens
searchInput.addEventListener("input",updateInput)
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    currentSearch=searchValue;
    searchPhotos(searchValue);
});
more.addEventListener("click",loadMore)
//FUNCTIONS /ASYNC FUNCTION
function updateInput(e){
    
    searchValue=e.target.value;
    

}
async function asyncData(url){
    const fetchData=await fetch(url,{
        method:"GET",
        headers:{
            Accept:"application/json",
            Authorization:auth
        }
    })
    const data= await fetchData.json();
    return data;
}
function generatePhotos(data){
    console.log(data)
    data.photos.forEach(photo => {
     
        const galleryImg=document.createElement("div")
        galleryImg.classList.add("galleryImg")
        galleryImg.innerHTML=`
        <div class="img-info">
        <p>${photo.photographer}</p>
        <a target="_blank" href=${photo.src.large}>Download</a>
        </div>
        <img src="${photo.src.large}" alt="">
        `
        ;
        gallery.appendChild(galleryImg)
    
     });
}
async function  curatedPhotos(){
    fetchLink="https://api.pexels.com/v1/curated?per_page=15&page=1"
 const data=await asyncData(fetchLink);
 generatePhotos(data)
 

}
async function searchPhotos(query){
    clear();
    fetchLink=`https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
    const data=await asyncData(fetchLink)
    
     
    generatePhotos(data)
}
curatedPhotos();
function clear(){
    gallery.innerHTML="";
    searchInput.value="";
}
async function loadMore(){
    page++;
    if(currentSearch){
    fetchLink=`https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`
    }else{
    fetchLink=`https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
   const data=await asyncData(fetchLink);
   generatePhotos(data)

}

// "https://api.pexels.com/v1/curated?per_page=15&page=1"

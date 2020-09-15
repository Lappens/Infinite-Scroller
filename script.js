

const imageContainer= document.getElementById("image-container");
const loader= document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages =0;
let photosArray = [];

//Unsplash API 
let count = 5;
const apiKey = 'INPUT YOUR API KEY HERE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded(){
    
    imagesLoaded++;
    console.log(imagesLoaded)
    if(imagesLoaded===totalImages){
        ready = true;
        loader.hidden=true;
        count = 30;
    }
}   

// Helper function to set attributs to DOM
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

//Create Elements for Links & Photos, Add to Dom
function displayPhotos(){
    imagesLoaded= 0;
    //Run function for each object in photosarray
    totalImages = photosArray.length
    photosArray.forEach((photo) =>{
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        //item.setAttribute('href', photo.links.html)
        //item.setAttribute('target','_blank')

        setAttributes(item,{
            href:photo.links.html,
            target:'_blank'
        })

        // Create <img> for photo
        const img = document.createElement('img');
        //img.setAttribute('src',photo.urls.regular);
        //img.setAttribute('alt', photo.alt_description);
        //img.setAttribute('title', photo.alt_description);

        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)

        // Put <img> inside <a>, then put both inside image-container Elemente
        item.appendChild(img);
        imageContainer.appendChild(item)
    })
}


// Get Photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        //Catch Error
        console.log(error)
    }
}
// Check to see if scrolling nrea bottom of page, Load more Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos()
    }
})

// On Load
getPhotos();
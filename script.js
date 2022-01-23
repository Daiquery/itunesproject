var coverInput = document.getElementById("coverinput");
var covers = document.getElementById("albumcovers");
var [image1, image2, image3] = [document.getElementById("img1"), document.getElementById("img2"), document.getElementById("img3")]
var images;
var carouselControl = 0


function carouselSlide(direction){
    if(direction === "left" && carouselControl > 0){
        carouselControl--
    } else if (direction === "right") {
        carouselControl++
    }

    [image1.src, image2.src, image3.src] = [images[carouselControl], images[carouselControl + 1], images[carouselControl+ 2]];
    
}

function returnAlbumCover(){
    console.log(carouselControl);
    carouselControl = 0;
    console.log(carouselControl);
    covers.innerHTML = '';

    fetch(`https://itunes.apple.com/search?term=${coverInput.value}&limit=10&entity=song&attribute=artistTerm`).then(r => {
        if(!r.ok){
            console.log(`Request Failed: ${r.status}`);
        }
        return r.json();
    }).then(r => {
        let result = r.results.map(res => res.artworkUrl100);
        images = [...new Set(result)]
        console.log(images);

      



        for(i = 0; i < 3; i++){
             if(images[i] != null){
            i > 0 ? [image1.src, image2.src, image3.src] = [images[carouselControl + i], images[carouselControl + i + 1], images[carouselControl + i + 2]] : [image1.src, image2.src, image3.src] = [images[carouselControl + 1], images[carouselControl + 2], images[carouselControl + 3]]
     


            covers.append(image1, image2, image3)
          


            }

        
            
            
        }


        for(i = 0; i<3; i++){
            var currentImage;
            i === 0 ? currentImage = image1 : i === 1 ? currentImage = image2 : currentImage = image3;

            let linkingUrl = r.results.filter((res) => res.artworkUrl100 === currentImage.src);
        
                function sendToPage(){
                    window.location.href = linkingUrl[0].collectionViewUrl;
                }
        
        
            console.log(linkingUrl);
            
            i===0 ? image1.onclick = sendToPage : i===1 ? image2.onclick = sendToPage : image3.onclick = sendToPage;
        
            }
      
        
    })


}


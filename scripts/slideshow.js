function showSlides(img) {
    img.src = img.images[img.displayedIndex];
    if(++img.displayedIndex > img.images.length) {
        img.displayedIndex = 0;
    }
    
//    setTimeout(showSlides(img), 5000);
}
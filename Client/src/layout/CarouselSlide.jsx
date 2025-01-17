function CarouselSlide({slideNumber, image, description, totalSlides}){
    return(
        <div id={`slide${slideNumber}`} className="carousel-item relative w-full">
        <div className="flex flex-col justify-center items-center gap-4 px-[15%]">
        <img src={image}
            className="w-50 h-60" />
            <p className="text-2xl text-font-color">{description}</p>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href={`#slide${(slideNumber==1?totalSlides:(slideNumber-1))}`} className="btn btn-circle">❮</a> 
            <a href={`#slide${(slideNumber)%totalSlides+1}`} className="btn btn-circle">❯</a>
            </div>
        </div>
            </div> 
    )
}
export default CarouselSlide;
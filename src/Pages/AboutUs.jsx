import { slides } from "../constants/slides";
import CarouselSlide from "../layout/CarouselSlide";
import HomeLayout from "../layout/HomeLayout";
function AboutUs(){
   
    return (
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education
                        </h1>
                        <p className="text-2xl text-gray-200">
                            Our goal is to provide affordable and quality education to the world.
                            We are providing the platform for the aspiring teachers and students to share their skills, creativity and knowledge to each other to empower and contribute in
                             the growth and wellness to mankind.
                        </p>
                    </section>
                    <div className="w-1/2 m-6">
                        <img src="https://cdn1.vectorstock.com/i/1000x1000/80/90/education-tree-concept-of-outline-school-icon-set-vector-21248090.jpg" 
                        alt="about main page" 
                        className="drop-shadow-2xl"
                        id="test1"
                        style={{
                            filter: "drop-shadow(0px 10px 10px rgp(0,0,0));"
                        }} />
                    </div>
                </div>
                <div className="carousel w-1/2 m-auto py-16 h-[50%]">
                {slides && slides.map(slide=> ( <CarouselSlide
                    {...slide}
                    key={slide.slideNumber}
                    totalSlides={slides.length}
                />))} 
                        
                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs;
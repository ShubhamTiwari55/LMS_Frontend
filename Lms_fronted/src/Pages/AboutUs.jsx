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
                        <div id="slide1" className="carousel-item relative w-full">
                    <div className="flex flex-col justify-center items-center gap-4 px-[15%]">
                    <img src="https://images.unsplash.com/photo-1603349206295-dde20617cb6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWluc3RlaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60" 
                        className="w-50 h-60" />
                        <p className="text-2xl text-yellow-600">Education is the most powerful tool you can use to change the world!</p>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a> 
                        <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                        </div> 
                        <div id="slide2" className="carousel-item relative w-full">
                            <div className="flex flex-col justify-center items-center gap-4 px-[30%]">
                            <img src="https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600" className="w-50 h-60" />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide1" className="btn btn-circle">❮</a> 
                            <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                            </div>
                           
                        </div> 
                        <div id="slide3" className="carousel-item relative w-full">
                            <div className="flex flex-col justify-center items-center gap-4 px-[30%]">
                            <img src="https://images.pexels.com/photos/3825559/pexels-photo-3825559.jpeg?auto=compress&cs=tinysrgb&w=600" className="w-50 h-60" />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide2" className="btn btn-circle">❮</a> 
                            <a href="#slide4" className="btn btn-circle">❯</a>
                            </div>
                            </div>
                            
                        </div> 
                        <div id="slide4" className="carousel-item relative w-full">
                            <div className="flex flex-col justify-center items-center gap-4 px-[30%]">
                            <img src="https://images.pexels.com/photos/5726706/pexels-photo-5726706.jpeg?auto=compress&cs=tinysrgb&w=600" className="w-50 h-60" />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide3" className="btn btn-circle">❮</a> 
                            <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                            </div>
                        </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs;
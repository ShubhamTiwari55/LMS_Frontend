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
                    <div className="w-1/2">
                        <img src="https://cdn1.vectorstock.com/i/1000x1000/80/90/education-tree-concept-of-outline-school-icon-set-vector-21248090.jpg" alt="" className="drop-shadow-2xl" />
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs;
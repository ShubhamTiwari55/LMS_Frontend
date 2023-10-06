import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../Components/CourseCard";
import { Courses } from "../constants/courses";
import HomeLayout from "../layout/HomeLayout";
import { getAllCourses } from "../Redux/slices/courseSlice";

function CourseList(){
    const dispatch = useDispatch();


const {courseData} = useSelector((state) => state.course);

async function loadCourses(){
    await dispatch(getAllCourses());
}

useEffect(()=>{
    loadCourses();
}, []);

return(
    <HomeLayout>
        <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
            <h1 className="text-3xl">
                Explore the courses made by 
                <span className="font-bold text-3xl text-yellow-500"> Industry experts
                </span>
                </h1>
                <br />
                <div className="mb-10 flex flex-wrap gap-14">
                    {courseData?.map((element)=>{
                        return <CourseCard {...Courses} key={element._id} data={element}/>
                    })}
                </div>
           
        </div>
    </HomeLayout>
);
}

export default CourseList;
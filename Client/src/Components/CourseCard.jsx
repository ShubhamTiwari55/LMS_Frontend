import { useNavigate } from "react-router-dom";

function CourseCard({data}){

    const navigate = useNavigate();
    return(
        <div
            onClick={() => navigate("/course/description", {state: {...data}})} 
            className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-gray-600">
            <div className="overflow-hidden">
            <img className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out duration-300"
                src={data?.thumbnail?.secure_url}
                alt="Course thumbnail"
            />
            <div className="p-3 space-y-1 text-para-color">
                <h2 className="text-xl font-bold text-font-color line-clamp-2">
                    {data?.title}
                </h2>
                <p className="line-clamp-2 text-sm">
                    {data?.description}
                </p>
                <p className="font-semibold">
                    <span className="text-font-color font-bold">
                        Category: 
                    </span>
                    <span> </span>
                    {data?.category}
                </p>
                <p className="font-semibold">
                    <span className="text-font-color font-bold">
                        Total lectures: 
                    </span>
                    <span> </span>
                    {data?.numberoflectures}
                </p>
                <p className="font-semibold">
                    <span className="text-font-color font-bold">
                        Instructor: 
                    </span>
                    <span> </span>
                    {data?.createdBy}
                </p>
            </div>
            </div>
        </div>
    )
}
export default CourseCard;
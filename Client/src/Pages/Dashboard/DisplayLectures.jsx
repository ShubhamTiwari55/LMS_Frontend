import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../layout/HomeLayout";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/slices/LectureSlice";

function Displaylectures() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state.lecture);
    const { role } = useSelector((state) => state.auth);

    const [currentVideo, setCurrentVideo] = useState(0);

    async function onLectureDelete(courseId, lectureId) {
        console.log(courseId, lectureId);
        await dispatch(deleteCourseLecture({ courseId, lectureId }));
        await dispatch(getCourseLectures(courseId));
    }

    useEffect(() => {
        console.log(state);
        if (!state) navigate("/courses");
        dispatch(getCourseLectures(state._id));
    }, []);

    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[92vh] py-5 text-white mx-[5%]">
                <div className="text-center text-2xl font-semibold text-font-color">
                    Course Name: {state?.title}
                </div>

                {lectures && lectures.length > 0 ? (
                    <div className="flex justify-center gap-10 w-full h-full">
                        {/* Left section for playing videos and displaying course details to admin */}
                        <div className="flex flex-col space-y-2 w-1/2 p-2 rounded-lg h-full">
                            <video
                                src={lectures[currentVideo]?.lecture?.secure_url}
                                className="object-fill rounded-lg w-full h-3/4"
                                controls
                                disablePictureInPicture
                                muted
                                controlsList="nodownload"
                            >
                            </video>
                            <div className=" p-2 rounded-lg text-black">
                                <h1>
                                    <span className="text-font-color">Title: </span>
                                    {lectures[currentVideo]?.title}
                                </h1>
                                <p>
                                    <span className="text-font-color">Description: </span>
                                    {lectures[currentVideo]?.description}
                                </p>
                            </div>
                        </div>

                        {/* Right section for displaying list of lectures */}
                        <ul className="w-1/2 p-2 rounded-lg border border-black space-y-4 text-black h-full overflow-y-auto">
                            <li className="font-semibold text-xl flex items-center justify-between">
                                <p>Lectures List</p>
                                {role === "ADMIN" && (
                                    <button onClick={() => navigate("/course/addlecture", { state: { ...state } })} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                                        Add new lecture
                                    </button>
                                )}
                            </li>
                            {lectures.map((lecture, idx) => (
                                <li className="space-y-2" key={lecture._id}>
                                    <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                                        <span>{" "} Lecture {idx + 1} : {" "}</span>
                                        {lecture.title}
                                    </p>
                                    {role === "ADMIN" && (
                                        <button onClick={() => onLectureDelete(state._id, lecture._id)} className="btn-accent px-2 py-1 rounded-md font-semibold text-sm">
                                            Delete lecture
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    role === "ADMIN" && (
                        <button onClick={() => navigate("/course/addlecture", { state: { ...state } })} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                            Add new lecture
                        </button>
                    )
                )}
            </div>
        </HomeLayout>
    );
}

export default Displaylectures;

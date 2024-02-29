import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../layout/HomeLayout";
import { getUserData, updateprofile } from "../Redux/slices/AuthSlice";

function EditProfile(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        previewImage: "",
        fullName: "",
        avatar: undefined,
        userId: useSelector((state)=>state?.auth?.data?._id)
    });

    function handleImageUpload(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function(){
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage
                })
            })
        }
    }
    function handleInputChange(e){
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!data.fullName || !data.avatar){
            toast.error("All fields are mandatory");
            return;
        }
        if(data.fullName.length<5){
            toast.error("Name must be more than 5 chars long");
            return;
        }
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);

        await dispatch(updateprofile([data.userId, formData]));

        await dispatch(getUserData());
        navigate("/user/profile");
    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form onSubmit={onFormSubmit}
                className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
                >
                    <h1 className="text-2xl font-semibold text-center">
                        Edit profile
                    </h1>
                    <label className="cursor-pointer" htmlFor="image_uploads">
                        {data.previewImage ? (
                        <img alt="" className="w-28 h-28 m-auto rounded-full"
                        src={data.previewImage}
                        />): (<BsPersonCircle className="w-28 h-28 m-auto rounded-full"/>)}
                    </label>
                    <input type="file" 
                    name="image_uploads" 
                    id="image_uploads" 
                    onChange={handleImageUpload}
                    className="hidden"
                    accept=".png, .svg, .jpeg, .jpg"
                    />

                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="text-lg font-semibold">Full Name</label>
                        <input type="text"
                        id="fullName"
                        name="fullName"
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className="bg-transparent py-2 px-1 border"
                        />
                    </div>
                    <button type="submit"
                    className="w-full bg-yellow-600 py-2 font-semibold hover:bg-yellow-500 cursor-pointer transition-all ease-in-out duration-300 rounded-sm text-lg">
                        Update profile
                    </button>
                    <Link to="/user/profile">
                        <p className="link text-accent cursor-pointer flex items-center justify-center w-full">
                            <AiOutlineArrowLeft/> Go back to profile
                        </p>
                    </Link>
                </form>
            </div>
        </HomeLayout>
    )
}

export default EditProfile;
import { useState } from "react";
import { toast } from "react-hot-toast";

import axiosInstance from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../layout/HomeLayout";

function Contact() {

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        mobile: "",
        preferredTiming: "",
        message: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.email || !userInput.name || !userInput.message || !userInput.mobile || !userInput.preferredTiming) {
            toast.error("All fields are mandatory");
            return;
        }

        if (!isEmail(userInput.email)) {
            toast.error("Invalid email");
            return;
        }

        try {
            const response = axiosInstance.post("/contact", userInput);
            toast.promise(response, {
                loading: "Submitting your message...",
                success: "Form submitted successfully",
                error: "Failed to submit the form"
            });
            const contactResponse = await response;
            console.log(contactResponse)
            if (contactResponse?.data?.success) {
                setUserInput({
                    name: "",
                    email: "",
                    mobile: "",
                    preferredTiming: "",
                    message: "",
                });
            }
        } catch (err) {
            toast.error("Operation failed....")
        }

    }

    return (
        <HomeLayout>
            <div className="flex h-[100vh]">
                <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url("https://www.webfx.com/wp-content/uploads/2023/08/032431_40_Best_Contact_Us_Page_Designs-1536x693.png")' }}>
                </div>
                <div className="w-1/2 flex items-center justify-center bg-[#79a0c9]">
                    <form
                        noValidate
                        onSubmit={onFormSubmit}
                        className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-font-color w-[22rem]">

                        <h1 className="text-3xl font-semibold">
                            Contact Form
                        </h1>

                        <div className="flex flex-col w-full gap-1">
                            <label htmlFor="name" className="text-md font-semibold">
                                Name
                            </label>
                            <input
                                className="bg-transparent border border-blue-500 px-2 py-1 rounded-sm placeholder-black"
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                onChange={handleInputChange}
                                value={userInput.name}
                            />
                        </div>

                        <div className="flex flex-col w-full gap-1">
                            <label htmlFor="email" className="text-md font-semibold">
                                Email
                            </label>
                            <input
                                className="bg-transparent border border-blue-500 px-2 py-1 rounded-sm placeholder-black"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={handleInputChange}
                                value={userInput.email}
                            />
                        </div>

                        <div className="flex flex-col w-full gap-1">
                            <label htmlFor="mobile" className="text-md font-semibold">
                                Mobile Number
                            </label>
                            <input
                                className="bg-transparent border border-blue-500 px-2 py-1 rounded-sm placeholder-black"
                                id="mobile"
                                type="text"
                                name="mobile"
                                placeholder="Enter your mobile number"
                                onChange={handleInputChange}
                                value={userInput.mobile}
                            />
                        </div>

                        <div className="flex flex-col w-full gap-1">
                            <label htmlFor="preferredTiming" className="text-md font-semibold">
                                Preferred Timing for Call Back
                            </label>
                            <input
                                className="bg-transparent border border-blue-500 px-2 py-1 rounded-sm placeholder-black"
                                id="preferredTiming"
                                type="text"
                                name="preferredTiming"
                                placeholder="Enter preferred timing"
                                onChange={handleInputChange}
                                value={userInput.preferredTiming}
                            />
                        </div>

                        <div className="flex flex-col w-full gap-1">
                            <label htmlFor="message" className="text-md font-semibold">
                                Message
                            </label>
                            <textarea
                                className="bg-transparent border border-blue-500 px-2 py-1 rounded-sm resize-none h-30 placeholder-black"
                                id="message"
                                name="message"
                                placeholder="Enter your message"
                                onChange={handleInputChange}
                                value={userInput.message}
                            />
                        </div>

                        <button type="submit"
                            className="w-full bg-font-color hover:bg-button-color transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg text-para-color cursor-pointer"
                        >
                            Submit
                        </button>

                    </form>
                </div>
            </div>

        </HomeLayout>
    );
}

export default Contact;

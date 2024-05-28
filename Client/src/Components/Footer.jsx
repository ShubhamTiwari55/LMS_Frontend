import { BsFacebook, BsInstagram, BsLinkedin,BsTwitter } from 'react-icons/bs'

function Footer(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();


    return(
        <>
        <footer className='relative left-0 bottom-0 h-[8vh] py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-font-color sm:px-20'>
            <section className='text-md'>
                Copyright {year} | All rights reserved
            </section>
            <section className='flex items-center justify-center gap-5 text-2xl text-white'>
                <a href='https://www.facebook.com/profile.php?id=100009801498766' className='hover:text-button-color transition-all ease-in-out duration-300 cursor-pointer'>
                    <BsFacebook/>
                </a>
                <a href='https://www.instagram.com/shubham_tiwarii05/' className='hover:text-button-color transition-all ease-in-out duration-300 cursor-pointer'>
                    <BsInstagram/>
                </a>
                <a href='https://www.linkedin.com/in/shubham-tiwari-966223253/'  className='hover:text-button-color transition-all ease-in-out duration-300 cursor-pointer'>
                    <BsLinkedin/>
                </a>
                <a className='hover:text-button-color transition-all ease-in-out duration-300 cursor-pointer'>
                    <BsTwitter/>
                </a>
            </section>
        </footer>
        </>
    )

}

export default Footer;
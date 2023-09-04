import Course from "../models/course.models.js"
import AppError from "../utils/AppError.js"
import cloudinary from 'cloudinary';
import fs from 'fs/promises';

const getAllCourses = async (req, res, next) => {
try{
    const courses = await Course.find({}).select('-lectures');
    res.status(200).json({
        success: true,
        message: 'All courses',
        courses,
    })
}catch(e){
    return next(
        new AppError(e.message, 500)
    )
}
};

const getLecturesByCourseId = async (req, res, next) => {
    try{
        const {courseId} = req.params;
        const course = await Course.findById(courseId);
        if(!course){
            return next(
                new AppError('Invalid course Id', 400)
            )
        }
        res.status(200).json({
            success: true,
            message: 'Course fetched successfully!',
            lectures: course.lectures
        })
    }catch(e){
        return next(
            new AppError(e.message, 400)
        )
    }
};

const createCourse = async (req,res,next) => {
    try{
        const {title, description, category, createdBy} = req.body;
        if(!title || !description || !category || !createdBy){
            return next(
                new AppError('ALl fields are required!', 400)
            )
        }

        const course = await Course.create({
            title,
            description,
            thumbnail: {
                public_id: 'DUMMY',
                secure_url: 'DUMMY'
            },
            category,
            createdBy 
        });

        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder: 'lms',
            });
            if(result){
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
            }
            fs.rm(`uploads/${req.file.filename}`);
            await course.save();

            res.status(200).json({
                success: 'true',
                message: 'Course created successfully!',
                course
            })
        }
    }catch(e){
        return next(
            new AppError(e.message, 500)
        )
    }
};

const updateCourse = async (req,res,next) => {
    try{
        const {courseId} = req.params;
        const course = await Course.findByIdAndUpdate(
            courseId,
            //here set is used so that only a desired part of course can be changed
            {
                $set: req.body
            },
            //runValidators serve the function if update is following the mentioned proper schema or not
            {
                runValidators: true
            }
        )
        if(!course){
            return next(
                new AppError('Course does not exist', 400)
            )
        }

        res.status(200).json({
            success: true,
            message: 'Course updated successfully!',
            course
        })
    }catch(e){
        return next(
            new AppError(e.message, 400)
        )
    }
};

const deleteCourse = async (req,res,next) => {
    try{
        const {courseId} = req.params;
        const course = await Course.findById(courseId);
        if(!course){
            return next(
                new AppError('Course does not exists!', 400)
            )
        }
        await Course.findByIdAndDelete(courseId); 

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully!'
        })
    }catch(e){
        return next(
            new AppError(e.message, 400)
        )
    }
};

export{
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    deleteCourse
}
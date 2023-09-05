// import { TokenExpiredError } from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const isLoggedIn = function(req, res, next){
    const {token} = req.cookies;

    if(!token){
        return next(new AppError('Unauthenticated, please Login', 401));
    }

    const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);
    if(!tokenDetails){
        return next(new AppError('Unauthenticated, Please Login', 401));
    }

    req.user = tokenDetails;

    next();
}

const authorizedRoles = (...roles) => (req,res,next) => {
    const currRole = req.user.role;
    if(!roles.includes(currRole)){
        return next(
            new AppError('You do not have permission to access this route', 403)
        )
    }
    next();
}

const authorizedSubscriber = async(req, res, next) =>{
    const subscriptionStatus = req.user.subscriptionStatus;
    const currRole = req.user.role;
    if(currRole !== 'ADMIN' && subscriptionStatus !== 'ACTIVE'){
        return next(
            new AppError(
                'Please subscribe to access the course',400
            )
        )
    }
    next();
}
export{
    isLoggedIn,
    authorizedRoles,
    authorizedSubscriber
}
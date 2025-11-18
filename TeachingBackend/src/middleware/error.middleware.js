import logger from '../config/logger.config.js';
import ApiError from '../utils/apiError.utils.js';

const errorMiddleware = (err, req, res, next) => {
    logger.error(err);

    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = new ApiError(400, message);
    }

    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ApiError(400, message);
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message).join(', ');
        error = new ApiError(400, message);
    }

    res.status(error.statusCode || 500).json({
        status: error.status || 'error',
        data: {
            message: error.message || 'An unexpected error occurred',
        },
    });
};

export default errorMiddleware;

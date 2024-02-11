import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = errors.array().map(err => ({
        field: err.param || 'unknown',
        message: err.msg
    }));

    console.log('Validation Errors:', extractedErrors);

    return next(new ApiError(400, "Validation error", extractedErrors));
};
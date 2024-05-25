import {body,param} from 'express-validator';

export const mongoIdPathVariableValidator = (idName) => [
    param(idName)
        .notEmpty()
        .isMongoId()
        .withMessage(`Invalid ${idName}`)
        .custom(value => {
            console.log(`Validating ${idName}: ${value}`);  // Debug log
            return true;
        })
];

export const mongoIdBodyValidator=(idName)=>{
    return [
        body(idName)
                    .notEmpty()
                    .isMongoId()
                    .withMessage(`Invalid ${idName}`)
    ]
}


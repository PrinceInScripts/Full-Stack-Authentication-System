// import {body,param} from 'express-validator';

// export const mongoIdPathVariableValidator=(idName)=>{
//     return [
//         param(idName)
//                     .notEmpty()
//                     .isMongoId()
//                     .withMessage(`Invalid ${idName}`)
//     ]
// }

// export const mongoIdBodyValidator=(idName)=>{
//     return [
//         body(idName)
//                     .notEmpty()
//                     .isMongoId()
//                     .withMessage(`Invalid ${idName}`)
//     ]
// }

import { param, body } from 'express-validator';

export const mongoIdPathVariableValidator = (idName) => [
    param(idName)
        .notEmpty()
        .isMongoId()
        .withMessage(`Invalid ${idName}`)
];

export const mongoIdBodyValidator = (idName) => [
    body(idName)
        .notEmpty()
        .isMongoId()
        .withMessage(`Invalid ${idName}`)
];
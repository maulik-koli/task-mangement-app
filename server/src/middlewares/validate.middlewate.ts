import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodType } from 'zod';
import { AppError } from '@/utils/response';
import { Log } from '@/utils/log';


export const validateBody = (schema: ZodType<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } 
        catch (error) {
            if (error instanceof ZodError) {
                Log.error("in validate middleware", error.issues[0].message);
                
                if( error.issues[0].code === 'invalid_type' || 
                    error.issues[0].code === 'unrecognized_keys'
                ){
                    throw new AppError(400, "BAD_REQUEST", "Invalid payload data");
                }
                throw new AppError(400, "BAD_REQUEST", error.issues[0].message);
            }
            next(error);
        }
    };
}

export const validateQuery = (schema: ZodType<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = schema.parse(req.query);
            req.localsQuery = validated;              
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(400, "BAD_REQUEST", error.issues[0].message);
            }
            next(error);
        }
    }
}
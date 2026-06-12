import { Application, Request, Response } from "express";
import authRouter from "./modules/auth/auth.routes";


export default function appRoutes(app: Application) {
    app.use('/api/auth', authRouter);
    
    // test routes
    app.get('/api/test', (req: Request, res: Response) => {
        res.json({ message: 'This is a test route!' });
    });
}
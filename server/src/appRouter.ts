import { Application, Request, Response } from "express";
import authRouter from "./modules/auth/auth.routes";
import taskRouter from "./modules/task/task.routes";


export default function appRoutes(app: Application) {
    app.use('/api/auth', authRouter);
    app.use('/api/tasks', taskRouter);
    
    // test routes
    app.get('/api/test', (req: Request, res: Response) => {
        res.json({ message: 'This is a test route!' });
    });
}

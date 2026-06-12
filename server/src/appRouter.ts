import { Application, Request, Response } from "express";


export default function appRoutes(app: Application) {
    // test routes
    app.get('/api/test', (req: Request, res: Response) => {
        res.json({ message: 'This is a test route!' });
    });
}
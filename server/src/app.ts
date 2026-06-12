import express, { Application } from 'express'
import appRoutes from './appRouter';
import { AppError } from './utils/response';
import { globalErrorHandler } from './middlewares/error.middleware';
import { env } from './configs/env';
import { Log } from './utils/log';


class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.setUpMiddleware();
        this.setUpRoutes();
        this.setErrorHandler();
        this.start();
    }

    private setUpMiddleware(): void {
        this.app.use(express.json());
    }

    private setUpRoutes(): void {
        appRoutes(this.app);
    }

    private setErrorHandler(): void {
        this.app.use((_req, res, next) => {
            next(new AppError(404, "RESOURCE_NOT_FOUND", "Request not found."));
        });
        
        this.app.use(globalErrorHandler);
    }

    private async initializeApp(): Promise<void> {
        const PORT = env.PORT;
        this.app.listen(PORT, '0.0.0.0', () => {
            Log.info(`Server running... at ${PORT}`);
        });
    }

    private async start(): Promise<void> {
        try {
            await this.initializeApp();
        }
        catch (error) {
            Log.error('Failed to start server:', error);
        }
    }
}

export default App;
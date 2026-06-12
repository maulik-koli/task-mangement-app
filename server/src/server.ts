import App from "./app";
import { Log } from "./utils/log";

const serverShutdown = async (signal: string) => {
    Log.info(`${signal} received. Shutting down gracefully...`);
    process.exit(0);
};

process.on('SIGINT', () => serverShutdown('SIGINT'));
process.on('SIGTERM', () => serverShutdown('SIGTERM'));

const appServer = new App();
const server = appServer.app;


export default server;
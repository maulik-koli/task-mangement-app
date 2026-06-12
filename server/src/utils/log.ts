import chalk from 'chalk';
import util from 'util';
import { env } from '@/configs/env';

const formatArgs = (args: any[]) => {
    return args.map(arg => {
        if (typeof arg === 'object') {
            return util.inspect(arg, { colors: true, depth: null });
        }
        return arg;
    }).join('\n');
};

const isDev = env.NODE_ENV !== 'production';

export const Log = {
    info: (text: string, ...args: any[]) => {
        if (isDev) {
            console.log(chalk.blue('[---INFO---]'), chalk.blue.bold(` ${text} `));
            if (args.length) console.log(formatArgs(args));
        }
    },
    success: (text: string, ...args: any[]) => {
        if (isDev) {
            console.log(chalk.green('[---SUCCESS---]'), chalk.green.bold(` ${text} `));
            if (args.length) console.log(formatArgs(args));
        }
    },
    warn: (text: string, ...args: any[]) => {
        if (isDev) {
            console.log(chalk.yellow('[---WARN---]'), chalk.yellow.bold(` ${text} `));
            if (args.length) console.log(formatArgs(args));
        }
    },
    error: (text: string, ...args: any[]) => {
        if (isDev) {
            console.log(chalk.red('[---ERROR---]'), chalk.red.bold(` ${text} `));
            if (args.length) console.log(formatArgs(args));
        }
    },
};

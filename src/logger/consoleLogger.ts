/**
 * author Saquib Shaikh
 * created on 10-11-2024-13h-19m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
*/

import pino, {LoggerOptions} from "pino";

const pinoOptions: LoggerOptions = {
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: false,
        }
    }
}

const consoleLogger = pino(pinoOptions);

export default consoleLogger;
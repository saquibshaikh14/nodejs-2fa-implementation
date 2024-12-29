/**
 * author Saquib Shaikh
 * created on 10-11-2024-13h-19m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
 */

import pino, { destination, LoggerOptions } from "pino";
import config from "@/config/server.config";

const pinoOptions: LoggerOptions = {
	transport: {
		targets: [
			{
				level: config["log.level"],
				target: "pino/file",
				options: { destination: "logs/server.log", mkdir: true },
			},
			{
				target: "pino-pretty",
				level: "error",
				options: {
					destination: "logs/server_error.log",
					mkdir: true,
					colorize: false,
				},
			},
		],
	},
};

export default pino(pinoOptions);

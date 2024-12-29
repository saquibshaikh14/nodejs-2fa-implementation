/**
 * author Saquib Shaikh
 * created on 10-11-2024-12h-50m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
*/


import config from "@/config/server.config";
import consoleLogger from "./consoleLogger";
import fileLogger from "./fileLogger";

const destination = process.env.NODE_ENV === "production" ? "file" : config["log.destination"];

const logger = destination === "console" ? consoleLogger : fileLogger;
logger.level = config["log.level"] || 'info';

export default logger;
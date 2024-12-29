/**
 * author Saquib Shaikh
 * created on 09-11-2024-21h-03m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
 */

import logger from "@/logger";
import { NextFunction, Request, Response } from "express";
import { TwoFA } from "types";

export default function errorHandlerMiddleware(
	err: Error,
	req: Request,
	res: Response,
	_next: NextFunction
) {
	try {
		const log = req.logger || logger;

		log.info("Some error in processing request");
		//use custom error handler.
		let response: TwoFA.ErrorResponse | null = null; //get it from custom error handlers based on types

		//if there is no specific error handler, set generic response.
		if (!response) {
			response = {
				status: "error",
				code: 500,
				message: "Internal server error.",
				error: {
					type: "InternalError",
					details: ["Something went wrong!"],
				},
				requestId: req.requestId,
			};
		}

		res.status(response.code).json(response);
		log.error(err);
		log.debug(response, "Response");
		log.info("Response sent with error");
	} catch (e) {
		logger.error(e);
		res.status(500).send({ status: "error", code: 500, message: "Something went wrong." });
	}
}

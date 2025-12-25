import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";
import logger from "../utils/logger";

export const validateBody =
    (schema: ZodSchema) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req.body);
                next();
            } catch (err) {
                if (err instanceof ZodError) {
                    logger.error({ issues: err.issues }, "Validation Error");

                    return res.status(400).json({
                        message: "Validation failed",
                        errors: err.issues.map(e => ({
                            field: e.path.join("."),
                            message: e.message,
                        })),
                    });
                }

                return res.status(500).json({
                    message: "Internal Server Error",
                });
            }
        };


export const validateParams =
    (schema: ZodSchema) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                const parsed = schema.parse(req.params);
                req.params = parsed as any;
                return next();
            } catch (err) {
                if (err instanceof ZodError) {
                    logger.error({ issues: err.issues }, "Validation Error");

                    return res.status(400).json({
                        message: "Validation failed",
                        errors: err.issues.map(e => ({
                            field: e.path.join("."),
                            message: e.message,
                        })),
                    });
                }

                return res.status(500).json({
                    message: "Internal Server Error",
                });
            }
        };

import { BaseApiErrorErrors, BaseApiErrorType } from "../types/api";

export class RequestError extends Error {
  name: BaseApiErrorType;
  message: string;
  cause?: unknown;
  errors?: BaseApiErrorErrors[];

  constructor({
    name,
    message,
    cause,
    errors,
  }: {
    name: BaseApiErrorType;
    message?: string;
    cause?: unknown;
    errors?: BaseApiErrorErrors[];
  }) {
    super();
    this.name = name;
    this.message = message ?? name;
    this.cause = typeof cause === "string" ? JSON.parse(cause) : cause;
    this.errors = errors;
  }

  log() {
    console.log("[request][error] RequestError", {
      name: this.name,
      cause: this.cause,
      errors: this.errors,
      message: this.message,
    });
  }
}

// src/utils/AppError.ts
export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    console.log(message,'fldasjfkldjsafkljdklsafjdlasjfdkas')
    // Important: fix the prototype chain for TypeScript
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

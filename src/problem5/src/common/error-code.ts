// User-related error codes
export const USER_ERROR_CODE = {
  ID_NOT_FOUND: {
    statusCode: 404,
    message: "User not found",
  },
  EMAIL_ALREADY_EXISTS: {
    statusCode: 409,
    message: "User with this email already exists",
  },
  INVALID_USER_DATA: {
    statusCode: 400,
    message: "Invalid user data provided",
  },
};

// General API error codes
export const API_ERROR_CODE = {
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: "Internal server error",
  },
  BAD_REQUEST: {
    statusCode: 400,
    message: "Bad request",
  },
  VALIDATION_ERROR: {
    statusCode: 422,
    message: "Validation error",
  },
};

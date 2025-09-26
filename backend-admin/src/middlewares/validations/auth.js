const ServerError = require("../../Errors/errorClas");

const nameValidation = (firstName, lastName) => {
  if (!firstName || !lastName)
    return { ok: false, message: "first and last name are required" };

  if (firstName.length < 2 || lastName.length < 2)
    return {
      ok: false,
      message: "first and last name must be at least 2 characters long",
    };

  if (firstName.length > 25 || lastName.length > 25)
    return {
      ok: false,
      message: "first and last name must be at most 25 characters long",
    };

  return { ok: true };
};

const emailValidation = (email) => {
  if (!email) return { ok: false, message: "Email is required" };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return { ok: false, message: "Email is not valid" };

  if (email.length > 50)
    return { ok: false, message: "Email must be at most 50 characters long" };

  if (email.length < 5)
    return { ok: false, message: "Email must be at least 5 characters long" };

  return { ok: true };
};

const passwordValidation = (password) => {
  if (!password) return { ok: false, message: "password is required" };

  if (password.length < 6 || password.length > 12)
    return {
      ok: false,
      message: "password must be between 6 and 12 characters long",
    };

  if (password.includes(" ")) {
    return { ok: false, message: "password must not contain spaces" };
  }

  const letters = password.match(/[A-Za-z]/g);
  const numbers = password.match(/[0-9]/g);

  if (!letters || !numbers)
    return {
      ok: false,
      message: "Password must contain at least one letter and one number",
    };

  return { ok: true };
};

const signupValidation = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // check if first and last name are valid
  const nameValidationResult = nameValidation(firstName, lastName);
  if (!nameValidationResult.ok)
    return next(new ServerError(nameValidationResult.message, 400));

  // check if email is valid
  const emailValidationResult = emailValidation(email);
  if (!emailValidationResult.ok)
    return next(new ServerError(emailValidationResult.message, 400));

  // check if password is valid
  const passwordValidationResult = passwordValidation(password);
  if (!passwordValidationResult.ok)
    return next(new ServerError(passwordValidationResult.message, 400));

  return next();
};

module.exports = { signupValidation };

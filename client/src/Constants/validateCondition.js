import { z } from "zod";

function validatePassword(password, t) {
  const passwordSchema = z
    .string()
    .min(8, {
      message: "Password has at least 8 characters long",
    })
    .refine(() => /[A-Z]/.test(password), {
      message: "Password has At least one uppercase letter",
    })
    .refine(() => /[a-z]/.test(password), {
      message: "Password has At least one lowercase letter",
    })
    .refine(() => /\d/.test(password), {
      message: "Password has At least one number",
    })
    .refine(() => /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(password), {
      message: "Password has At least one special character",
    })
    .refine(() => !/\s/.test(password), {
      message: "No whitespace allowed in password",
    });
  try {
    passwordSchema.parse(password);
    return [];
  } catch (error) {
    return error.format()._errors;
  }
}

const validateEmail = (email, t) => {
  const emailSchema = z
    .string()
    .min(1, { message: "Please enter valid email address" })
    .email("Please enter valid email address");
  try {
    emailSchema.parse(email);
    return [];
  } catch (error) {
    return error.format()._errors;
  }
};

const validateName = (nameVar, name, t) => {
  const emailSchema = z
    .string()
    .trim()
    .min(3, {
      message: `${name} should contain at least 3 characters`,
    });
  try {
    emailSchema.parse(nameVar);
    return [];
  } catch (error) {
    return error.format()._errors;
  }
};

const validateMobileNo = (mobile, t) => {
  const mobileSchema = z
    .string()
    .min(1, { message: t("errors.Please_enter_mobile_number") })
    .min(6, { message: t("errors.Please_enter_valid_mobile_number") })
    .refine(() => !/\s/.test(mobile), {
      message: t("errors.Please_enter_valid_mobile_number"),
    });
  try {
    mobileSchema.parse(mobile);
    return [];
  } catch (error) {
    return error.format()._errors;
  }
};

export { validatePassword, validateEmail, validateName, validateMobileNo };

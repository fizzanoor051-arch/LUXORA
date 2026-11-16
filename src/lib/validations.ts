export function isValidEmail(
  email: string
): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}

export function isValidPassword(
  password: string
): boolean {
  return password.length >= 8;
}

export function isValidPhone(
  phone: string
): boolean {
  return /^[+]?[\d\s()-]{7,20}$/.test(
    phone
  );
}

export function isRequired(
  value: string
): boolean {
  return value.trim().length > 0;
}

export function validateLogin(data: {
  email: string;
  password: string;
}) {
  const errors: Record<string, string> = {};

  if (!isRequired(data.email)) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email.";
  }

  if (!isRequired(data.password)) {
    errors.password =
      "Password is required.";
  } else if (!isValidPassword(data.password)) {
    errors.password =
      "Password must be at least 8 characters.";
  }

  return errors;
}

export function validateRegister(data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const errors: Record<string, string> = {};

  if (!isRequired(data.name)) {
    errors.name = "Name is required.";
  }

  if (!isRequired(data.email)) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email.";
  }

  if (!isRequired(data.password)) {
    errors.password =
      "Password is required.";
  } else if (!isValidPassword(data.password)) {
    errors.password =
      "Password must be at least 8 characters.";
  }

  if (
    data.password !== data.confirmPassword
  ) {
    errors.confirmPassword =
      "Passwords do not match.";
  }

  return errors;
}
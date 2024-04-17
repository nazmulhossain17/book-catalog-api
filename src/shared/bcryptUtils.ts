import bcrypt from "bcrypt";

const saltRounds = 10;

// Function to hash the password
export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Function to compare the provided password with the hashed password
export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

export default { hashPassword, comparePasswords };

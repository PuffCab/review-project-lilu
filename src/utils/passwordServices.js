import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

const verifyPassword = async (rawPassword, hashedPassword) => {
  const isPasswordCorrect = await bcrypt.compare(rawPassword, hashedPassword);
  return isPasswordCorrect;
};
export { hashPassword, verifyPassword };

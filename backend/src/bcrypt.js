import bcrypt from "bcrypt";

export const encryptPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw error;
  }
};

export const decryptPassword = async (password, hashcode) => {
  try {
    return await bcrypt.compare(password, hashcode)
  } catch (error) {
    throw error;
  }
};
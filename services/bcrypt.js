import bcrypt from 'bcryptjs';

export async function hashPassword(plainPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(plainPassword, salt);
    return password;
  } catch (error) {
    console.error("Ошибка при хэшировании пароля:", error.message);
  }
}

export async function checkValidPassword(plainPassword, hashedPassword) {
  try {
    const passwordIsValid = await bcrypt.compare(plainPassword, hashedPassword);
    return passwordIsValid;
  } catch (error) {
    console.error("Ошибка при проверке пароля:", error.message);
  }
}

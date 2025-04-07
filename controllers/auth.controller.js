import { User } from '../models/User.js';
import jwt from "jsonwebtoken"
import { hashPassword, checkValidPassword } from '../services/bcrypt.js';

class Authcontroller {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const emailAlreadyExists = await User.findOne({ email });
      if (emailAlreadyExists) {
        return res.status(409).json({ message: "Данная электронная почта занята!"});
      }
      
      const hashedPassword = await hashPassword(password);

      const newUser = await new User({ username, email, password: hashedPassword }).save();
      console.log('Пользователь успешно создан:', newUser);
      res.status(201).json({ user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({email});
      console.log(req.body);
      if (!user) {
        return res.status(404).json({ message: "Неверный email или пароль!1"})
      }

      const passwordIsValid = await checkValidPassword(password, user.password);
      if (!passwordIsValid) {
        return res.status(404).json({ message: "Неверный email или пароль!2"});
      }

      const token =jwt.sign(
        { userId: user._id, isFollower: user.isFollower }, // Payload
        "secretkey", // Secret key
        { expiresIn: "12h" } // Expires In (options)
      );
      res.json({ token })
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
export default new Authcontroller();

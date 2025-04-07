import { body } from 'express-validator';
import { createCustomValidatorMiddleware } from './general.validator.js';

const username = body('username')
  .exists()
  .withMessage('поле "username" обязательно!')
  .isString()
  .withMessage('Поле имени должно быть строчкой!')
  .isLength({ min: 3 })
  .withMessage('Минимум 3 буквы!');
const email = body('email')
  .exists()
  .withMessage('поле "email" обязательно!')
  .isEmail()
  .withMessage('Знак "@" обязателен!');
const password = body('password')
  .exists()
  .withMessage('поле "password" обязательно!')
  // .isStrongPassword()
  // .withMessage('Ваш пароль слишком простой!');

const title = body('title')
  .exists()
  .withMessage('поле "title" обязательно!')
  .isString()
  .withMessage('Поле "title" должно быть строчкой!');
const description = body('description')
  .exists()
  .withMessage('поле "description" обязательно!')
  .isString()
  .withMessage('Поле имени должно быть строчкой!')
  .isLength({ min: 3 })
  .withMessage('Минимум 3 буквы!');
const url = body('url')
  .exists()
  .withMessage('поле "url" обязательно!');
const category = body('category')
  .exists()
  .withMessage('поле "category" обязательно!');
export const createUserValidator = createCustomValidatorMiddleware([
  username,
  email,
  password,
]);
export const createMediaValidator = createCustomValidatorMiddleware([
  url,
  title,
  description,
  category,
]);
export const createAlbumValidator = createCustomValidatorMiddleware([
  title,
]);

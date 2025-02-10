/* eslint-disable no-undef */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require('../../controllers/authController');
const User = require('../../models/usersModel');
const { AppError } = require('../../services/errorHandler');

const mockRequest = () => ({
  body: {
    firstName: 'Joe',
    lastName: 'Navi',
    email: 'joe@joe.com',
    password: 'joe123',
    phone: 1234567,
    country: 'Nigeria',
    state: 'FCT',
    address: '205 Kent Street, ABJ',
  },
});

const mockResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
});

const mockUser = {
  _id: '1',
  firstName: 'Joe',
  lastName: 'Navi',
  email: 'joe@joe.com',
  password: 'hashedpassword',
  phone: 1234567,
  country: 'Nigeria',
  state: 'FCT',
  address: '205 Kent Street, ABJ',
};

const loginInfo = {
  email: 'joe@joe.com',
  password: 'joe1234',
};

// Restore all the mocks back to thier original values
// after each test
afterEach(() => {
  jest.restoreAllMocks();
});

describe('Test Auth', () => {
  describe('Register User', () => {
    test('Should register user successfully', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedpassword');
      jest.spyOn(User, 'create').mockResolvedValueOnce(mockUser);

      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      await registerUser(mockReq, mockRes, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'joe@joe.com' });
      expect(bcrypt.hash).toHaveBeenCalledWith('joe123', 10);
      expect(User.create).toHaveBeenCalledWith({
        firstName: 'Joe',
        lastName: 'Navi',
        email: 'joe@joe.com',
        password: 'hashedpassword',
        phone: 1234567,
        country: 'Nigeria',
        state: 'FCT',
        address: '205 Kent Street, ABJ',
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'User created',
      });
    });
    test('Should throw error on missing fields', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();
      delete mockReq.body.email;

      await registerUser(mockReq, mockRes, next);

      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.message).toBe('Required fields missing');
      expect(error.statusCode).toBe(400);
    });
    test('Should throw error on user already exists', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockUser);

      await registerUser(mockReq, mockRes, next);

      const [error] = next.mock.calls[0];
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.message).toBe('User already exists');
      expect(error.statusCode).toBe(422);
    });
    test('Should throw error on password hashing failure', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(null);

      await registerUser(mockReq, mockRes, next);

      const [error] = next.mock.calls[0];
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.message).toBe('Error occured hashing password');
      expect(error.statusCode).toBe(500);
    });

    test('Should throw error on unable to create a user', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('joe123', 10);
      jest.spyOn(User, 'create').mockResolvedValueOnce(null);

      await registerUser(mockReq, mockRes, next);

      const [error] = next.mock.calls[0];
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.message).toBe('Error occurred creating user');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('Login user', () => {
    test('Should throw error on missing fields', async () => {
      const mockReq = mockRequest();
      mockReq.body = {};
      const mockRes = mockResponse();
      const next = jest.fn();

      await loginUser(mockReq, mockRes, next);

      const [error] = next.mock.calls[0];
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.message).toBe('Required fields missing');
      expect(error.statusCode).toBe(400);
    });

    test('Should throw error on invalid email', async () => {
      // Return null for "db.findOne().select("-password")
      // ie. for password/select function
      jest.spyOn(User, 'findOne').mockImplementationOnce(() => ({
        select: jest.fn().mockResolvedValueOnce(null),
      }));

      const mockReq = mockRequest();
      mockReq.body = loginInfo;
      const mockRes = mockResponse();
      const next = jest.fn();

      await loginUser(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.message).toBe('Invalid user account');
      expect(error.statusCode).toBe(404);
    });

    test('Should throw error on invalid password', async () => {
      // Return the user details including password for
      // "db.findOne().select("+password")
      // ie. for password/select function
      jest.spyOn(User, 'findOne').mockImplementationOnce(() => ({
        select: jest.fn().mockResolvedValueOnce(loginInfo),
      }));

      // Return false for password compare as bcrypt returns
      // either true or false
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

      const mockReq = mockRequest();
      mockReq.body = loginInfo;
      const mockRes = mockResponse();
      const next = jest.fn();

      await loginUser(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.message).toBe('Invalid user account');
      expect(error.statusCode).toBe(404);
    });

    test('Should throw error on jwt.sign failure', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(User, 'findOne').mockImplementationOnce(() => ({
        select: jest.fn().mockResolvedValueOnce(loginInfo),
      }));

      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

      jest.spyOn(jwt, 'sign').mockResolvedValueOnce(null);

      await loginUser(mockReq, mockRes, next);

      const [error] = next.mock.calls[0];
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.message).toBe('Error signing token');
      expect(error.statusCode).toBe(500);
    });

    test('Should login user successfully', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();
      const token = 'jwt_test_token';

      jest.spyOn(User, 'findOne').mockImplementationOnce(() => ({
        select: jest.fn().mockResolvedValueOnce(loginInfo),
      }));

      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

      jest.spyOn(jwt, 'sign').mockResolvedValueOnce(token);

      await loginUser(mockReq, mockRes, next);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ success: true, token });
    });
  });
});

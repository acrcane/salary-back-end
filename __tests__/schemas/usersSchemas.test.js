import { describe, expect, test } from '@jest/globals';
import {
  signupSchema,
  loginSchema,
  salarySchema,
} from '../../schemas/usersSchemas';

describe('signupSchema', () => {
  const validData = {
    name: 'George Russell',
    email: 'test63@mail.com',
    password: '123456',
    company: 'Mercedes',
    hourlyRate: 2314,
    hygienePercent: 80,
  };

  test('passes with valid data', () => {
    const { error } = signupSchema.validate(validData);
    expect(error).toBeUndefined();
  });

  test('fails without name', () => {
    const { error } = signupSchema.validate({ ...validData, name: undefined });
    expect(error).toBeDefined();
  });

  test('fails with invalid email', () => {
    const { error } = signupSchema.validate({
      ...validData,
      email: 'testmail',
    });
    expect(error).toBeDefined();
  });

  test('fails with password shorter than 6 chars', () => {
    const { error } = signupSchema.validate({ ...validData, password: '2123' });
    expect(error).toBeDefined();
  });

  test('fails with negative hourlyRate', () => {
    const { error } = signupSchema.validate({ ...validData, hourlyRate: -13 });
    expect(error).toBeDefined();
  });

  test('fails with hygienePercent over 100', () => {
    const { error } = signupSchema.validate({
      ...validData,
      hygienePercent: 123,
    });
    expect(error).toBeDefined();
  });

  test('fails with unknown field', () => {
    const { error } = signupSchema.validate({
      ...validData,
      unknownField: 'x',
    });
    expect(error).toBeDefined();
  });
});

describe('loginSchema', () => {
  const validData = {
    email: 'test@mail.com',
    password: 'password123',
  };

  test('passes with valid data', () => {
    const { error } = loginSchema.validate(validData);
    expect(error).toBeUndefined();
  });

  test('fails without email', () => {
    const { error } = loginSchema.validate({ ...validData, email: undefined });
    expect(error).toBeDefined();
  });

  test('fails with invalid email', () => {
    const { error } = loginSchema.validate({
      ...validData,
      email: 'testmail.com',
    });
    expect(error).toBeDefined();
  });

  test('fails without password', () => {
    const { error } = loginSchema.validate({
      ...validData,
      password: undefined,
    });
    expect(error).toBeDefined();
  });

  test('fails with short password', () => {
    const { error } = loginSchema.validate({ ...validData, password: '123' });
    expect(error).toBeDefined();
  });
  describe('salarySchema', () => {
    test('passes with valid hourlyRate', () => {
      const { error } = salarySchema.validate({ hourlyRate: 30 });
      expect(error).toBeUndefined();
    });

    test('passes with zero hourlyRate', () => {
      const { error } = salarySchema.validate({ hourlyRate: 0 });
      expect(error).toBeUndefined();
    });

    test('fails with negative hourlyRate', () => {
      const { error } = salarySchema.validate({ hourlyRate: -1 });
      expect(error).toBeDefined();
    });

    test('fails without hourlyRate', () => {
      const { error } = salarySchema.validate({});
      expect(error).toBeDefined();
    });

    test('fails with string instead of number', () => {
      const { error } = salarySchema.validate({ hourlyRate: 'twenty' });
      expect(error).toBeDefined();
    });
  });
});
``
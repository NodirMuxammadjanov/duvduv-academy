/**
 * Tests: Phone number formatting utility
 * Tests pure formatting logic — no React, no DOM, no mocks
 */
import { formatPhoneNumber, isPhoneComplete } from '@/lib/phoneUtils';

describe('formatPhoneNumber', () => {
  test('always starts result with +998 prefix', () => {
    const result = formatPhoneNumber('12345');
    expect(result).toMatch(/^\+998 /);
  });

  test('restores +998 prefix if user deletes it', () => {
    const result = formatPhoneNumber('something-wrong');
    expect(result).toBe('+998 ');
  });

  test('formats 2 digits as XX', () => {
    const result = formatPhoneNumber('+998 90');
    expect(result).toBe('+998 90');
  });

  test('formats 5 digits as XX-XXX', () => {
    const result = formatPhoneNumber('+998 90123');
    expect(result).toBe('+998 90-123');
  });

  test('formats 7 digits as XX-XXX-XX', () => {
    const result = formatPhoneNumber('+998 9012345');
    expect(result).toBe('+998 90-123-45');
  });

  test('formats full 9 digits as XX-XXX-XX-XX', () => {
    const result = formatPhoneNumber('+998 901234567');
    expect(result).toBe('+998 90-123-45-67');
  });

  test('strips non-digit characters from input', () => {
    const result = formatPhoneNumber('+998 90abc123def45xy67');
    expect(result).toBe('+998 90-123-45-67');
  });

  test('limits to maximum 9 digits (ignores extra)', () => {
    const result = formatPhoneNumber('+998 9012345678999');
    expect(result).toBe('+998 90-123-45-67');
  });

  test('returns empty digits section when only prefix given', () => {
    const result = formatPhoneNumber('+998 ');
    expect(result).toBe('+998 ');
  });
});

describe('isPhoneComplete', () => {
  test('returns true for a complete phone number (12 total digits)', () => {
    expect(isPhoneComplete('+998 90-123-45-67')).toBe(true);
  });

  test('returns false for incomplete phone number', () => {
    expect(isPhoneComplete('+998 90-123')).toBe(false);
  });

  test('returns false for empty prefix only', () => {
    expect(isPhoneComplete('+998 ')).toBe(false);
  });
});

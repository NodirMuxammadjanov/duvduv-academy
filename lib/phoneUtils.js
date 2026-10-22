/**
 * Phone number formatting utility
 * Extracted pure logic from ApplicationForm for isolated unit testing
 */

/**
 * Formats a phone number input to Uzbek format: +998 XX-XXX-XX-XX
 * @param {string} value - Raw input value
 * @returns {string} - Formatted phone number
 */
export function formatPhoneNumber(value) {
  // Normalize common autofill/paste formats:
  // +998975382004, +998 97 538 20 04, 998975382004, etc.
  const digits = String(value)
    .replace(/\D/g, '')
    .replace(/^998/, '')
    .slice(0, 9);

  // Limit to 9 digits (XX-XXX-XX-XX)
  // Format: 90-123-45-67
  let formatted = '';
  if (digits.length > 0) {
    formatted += digits.slice(0, 2);
    if (digits.length > 2) {
      formatted += '-' + digits.slice(2, 5);
    }
    if (digits.length > 5) {
      formatted += '-' + digits.slice(5, 7);
    }
    if (digits.length > 7) {
      formatted += '-' + digits.slice(7, 9);
    }
  }

  return '+998 ' + formatted;
}

/**
 * Validates that a phone number is complete (9 digits after +998)
 * @param {string} phone - Formatted phone number
 * @returns {boolean}
 */
export function isPhoneComplete(phone) {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 12; // 998 + 9 digits
}

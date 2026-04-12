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
  // Ensure +998 prefix stays
  if (!value.startsWith('+998 ')) {
    value = '+998 ';
  }

  // Strip non-digits after +998
  let digits = value.slice(5).replace(/\D/g, '');

  // Limit to 9 digits (XX-XXX-XX-XX)
  digits = digits.slice(0, 9);

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

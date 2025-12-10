/**
 * Validates a credit card number using the Luhn algorithm
 */
export const validateCardNumber = (cardNumber: string): boolean => {
  const cleanNumber = cardNumber.replace(/\s/g, '')

  if (!/^\d{13,19}$/.test(cleanNumber)) {
    return false
  }

  let sum = 0
  let isEven = false

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

/**
 * Detects the card type based on the card number
 */
export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown'

export const detectCardType = (cardNumber: string): CardType => {
  const cleanNumber = cardNumber.replace(/\s/g, '')

  if (/^4/.test(cleanNumber)) {
    return 'visa'
  }
  if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]/.test(cleanNumber)) {
    return 'mastercard'
  }
  if (/^3[47]/.test(cleanNumber)) {
    return 'amex'
  }
  if (/^6(?:011|5)/.test(cleanNumber)) {
    return 'discover'
  }

  return 'unknown'
}

/**
 * Formats a card number with spaces every 4 digits
 */
export const formatCardNumber = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '')
  const cardType = detectCardType(cleanValue)

  // Amex has different formatting (4-6-5)
  if (cardType === 'amex') {
    const parts = [
      cleanValue.slice(0, 4),
      cleanValue.slice(4, 10),
      cleanValue.slice(10, 15),
    ].filter(Boolean)
    return parts.join(' ')
  }

  // Standard formatting (4-4-4-4)
  const parts = cleanValue.match(/.{1,4}/g) || []
  return parts.join(' ')
}

/**
 * Validates expiration date (MM/YY format)
 */
export const validateExpirationDate = (expDate: string): boolean => {
  const match = expDate.match(/^(\d{2})\/(\d{2})$/)
  if (!match) return false

  const month = parseInt(match[1], 10)
  const year = parseInt(match[2], 10) + 2000

  if (month < 1 || month > 12) return false

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  if (year < currentYear) return false
  if (year === currentYear && month < currentMonth) return false

  return true
}

/**
 * Formats expiration date input (MM/YY)
 */
export const formatExpirationDate = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '')

  if (cleanValue.length >= 2) {
    return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`
  }

  return cleanValue
}

/**
 * Validates CVV/CVC code
 */
export const validateSecurityCode = (
  code: string,
  cardType: CardType
): boolean => {
  const cleanCode = code.replace(/\D/g, '')

  // Amex has 4-digit CVV
  if (cardType === 'amex') {
    return /^\d{4}$/.test(cleanCode)
  }

  // Other cards have 3-digit CVV
  return /^\d{3}$/.test(cleanCode)
}

/**
 * Validates all payment fields
 */
export interface PaymentValidation {
  isValid: boolean
  errors: {
    cardNumber?: string
    expirationDate?: string
    securityCode?: string
    cardholderName?: string
  }
}

export const validatePayment = (
  cardNumber: string,
  expirationDate: string,
  securityCode: string,
  cardholderName: string
): PaymentValidation => {
  const errors: PaymentValidation['errors'] = {}
  const cardType = detectCardType(cardNumber)

  if (!validateCardNumber(cardNumber)) {
    errors.cardNumber = 'Número de tarjeta inválido'
  }

  if (!validateExpirationDate(expirationDate)) {
    errors.expirationDate = 'Fecha de expiración inválida'
  }

  if (!validateSecurityCode(securityCode, cardType)) {
    errors.securityCode =
      cardType === 'amex'
        ? 'CVV debe tener 4 dígitos'
        : 'CVV debe tener 3 dígitos'
  }

  if (!cardholderName.trim() || cardholderName.trim().length < 3) {
    errors.cardholderName = 'Nombre del titular requerido'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Simulates payment processing with random success/failure
 * For testing purposes: cards ending in 0000 will always fail
 */
export const simulatePaymentProcessing = async (
  cardNumber: string
): Promise<{ success: boolean; error?: string }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  const cleanNumber = cardNumber.replace(/\s/g, '')

  // Cards ending in 0000 always fail (for testing)
  if (cleanNumber.endsWith('0000')) {
    return {
      success: false,
      error: 'Pago rechazado: Fondos insuficientes',
    }
  }

  // Cards ending in 1111 fail with different error (for testing)
  if (cleanNumber.endsWith('1111')) {
    return {
      success: false,
      error: 'Pago rechazado: Tarjeta bloqueada',
    }
  }

  // 95% success rate for other cards
  const isSuccess = Math.random() > 0.05

  if (!isSuccess) {
    return {
      success: false,
      error: 'Pago rechazado: Error de comunicación con el banco',
    }
  }

  return { success: true }
}

export function hasSpecialChars(text: string): boolean {
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/
  return specialCharRegex.test(text)
}
export function isEmpty(text: string): boolean {
  return text === '' || text === undefined || text === null
}
export function hasOnlyDigits(text: string): boolean {
  const digitRegex = /^\d+$/
  return digitRegex.test(text)
}
export function isLengthEnough(str: string): boolean {
  return str.length >= 140
}

export function sanitizeInput(input: string): string  {
  const dangerousChars = /['"<>&]/g;
  return input.replace(dangerousChars, '');
}
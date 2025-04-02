export function sanitizeInput(input) {
    const dangerousChars = /['"<>&]/g;
    return input.replace(dangerousChars, '');
}

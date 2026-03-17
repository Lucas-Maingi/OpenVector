/**
 * Security utilities for input sanitization and protection.
 */

/**
 * Basic XSS prevention: Escapes HTML characters in a string.
 */
export function sanitize(str: string): string {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

/**
 * Validates that a string is a safe UUID format.
 */
export function isValidUuid(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}

/**
 * Checks for common search-based injection characters.
 */
export function isSafeQuery(query: string): boolean {
    // block common command injection or suspicious sequences
    const suspicious = [';', '--', '/*', '*/', '@@', 'xp_'];
    return !suspicious.some(s => query.includes(s));
}

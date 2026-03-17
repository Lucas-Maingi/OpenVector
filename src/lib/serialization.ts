/**
 * Deeply serializes data to ensure it is JSON-safe for Next.js Client Components.
 * Converts Date objects to ISO strings and handles potential BigInts.
 */
export function serializeData<T>(data: T): T {
    if (data === null || data === undefined) return data;

    if (data instanceof Date) {
        return data.toISOString() as any;
    }

    if (Array.isArray(data)) {
        return data.map(item => serializeData(item)) as any;
    }

    if (typeof data === 'object') {
        const result: any = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                result[key] = serializeData((data as any)[key]);
            }
        }
        return result;
    }

    if (typeof data === 'bigint') {
        return data.toString() as any;
    }

    return data;
}

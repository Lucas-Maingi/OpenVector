import { usernameSearch } from '../src/connectors/usernameSearch';

async function test() {
    console.log('Testing usernameSearch for "lucasmaingi"...');
    try {
        const result = await usernameSearch('lucasmaingi');
        console.log('Result:', JSON.stringify(result, null, 2));
    } catch (err) {
        console.error('Failed:', err);
    }
}

test();

import { usernameSearch } from '../src/connectors/usernameSearch';
import { domainSearch } from '../src/connectors/domainSearch';
import { googleDorks } from '../src/connectors/googleDorks';
import { interpolSearch } from '../src/connectors/interpolSearch';
import { cryptoSearch } from '../src/connectors/cryptoSearch';
import { darkWebSearch } from '../src/connectors/darkWebSearch';
import { peopleSearch } from '../src/connectors/peopleSearch';

async function runDiagnostic() {
    console.log("=== ALETHEIA OSINT ENGINE DIAGNOSTIC v2 ===");
    console.log(`Started: ${new Date().toISOString()}`);
    console.log("------------------------------------------");

    const tests = [
        { name: 'Username (GitHub/Social)', func: usernameSearch, target: 'bitget' },
        { name: 'Domain (Security/Whois)', func: domainSearch, target: 'aletheia-live.vercel.app' },
        { name: 'Interpol (Wanted/Notices)', func: interpolSearch, target: 'Smith' },
        { name: 'Crypto (BTC Ledger)', func: cryptoSearch, target: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
        { name: 'Dark Web (Tor Index)', func: darkWebSearch, target: 'aletheia' },
        { name: 'People Search (OSINT)', func: peopleSearch, target: 'Mark Mbithi' }
    ];

    const results: any[] = [];

    // Special test wrappers
    const runTest = async (test: any) => {
        if (test.name === 'Google Dorks (Advanced)') {
            return await test.func({ name: test.target });
        }
        return await (test.func as any)(test.target);
    };

    for (const test of [...tests, { name: 'Google Dorks (Advanced)', func: googleDorks, target: 'aletheia vector' }]) {
        process.stdout.write(`Testing ${test.name.padEnd(25)}... `);
        const start = Date.now();
        try {
            const res = await runTest(test);
            const duration = Date.now() - start;
            const count = res.results.length;
            
            if (count > 0) {
                console.log(`SUCCESS [${count} results] (${duration}ms)`);
                results.push({ name: test.name, status: 'GREEN', count, duration });
            } else {
                console.log(`YELLOW [0 results] (${duration}ms)`);
                results.push({ name: test.name, status: 'YELLOW', count, duration });
            }
        } catch (err: any) {
            const duration = Date.now() - start;
            console.log(`RED [ERROR] (${duration}ms)`);
            console.error(`  > ${err.message}`);
            results.push({ name: test.name, status: 'RED', error: err.message, duration });
        }
    }

    console.log("\n------------------------------------------");
    console.log("FINAL AUDIT SUMMARY:");
    console.table(results);
}

runDiagnostic().catch(console.error);

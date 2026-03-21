const { usernameSearch } = require('./src/connectors/usernameSearch');
const { domainSearch } = require('./src/connectors/domainSearch');
const { googleDorks } = require('./src/connectors/googleDorks');
const { interpolSearch } = require('./src/connectors/interpolSearch');
const { cryptoSearch } = require('./src/connectors/cryptoSearch');
const { darkWebSearch } = require('./src/connectors/darkWebSearch');
const { peopleSearch } = require('./src/connectors/peopleSearch');

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
        { name: 'People Search (OSINT)', func: peopleSearch, target: 'Mark Mbithi' },
        { name: 'Google Dorks (Advanced)', func: googleDorks, target: 'site:github.com "aletheia"' }
    ];

    const results = [];

    for (const test of tests) {
        process.stdout.write(`Testing ${test.name.padEnd(25)}... `);
        const start = Date.now();
        try {
            const res = await test.func(test.target);
            const duration = Date.now() - start;
            const count = res.results.length;
            
            if (count > 0) {
                console.log(`SUCCESS [${count} results] (${duration}ms)`);
                results.push({ name: test.name, status: 'GREEN', count, duration });
            } else {
                console.log(`YELLOW [0 results] (${duration}ms)`);
                results.push({ name: test.name, status: 'YELLOW', count, duration });
            }
        } catch (err) {
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

runDiagnostic();

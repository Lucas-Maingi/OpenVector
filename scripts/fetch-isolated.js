const fs = require('fs');

async function run() {
    const tests = ['username', 'domain', 'interpol', 'crypto', 'darkweb', 'people', 'dorks'];
    const results = [];

    console.log("=== ALETHEIA ISOLATED DIAGNOSTIC ===");

    for (const test of tests) {
        process.stdout.write(`Testing [${test}]... `);
        const start = Date.now();
        try {
            const response = await fetch(`http://localhost:3000/api/debug/engine?test=${test}`, {
                 signal: AbortSignal.timeout(40000) 
            });
            const data = await response.json();
            const res = data.results[0];
            const duration = Date.now() - start;
            
            if (res.status === 'GREEN') {
                console.log(`SUCCESS (${res.count} results) in ${duration}ms`);
            } else if (res.status === 'YELLOW') {
                console.log(`YELLOW (0 results) in ${duration}ms`);
            } else {
                console.log(`RED (${res.error}) in ${duration}ms`);
            }
            results.push(res);
        } catch (e) {
            const duration = Date.now() - start;
            console.log(`TIMEOUT/FAIL in ${duration}ms: ${e.message}`);
            results.push({ id: test, name: test, status: 'RED', error: e.message, duration });
        }
    }

    fs.writeFileSync('engine-result.json', JSON.stringify({ results }, null, 2));
    console.log("\nResults saved to engine-result.json");
    console.table(results);
}

run();

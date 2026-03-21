const fs = require('fs');

async function run() {
    console.log("Fetching diagnostic from http://localhost:3000/api/debug/engine ...");
    const start = Date.now();
    try {
        const response = await fetch('http://localhost:3000/api/debug/engine', {
            // High timeout for the heavy OSINT processes
             signal: AbortSignal.timeout(120000) 
        });
        const data = await response.json();
        const duration = Date.now() - start;
        console.log(`Fetch complete in ${duration}ms!`);
        fs.writeFileSync('engine-result.json', JSON.stringify(data, null, 2));
        console.log("Results saved to engine-result.json");
    } catch (e) {
        console.error("Fetch failed:", e.message);
    }
}

run();

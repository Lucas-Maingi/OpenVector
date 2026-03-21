const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36';

async function testInterpol() {
    console.log("Testing Interpol API...");
    try {
        const res = await fetch('https://ws-public.interpol.int/notices/v1/red?name=Smith', {
            headers: { 'User-Agent': userAgent }
        });
        console.log(`Interpol Status: ${res.status}`);
        if (res.ok) {
            const data = await res.json();
            console.log(`Interpol Notices: ${data._embedded?.notices?.length || 0}`);
        } else {
            console.log(await res.text().then(t => t.slice(0, 100)));
        }
    } catch (e) {
        console.log(`Interpol Error: ${e.message}`);
    }
}

async function testYahoo() {
    console.log("\nTesting Yahoo Search...");
    try {
        const res = await fetch('https://search.yahoo.com/search?p=site:github.com+"aletheia"', {
            headers: { 'User-Agent': userAgent }
        });
        console.log(`Yahoo Status: ${res.status}`);
        if (res.ok) {
            const html = await res.text();
            const resultBlocks = html.split('class="compTitle').length - 1;
            console.log(`Yahoo Results found: ${resultBlocks}`);
        } else {
            console.log(await res.text().then(t => t.slice(0, 100)));
        }
    } catch (e) {
        console.log(`Yahoo Error: ${e.message}`);
    }
}

async function run() {
    await testInterpol();
    await testYahoo();
}

run();

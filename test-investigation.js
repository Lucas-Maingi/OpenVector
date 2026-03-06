const http = require('http');

async function test() {
    try {
        const resList = await fetch('http://localhost:3000/dashboard');
        const text = await resList.text();

        // Exact 36 char UUID match
        const allMatches = text.matchAll(/href="\/dashboard\/investigations\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})"/g);
        let found = false;

        for (const m of allMatches) {
            const id = m[1];
            found = true;
            console.log("Found Investigation ID:", id);
            const res = await fetch('http://localhost:3000/dashboard/investigations/' + id);
            console.log("Status:", res.status);
            const html = await res.text();

            if (html.includes('Error')) {
                console.log("HTML EXPERIENCED A SERVER ERROR.");
                const errMatch = html.match(/<pre[^>]*>(.*?)<\/pre>/s);
                if (errMatch) {
                    console.log("CRASH EXTRACTED:\n", errMatch[1].substring(0, 1000));
                } else {
                    console.log("Could not find <pre> tag. Printing some HTML surrounding Error:");
                    const errIdx = html.indexOf('Error');
                    console.log(html.substring(Math.max(0, errIdx - 100), errIdx + 500));
                }
            } else {
                console.log("No explicit Error word found in HTML.");
                if (html.includes('id=\"__next\"')) {
                    console.log("Next.js root div found.");
                }
                const rootMatch = html.match(/<div id="__next".*?>(.*?)<\/div>/s);
                if (rootMatch && rootMatch[1].length < 200) {
                    console.log("Page looks remarkably blank. Root content:", rootMatch[1]);
                }
            }
            return;
        }

        if (!found) {
            console.log("No ID found. Full HTML length:", text.length);
        }
    } catch (e) {
        console.error("Fetch threw error:", e);
    }
}
test();

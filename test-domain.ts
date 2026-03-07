import { domainSearch } from "./src/connectors/domainSearch.js";

async function test() {
    console.log("Testing domainSearch('x.com')...");
    const result = await domainSearch("x.com");
    console.log("Found results:", result.results.length);
    console.log(JSON.stringify(result.results, null, 2));
}

test().catch(console.error);

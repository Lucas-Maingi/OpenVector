import { googleDorks } from './src/connectors/googleDorks.ts';

async function test() {
    console.log("Running Yahoo Dorks test for 'Donald Trump'...");
    const results = await googleDorks({ name: 'Donald Trump' });
    
    console.log("\n=========================");
    console.log(`FOUND ${results.results.length} RESULTS`);
    console.log("=========================\n");

    results.results.forEach((r, i) => {
        console.log(`[${i+1}] ${r.platform} - ${r.title}`);
        console.log(`URL: ${r.url}`);
        console.log(`Preview: \n${r.description}`);
        console.log("-----------------------\n");
    });
}

test();

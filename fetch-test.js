const fs = require('fs');
const html = fs.readFileSync('yahoo_dump.html', 'utf-8');
const resultBlocks = html.split('class="compTitle');

for (let i = 1; i < resultBlocks.length; i++) {
    const block = resultBlocks[i];
    
    // Yahoo titles look like: <h3 ...><span ...>Text</span></h3>
    const titleMatch = block.match(/<h3[^>]*>[\s\S]*?<span[^>]*>(.*?)<\/span>/);
    
    // Yahoo texts look like: <div class="compText ..."><p>Snippet</p></div> or similar nearby
    const snippetArea = block.substring(0, 1500); 
    const snippetMatch = snippetArea.match(/class="compText[^>]*>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/);
    
    // URL match looking for RU= parameter in r.search.yahoo.com...
    const urlMatch = block.match(/href="[^"]*RU=([^/&"]+)/);
    
    if (titleMatch || urlMatch) {
       let rawUrl = urlMatch ? decodeURIComponent(urlMatch[1]) : 'N/A';
       let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'N/A';
       let snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]+>/g, '').trim() : 'N/A';
       
       console.log("\n-> TITLE:", title);
       console.log("-> URL:", rawUrl);
       console.log("-> SNIPPET:", snippet);
    }
}

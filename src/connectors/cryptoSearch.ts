import { ConnectorResult, SearchResult } from './types';

/**
 * Cryptocurrency & Blockchain Intelligence Scanner
 * Identifies if a query is a Bitcoin or Ethereum wallet address, and extracts live blockchain balances and transaction history.
 */
export async function cryptoSearch(query: string): Promise<ConnectorResult> {
    const results: SearchResult[] = [];
    if (!query) return { connectorType: 'crypto_search', query: '', results, generatedAt: new Date().toISOString() };

    // Clean query
    const address = query.trim();

    // Regex matchers
    const isBtc = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,59}$/.test(address);
    const isEth = /^0x[a-fA-F0-9]{40}$/i.test(address);

    if (isBtc) {
        try {
            const res = await fetch(`https://mempool.space/api/address/${address}`, {
                headers: { 'User-Agent': 'OpenVector-OSINT-Engine/1.0' },
                cache: 'no-store'
            });
            if (res.ok) {
                const data = await res.json();
                const funded = data.chain_stats?.funded_txo_sum || 0;
                const spent = data.chain_stats?.spent_txo_sum || 0;
                const balanceSats = funded - spent;
                const balanceBtc = (balanceSats / 100000000).toFixed(4);
                const txCount = data.chain_stats?.tx_count || 0;

                results.push({
                    title: `Bitcoin Intelligence — Wallet Node`,
                    url: `https://mempool.space/address/${address}`,
                    description: `Identified Bitcoin Wallet: ${address}\nCurrent Balance: ${balanceBtc} BTC (${balanceSats} satoshis)\nTotal Transactions: ${txCount}\nTotal Lifetime Received: ${(funded / 100000000).toFixed(4)} BTC\nTotal Lifetime Spent: ${(spent / 100000000).toFixed(4)} BTC.`,
                    category: 'financial',
                    platform: 'Bitcoin',
                });
            } else {
                results.push({
                    title: `System Trace — Bitcoin Node Error`,
                    url: `#`,
                    description: `Mempool API blocked the request. Status: ${res.status}`,
                    category: 'system',
                    platform: 'Bitcoin',
                });
            }
        } catch (e: any) {
            results.push({ title: `System Trace — Bitcoin Failed`, url: `#`, description: e?.message || 'Network error', category: 'system', platform: 'Bitcoin' });
        }
    }

    if (isEth) {
        try {
            const res = await fetch(`https://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`, {
                headers: { 'User-Agent': 'OpenVector-OSINT-Engine/1.0' },
                cache: 'no-store'
            });
            if (res.ok) {
                const data = await res.json();
                const ethBalance = data.ETH?.balance || 0;
                const txCount = data.countTxs || 0;
                const tokensCount = data.tokens ? data.tokens.length : 0;

                results.push({
                    title: `Ethereum Intelligence — Wallet Node`,
                    url: `https://etherscan.io/address/${address}`,
                    description: `Identified Ethereum Wallet: ${address}\nCurrent ETH Balance: ${ethBalance.toFixed(4)} ETH\nTotal Transactions: ${txCount}\nERC-20 Tokens Held: ${tokensCount}.`,
                    category: 'financial',
                    platform: 'Ethereum',
                });

                if (tokensCount > 0) {
                    // Get top 3 tokens
                    const topTokens = data.tokens
                        .sort((a: any, b: any) => (b.balance || 0) - (a.balance || 0))
                        .slice(0, 3)
                        .map((t: any) => t.tokenInfo?.symbol || 'Unknown')
                        .join(', ');

                    results.push({
                        title: `Ethereum Assets — Tokens`,
                        url: `https://etherscan.io/address/${address}#tokentxns`,
                        description: `The wallet holds alternative tokens. Top identified assets: ${topTokens}.`,
                        category: 'financial',
                        platform: 'Ethereum',
                    });
                }
            } else {
                results.push({
                    title: `System Trace — Ethereum Node Error`,
                    url: `#`,
                    description: `Ethplorer API blocked the request. Status: ${res.status}`,
                    category: 'system',
                    platform: 'Ethereum',
                });
            }
        } catch (e: any) {
            results.push({ title: `System Trace — Ethereum Failed`, url: `#`, description: e?.message || 'Network error', category: 'system', platform: 'Ethereum' });
        }
    }

    return {
        connectorType: 'crypto_search',
        query,
        results,
        generatedAt: new Date().toISOString(),
    };
}

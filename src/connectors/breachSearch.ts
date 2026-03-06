import { ConnectorResult, SearchResult } from './types';

/**
 * Breach Search — checks email against Gravatar (free, no key),
 * and returns structured data about known breach sources.
 * Note: HIBP v3 requires a paid API key; we link to it and use public intelligence instead.
 */
export async function breachSearch(email: string): Promise<ConnectorResult> {
    const results: SearchResult[] = [];

    // 1. Gravatar check (email hash → avatar = account exists)
    try {
        const crypto = await import('crypto');
        const hash = crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');
        const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?d=404&s=200`;
        const gRes = await fetch(gravatarUrl, { method: 'HEAD', next: { revalidate: 0 } });

        if (gRes.ok) {
            results.push({
                title: `Gravatar — ${email}`,
                url: `https://www.gravatar.com/${hash}`,
                description: `✅ A Gravatar profile is linked to this email address. This confirms the email is registered with Gravatar and likely active. Avatar URL: ${gravatarUrl.replace('?d=404&s=200', '?s=200')}`,
                category: 'identity',
                platform: 'Gravatar',
                metadata: {
                    avatarUrl: gravatarUrl.replace('?d=404&s=200', '?s=200'),
                    profileUrl: `https://en.gravatar.com/${hash}`,
                }
            });
        } else {
            results.push({
                title: `Gravatar — ${email}`,
                url: `https://en.gravatar.com/`,
                description: `No Gravatar profile found for this email address (HTTP 404). The email may be unregistered or using a private avatar.`,
                category: 'identity',
                platform: 'Gravatar',
            });
        }
    } catch { /* skip */ }

    // 2. HIBP — link with explanation (paid API required for direct lookup)
    const encodedEmail = encodeURIComponent(email);
    results.push({
        title: `HaveIBeenPwned — ${email}`,
        url: `https://haveibeenpwned.com/account/${encodedEmail}`,
        description: `Check if "${email}" appears in known data breaches. HaveIBeenPwned is the world's largest breach index covering billions of leaked credentials. Direct API lookup requires a subscription key; use the link to check manually.`,
        category: 'breach',
        platform: 'HaveIBeenPwned',
    });

    // 3. DeHashed — breach aggregator
    results.push({
        title: `DeHashed — ${email}`,
        url: `https://dehashed.com/search?query=${encodedEmail}`,
        description: `DeHashed aggregates data from thousands of breaches. Search for "${email}" to check for leaked passwords, usernames, IP addresses, and other personal data associated with this email.`,
        category: 'breach',
        platform: 'DeHashed',
    });

    // 4. Intelligence X
    results.push({
        title: `Intelligence X — ${email}`,
        url: `https://intelx.io/?s=${encodedEmail}`,
        description: `IntelX is a search engine for leaked databases, darknet data, and OSINT sources. Shows breaches, pastes, and mentions of "${email}" across a broad range of indexed sources.`,
        category: 'breach',
        platform: 'IntelX',
    });

    // 5. Snusbase (breach database)
    results.push({
        title: `Snusbase — ${email}`,
        url: `https://snusbase.com/`,
        description: `Snusbase indexes leaked databases and can surface associated usernames, IP addresses, and passwords for "${email}". Requires account registration for full access.`,
        category: 'breach',
        platform: 'Snusbase',
    });

    // 6. Pastebin search
    results.push({
        title: `Pastebin — ${email}`,
        url: `https://duckduckgo.com/?q=site%3Apastebin.com+%22${encodedEmail}%22`,
        description: `Searches Pastebin for public pastes containing "${email}". Data leaks are often posted publicly to paste sites before being removed.`,
        category: 'breach',
        platform: 'Pastebin',
    });

    return {
        connectorType: 'breach_search',
        query: email,
        results,
        generatedAt: new Date().toISOString(),
    };
}

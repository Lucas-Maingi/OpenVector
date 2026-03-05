import { ConnectorResult, SearchResult } from './types';

export async function breachSearch(email: string): Promise<ConnectorResult> {
    const encodedEmail = encodeURIComponent(email);

    const results: SearchResult[] = [
        {
            title: `HaveIBeenPwned — ${email}`,
            url: `https://haveibeenpwned.com/account/${encodedEmail}`,
            description: 'Official HIBP lookup — checks email against known public data breaches',
            category: 'breach',
            platform: 'HaveIBeenPwned',
        },
        {
            title: `Dehashed — ${email}`,
            url: `https://dehashed.com/search?query=${encodedEmail}`,
            description: 'Dehashed data breach search (registration required for results)',
            category: 'breach',
            platform: 'Dehashed',
        },
        {
            title: `LeakCheck — ${email}`,
            url: `https://leakcheck.io/?query=${encodedEmail}`,
            description: 'Breach aggregator — returns breach name and type without exposing passwords',
            category: 'breach',
            platform: 'LeakCheck',
        },
        {
            title: `IntelX — ${email}`,
            url: `https://intelx.io/?s=${encodedEmail}`,
            description: 'Intelligence X — dark web and leak search engine (limited free tier)',
            category: 'breach',
            platform: 'IntelX',
        },
        {
            title: `Google: ${email} in public leaks`,
            url: `https://www.google.com/search?q="${encodedEmail}"+("leaked"+OR+"breach"+OR+"dump"+OR+"pastebin")`,
            description: 'Google dork to find this email in paste sites or public breach references',
            category: 'breach',
            platform: 'Google',
        },
        {
            title: `Pastebin: ${email} mentions`,
            url: `https://psbdmp.ws/search/${encodedEmail}`,
            description: 'Search Pastebin dumps for this email address',
            category: 'breach',
            platform: 'Pastebin Dump',
        },
        {
            title: `Email2Phonenumber pattern`,
            url: `https://www.google.com/search?q="${encodedEmail}"+(phone+OR+mobile+OR+cell)`,
            description: 'Search for phone numbers associated with this email',
            category: 'contact',
            platform: 'Google',
        },
    ];

    // Simulate async delay for consistency
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        connectorType: 'breach_search',
        query: email,
        results,
        generatedAt: new Date().toISOString(),
    };
}

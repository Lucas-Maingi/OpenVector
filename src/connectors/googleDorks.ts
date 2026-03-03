import { ConnectorResult, SearchResult } from './types';

interface DorkOptions {
    name?: string;
    username?: string;
    email?: string;
    domain?: string;
}

export function googleDorks(options: DorkOptions): ConnectorResult {
    const { name, username, email, domain } = options;
    const results: SearchResult[] = [];
    const query = name || username || email || domain || 'subject';

    if (name) {
        results.push(
            {
                title: `Google: Exact name match`,
                url: `https://www.google.com/search?q="${encodeURIComponent(name)}"`,
                description: `Exact match search for "${name}"`,
                category: 'identity',
                platform: 'Google',
            },
            {
                title: `Google: Name + social profile`,
                url: `https://www.google.com/search?q="${encodeURIComponent(name)}"+(site:linkedin.com+OR+site:twitter.com+OR+site:instagram.com)`,
                description: 'Find social media profiles for this name',
                category: 'social',
                platform: 'Google',
            },
            {
                title: `Google: Name + contact info`,
                url: `https://www.google.com/search?q="${encodeURIComponent(name)}"+(email+OR+phone+OR+contact)`,
                description: "Search for contact details associated with this person's name",
                category: 'contact',
                platform: 'Google',
            },
            {
                title: `Google: Name + documents`,
                url: `https://www.google.com/search?q="${encodeURIComponent(name)}"+(filetype:pdf+OR+filetype:doc+OR+filetype:ppt)`,
                description: 'Find public documents authored or mentioning this name',
                category: 'documents',
                platform: 'Google',
            }
        );
    }

    if (username) {
        results.push(
            {
                title: `Google: Username exact search`,
                url: `https://www.google.com/search?q="${encodeURIComponent(username)}"`,
                description: `Find all indexed pages mentioning "${username}"`,
                category: 'identity',
                platform: 'Google',
            },
            {
                title: `Google: Username on portfolio/blog sites`,
                url: `https://www.google.com/search?q="${encodeURIComponent(username)}"+(site:medium.com+OR+site:substack.com+OR+site:wordpress.com+OR+site:blogspot.com)`,
                description: 'Find blogs and writing platforms using this username',
                category: 'content',
                platform: 'Google',
            }
        );
    }

    if (email) {
        const emailEncoded = encodeURIComponent(email);
        results.push(
            {
                title: `Google: Email in public records`,
                url: `https://www.google.com/search?q="${emailEncoded}"`,
                description: 'Find all indexed pages mentioning this email address',
                category: 'contact',
                platform: 'Google',
            },
            {
                title: `Google: Email in forum posts`,
                url: `https://www.google.com/search?q="${emailEncoded}"+(site:reddit.com+OR+site:stackoverflow.com+OR+site:github.com)`,
                description: 'Find this email on developer/community forums',
                category: 'social',
                platform: 'Google',
            }
        );
    }

    if (domain) {
        const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
        results.push(
            {
                title: `Google: All indexed pages on ${cleanDomain}`,
                url: `https://www.google.com/search?q=site:${cleanDomain}`,
                description: 'List all Google-indexed pages from this domain',
                category: 'domain',
                platform: 'Google',
            },
            {
                title: `Google: Subdomain discovery`,
                url: `https://www.google.com/search?q=site:${cleanDomain}+-www.${cleanDomain}`,
                description: 'Discover subdomains indexed by Google',
                category: 'domain',
                platform: 'Google',
            },
            {
                title: `Google: Login/admin pages`,
                url: `https://www.google.com/search?q=site:${cleanDomain}+(inurl:admin+OR+inurl:login+OR+inurl:dashboard+OR+inurl:portal)`,
                description: 'Find exposed admin or login pages',
                category: 'security',
                platform: 'Google',
            },
            {
                title: `Google: Exposed config files`,
                url: `https://www.google.com/search?q=site:${cleanDomain}+(ext:env+OR+ext:config+OR+ext:xml+OR+filetype:sql)`,
                description: 'Search for potentially exposed configuration or database files',
                category: 'security',
                platform: 'Google',
            }
        );
    }

    return {
        connectorType: 'google_dork',
        query,
        results,
        generatedAt: new Date().toISOString(),
    };
}

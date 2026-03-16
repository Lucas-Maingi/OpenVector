# Aletheia API & OSINT Integrations

Aletheia orchestrates real-time intelligence gathering across a multi-node network of public APIs, specialized search engines, and decentralized data sources. This document outlines the specific endpoints and services hit during an active investigation.

## 1. Identity & Social Intelligence
Powering the `username_search` and `identity_validation` nodes.

| Service | Endpoint / Method | Purpose |
|---------|-------------------|---------|
| **GitHub API** | `https://api.github.com/users/{id}` | Real-time profile metadata, bio, and repository counts. |
| **Reddit API** | `https://www.reddit.com/user/{id}/about.json` | Karma analysis, account age, and subreddit descriptions. |
| **Gravatar** | `https://en.gravatar.com/{hash}.json` | Cross-checking profile photos, names, and social links. |
| **Medium** | `https://medium.com/@{id}` (Scrape) | Author bio and article summary extraction. |
| **DuckDuckGo HTML**| `https://html.duckduckgo.com/html/` | Targeted profiling of X (Twitter), LinkedIn, and Instagram. |

## 2. Infrastructure & Domain Intelligence
Powering the `domain_search` and `infrastructure_audit` nodes.

| Service | Endpoint / Method | Purpose |
|---------|-------------------|---------|
| **crt.sh** | `https://crt.sh/?q=%.{domain}&output=json` | Certificate Transparency logs for subdomain discovery. |
| **RDAP (rdap.org)**| `https://rdap.org/domain/{domain}` | Modernized WHOIS query for registration and nameservers. |
| **Cloudflare DNS** | `https://cloudflare-dns.com/dns-query` | DNS record extraction (A, MX, TXT, NS). |
| **HackerTarget** | `https://api.hackertarget.com/hostsearch/` | IP host mapping and infrastructure footprinting. |
| **IP-API** | `http://ip-api.com/json/{domain}` | High-accuracy server geolocation and ISP identification. |

## 3. Financial & Blockchain Intelligence
Powering the `crypto_search` node.

| Service | Endpoint / Method | Purpose |
|---------|-------------------|---------|
| **Mempool.space** | `https://mempool.space/api/address/{id}` | Live Bitcoin (BTC) balance and transaction history. |
| **Ethplorer** | `https://api.ethplorer.io/getAddressInfo/` | Ethereum (ETH) balance and ERC-20 token holdings. |
| **DuckDuckGo HTML**| `https://html.duckduckgo.com/html/` | Cross-referencing wallet addresses with public mentions. |

## 4. Dark Web & Criminal Intelligence
Powering the `dark_web_search` and `interpol_search` nodes.

| Service | Endpoint / Method | Purpose |
|---------|-------------------|---------|
| **Ahmia.fi** | `https://ahmia.fi/search/?q={query}` | Tor hidden service index for .onion site mentions. |
| **INTERPOL API** | `https://ws-public.interpol.int/notices/v1/` | Checking for active Red Notices (arrest warrants). |
| **IntelX** | `https://intelx.io/?s={query}` (Scrape) | Deep web mention and data leak context validation. |
| **EmailRep.io** | `https://emailrep.io/{id}` | Real-time email reputation scoring and breach detection. |

## 5. Visual Intelligence
Powering the `reverse_image_search` node.

| Service | Method | Purpose |
|---------|--------|---------|
| **Google Lens** | URL/Upload | Visual search and source identification. |
| **Bing Visual Search**| URL/Upload | General image recognition and source tracking. |
| **Yandex Images** | URL/Upload | Highly effective facial recognition and profile matching. |
| **TinEye** | URL/Upload | Image origin finding and alteration history. |

---
**Note:** All requests are performed with randomized User-Agents and appropriate timeouts to ensure reliability and bypass basic BOT detection. No sensitive API keys are shared between nodes except for optional user-provided Gemini keys for AI synthesis.

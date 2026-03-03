# OpenVector — AI-Powered OSINT Workspace

OpenVector is an open-source intelligence (OSINT) workflow accelerator. It automates the collection, organization, and synthesis of public intelligence using modern AI and specialized connectors.

## 🚀 Open Core vs. SaaS

OpenVector follows an **Open Core** model. Our core engine is open-source and free to self-host, while we offer a managed SaaS platform with enhanced features.

| Feature | Open Core (Self-Hosted) | OpenVector SaaS |
| :--- | :---: | :---: |
| Core Engine & Connectors | ✅ | ✅ |
| Community Support | ✅ | ✅ |
| SaaS Infrastructure | ❌ | ✅ |
| Cloud Storage & Sync | ❌ | ✅ |
| Integrated AI Credits | ❌ | ✅ |
| Priority Support | ❌ | ✅ |

## 🛠️ Getting Started (Self-Hosting)

### Prerequisites

- Node.js 18.x or later
- PostgreSQL Database
- OpenAI API Key (optional, for synthesis)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Lucas-Maingi/OpenVector.git
   cd OpenVector
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Copy `.env.example` to `.env.local` and fill in your credentials.
   ```bash
   cp .env.example .env.local
   ```

4. **Initialize Database:**
   ```bash
   npx prisma db push
   ```

5. **Run Development Server:**
   ```bash
   npm run dev
   ```

## 🔒 Security & Ethics

OpenVector is designed for ethical cybersecurity research and investigative journalism. Please use this tool responsibly and in accordance with your local laws.

## 📄 License

The core engine is licensed under the [MIT License](LICENSE).

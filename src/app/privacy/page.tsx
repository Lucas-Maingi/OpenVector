import { LegalPageLayout, LegalSection } from "@/components/landing/legal-page-layout";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
    const sections: LegalSection[] = [
        {
            id: "introduction",
            title: "Introduction",
            legalText: (
                <>
                    <p>At Aletheia, we take your privacy and the security of your investigative data seriously. This Privacy Policy describes how we collect, use, and protect your information when you use our services.</p>
                    <p className="mt-4">By accessing or using our services, you agree to this Privacy Policy. If you do not agree with this policy, please do not use our services.</p>
                </>
            ),
            summary: (
                <>We care about your privacy. This document explains what data we collect, why we collect it, and how we keep it safe. If you use Aletheia, you agree to these terms.</>
            )
        },
        {
            id: "data-collection",
            title: "1. Data Collection",
            legalText: (
                <>
                    <p>We collect information you provide directly to us, such as when you create an account, initiate an investigation, or communicate with us. This comprises:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-400">
                        <li><strong className="text-slate-200">Account Information:</strong> Name, email address, and authentication credentials.</li>
                        <li><strong className="text-slate-200">Investigation Data:</strong> Information about subjects you are investigating, including usernames, emails, and images.</li>
                        <li><strong className="text-slate-200">Payment Information:</strong> Processed securely through our payment provider (Lemon Squeezy); we do not arbitrarily store your full credit card details.</li>
                    </ul>
                </>
            ),
            summary: (
                <>We only collect what we need to run the service: your account details to log you in, the targets you explicitly ask us to investigate, and payment records via our secure payment processor.</>
            )
        },
        {
            id: "data-use",
            title: "2. Use of Information",
            legalText: (
                <>
                    <p>We use the collected information for the purpose of operating the agentic intelligence platform, including to:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-400">
                        <li>Provide, maintain, and improve our intelligence services.</li>
                        <li>Process your transactions and manage your lifetime access.</li>
                        <li>Send technical notices, updates, and administrative messages.</li>
                        <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
                    </ul>
                </>
            ),
            summary: (
                <>We use your data strictly to make the Aletheia engine work for you, process your payments, and send you important updates. We do not sell your data to marketers.</>
            )
        },
        {
            id: "data-security",
            title: "3. Data Security",
            legalText: (
                <>
                    <p>Aletheia implements industry-standard security measures, including 256-bit AES encryption at rest, to protect your data. Investigative data is strictly associated with your account and is highly compartmentalized. It is not shared with third parties, except as cryptographically required to provide the service (e.g., querying public OSINT APIs through obfuscated exit nodes).</p>
                </>
            ),
            summary: (
                <>Your data is secured with high-grade encryption. We don't share your private intelligence dossiers with anyone else.</>
            )
        },
        {
            id: "open-source",
            title: "4. Open Source Core",
            legalText: (
                <>
                    <p>The core engine of Aletheia is open-source software. When self-hosting the Open Source version on your own bare-metal servers, data processing occurs entirely within your own infrastructure. Aletheia Intelligence LLC does not have any programmatic access to data processed, stored, or transmitted through self-hosted community instances.</p>
                </>
            ),
            summary: (
                <>If you choose to self-host Aletheia on your own servers instead of using our cloud platform, we have absolutely zero access to your data.</>
            )
        },
        {
            id: "contact",
            title: "5. Contact Us",
            legalText: (
                <p>If you have any questions about this Privacy Policy, please contact our Data Protection Officer at <a href="mailto:contact@aletheia.intel" className="text-purple-400 hover:text-purple-300 transition-colors">contact@aletheia.intel</a>.</p>
            ),
            summary: (
                <>Questions? Email us.</>
            )
        }
    ];

    return (
        <LegalPageLayout 
            title="Privacy Policy"
            lastUpdated="March 3, 2026"
            sections={sections}
        />
    );
}

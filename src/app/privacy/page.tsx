import { Shield, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { MarketingWrapper } from "@/components/MarketingWrapper";

export default function PrivacyPage() {
    return (
        <MarketingWrapper>
            <div className="min-h-screen bg-background text-text-primary py-20 px-4">
                <div className="container mx-auto max-w-3xl">
                    <Link href="/" className="inline-flex items-center text-sm text-text-secondary hover:text-text-primary transition-colors mb-12 group">
                        <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Back to home
                    </Link>

                    <div className="flex items-center gap-3 mb-8">
                        <Shield className="w-8 h-8 text-accent" />
                        <h1 className="text-4xl font-bold">Privacy Policy</h1>
                    </div>

                    <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">
                        <section className="space-y-4">
                            <p className="text-sm font-mono text-text-tertiary">Effective Date: March 3, 2026</p>
                            <p>
                                At ClearDossier, we take your privacy and the security of your investigative data seriously. This Privacy Policy describes how we collect, use, and protect your information when you use our services.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-text-primary">1. Data Collection</h2>
                            <p>
                                We collect information you provide directly to us, such as when you create an account, initiate an investigation, or communicate with us. This may include:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Account Information: Name, email address, and authentication credentials.</li>
                                <li>Investigation Data: Information about subjects you are investigating, including usernames, emails, and images.</li>
                                <li>Payment Information: Processed securely through Lemon Squeezy; we do not store your full credit card details.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-text-primary">2. Use of Information</h2>
                            <p>
                                We use the collected information to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Provide, maintain, and improve our intelligence services.</li>
                                <li>Process your transactions and manage your lifetime access.</li>
                                <li>Send technical notices, updates, and administrative messages.</li>
                                <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-text-primary">3. Data Security</h2>
                            <p>
                                ClearDossier implements industry-standard security measures to protect your data. Investigative data is strictly associated with your account and is not shared with third parties, except as required to provide the service (e.g., querying public OSINT APIs).
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-text-primary">4. Open Source Core</h2>
                            <p>
                                The core engine of ClearDossier is open-source. When self-hosting the Open Source version, data processing occurs entirely within your own infrastructure. We do not have access to data processed through self-hosted instances.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-text-primary">5. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:contact@cleardossier.io" className="text-accent underline">contact@cleardossier.io</a>.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </MarketingWrapper>
    );
}

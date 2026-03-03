import { Shield, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background text-text-primary py-20 px-4">
            <div className="container mx-auto max-w-3xl">
                <Link href="/" className="inline-flex items-center text-sm text-text-secondary hover:text-text-primary transition-colors mb-12 group">
                    <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                    Back to home
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <Shield className="w-8 h-8 text-accent" />
                    <h1 className="text-4xl font-bold">Terms of Service</h1>
                </div>

                <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">
                    <section className="space-y-4">
                        <p className="text-sm font-mono text-text-tertiary">Last Updated: March 3, 2026</p>
                        <p>
                            By accessing or using OpenVector, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-text-primary">1. Ethical Use Policy</h2>
                        <p>
                            OpenVector is designed for legitimate cybersecurity research, investigative journalism, and digital asset protection. You agree not to use OpenVector for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Stalking, harassment, or unlawful surveillance of individuals.</li>
                            <li>Violating any laws or regulations in your jurisdiction.</li>
                            <li>Attempting to gain unauthorized access to private platforms.</li>
                            <li>Reselling the SaaS platform without explicit written permission.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-text-primary">2. Lifetime Access (LTD)</h2>
                        <p>
                            Founding Analyst Lifetime Access grants you a perpetual license to use the OpenVector Pro SaaS platform as long as the service is commercially available. All future core updates are included.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-text-primary">3. Open Source Core License</h2>
                        <p>
                            The core engine of OpenVector is licensed under the MIT License. You are free to self-host, modify, and distribute the open-source version in accordance with the license terms.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-text-primary">4. Limitation of Liability</h2>
                        <p>
                            OpenVector provides tools for data aggregation. We are not responsible for the accuracy of information retrieved from third-party sources or for any decisions made based on investigative findings.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-text-primary">5. Termination</h2>
                        <p>
                            We reserve the right to terminate or suspend your SaaS account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-text-primary">6. Refund Policy</h2>
                        <p>
                            Due to the digital nature of the product, all sales are final. However, refunds may be granted within 7 days of purchase if no usage (e.g., creating investigations or executing scans) has occurred on the account.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-text-primary">7. Governing Law</h2>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company operates, without regard to its conflict of law provisions.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

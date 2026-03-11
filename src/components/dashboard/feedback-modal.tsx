"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, Bug, Lightbulb, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

export function FeedbackModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('general');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!content.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, type, version: '1.0.0-beta' }),
            });

            if (res.ok) {
                toast.success('Feedback received! Thank you for helping us improve.');
                setContent('');
                setIsOpen(false);
            } else {
                toast.error('Failed to send feedback. Please try again later.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 text-xs text-text-tertiary hover:text-white rounded-md hover:bg-white/5 transition-colors w-full text-left group">
                    <MessageSquare className="w-3.5 h-3.5 group-hover:text-accent transition-colors" />
                    <span>Send Feedback</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-surface border-border-bright backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-accent" />
                        Intelligence Feedback
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                    <div className="flex gap-2">
                        {[
                            { id: 'bug', label: 'Bug', icon: Bug, color: 'text-danger' },
                            { id: 'feature', label: 'Feature', icon: Lightbulb, color: 'text-yellow-400' },
                            { id: 'general', label: 'General', icon: MessageSquare, color: 'text-accent' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setType(item.id)}
                                className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                                    type === item.id 
                                    ? 'bg-accent/10 border-accent text-white' 
                                    : 'bg-background/50 border-white/5 text-text-tertiary hover:bg-white/5'
                                }`}
                            >
                                <item.icon className={`w-4 h-4 ${type === item.id ? item.color : ''}`} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] text-text-tertiary uppercase font-bold tracking-widest pl-1">
                            Your Message
                        </label>
                        <Textarea
                            placeholder="Tell us what you like, what's broken, or what you'd like to see next..."
                            className="min-h-[120px] bg-background/50 border-white/10 focus:ring-accent/20 text-sm leading-relaxed"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <Button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting || !content.trim()}
                        className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-6 group"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Submitting Intelligence...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                Transmit Feedback
                                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        )}
                    </Button>
                    <p className="text-[9px] text-text-tertiary text-center italic">
                        Every single submission is reviewed by the core development team.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}

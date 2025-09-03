'use client'

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface ShareDialogProps {
    title: string;
    description?: string;
    contentUrl: string;
    contentTitle: string;
    trigger: React.ReactNode;
}

export const Dialog01 = ({
    title,
    description,
    contentUrl,
    contentTitle,
    trigger,
}: ShareDialogProps) => {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const shareOptions = [
        {
            name: "Twitter",
            icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>,
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(contentTitle)}&url=${encodeURIComponent(contentUrl)}`,
        },
        {
            name: "Facebook",
            icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(contentUrl)}`,
        },
        {
            name: "LinkedIn",
            icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(contentUrl)}&title=${encodeURIComponent(contentTitle)}`,
        },
        {
            name: "Email",
            icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
            url: `mailto:?subject=${encodeURIComponent(contentTitle)}&body=${encodeURIComponent(`Check out this link: ${contentUrl}`)}`,
        },
    ];

    const handleCopyLink = () => {
        navigator.clipboard.writeText(contentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShareOption = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-xl bg-white text-slate-900 border-slate-200 shadow-none
                              dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-slate-900 font-semibold dark:text-zinc-100">{title}</DialogTitle>
                    {description && <DialogDescription className="text-slate-600 dark:text-zinc-400">{description}</DialogDescription>}
                </DialogHeader>

                <div className="grid gap-4">
                    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3
                        dark:border-zinc-700 dark:bg-zinc-800">
                        <div className="flex-1 truncate text-sm text-slate-700 dark:text-zinc-300">{contentUrl}</div>
                        <Button
                            variant="outline"
                            size="sm"
                            className={`border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900
                        dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:hover:text-zinc-200
                        ${copied ? "text-green-600 dark:text-green-400" : "text-slate-700 dark:text-zinc-300"}`}
                            onClick={handleCopyLink}
                        >
                            {copied ? "Copied!" : "Copy"}
                        </Button>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <p className="text-sm font-medium text-slate-800 dark:text-zinc-300">Share via</p>
                        <div className="flex flex-wrap gap-2">
                            {shareOptions.map((option) => (
                                <Button
                                    key={option.name}
                                    variant="outline"
                                    size="icon"
                                    className="h-9 w-9 border-slate-200 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900
                          dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-100"
                                    onClick={() => handleShareOption(option.url)}
                                >
                                    {option.icon}
                                    <span className="sr-only">Share on {option.name}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
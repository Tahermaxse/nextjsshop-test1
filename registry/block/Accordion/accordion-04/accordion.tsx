'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function AccordionComponent4() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'What is the shadcn-ui CLI used for?',
            answer: 'The shadcn-ui CLI helps you quickly add pre-built UI components to your project with full customization. It simplifies the process of setting up and styling components in your design system.',
        },
        {
            id: 'item-2',
            question: 'How do I install the shadcn-ui CLI?',
            answer: 'You can install it by running `npx shadcn-ui@latest init` in your Next.js or Vite project. It walks you through configuration and sets up your UI library structure.',
        },
        {
            id: 'item-3',
            question: 'Can I use the CLI with Vite or only with Next.js?',
            answer: 'The CLI supports both Vite and Next.js. During initialization, it will detect your framework or let you choose one.',
        },
        {
            id: 'item-4',
            question: 'Where are the components saved when I use the CLI?',
            answer: 'Components are usually saved in the `components/ui` folder by default, but you can customize the path during setup.',
        },
        {
            id: 'item-5',
            question: 'Is the CLI customizable after setup?',
            answer: 'Yes, you can adjust configurations such as component paths, aliases, themes, and more by editing the `components.json` file or rerunning the CLI with new options.',
        },
    ]
    

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                
                <div className="mx-auto mt-12 max-w-xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dashed">
                                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="text-muted-foreground mt-6 px-8">
                        Can't find what you're looking for? Contact our{' '}
                        <Link
                            href="#"
                            className="text-primary font-medium hover:underline">
                            customer support team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

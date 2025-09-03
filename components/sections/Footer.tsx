'use client';

import React from 'react';
import { useTheme } from 'next-themes';
const Footer = () => {
	const { setTheme } = useTheme();
	return (
		<footer className="text-sm [&_a:hover]:underline [&_a:hover]:decoration-zinc-300 dark:[&_a:hover]:decoration-zinc-600">
			<div className="px-4 md:px-6 max-w-[1200px] mx-auto">
				<div className="">
					<div className="py-8 border-y border-zinc-200 dark:border-zinc-800 border-opacity-70">
						<div className="grid gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 -mx-10">
							{footerSections.map((section, index) => (
								<div
									key={index}
									className={`px-10 font-medium ${
										index > 0
											? 'border-l border-zinc-200 dark:border-zinc-800 border-opacity-70'
											: ''
									}`}
								>
									<h3 className="text-zinc-800 dark:text-zinc-100 mb-4">
										{section.title}
									</h3>
									<ul className="space-y-3">
										{section.links.map((link, linkIndex) => (
											<li
												key={linkIndex}
												className="dark:text-zinc-400"
											>
												<a href={link.href}>{link.text}</a>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>
					<div className="py-8">
						<div className="flex flex-col md:flex-row justify-between md:items-center max-md:space-y-2 max-md:space-y-reverse md:space-x-2">
							<ul className="flex items-center md:ml-auto [&_li:before]:content-['·'] [&_li:before]:mx-1 [&_li:before]:text-zinc-200 [&_li:first-child:before]:hidden">
								<li>
									<a href="https://saaslandingpage.com/privacy-policy">
										Privacy Policy
									</a>
								</li>
								<li>
									<a
										href="https://cruip.com/?utm_source=slp&utm_campaign=footer-link"
										target="_blank"
									>
										Cruip
									</a>
								</li>
							</ul>
							<div className="md:contents flex justify-between items-center max-md:-order-1">
								<div className="md:ml-8">
									<input
										type="checkbox"
										className="light-switch peer sr-only"
										name="lights-toggle"
										id="lights-toggle"
										onClick={(e) =>
											setTheme(
												(e.target as HTMLInputElement).checked
													? 'dark'
													: 'light'
											)
										} // This handles theme toggle
									/>
									<label
										htmlFor="lights-toggle"
										className="cursor-pointer peer-focus-visible:ring h-8 w-8 flex items-center justify-center bg-white dark:bg-zinc-800 rounded-full shadow-[0_1px_0_theme(colors.zinc.950/.04),0_1px_2px_theme(colors.zinc.950/.12),inset_0_-2px_0_theme(colors.zinc.950/.04)] dark:shadow-[0_1px_0_theme(colors.zinc.950/.04),0_1px_2px_theme(colors.zinc.950/.12),inset_0_-2px_0_theme(colors.zinc.100/.04)] hover:shadow-[0_1px_0_theme(colors.zinc.950/.04),0_4px_8px_theme(colors.zinc.950/.12),inset_0_-2px_0_theme(colors.zinc.950/.04)] dark:hover:shadow-[0_1px_0_theme(colors.zinc.950/.04),0_4px_8px_theme(colors.zinc.950/.12),inset_0_-2px_0_theme(colors.zinc.100/.04)] text-zinc-400 peer-checked:[&_svg:nth-child(1)]:hidden peer-checked:[&_svg:nth-child(2)]:block transition"
									>
										<svg
											id="lights-toggle-on"
											className="fill-current"
											width={16}
											height={16}
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M7 0h2v2H7zM13.01 1.641l1.414 1.4-1.414 1.397-1.414-1.399zM14 7h2v2h-2zM13.081 14.406l-1.414-1.398 1.413-1.399 1.415 1.398zM7 14h2v2H7zM3.013 14.363l-1.43-1.414 1.43-1.414 1.43 1.415zM0 7h2v2H0zM3.072 1.711 4.487 3.11 3.073 4.509 1.66 3.11zM8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
										</svg>
										<svg
											id="lights-toggle-off"
											className="fill-current hidden"
											width={16}
											height={16}
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M13.925 10.175a.53.53 0 0 0-.443-.24c-3.442-.065-6.2-2.767-6.213-6.086 0-.416.044-.831.131-1.239a.496.496 0 0 0-.152-.47.54.54 0 0 0-.494-.124C3.935 2.708 1.972 5.169 2 7.973c.029 2.805 2.042 5.227 4.875 5.866 2.832.64 5.751-.67 7.068-3.172a.491.491 0 0 0-.018-.492Z" />
										</svg>
										<span className="sr-only">Day / Night toggle</span>
									</label>
								</div>

								<div className="-order-1 flex items-center gap-2">
									<span className="mr-1">A project by</span>{' '}
									<a
										className="inline-flex items-center gap-2 font-medium text-zinc-800 dark:text-zinc-400"
										href="https://x.com/DavidePacilio"
										target="_blank"
									>
										<img
											className="rounded-full"
											src="https://avatars.githubusercontent.com/u/138603168?s=400&u=96ef6f2056ae8afa6b920fda6c5d48d46aab557e&v=4"
											alt="Taher Max"
											width={24}
											height={24}
										/>
										<span className="hidden sm:block"> @taher_max_</span>
									</a>{' '}
									<span className="text-zinc-400">&amp;</span>{' '}
									<a
										className="inline-flex items-center gap-2 font-medium text-zinc-800 dark:text-zinc-400"
										href="https://x.com/pacovitiello"
										target="_blank"
									>
										<img
											className="rounded-full"
											src="https://saaslandingpage.com/wp-content/themes/saaslandingpage/dist/images/x-pasquale.jpg"
											alt="Karansinh Chauhan"
											width={24}
											height={24}
										/>
										<span className="hidden sm:block"> @__Karansinh__</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

const footerSections = [
	{
		title: 'Categories',
		links: [
			{ text: 'SaaS', href: 'https://saaslandingpage.com/' },
			{ text: 'Startups', href: 'https://saaslandingpage.com/pricing/' },
			{ text: 'Business', href: 'https://saaslandingpage.com/about-us/' },
			{ text: 'Agency', href: 'https://saaslandingpage.com/features/' },
			{ text: 'Portfolio', href: 'https://saaslandingpage.com/blog/' },
			{
				text: 'Landing pages',
				href: 'https://saaslandingpage.com/testimonials/',
			},
			{ text: 'Ecommerces', href: 'https://saaslandingpage.com/faq/' },
			{
				text: 'Personal',
				href: 'https://saaslandingpage.com/contact-us/',
			},
		],
	},
	{
		title: 'Templates',
		links: [
			{
				text: 'Webflow',
				href: 'https://saaslandingpage.com/templates/webflow/',
			},
			{ text: 'React', href: 'https://saaslandingpage.com/templates/react/' },
			{ text: 'HTML', href: 'https://saaslandingpage.com/templates/html/' },
			{
				text: 'Next.js',
				href: 'https://saaslandingpage.com/templates/next-js/',
			},
			{
				text: 'Tailwind CSS',
				href: 'https://saaslandingpage.com/templates/tailwind-css/',
			},
			{ text: 'Framer', href: 'https://saaslandingpage.com/templates/framer/' },
			{ text: 'Vue', href: 'https://saaslandingpage.com/templates/vue/' },
			{ text: 'View all', href: 'https://saaslandingpage.com/templates' },
		],
	},
	{
		title: 'Resources',
		links: [
			{ text: 'Blog', href: 'https://saaslandingpage.com/blog/' },
			{ text: 'Guides', href: 'https://saaslandingpage.com/guides/' },
			{
				text: 'Case studies',
				href: 'https://saaslandingpage.com/case-studies/',
			},
			{ text: 'Tutorials', href: 'https://saaslandingpage.com/tutorials/' },
		],
	},
	{
		title: 'Popular Stacks',
		links: [
			{ text: 'React', href: 'https://saaslandingpage.com/stacks/react/' },
			{ text: 'Next.js', href: 'https://saaslandingpage.com/stack' },
			{
				text: 'Tailwind CSS',
				href: 'https://saaslandingpage.com/stacks/tailwind-css/',
			},
			{ text: 'Framer', href: 'https://saaslandingpage.com/stacks/framer/' },
			{ text: 'Vue', href: 'https://saaslandingpage.com/stacks/vue/' },
		],
	},
	{
		title: 'Popular Tags',
		links: [{ text: '', href: 'https://saaslandingpage.com/tags/react/' }],
	},
	// Add other sections here...
];

export default Footer;

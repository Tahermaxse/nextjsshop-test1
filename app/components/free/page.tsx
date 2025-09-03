import React from 'react';
import Link from 'next/link';

const items = [
	{
		id: 1,
		name: 'Accordion',
		href: '/components/free/accordion',
		imageLight:
			'/blocks/Accordion-light.png',
		imageDark:
			'/blocks/Accordion-dark.png',
		componentsCount: '08 Components',
	},
	{
		id: 2,
		name: 'Auth Card',
		href: '/components/free/authcard',
		imageLight:
			'/blocks/Authcard-light.png',
		imageDark:
			'/blocks/Authcard-dark.png',
		componentsCount: '08 Components',
	},
	{
		id: 3,
		name: 'Breadcrumb',
		href: '/components/free/breadcrumb',
		imageLight:
			'/blocks/Breadcrumb-light.png',
		imageDark:
			'/blocks/Breadcrumb-dark.png',
		componentsCount: '08 Components',
	},
	{
		id: 4,
		name: 'Button',
		href: '/components/free/button',
		imageLight:
			'/blocks/Button-light.png',
		imageDark:
			'/blocks/Button-dark.png',
		componentsCount: '08 Components',
	},
	{
		id: 5,
		name: 'Command Menu',
		href: '/components/free/commandmenu',
		imageLight:
			'/blocks/Commandmenu-light.png',
		imageDark:
			'/blocks/Commandmenu-dark.png',
		componentsCount: '02 Components',
	},
	{
		id: 6,
		name: 'Date Picker',
		href: '/components/free/datepicker',
		imageLight:"/blocks/Datepicker-light.png",
		imageDark:"/blocks/Datepicker-dark.png",
		componentsCount: '03 Components',
	},
	{
		id: 7,
		name: 'Dailog',
		href: '/components/free/dialog',
		imageLight:"/blocks/Dialog-light.png",
		imageDark:"/blocks/Dialog-dark.png",
		componentsCount: '09 Components',
	},
	{
		id: 8,
		name: 'Drawer',
		href: '/components/free/drawer',
		imageLight:"/blocks/Drawer-light.png",
		imageDark:"/blocks/Drawer-dark.png",
		componentsCount: '04 Components',
	},
	{
		id: 9,
		name: 'Dropdown',
		href: '/components/free/dropdown',
		imageLight:"/blocks/Dropdown-light.png",
		imageDark:"/blocks/Dropdown-dark.png",
		componentsCount: '12 Components',
	},
	{
		id: 10,
		name: 'File Upload',
		href: '/components/free/fileupload',
		imageLight:"/blocks/Fileupload-light.png",
		imageDark:"/blocks/Fileupload-dark.png",
		componentsCount: '10 Components',
	},
	{
		id: 11,
		name: 'Notification',
		href: '/components/free/notification',
		imageLight:"/blocks/Notification-light.png",
		imageDark:"/blocks/Notification-dark.png",
		componentsCount: '10 Components',
	},
	{
		id: 12,
		name: 'Radio',
		href: '/components/free/radiobutton',
		imageLight:"/blocks/Radio-light.png",
		imageDark:"/blocks/Radio-dark.png",
		componentsCount: '06 Components',
	},
	{
		id: 13,
		name: 'Switch',
		href: '/components/free/switch',
		imageLight:"/blocks/Switch-light.png",
		imageDark:"/blocks/Switch-dark.png",
		componentsCount: '03 Components',
	}
	// Add more items as needed
];
const page = () => {
	return (
		<div className="container max-w-[1200px] mx-auto overflow-x-hidden">
			<div className="w-full px-4 py-8 sm:py-10 md:py-12 lg:py-16 xl:pb-20 bg-background">
				<div className="max-w-[1200px] mx-auto space-y-8">
					<div className="space-y-4 max-w-3xl">
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl font-bold tracking-tight text-foreground">
							Beautiful UI components built with{' '}
							<span className="text-primary">Tailwind CSS</span> and{' '}
							<span className="text-primary">React</span>.
						</h1>
						<p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
							A collection of copy-and-paste components for quickly building
							application UIs.
						</p>
					</div>

					
				</div>

				<div className="relative my-16">
					<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{items.map((item) => (
							<div
								key={item.id}
								className="space-y-3 text-center"
							>
								<Link
									className="peer inline-flex overflow-hidden rounded-lg border border-border dark:border-zinc-700/80 sm:flex"
									href={item.href}
								>
									<img
										alt={`${item.name} components`}
										loading="lazy"
										width="268"
										height="198"
										decoding="async"
										data-nimg="1"
										className="w-full dark:hidden"
										srcSet={`${item.imageLight} 1x, ${item.imageLight} 2x`}
										src={item.imageLight}
										style={{ color: 'transparent' }}
									/>

									<img
										alt={`${item.name} components dark`}
										loading="lazy"
										width="268"
										height="198"
										decoding="async"
										data-nimg="1"
										className="hidden w-full dark:block"
										srcSet={`${item.imageDark} 1x, ${item.imageDark} 2x`}
										src={item.imageDark}
										style={{ color: 'transparent' }}
									/>
								</Link>
								<div className="mb-0.5 peer-hover:[&_a]:underline">
									<h2>
										<Link
											className="text-sm font-medium hover:underline"
											href={item.href}
										>
											{item.name}
										</Link>
									</h2>
									<p className="text-[13px] text-muted-foreground">
										{item.componentsCount}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;

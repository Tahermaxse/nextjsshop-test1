import React from 'react';
import { Carousel, ScreenshotItem } from './Carousel';

const GetStarted = () => {
	const step2Screenshots: ScreenshotItem[] = [
		{
			src: 'https://ik.imagekit.io/nextjsshop/Docs/Step_1_Template.png?updatedAt=1752678895269',
			alt: 'Browse templates screenshot',
		},
		{
			src: 'https://ik.imagekit.io/nextjsshop/Docs/Step_1_Component.png?updatedAt=1752678953685',
			alt: 'Browse components screenshot',
		},
	];

	const step3Screenshots: ScreenshotItem[] = [
		{
			src: 'https://ik.imagekit.io/nextjsshop/Docs/Step_2_Razorpay.png?updatedAt=1752679115186',
			alt: 'Payment gateway screenshot',
		},
	];

	const step4Screenshots: ScreenshotItem[] = [
		{
			src: 'https://ik.imagekit.io/nextjsshop/Docs/Step_3_Download.png?updatedAt=1752679222143',
			alt: 'Download Button screenshot',
		},
		{
			src: 'https://ik.imagekit.io/nextjsshop/Docs/Step_3_Extract.png?updatedAt=1752679276157',
			alt: 'Extract folder screenshot',
		},
	];

	const step5Screenshots: ScreenshotItem[] = [
		{
			src: 'https://ik.imagekit.io/nextjsshop/Docs/Step_4_Run.png?updatedAt=1752679316513',
			alt: 'Start building screenshot',
		},
	];

	return (
		<div
			id="get-started"
			className="isolate scroll-mt-12 bg-white dark:bg-[#09090B] text-left"
		>
			<div className="p-8 sm:p-12 space-y-12">
				{/* Section Header */}
				<div>
					<h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-zinc-100">
						Get Started
					</h2>
					<p className="mt-2 text-base text-neutral-500 dark:text-zinc-400">
						Build faster with premium TailwindCSS + Next.js templates. Getting
						started is quick and easy. Follow the steps below to browse,
						purchase, and download top-notch UI components and templates crafted
						for modern web development.
					</p>
				</div>

				{/* Steps with vertical timeline */}
				<div className="relative">
					{/* Vertical Line */}
					<div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gray-300 dark:bg-zinc-700" />

					<div className="space-y-12">
						{[
							{
								title: 'Browse Templates & Components',
								description:
									'Explore our curated library of professionally designed TailwindCSS + Next.js components and templates.',
								carousel: step2Screenshots,
								tip: (
									<>
										<strong className="font-medium text-neutral-800 dark:text-zinc-100">
											Pro Tip:
										</strong>{' '}
										Use filters to find exactly what you need—whether it's a
										landing page, dashboard, or UI block.
									</>
								),
							},
							{
								title: 'Purchase Using Razorpay',
								description:
									'Click “Buy for $XX” on any product. A secure Razorpay modal will open where you can choose your preferred payment method (UPI, card, netbanking, etc.).',
								carousel: step3Screenshots,
								tip: (
									<>
										<strong className="font-medium text-neutral-800 dark:text-zinc-100">
											Secure & Fast:
										</strong>{' '}
										Payments are 100% secure and processed instantly.
									</>
								),
							},
							{
								title: 'Download Your Files',
								description:
									'After successful payment, the Buy button changes to a Download button.',
								carousel: step4Screenshots,
								tip: 'Click it, and your ZIP file with the full codebase of your component/template will be downloaded.',
							},
							{
								title: 'Start Building',
								description:
									'Import the components into your Next.js project and start building stunning UIs in minutes. Every purchase includes clean, production-ready code.',
								carousel: step5Screenshots,
							},
						].map((step, index) => (
							<div
								key={index}
								className="relative flex gap-6 items-start"
							>
								{/* Step Number - positioned over the vertical line */}
								<div className="absolute left-2 top-0 w-8 h-8 flex items-center justify-center ">
									<div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 dark:bg-zinc-800 border-4 dark:border-zinc-600 text-sm font-medium text-gray-800 dark:text-zinc-100 z-10">
										{index + 1}
									</div>
								</div>

								{/* Step Content */}
								<div className="pl-14 space-y-3">
									<h3 className="text-lg font-semibold text-neutral-900 dark:text-zinc-100">
										{step.title}
									</h3>
									<p className="text-neutral-500 dark:text-zinc-400">
										{step.description}
									</p>
									<Carousel items={step.carousel} />
									{step.tip && (
										<p className="text-sm text-neutral-500 dark:text-zinc-400">
											{step.tip}
										</p>
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* What's Included */}
				<div>
					<h3 className="text-lg font-semibold text-neutral-900 dark:text-zinc-100">
						What's Included in the Download?
					</h3>
					<ul className="mt-2 list-disc list-inside text-neutral-500 dark:text-zinc-400 space-y-1">
						<li>Fully responsive TailwindCSS code</li>
						<li>Next.js compatible structure</li>
						<li>Cleanly organized folders</li>
						<li>Easy customization</li>
						<li>License file</li>
					</ul>
				</div>

			
			</div>
		</div>
	);
};

export default GetStarted;
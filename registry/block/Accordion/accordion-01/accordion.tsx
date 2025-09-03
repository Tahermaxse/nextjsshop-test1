import React from 'react';
import {
	Accordion,
	AccordionItem as ShadAccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/components/ui/accordion';
import { Check, Info } from 'lucide-react';

const accordionSections = [
	{
		title: 'Set-up your online store',
		items: [
			{
				id: 'item-1',
				title: 'Add products',
				content:
					'Add and manage products in your store effortlessly. Control product details, pricing, and inventory levels all in one place. Create categories to keep your products organized and easily accessible.',
				status: 'Ready',
				icon: 'check',
			},
			{
				id: 'item-2',
				title: 'Get the point of sale application',
				content: {
					text: "Scan the QR code or send yourself the link to get the app. The mobile app is where you'll manage orders, track inventory, and view analytics on the go.",
					qrCode:
						'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAAXNSR0IArs4c6QAAA/FJREFUeF7tnNFS6zAMROn/f3SZAsO0JlpO1nIa6N7HO0mdHMurlWxyuV6v17f8W0bgEsDL2H78cACv5RvAi/n+BHy5XJaNeS/39+NU/68eRN1D0sph7zlq8GED301kADfFdCL4lvWKyHIYj6uhWrrdq8aZSCIrikEpeUoiOge9PVwAJ4Kdhfrpd6ucQiOYLmOa3akUEbehVhq5f1xds+/6wCCAP4O208kE8LCkA/hLGYk7GEX0ZSWiyibK2jnaeNQ4p0tyR734UeME8EC6e6X8GcBWtTQ0qEiBFMAbpJ2EFYnYUTv9a8A7OHxf6izD7qrMieDZd7UKjdlBqZkP4B2kE8Ebm57UzO/g/H0pqcTopMw2lQ57z7NvGR01KU7AVPdgDe4cVGlwdzQ6k9L5rgG80U07DHDnQPS3OpvvakxS4dFnpted4mRPANPpMq97KcAry9F7/nS5OnaKJLkxFsgkWxbS3ZMjgBQccv8NQgALWQjgXyq52Z1WtQwruZiN2DHqncMuVGKqZ8U+OID1UbIANo9rLY3g+6WrMiuaPbiVQzI4Xfp7rqO9YtRzoEenApg7FxLpspJLBOvKKYCFBit01MlYgJ1KjugxraJVtUTli45FrqP5odTzjkougOup+qHBieBHWIdFcHdVRissUux07EQ7jSgiWTiCA1grdrnyqQYHcBNgklk7rnG0jd5Dku7KTp9s9nTAI79BYRGdO2p1WeM863MGLwt4topR0UscwXi/c0/lCGYnlT4b7gefAVYA79g3c2A59ySCF0/KqQGXTQvxoQ66Q1w5AlVFOZaLRP34zCT3WO9JXUSHbwxgkdUCuP4cgzIDshfhuAh6FJUUI/LBF35biDZ+iO0L4F9m2unUPUihe8IdbZfAXWUnmklScn5XFROqVC7brzTJdTws6Ss4W0b02agLIEufwn7a+WBn54S4EJo3qL7PTkoAb5BeGsErtc3RbZrRSYFEHU4AU9FVX4MSCTiAA3ibQCTiBB+mm83at6klDaIOF0HGsbftySp1PG0AE7Jf1wTw4r/R6ABMbKPT26VxQnsRlZ3EEkFe9DYI9ZqkbFZ6qvwxfVYCOYA3zgAHsAgdJSuzBQCtCmmfhPzeKSRCNXGId6aWiwAZZYns743S+PA+9PAfXXaOBgdw0zY7iQYnqYwRXDa/xffpSQBRt4JP9hAg6uWonjpLV8lCAJvlLIkyqYeJYL01/q8BE1M+XrOykqPJlDRkOhpEFR9s0wLYIbCjF+H8fCL4JJ9WnHUE1MnQVijtk5Dr7JM9TkTP2j5VkFRWzymvCTiVb7APdiDSaOx0BH8qgruhvvrvPe3gyauAD+DFM/0ORRrmYlcgsAMAAAAASUVORK5CYII=',
				},
				icon: 'loading',
				defaultOpen: true,
			},
			{
				id: 'item-3',
				title: 'Product price & stock',
				content:
					'Set competitive prices and monitor inventory levels. Update product prices, track stock quantities in real-time, and receive low-stock alerts. Manage multiple pricing options and automate stock notifications for seamless inventory control.',
				icon: 'loading',
			},
		],
	},
	{
		title: 'Store settings',
		items: [
			{
				id: 'item-4',
				title: 'Customize your store-front',
				content:
					"Customize your store's appearance and functionality. Choose themes, configure layouts, and add features to create a unique shopping experience for your customers.",
				icon: 'loading',
			},
		],
	},
	{
		title: 'Prepare for launch',
		items: [
			{
				id: 'item-5',
				title: 'Set up shipping options',
				content:
					'Set competitive prices and monitor inventory levels. Update product prices, track stock quantities in real-time, and receive low-stock alerts. Manage multiple pricing options and automate stock notifications for seamless inventory control.',
				icon: 'loading',
			},
			{
				id: 'item-6',
				title: 'Configure tax settings',
				content:
					'Set up your tax configurations to ensure compliance with local and international regulations. Define tax rates for different regions, configure tax exemptions, and automate tax calculations for various product categories. Stay up-to-date with tax reporting and documentation requirements.',
				icon: 'loading',
			},
		],
	},
];

// Reusable Accordion Item Component
interface AccordionItemProps {
	id: string;
	title: string;
	content:
		| string
		| {
				text: string;
				qrCode: string;
		  };
	icon: 'check' | 'loading';
	status?: string;
	defaultOpen?: boolean;
}

const AccordionItem = ({ item }: { item: AccordionItemProps }) => {
	const isComplexContent = typeof item.content === 'object';

	return (
		<ShadAccordionItem
			value={item.id}
			className="border-b bg-[#ffffff] dark:bg-zinc-950 dark:hover:bg-zinc-900 border-zinc-200 dark:border-neutral-700 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl hover:bg-zinc-50 data-[state=open]:hover:bg-transparent"
		>
			<AccordionTrigger className="group flex w-full items-center px-4 py-3.5 text-left">
				<div className="flex w-full items-center gap-4">
					<div className="flex w-0 flex-1 items-center gap-2.5">
						{item.icon === 'check' ? (
							<span className="inline-flex items-center p-1 justify-center rounded-full bg-green-100  text-green-600 dark:bg-green-800/80">
								<Check className="h-4 w-4" />
							</span>
						) : (
							<svg
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								className="remixicon size-5 shrink-0 text-zinc-400 group-data-[state=open]:animate-spin group-data-[state=open]:text-orange-500"
							>
								<path d="M12 2C12.5523 2 13 2.44772 13 3V6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6V3C11 2.44772 11.4477 2 12 2ZM12 17C12.5523 17 13 17.4477 13 18V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V18C11 17.4477 11.4477 17 12 17ZM22 12C22 12.5523 21.5523 13 21 13H18C17.4477 13 17 12.5523 17 12C17 11.4477 17.4477 11 18 11H21C21.5523 11 22 11.4477 22 12ZM7 12C7 12.5523 6.55228 13 6 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H6C6.55228 11 7 11.4477 7 12ZM19.0711 19.0711C18.6805 19.4616 18.0474 19.4616 17.6569 19.0711L15.5355 16.9497C15.145 16.5592 15.145 15.9261 15.5355 15.5355C15.9261 15.145 16.5592 15.145 16.9497 15.5355L19.0711 17.6569C19.4616 18.0474 19.4616 18.6805 19.0711 19.0711ZM8.46447 8.46447C8.07394 8.85499 7.44078 8.85499 7.05025 8.46447L4.92893 6.34315C4.53841 5.95262 4.53841 5.31946 4.92893 4.92893C5.31946 4.53841 5.95262 4.53841 6.34315 4.92893L8.46447 7.05025C8.85499 7.44078 8.85499 8.07394 8.46447 8.46447ZM4.92893 19.0711C4.53841 18.6805 4.53841 18.0474 4.92893 17.6569L7.05025 15.5355C7.44078 15.145 8.07394 15.145 8.46447 15.5355C8.85499 15.9261 8.85499 16.5592 8.46447 16.9497L6.34315 19.0711C5.95262 19.4616 5.31946 19.4616 4.92893 19.0711ZM15.5355 8.46447C15.145 8.07394 15.145 7.44078 15.5355 7.05025L17.6569 4.92893C18.0474 4.53841 18.6805 4.53841 19.0711 4.92893C19.4616 5.31946 19.4616 5.95262 19.0711 6.34315L16.9497 8.46447C16.5592 8.85499 15.9261 8.85499 15.5355 8.46447Z"></path>
							</svg>
						)}
						<span className="truncate text-left text-sm text-neutral-400 group-data-[state=open]:text-zinc-950 dark:group-data-[state=open]:text-zinc-50">
							{item.title}
						</span>
						{item.status && (
							<div className="inline-flex items-center justify-center rounded-full transition duration-200 ease-out h-5 gap-1.5 px-2 text-xs text-[#1daf61] bg-[#1fc16b29] ml-auto mr-2 shrink-0">
								{item.status}
							</div>
						)}
					</div>
				</div>
			</AccordionTrigger>
			<AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
				<div className="pb-4 pl-[46px] pr-[52px]">
					{isComplexContent ? (
						<div className="flex flex-col gap-6 sm:flex-row">
							<div>
								<p className="text-sm text-neutral-400">
									{typeof item.content === 'object'
										? item.content.text
										: item.content}
								</p>
								<div className="mt-4 flex items-center gap-4">
									<div className="w-full max-w-[300px]">
										<div className="flex flex-col gap-1">
											<div className="group relative flex w-full overflow-hidden bg-white text-zinc-950 shadow-sm transition duration-200 ease-out divide-x divide-zinc-200 before:absolute before:inset-0 before:ring-1 before:ring-inset before:ring-zinc-200 before:pointer-events-none before:rounded-[inherit] before:transition before:duration-200 before:ease-out hover:shadow-none has-[input:focus]:shadow-md has-[input:focus]:before:ring-zinc-950 has-[input:disabled]:shadow-none has-[input:disabled]:before:ring-transparent rounded-lg hover:[&:not(:has(input:focus)):has(>:only-child)]:before:ring-transparent">
												<label className="group/input-wrapper flex w-full cursor-text items-center bg-white transition duration-200 ease-out hover:[&:not(&:has(input:focus))]:bg-zinc-50 has-[input:disabled]:pointer-events-none has-[input:disabled]:bg-zinc-50 gap-2 px-3">
													<input
														type="text"
														className="w-full bg-transparent bg-none text-sm text-zinc-950 outline-none transition duration-200 ease-out placeholder:select-none placeholder:text-zinc-400 placeholder:transition placeholder:duration-200 placeholder:ease-out group-hover/input-wrapper:placeholder:text-zinc-600 focus:outline-none group-has-[input:focus]:placeholder:text-zinc-600 disabled:text-zinc-300 disabled:placeholder:text-zinc-300 h-10"
														placeholder="james@loomui.com"
													/>
												</label>
												<button
													type="button"
													className="inline-flex items-center justify-center whitespace-nowrap rounded-none bg-zinc-50 px-3 py-2 text-sm text-zinc-600 outline-none ring-1 ring-inset ring-transparent transition duration-200 ease-out hover:bg-white hover:text-zinc-950 focus-visible:bg-white focus-visible:text-zinc-950 focus-visible:ring-transparent"
												>
													Send link
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="h-[112px] w-[112px] shrink-0 rounded-lg border border-zinc-200 p-3">
								<img
									src={
										typeof item.content === 'object' ? item.content.qrCode : ''
									}
									alt="QR code"
									className="size-[88px]"
								/>
							</div>
						</div>
					) : (
						<p className="text-sm text-neutral-400">
							{typeof item.content === 'string'
								? item.content
								: item.content.text}
						</p>
					)}
				</div>
			</AccordionContent>
		</ShadAccordionItem>
	);
};

const AccordionComponent1 = () => {
	const defaultOpenItems = accordionSections
		.flatMap((section) => section.items)
		.filter((item) => item.defaultOpen)
		.map((item) => item.id);

	return (
		<div className="themes-wrapper bg-[#ffffff] dark:bg-zinc-950 py-4 min-h-screen px-4 flex items-center justify-center rounded-lg">
			<div className="flex max-w-[624px] flex-col gap-4">
				{accordionSections.map((section, index) => (
					<React.Fragment key={index}>
						<label className="group cursor-pointer text-sm text-zinc-950 dark:text-zinc-50 flex items-center gap-px aria-disabled:text-zinc-300">
							{section.title}
							<Info className="ml-2 h-4 w-4 text-zinc-700 dark:text-zinc-300" />
						</label>
						<Accordion
							type="multiple"
							defaultValue={defaultOpenItems}
							className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700"
						>
							{section.items.map((item) => (
								<AccordionItem
									key={item.id}
									item={{
										...item,
										icon: item.icon as 'check' | 'loading',
									}}
								/>
							))}
						</Accordion>
					</React.Fragment>
				))}

				{/* Boost your online presence section */}
				<div className="flex w-full flex-col items-start gap-4 rounded-xl bg-zinc-50 dark:bg-neutral-900 p-4">
					<div>
						<div className="flex items-center justify-start gap-2">
							<span className="text-sm text-zinc-950 dark:text-zinc-50">
								Boost your online presence
							</span>
							<div className="inline-flex items-center justify-center rounded-full transition duration-200 ease-out h-4 gap-1.5 px-2 text-[0.6875rem] uppercase has-[>.dot]:gap-2 bg-[#784def3d] text-[#8c71f6] ">
								PRO
							</div>
						</div>
						<p className="text-sm text-neutral-400">
							Take your e-commerce business to the next level with advanced
							features designed to increase sales and improve customer
							experience
						</p>
					</div>
					<button className="group relative inline-flex items-center justify-center whitespace-nowrap outline-none transition duration-200 ease-out focus:outline-none disabled:pointer-events-none disabled:bg-zinc-50 disabled:text-zinc-300 disabled:ring-transparent h-7 gap-2.5 rounded-lg px-2 text-sm bg-zinc-950 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 hover:bg-zinc-800 focus-visible:shadow-md">
						Upgrade
					</button>
				</div>
			</div>
		</div>
	);
};

export default AccordionComponent1;

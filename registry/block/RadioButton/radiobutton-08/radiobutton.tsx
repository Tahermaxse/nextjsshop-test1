import { X } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export default function RadioButton08() {
	return (
		<div className="flex items-center justify-center p-4">
			<Card className="w-full max-w-md rounded-xl shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
					<h2 className="text-xl font-semibold text-gray-700 dark:text-zinc-50">
						Choose a trial plan
					</h2>
					<X className="h-5 w-5 cursor-pointer text-gray-400" />
				</CardHeader>
				<CardContent className="p-4 pt-0">
					<RadioGroup
						defaultValue="small-team"
						className="space-y-3"
					>
						<div className="relative">
							<RadioGroupItem
								value="small-team"
								id="small-team"
								className="peer hidden"
							/>
							<Label
								htmlFor="small-team"
								className="flex cursor-pointer flex-col rounded-xl border border-gray-300 bg-slate-100/80 p-3 pr-8 dark:border-zinc-800 dark:bg-zinc-900 sm:pr-12"
							>
								<span className="mb-1 text-base font-semibold dark:text-zinc-50">
									Small Team
								</span>
								<p className="text-xs sm:text-sm dark:text-zinc-400">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
								</p>
							</Label>
							<span className="absolute right-3 top-1/2 box-content block h-2 w-2 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-data-[state=checked]:border-gray-900 dark:border-zinc-700 dark:bg-zinc-950 dark:peer-data-[state=checked]:border-zinc-50" />
						</div>

						<div className="relative">
							<RadioGroupItem
								value="large-team"
								id="large-team"
								className="peer hidden"
							/>
							<Label
								htmlFor="large-team"
								className="flex cursor-pointer flex-col rounded-xl border border-gray-300 bg-slate-100/80 p-3 pr-8 dark:border-zinc-800 dark:bg-zinc-900 sm:pr-12"
							>
								<span className="mb-1 text-base font-semibold dark:text-zinc-50">
									Large Team
								</span>
								<p className="text-xs sm:text-sm dark:text-zinc-400">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
								</p>
							</Label>
							<span className="absolute right-3 top-1/2 box-content block h-2 w-2 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-data-[state=checked]:border-gray-900 dark:border-zinc-700 dark:bg-zinc-950 dark:peer-data-[state=checked]:border-zinc-50" />
						</div>
					</RadioGroup>

					<div className="my-3 space-y-2">
						<div className="flex items-center space-x-3">
							<Checkbox
								id="terms"
								defaultChecked
								className="h-4 w-4 shrink-0 accent-gray-900 dark:accent-zinc-50"
							/>
							<Label
								htmlFor="terms"
								className="text-xs text-gray-600 dark:text-zinc-400 sm:text-sm"
							>
								I agree to the{' '}
								<a
									className="underline"
									href="#"
								>
									Terms
								</a>{' '}
								and our{' '}
								<a
									className="underline"
									href="#"
								>
									Privacy Policy
								</a>
								.
							</Label>
						</div>

						<div className="flex items-center space-x-3">
							<Checkbox
								id="marketing"
								className="h-4 w-4 shrink-0 accent-gray-900 dark:accent-zinc-50"
							/>
							<Label
								htmlFor="marketing"
								className="text-xs text-gray-600 dark:text-zinc-400 sm:text-sm"
							>
								Receive updates and marketing content.
							</Label>
						</div>
					</div>

					<Button className="my-2 w-full bg-gray-900 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-100">
						Start free trial
					</Button>
					<p className="text-center text-xs font-medium text-gray-900 dark:text-zinc-50 sm:text-sm">
						No credit card needed
					</p>
				</CardContent>
			</Card>
		</div>
	);
}

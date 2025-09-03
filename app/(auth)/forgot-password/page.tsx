'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';
import { LoaderCircle } from 'lucide-react';

// Validation schema
const forgotPasswordSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
		mode: 'onBlur',
	});

	const debouncedSubmit = useCallback(
		debounce(async (data: ForgotPasswordFormData) => {
			try {
				setIsLoading(true);
				console.log('Sending forgot password request for email:', data.email);
				const response = await fetch('/api/auth/forgot-password', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email: data.email }),
				});

				const result = await response.json();

				console.log(
					'Forgot password response:',
					result,
					'Status:',
					response.status
				);

				if (!response.ok) {
					if (response.status === 429) {
						toast.error(
							'Too many password reset requests. Please try again later.'
						);
					} else if (response.status === 404) {
						toast.error('User does not exist');
					} else if (response.status === 400) {
						toast.error(result.error || 'Invalid email address');
					} else if (
						response.status === 500 &&
						result.error.includes('Server configuration error')
					) {
						toast.error('Server error. Please contact support.');
					} else {
						toast.error(result.error || 'Failed to send reset link');
					}
					return;
				}

				toast.success('Reset link sent successfully.');
				router.push('/login');
			} catch (error) {
				console.error('Frontend forgot password error:', error);
				toast.error('An error occurred while requesting a password reset');
			} finally {
				setIsLoading(false);
			}
		}, 500),
		[router]
	);

	const onSubmit = async (data: ForgotPasswordFormData) => {
		if (isLoading || isSubmitting) return;
		debouncedSubmit(data);
	};

	return (
		<main className="min-h-screen flex flex-col">
			<div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
				<div className="w-full max-w-[400px] space-y-4">
					<Link
						href="/"
						className="flex justify-center mr-6"
					>
						<Image
							src="/images/logo.svg"
							alt="Mintlify"
							width={50}
							height={50}
							className="text-primary"
						/>
					</Link>
					<div className="space-y-6">
						<div className="space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								Reset your Password
							</h1>
						</div>
						<div className="space-y-4">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="space-y-2">
									<label
										htmlFor="email"
										className="text-sm font-medium"
									>
										Email address
									</label>
									<Input
										id="email"
										type="email"
										{...register('email')}
										placeholder="name@email.com"
										className="w-full"
										disabled={isSubmitting || isLoading}
									/>
									{errors.email && (
										<p className="text-sm text-red-500">
											{errors.email.message}
										</p>
									)}
								</div>
								<Button
									type="submit"
									className="w-full mt-3 from-green-600 to-green-500 text-white bg-gradient-to-t border border-b-2 border-green-900/40 shadow-md shadow-green-900/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.1)]"
									size="lg"
									disabled={isSubmitting || isLoading}
								>
									{isLoading ? (
										<span className="flex items-center justify-center">
											<LoaderCircle className="animate-spin mr-2 h-5 w-5" />
											Processing...
										</span>
									) : 'Send Reset Link'}
								</Button>
							</form>
						</div>
						<p className="text-sm text-center text-muted-foreground">
							Remember your password?{' '}
							<Link
								href="/login"
								className="text-primary hover:text-green-600 font-medium"
							>
								Sign in
								<FaArrowRight className="inline-block ml-1" />
							</Link>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}

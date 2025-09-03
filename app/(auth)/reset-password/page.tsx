'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useCallback, useEffect, Suspense } from 'react';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';
import { LoaderCircle } from 'lucide-react';

// Validation schema for reset password
const resetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters long' })
			.regex(/[A-Z]/, {
				message: 'Password must contain at least one uppercase letter',
			})
			.regex(/[a-z]/, {
				message: 'Password must contain at least one lowercase letter',
			})
			.regex(/[0-9]/, { message: 'Password must contain at least one number' }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// Separate component that uses useSearchParams
function ResetPasswordForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = decodeURIComponent(searchParams.get('token') || '');

	// Log query parameters and extracted token for debugging
	console.log('Frontend query parameters:', Object.fromEntries(searchParams));
	console.log('Frontend extracted token:', token);

	const [isLoading, setIsLoading] = useState(false);

	// Check for invalid token parameter and show error
	useEffect(() => {
		if (!token) {
			toast.error(
				'No reset token provided. Please use the link from your email.'
			);
			console.log('No token parameter provided.');
		}
	}, [token]);

	// Initialize react-hook-form with Zod resolver
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
		mode: 'onBlur',
	});

	// Debounced form submission
	const debouncedSubmit = useCallback(
		debounce(async (data: ResetPasswordFormData) => {
			if (!token) {
				toast.error('Invalid or missing reset token');
				console.log('No token provided for submission');
				return;
			}

			console.log('Sending reset request with token:', token);

			try {
				setIsLoading(true);
				const response = await fetch('/api/auth/reset-password', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token, password: data.password }),
				});

				const result = await response.json();

				console.log(
					'Reset password response:',
					result,
					'Status:',
					response.status
				);

				if (!response.ok) {
					if (response.status === 429) {
						toast.error(
							'Too many password reset attempts. Please try again later.'
						);
					} else if (response.status === 400) {
						toast.error(result.error || 'Invalid or expired reset token');
					} else if (
						response.status === 500 &&
						result.error.includes('Server configuration error')
					) {
						toast.error('Server error. Please contact support.');
					} else {
						toast.error(result.error || 'Failed to reset password');
					}
					return;
				}

				toast.success('Password reset successfully');
				router.push('/login');
			} catch (error) {
				console.error('Frontend reset password error:', error);
				toast.error('An error occurred while resetting password');
			} finally {
				// Ensure button stays disabled for at least 1 second
				setTimeout(() => setIsLoading(false), 1000);
			}
		}, 500), // Increased debounce to 500ms
		[router, token]
	);

	// Handle form submission
	const onSubmit = async (data: ResetPasswordFormData) => {
		if (isLoading || isSubmitting) return;
		debouncedSubmit(data);
	};

	return (
		<div className="space-y-6">
			<div className="space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">
					Set New Password
				</h1>
			</div>

			<div className="space-y-4">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-2">
						<label
							htmlFor="password"
							className="text-sm font-medium"
						>
							New Password
						</label>
						<Input
							id="password"
							type="password"
							{...register('password')}
							placeholder="Enter new password"
							className="w-full"
							disabled={isSubmitting || isLoading || !token}
						/>
						{errors.password && (
							<p className="text-sm text-red-500">{errors.password.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<label
							htmlFor="confirmPassword"
							className="text-sm font-medium"
						>
							Confirm Password
						</label>
						<Input
							id="confirmPassword"
							type="password"
							{...register('confirmPassword')}
							placeholder="Confirm new password"
							className="w-full"
							disabled={isSubmitting || isLoading || !token}
						/>
						{errors.confirmPassword && (
							<p className="text-sm text-red-500">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					<Button
						type="submit"
						className="w-full mt-3 from-green-600 to-green-500 text-white bg-gradient-to-t border border-b-2 border-green-900/40 shadow-md shadow-green-900/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.1)]"
						size="lg"
						disabled={isSubmitting || isLoading || !token}
					>
						{isLoading ? (
							<span className="flex items-center justify-center">
								<LoaderCircle className="animate-spin mr-2 h-5 w-5" />
								Resetting...
							</span>
						) : 'Reset Password'}
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
	);
}

// Loading fallback component
function LoadingFallback() {
	return (
		<div className="space-y-6">
			<div className="space-y-2 text-center">
				<div className="h-8 bg-gray-200 rounded animate-pulse"></div>
				<div className="h-4 bg-gray-200 rounded animate-pulse"></div>
				<div className="h-4 bg-gray-200 rounded animate-pulse"></div>
			</div>
			<div className="space-y-4">
				<div className="h-10 bg-gray-200 rounded animate-pulse"></div>
				<div className="h-10 bg-gray-200 rounded animate-pulse"></div>
				<div className="h-10 bg-gray-200 rounded animate-pulse"></div>
			</div>
		</div>
	);
}

// Main page component
export default function ResetPasswordPage() {
	return (
		<main className="min-h-screen flex flex-col">
			<div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
				<div className="w-full max-w-[400px] space-y-4">
					{/* Logo */}
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

					{/* Reset Password form wrapped in Suspense */}
					<Suspense fallback={<LoadingFallback />}>
						<ResetPasswordForm />
					</Suspense>
				</div>
			</div>
		</main>
	);
}
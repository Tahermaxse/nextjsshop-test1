'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';
import { LoaderCircle } from 'lucide-react';
import crypto from 'crypto';

// Simplified validation schema for better performance
const signupSchema = z.object({
	name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long' })
		.regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
		.regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
		.regex(/[0-9]/, { message: 'Password must contain at least one number' })
		.regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
});

// Infer the type from the schema
type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [isCredentialsLoading, setIsCredentialsLoading] = useState(false);
	const [isGoogleLoading, setIsGoogleLoading] = useState(false);
	const [csrfToken, setCsrfToken] = useState('');

	// Generate CSRF token on component mount
	useEffect(() => {
		const token = crypto.randomBytes(32).toString('hex');
		setCsrfToken(token);
	}, []);

	// Initialize react-hook-form with Zod resolver
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
		mode: 'onBlur', // Only validate on blur instead of every change
	});

	// Debounced form submission
	const debouncedSubmit = useCallback(
		debounce(async (data: SignupFormData) => {
			try {
				setIsCredentialsLoading(true);
				const response = await fetch('/api/signup', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ ...data, csrfToken }),
				});

				const result = await response.json();

				if (!response.ok) {
					throw new Error(result.error || 'Signup failed');
				}

				toast.success(
					'Please check your email to verify your account before logging in.'
				);
				router.push('/login');
			} catch (error) {
				if (error instanceof Error) {
					toast.error(error.message);
				} else {
					toast.error('An unexpected error occurred during signup');
				}
			} finally {
				setIsCredentialsLoading(false);
			}
		}, 300),
		[router, csrfToken]
	);

	// Handle form submission
	const onSubmit = async (data: SignupFormData) => {
		if (isCredentialsLoading || isGoogleLoading) return; // Prevent multiple submissions
		debouncedSubmit(data);
	};

	// Optimize Google sign-in with preloading
	const handleGoogleSignup = useCallback(async () => {
		try {
			setIsGoogleLoading(true);
			await signIn('google', { callbackUrl: '/' });
		} catch (error) {
			toast.error('Failed to sign in with Google');
		} finally {
			setIsGoogleLoading(false);
		}
	}, []);

	// Preload Google OAuth resources
	useEffect(() => {
		const preloadGoogleAuth = () => {
			const link = document.createElement('link');
			link.rel = 'preconnect';
			link.href = 'https://accounts.google.com';
			document.head.appendChild(link);
		};
		preloadGoogleAuth();
	}, []);

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

					<form
						className="space-y-6"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								Create your account
							</h1>
							<p className="text-sm text-muted-foreground">
								Already have an account?{' '}
								<Link
									href="/login"
									className="text-primary hover:text-green-600 font-medium"
								>
									Sign in
									<FaArrowRight className="inline-block ml-1" />
								</Link>
							</p>
						</div>

						<div className="space-y-4">
							<div className="space-y-2">
								<label
									htmlFor="name"
									className="text-sm font-medium"
								>
									Full name
								</label>
								<Input
									id="name"
									type="text"
									{...register('name')}
									placeholder="John Doe"
									className="w-full "
								/>
								{errors.name && (
									<p className="text-sm text-red-500">{errors.name.message}</p>
								)}
							</div>
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
								/>

								{errors.email && (
									<p className="text-sm text-red-500">{errors.email.message}</p>
								)}
							</div>
							<div className="space-y-2">
								<label
									htmlFor="password"
									className="text-sm font-medium"
								>
									Password
								</label>
								<div className="relative">
									<Input
										id="password"
										type={showPassword ? 'text' : 'password'}
										{...register('password')}
										placeholder="••••••••"
										className="w-full pr-10"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
									>
										{showPassword ? (
											<FiEyeOff className="h-5 w-5" />
										) : (
											<FiEye className="h-5 w-5" />
										)}
									</button>
								</div>
								{errors.password && (
									<p className="text-sm text-red-500">
										{errors.password.message}
									</p>
								)}
							</div>
							<Button
								type="submit"
								className="w-full from-green-600 to-green-500 text-white bg-gradient-to-t border border-b-2 border-green-900/40 shadow-md shadow-green-900/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.1)]"
								size="lg"
								disabled={
									isSubmitting || isCredentialsLoading || isGoogleLoading
								}
							>
								{isCredentialsLoading ? (
									<span className="flex items-center justify-center">
										<LoaderCircle className="animate-spin mr-2 h-5 w-5" />
										Creating Account...
									</span>
								) : 'Create Account'}
							</Button>

							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<Separator />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-background px-2 text-muted-foreground">
										or
									</span>
								</div>
							</div>

							<Button
								type="button"
								variant="outline"
								size="lg"
								className="w-full"
								onClick={handleGoogleSignup}
								disabled={isGoogleLoading || isCredentialsLoading}
							>
								{isGoogleLoading ? (
									<span className="flex items-center justify-center">
										<LoaderCircle className="animate-spin mr-2 h-5 w-5" />
										Processing...
									</span>
								) : (
									<>
										<FcGoogle className="mr-2 h-5 w-5" />
										Sign up with Google
									</>
								)}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';
import { LoaderCircle } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff} from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';
import crypto from 'crypto';

// Simplified validation schema for better performance
const loginSchema = z.object({
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
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
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
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onBlur', // Only validate on blur instead of every change
	});

	// Debounced form submission
	const debouncedSubmit = useCallback(
		debounce(async (data: LoginFormData) => {
			try {
				setIsCredentialsLoading(true);
				const result = await signIn('credentials', {
					redirect: false,
					email: data.email,
					password: data.password,
					csrfToken: csrfToken, // Include CSRF token
				});

				if (result?.error) {
					if (result.error === 'Please verify your email before logging in') {
						toast.error(
							'Please check your email and verify your account before logging in.'
						);
						return;
					}
					toast.error(result.error || 'Invalid email or password');
					return;
				}

				if (result?.ok) {
					toast.success('Logged in successfully');
					router.push('/');
				}
			} catch (error) {
				toast.error('An error occurred during login');
			} finally {
				setIsCredentialsLoading(false);
			}
		}, 300),
		[router, csrfToken]
	);

	// Handle form submission
	const onSubmit = async (data: LoginFormData) => {
		if (isCredentialsLoading || isGoogleLoading) return; // Prevent multiple submissions
		debouncedSubmit(data);
	};

	// Optimize Google sign-in with preloading
	const handleGoogleSignup = useCallback(async () => {
		try {
			setIsGoogleLoading(true);
			await signIn('google', {
				redirect: true,
				callbackUrl: '/',
			});
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
		<main className="min-h-screen flex flex-col ">
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

					{/* Sign in form */}
					<div className="space-y-6">
						<div className="space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								Sign in to Nextjsshop
							</h1>
							<p className="text-sm text-muted-foreground">
								Don&apos;t have an account?{' '}
								<Link
									href="/signup"
									className="text-primary hover:text-green-600 font-medium"
								>
									Get started
									<FaArrowRight className="inline-block ml-1" />
								</Link>
							</p>
						</div>

						<div className="space-y-4">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="space-y-2">
									<label
										htmlFor="email"
										className="text-sm font-medium"
									>
										Enter your email
									</label>
									<Input
										id="email"
										type="email"
										{...register('email')}
										placeholder="name@email.com"
										className="w-full"
									/>

									{errors.email && (
										<p className="text-sm text-red-500">
											{errors.email.message}
										</p>
									)}
								</div>
								<div className="space-y-2 mt-2">
									<div className="flex items-center justify-between">
										<label
											htmlFor="password"
											className="text-sm font-medium"
										>
											Password
										</label>
										<Link
											href="/forgot-password"
											className="text-sm font-medium text-zinc-600 hover:text-zinc-500 dark:text-zinc-500  p-0 m-0 inline"
											style={{ margin: 0, padding: 0, display: 'inline' }}
										>
											Forgot password?
										</Link>
									</div>
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
									className="w-full mt-3 from-green-600 to-green-500 text-white bg-gradient-to-t border border-b-2 border-green-900/40 shadow-md shadow-green-900/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.1)]"
									size="lg"
									disabled={
										isSubmitting || isCredentialsLoading || isGoogleLoading
									}
								>
									{isCredentialsLoading ? (
										<span className="flex items-center justify-center">
											<LoaderCircle  className="animate-spin mr-2 h-5 w-5" />
											Processing...
										</span>
									) : 'Continue'}
								</Button>
							</form>

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
										Continue with Google
									</>
								)}
							</Button>
						</div>

						<div className="text-center text-sm text-muted-foreground">
							By signing in, you agree to the{' '}
							<Link
								href="/legal/terms"
								className="hover:text-foreground underline underline-offset-4"
							>
								Terms of Service
							</Link>{' '}
							and{' '}
							<Link
								href="/legal/privacy"
								className="hover:text-foreground underline underline-offset-4"
							>
								Privacy Policy
							</Link>
							.
						</div>

						<div className="text-center text-sm">
							Need help?{' '}
							<Link
								href="/contact/support"
								className="text-primary hover:text-primary/90 font-medium"
							>
								Contact support
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

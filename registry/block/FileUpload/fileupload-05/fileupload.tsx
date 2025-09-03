'use client';

import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, type File, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export interface FileUploadProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
	onChange?: (files: File[]) => void;
	onRemove?: (file: File) => void;
	value?: File[];
	maxFiles?: number;
	maxSize?: number;
	accept?: string;
	className?: string;
	dropzoneClassName?: string;
	fileCardClassName?: string;
	showPreview?: boolean;
}

export default function FileUpload05({
	onChange,
	onRemove,
	value = [],
	maxFiles = 10,
	maxSize = 10 * 1024 * 1024, // 10MB
	accept,
	className,
	dropzoneClassName,
	fileCardClassName,
	showPreview = true,
	...props
}: FileUploadProps) {
	const [files, setFiles] = React.useState<File[]>(value);
	const [uploadProgress, setUploadProgress] = React.useState<
		Record<string, number>
	>({});
	const fileInputRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		setFiles(value);
	}, [value]);

	const handleFileChange = (newFiles: File[]) => {
		const updatedFiles = [...files, ...newFiles];
		setFiles(updatedFiles);

		// Simulate upload progress for demo purposes
		newFiles.forEach((file) => {
			let progress = 0;
			const interval = setInterval(() => {
				progress += 5;
				setUploadProgress((prev) => ({
					...prev,
					[file.name]: progress,
				}));

				if (progress >= 100) {
					clearInterval(interval);
				}
			}, 200);
		});

		onChange?.(updatedFiles);
	};

	const handleRemoveFile = (fileToRemove: File) => {
		const updatedFiles = files.filter((file) => file !== fileToRemove);
		setFiles(updatedFiles);
		onRemove?.(fileToRemove);
		onChange?.(updatedFiles);
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		maxFiles,
		maxSize,
		accept: accept ? { [accept]: [] } : undefined,
		noClick: true,
		onDrop: handleFileChange,
		onDropRejected: (fileRejections) => {
			console.log('Rejected files:', fileRejections);
		},
	});

	const formatFileSize = (bytes: number) => {
		if (bytes < 1024) return bytes + ' B';
		else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
		else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
	};

	const getFileTypeIcon = (file: File) => {
		if (file.type.startsWith('image/')) return '🖼️';
		if (file.type.startsWith('video/')) return '🎬';
		if (file.type.startsWith('audio/')) return '🎵';
		if (file.type.includes('pdf')) return '📄';
		if (file.type.includes('word') || file.type.includes('document'))
			return '📝';
		if (file.type.includes('excel') || file.type.includes('sheet')) return '📊';
		return '📁';
	};

	return (
		<div
			className={cn('w-full', className)}
			{...props}
		>
			<div
				{...getRootProps()}
				className={cn(
					'relative w-full cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors',
					'hover:border-muted-foreground/50',
					isDragActive && 'border-primary/50 bg-muted/50',
					dropzoneClassName
				)}
			>
				<input
					{...getInputProps()}
					ref={fileInputRef}
					className="hidden"
					onChange={(e) => {
						const selectedFiles = Array.from(e.target.files || []);
						handleFileChange(selectedFiles);
						e.target.value = ''; // Reset input value to allow selecting the same file again
					}}
				/>

				<div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
					<div className="rounded-full bg-muted p-4 shadow-sm">
						<Upload className="h-6 w-6 text-muted-foreground" />
					</div>
					<div className="space-y-2">
						<h3 className="text-lg font-semibold">
							Drag & drop your files here
						</h3>
						<p className="text-sm text-muted-foreground">
							or click the button below to select files
						</p>
					</div>
					<Button
						onClick={handleClick}
						variant="outline"
						className="mt-2 shadow-sm hover:shadow-md transition-shadow"
					>
						Select Files
					</Button>

					{isDragActive && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
						>
							<div className="rounded-lg bg-background p-6 shadow-lg">
								<p className="text-lg font-medium">Drop files to upload</p>
							</div>
						</motion.div>
					)}
				</div>
			</div>

			{showPreview && files.length > 0 && (
				<div className="mt-6 space-y-4">
					<h4 className="text-sm font-medium">
						Uploaded Files ({files.length})
					</h4>
					<div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
						{files.map((file, index) => (
							<motion.div
								key={`${file.name}-${index}`}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								layout
							>
								<Card
									className={cn(
										'overflow-hidden border shadow-sm hover:shadow-md transition-shadow',
										fileCardClassName
									)}
								>
									<CardContent className="p-4">
										<div className="flex items-start justify-between gap-2">
											<div className="flex items-center gap-3">
												<div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
													<span className="text-lg">
														{getFileTypeIcon(file)}
													</span>
												</div>
												<div className="space-y-1 overflow-hidden">
													<p className="truncate text-sm font-medium">
														{file.name}
													</p>
													<div className="flex flex-wrap gap-2">
														<Badge
															variant="outline"
															className="text-xs"
														>
															{formatFileSize(file.size)}
														</Badge>
														<Badge
															variant="secondary"
															className="text-xs"
														>
															{file.type || 'Unknown type'}
														</Badge>
													</div>
												</div>
											</div>
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8 rounded-full"
												onClick={(e) => {
													e.stopPropagation();
													handleRemoveFile(file);
												}}
											>
												<X className="h-4 w-4" />
												<span className="sr-only">Remove file</span>
											</Button>
										</div>

										{uploadProgress[file.name] !== undefined &&
											uploadProgress[file.name] < 100 && (
												<div className="mt-3">
													<Progress
														value={uploadProgress[file.name]}
														className="h-1"
													/>
													<p className="mt-1 text-xs text-muted-foreground">
														Uploading: {uploadProgress[file.name]}%
													</p>
												</div>
											)}
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

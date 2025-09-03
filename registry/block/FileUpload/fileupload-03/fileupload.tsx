'use client';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, FileIcon, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Maximum file size (50 MB in bytes)
const MAX_FILE_SIZE = 50 * 1024 * 1024;
// Accepted file types
const ACCEPTED_FILE_TYPES = {
	'image/jpeg': ['.jpg', '.jpeg'],
	'image/png': ['.png'],
	'application/pdf': ['.pdf'],
	'video/mp4': ['.mp4'],
};

type FileStatus = 'uploading' | 'completed' | 'error';

interface FileWithStatus {
	file: File;
	id: string;
	progress: number;
	status: FileStatus;
	error?: string;
}

interface FileUploadProps {
	onFilesUploaded?: (files: File[]) => void;
	maxFiles?: number;
	className?: string;
}

export default function FileUpload03({
	onFilesUploaded,
	maxFiles = 10,
	className,
}: FileUploadProps) {
	const [files, setFiles] = useState<FileWithStatus[]>([]);

	// Simulate file upload with progress
	const simulateUpload = useCallback((fileWithStatus: FileWithStatus) => {
		const id = fileWithStatus.id;
		const totalSize = fileWithStatus.file.size;
		let progress = 0;

		const interval = setInterval(() => {
			progress += Math.floor(Math.random() * 10) + 5;

			if (progress >= 100) {
				clearInterval(interval);
				progress = 100;
				setFiles((prevFiles) =>
					prevFiles.map((f) =>
						f.id === id ? { ...f, progress, status: 'completed' } : f
					)
				);
			} else {
				setFiles((prevFiles) =>
					prevFiles.map((f) => (f.id === id ? { ...f, progress } : f))
				);
			}
		}, 300);
	}, []);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			// Filter out files that exceed size limit
			const validFiles = acceptedFiles.filter(
				(file) => file.size <= MAX_FILE_SIZE
			);

			// Create file objects with status
			const newFiles = validFiles.map((file) => ({
				file,
				id: `${file.name}-${Date.now()}`,
				progress: 0,
				status: 'uploading' as FileStatus,
			}));

			// Add new files to the list
			setFiles((prevFiles) => {
				const updatedFiles = [...prevFiles, ...newFiles];
				// Start simulating upload for each new file
				newFiles.forEach(simulateUpload);
				return updatedFiles;
			});
		},
		[simulateUpload]
	);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		open, // ← Add this
	} = useDropzone({
		onDrop,
		accept: ACCEPTED_FILE_TYPES,
		maxFiles,
		maxSize: MAX_FILE_SIZE,
		noClick: true, // Disable default file input trigger
		noKeyboard: true,
	});

	const removeFile = (id: string) => {
		setFiles((files) => files.filter((file) => file.id !== id));
	};

	const getFileTypeIcon = (fileName: string) => {
		const extension = fileName.split('.').pop()?.toLowerCase();

		if (extension === 'pdf') {
			return (
				<div className="flex items-center justify-center w-8 h-8 bg-red-100 dark:bg-red-900 rounded">
					<FileIcon className="w-4 h-4 text-red-500 dark:text-red-300" />
				</div>
			);
		} else if (['jpg', 'jpeg', 'png'].includes(extension || '')) {
			return (
				<div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded">
					<FileIcon className="w-4 h-4 text-blue-500 dark:text-blue-300" />
				</div>
			);
		} else if (extension === 'mp4') {
			return (
				<div className="flex items-center justify-center w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded">
					<FileIcon className="w-4 h-4 text-purple-500 dark:text-purple-300" />
				</div>
			);
		}

		return (
			<div className="flex items-center justify-center w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded">
				<FileIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
			</div>
		);
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return (
			Number.parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + ' ' + sizes[i]
		);
	};

	return (
		<div className={cn('w-full max-w-3xl', className)}>
			<div
				{...getRootProps()}
				className={cn(
					'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
					'bg-zinc-100 hover:bg-zinc-100/70 dark:bg-zinc-800/70 dark:hover:bg-zinc-800',
					isDragActive
						? 'border-primary dark:border-zinc-500 bg-primary/5'
						: 'border-gray-200 dark:border-zinc-700'
				)}
			>
				<input {...getInputProps()} />
				<div className="flex flex-col items-center justify-center gap-2">
					<div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-full">
						<Upload className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
					</div>
					<p className="text-sm font-medium">
						Choose a file or drag & drop it here.
					</p>
					<p className="text-xs text-gray-500 dark:text-gray-400">
						JPEG, PNG, PDF, and MP4 formats, up to 50 MB.
					</p>
					<Button
						variant="secondary"
						size="sm"
						className="mt-2 bg-zinc-950 text-zinc-50 hover:bg-zinc-900/80 dark:bg-zinc-300 dark:text-zinc-800"
						type="button" // Important: prevent form submission
						onClick={(e) => {
							e.stopPropagation();
							open(); // ← This comes from useDropzone
						}}
					>
						Browse File
					</Button>
				</div>
			</div>

			{files.length > 0 && (
				<div className="space-y-2 mt-4 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-zinc-100 dark:scrollbar-thumb-zinc-600 dark:scrollbar-track-zinc-800">
					{files.map((fileWithStatus) => (
						<div
							key={fileWithStatus.id}
							className="flex items-center gap-3 p-3 border rounded-lg"
						>
							{getFileTypeIcon(fileWithStatus.file.name)}

							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium truncate">
									{fileWithStatus.file.name}
								</p>
								<div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
									<span>
										{formatFileSize(
											fileWithStatus.file.size * (fileWithStatus.progress / 100)
										)}{' '}
										of {formatFileSize(fileWithStatus.file.size)}
									</span>
									{fileWithStatus.status === 'uploading' && (
										<span className="flex items-center">
											<span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse mr-1"></span>
											Uploading...
										</span>
									)}
									{fileWithStatus.status === 'completed' && (
										<span className="flex items-center">
											<span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
											Completed
										</span>
									)}
									{fileWithStatus.status === 'error' && (
										<span className="flex items-center text-red-500">
											<span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1"></span>
											Error
										</span>
									)}
								</div>

								{fileWithStatus.status === 'uploading' && (
									<Progress
										value={fileWithStatus.progress}
										className="h-1.5 mt-1"
									/>
								)}
							</div>

							<button
								onClick={() => removeFile(fileWithStatus.id)}
								className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
								aria-label="Remove file"
							>
								{fileWithStatus.status === 'completed' ? (
									<Trash2 className="w-4 h-4 text-red-500 dark:text-red-500" />
								) : (
									<X className="w-4 h-4 text-red-500 dark:text-red-500" />
								)}
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

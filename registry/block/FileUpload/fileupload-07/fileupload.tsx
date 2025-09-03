'use client';

import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface FileWithProgress extends File {
	id: string;
	progress: number;
	uploadSpeed?: string;
	error?: string;
}

export default function FileUpload07() {
	const [files, setFiles] = useState<FileWithProgress[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const [fileToRemove, setFileToRemove] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			handleFiles(e.dataTransfer.files);
		}
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			handleFiles(e.target.files);
		}
	};

	const handleFiles = (fileList: FileList) => {
		const newFiles = Array.from(fileList).map((file) => {
			const fileWithProgress: FileWithProgress = Object.assign(
				new File([file], file.name, {
					type: file.type,
					lastModified: file.lastModified,
				}),
				{
					id: generateId(),
					progress: 0,
					uploadSpeed: undefined,
					error: undefined,
				}
			);
			return fileWithProgress;
		});

		setFiles((prev) => [...prev, ...newFiles]);

		newFiles.forEach((file) => {
			simulateFileUpload(file.id);
		});
	};

	const simulateFileUpload = (fileId: string) => {
		let progress = 0;
		const interval = setInterval(() => {
			progress += Math.random() * 10;
			if (progress >= 100) {
				progress = 100;
				clearInterval(interval);
			}

			setFiles((prev) =>
				prev.map((file) => {
					if (file.id === fileId) {
						const updatedFile = new File([file], file.name, {
							type: file.type,
							lastModified: file.lastModified,
						}) as FileWithProgress;

						return Object.assign(updatedFile, {
							progress,
							uploadSpeed:
								progress < 100
									? `${Math.floor(Math.random() * 900 + 100)}kb/sec`
									: undefined,
							id: file.id,
							error: file.error,
						});
					}
					return file;
				})
			);
		}, 300);
	};

	const handleRemoveFile = (fileId: string) => {
		setFileToRemove(fileId);
	};

	const confirmRemoveFile = () => {
		if (fileToRemove) {
			setFiles((prev) => prev.filter((file) => file.id !== fileToRemove));
			setFileToRemove(null);
		}
	};

	const cancelRemoveFile = () => {
		setFileToRemove(null);
	};

	const handleChooseFile = () => {
		fileInputRef.current?.click();
	};

	const generateId = () => {
		return (
			Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15)
		);
	};

	const formatFileSize = (bytes: number) => {
		if (bytes < 1024) return bytes + ' B';
		else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
		else return (bytes / 1048576).toFixed(1) + ' MB';
	};

	const getFileExtension = (fileName: string) => {
		return fileName.split('.').pop()?.toUpperCase() || 'FILE';
	};

	return (
		<div className="bg-card w-full max-w-xl px-8 py-4 rounded-md">
			<div className=" mx-auto space-y-4">
				<div className="space-y-3">
					{files.map((file) => (
						<div
							key={file.id}
							className="flex items-start gap-3 p-3 border rounded-lg"
						>
							<div className="w-10 h-10 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-md">
								<span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
									{getFileExtension(file.name)}
								</span>
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex justify-between items-start">
									<p className="text-sm font-medium truncate pr-2">
										{file.name}
									</p>
									<button
										onClick={() => handleRemoveFile(file.id)}
										className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
									>
										<X className="h-4 w-4" />
									</button>
								</div>

								{file.progress < 100 ? (
									<>
										<div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-1">
											<span>
												{formatFileSize(
													Math.floor(file.size * (file.progress / 100))
												)}{' '}
												of {formatFileSize(file.size)} (
												{Math.floor(file.progress)}% done)
											</span>
											{file.uploadSpeed && <span>{file.uploadSpeed}</span>}
										</div>
										<Progress
											value={file.progress}
											className="h-1.5 mt-1.5"
										/>
									</>
								) : (
									<div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
										{formatFileSize(file.size)}
									</div>
								)}
							</div>
						</div>
					))}
				</div>

				<div
					className={cn(
						'border-2 border-dashed rounded-lg p-8 text-center flex flex-col items-center justify-center gap-2',
						isDragging
							? 'border-zinc-500 bg-blue-50 dark:bg-zinc-700/20'
							: 'border-zinc-300 dark:border-zinc-700',
						'transition-colors duration-200 cursor-pointer'
					)}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					onClick={handleChooseFile}
				>
					<Upload className="h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
					<p className="text-sm text-gray-600 dark:text-gray-300">
						Drop files here to upload
					</p>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						or choose file
					</p>
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleFileChange}
						className="hidden"
						multiple
					/>
				</div>

				<div className="flex justify-end gap-2">
					<Button variant="outline">Discard</Button>
					<Button
						disabled={files.length === 0}
						className="bg-zinc-900 text-zinc-50 hover:bg-zinc-900/80 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/80"
					>
						Attach Files
					</Button>
				</div>

				<AlertDialog
					open={fileToRemove !== null}
					onOpenChange={(open) => !open && setFileToRemove(null)}
				>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Do you want to remove the file?
							</AlertDialogTitle>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel onClick={cancelRemoveFile}>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={confirmRemoveFile}
								className="bg-red-500 hover:bg-red-600 focus-visible:ring-red-500"
							>
								<Trash2 className="h-4 w-4 mr-2" />
								Remove
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}

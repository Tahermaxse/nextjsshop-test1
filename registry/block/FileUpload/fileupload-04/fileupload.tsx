'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileWithPreview extends File {
	id: string;
	preview?: string;
}

export default function FileUpload04() {
	const [files, setFiles] = useState<FileWithPreview[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

	const handleFileChange = (selectedFiles: FileList | null) => {
		if (!selectedFiles) return;

		const newFiles = Array.from(selectedFiles).map((file) => {
			// Create a new object that properly extends File with our additional properties
			const fileWithId: FileWithPreview = Object.assign(file, {
				id: crypto.randomUUID(),
			});
			return fileWithId;
		});

		// Filter out files that exceed the max size
		const validFiles = newFiles.filter((file) => file.size <= MAX_FILE_SIZE);

		if (validFiles.length < newFiles.length) {
			console.warn('Some files exceeded the maximum file size of 10MB');
		}

		setFiles((prev) => [...prev, ...validFiles]);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		handleFileChange(e.dataTransfer.files);
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const removeFile = (id: string) => {
		setFiles(files.filter((file) => file.id !== id));
	};

	const formatFileSize = (bytes: number) => {
		if (bytes < 1024) return bytes + ' B';
		else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
		else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
	};

	const getFileExtension = (fileName: string) => {
		return fileName.split('.').pop()?.toLowerCase() || 'file';
	};

	return (
		<Card className="w-full max-w-md mx-auto bg-white dark:bg-zinc-950 shadow-md">
			<CardHeader className="pb-3">
				<CardTitle className="text-lg font-medium">Upload Files</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div
					onClick={handleClick}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					className={cn(
						'border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors',
						isDragging
							? 'border-primary bg-primary/5 dark:border-primary dark:bg-primary/10'
							: 'bg-zinc-100 dark:bg-zinc-900/70 border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600'
					)}
				>
					<input
						ref={fileInputRef}
						type="file"
						multiple
						onChange={(e) => handleFileChange(e.target.files)}
						className="hidden"
					/>
					<div className="w-10 h-10 rounded-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center mb-3">
						<Plus className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
					</div>
					<p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
						Drag & drop or click to choose files
					</p>
					<p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
						Max file size: 10 MB
					</p>
				</div>

				{files.length > 0 && (
					<div className="space-y-3">
						{files.map((file) => (
							<div
								key={file.id}
								className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/30"
							>
								<div className="flex items-center gap-3 min-w-0">
									<div className="flex-shrink-0 w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
										<span className="text-xs font-medium uppercase">
											{getFileExtension(file.name)}
										</span>
									</div>
									<div className="min-w-0">
										<p className="text-sm font-medium truncate">{file.name}</p>
										<p className="text-xs text-gray-500 dark:text-gray-400">
											{formatFileSize(file.size)}
										</p>
									</div>
								</div>
								<div className="flex gap-2">
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 rounded-full"
										onClick={() => {
											const url = URL.createObjectURL(file);
											const a = document.createElement('a');
											a.href = url;
											a.download = file.name;
											document.body.appendChild(a);
											a.click();
											document.body.removeChild(a);
											URL.revokeObjectURL(url);
										}}
									>
										<Download className="h-4 w-4" />
										<span className="sr-only">Download</span>
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 rounded-full text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
										onClick={() => removeFile(file.id)}
									>
										<Trash2 className="h-4 w-4" />
										<span className="sr-only">Delete</span>
									</Button>
								</div>
							</div>
						))}

						<Button
							variant="ghost"
							className="w-full text-gray-500 dark:text-gray-400 text-sm h-auto py-2 hover:bg-transparent hover:text-red-500 dark:hover:text-red-400"
							onClick={() => setFiles([])}
						>
							Remove file download from this task
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

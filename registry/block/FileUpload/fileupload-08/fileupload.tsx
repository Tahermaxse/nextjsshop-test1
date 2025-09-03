'use client';
import { TrashIcon, UploadIcon } from 'lucide-react';
import React, { useCallback, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface FileWithPreview extends File {
	preview: string;
}

export default function FileUpload08(): JSX.Element {
	const [files, setFiles] = useState<FileWithPreview[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const droppedFiles = Array.from(e.dataTransfer.files);
		handleFiles(droppedFiles);
	}, []);

	const handleFiles = (newFiles: File[]) => {
		const validFiles = newFiles
			.filter((file) => file.type === 'image/jpeg' || file.type === 'image/png')
			.slice(0, 1); // Only take the first file

		if (validFiles.length === 0) {
			alert('Please upload only JPEG or PNG files.');
			return;
		}

		if (validFiles[0].size > 25 * 1024 * 1024) {
			alert('File size must be less than 25MB');
			return;
		}

		const filesWithPreviews = validFiles.map((file) =>
			Object.assign(file, {
				preview: URL.createObjectURL(file),
			})
		);

		setFiles(filesWithPreviews);
	};

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			handleFiles(Array.from(e.target.files));
		}
	};

	const removeFile = (file: FileWithPreview) => {
		URL.revokeObjectURL(file.preview);
		setFiles(files.filter((f) => f !== file));
		// Reset the file input value when removing file
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const clearFiles = () => {
		files.forEach((file) => URL.revokeObjectURL(file.preview));
		setFiles([]);
		// Reset the file input value when clearing
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	return (
		<Card className="w-[400px] rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-8 bg-zinc-50 dark:bg-zinc-900">
			<CardHeader className="p-0 space-y-1">
				<CardTitle className="text-lg leading-7 font-semibold text-zinc-900 dark:text-zinc-100">
					Upload Thumbnail
				</CardTitle>
				<CardDescription className="text-sm leading-5 text-zinc-500 dark:text-zinc-400">
					Please upload file in jpeg or png format and make sure the file size
					is under 25 MB.
				</CardDescription>
			</CardHeader>

			<CardContent className="p-0 relative">
				<input
					type="file"
					accept="image/jpeg,image/png"
					onChange={handleFileInput}
					className="hidden"
					id="file-input"
					ref={fileInputRef}
				/>
				<div
					onDrop={onDrop}
					onDragOver={dragOver}
					className="relative w-full h-[200px] rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 cursor-pointer border border-zinc-200 dark:border-zinc-700"
					onClick={() => document.getElementById('file-input')?.click()}
				>
					{files.length > 0 ? (
						<div className="w-full h-full relative">
							<img
								src={files[0].preview}
								alt="Preview"
								className="w-full h-full object-contain"
							/>
							<div className="absolute top-8 right-4 flex flex-col gap-2">
								<Button
									variant="outline"
									size="icon"
									className="w-10 h-10 p-[11px] bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg border border-zinc-300 dark:border-zinc-600"
									onClick={(e) => {
										e.stopPropagation();
										removeFile(files[0]);
									}}
								>
									<TrashIcon className="h-5 w-5" />
								</Button>
							</div>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center h-full">
							<UploadIcon className="h-12 w-12 text-zinc-400 dark:text-zinc-500 mb-2" />
							<p className="text-sm text-zinc-500 dark:text-zinc-400">
								Drag and drop or click to upload
							</p>
						</div>
					)}
				</div>
			</CardContent>

			<CardFooter className="p-0 flex gap-3">
				<Button
					variant="outline"
					className="flex-1 font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-700 border-zinc-300 dark:border-zinc-600"
					onClick={clearFiles}
				>
					Clear
				</Button>
				<Button
					className="flex-1 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-semibold"
					disabled={files.length === 0}
				>
					Done
				</Button>
			</CardFooter>
		</Card>
	);
}

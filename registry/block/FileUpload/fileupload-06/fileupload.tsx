'use client';

import type React from 'react';
import { useState, useRef } from 'react';
import Image from 'next/image';
import {
	Eye,
	Trash2,
	File,
	FileText,
	FileImage,
	FileAudio,
	FileVideo,
	FileArchive,
	FileCode,
	FileSpreadsheet,
	FileDigit,
	Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type FileWithPreview = {
	file: File;
	id: string;
	url: string;
};

interface FileUploadProps {
	onChange?: (files: File[]) => void;
	maxFiles?: number;
	accept?: string;
	maxSize?: number; // in MB
}

export default function FileUpload06({
	onChange,
	maxFiles = 10,
	accept = '*/*',
	maxSize = 5, // 5MB default
}: FileUploadProps) {
	const [files, setFiles] = useState<FileWithPreview[]>([]);
	const [error, setError] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError(null);

		if (!e.target.files?.length) return;

		const newFiles = Array.from(e.target.files);

		// Check if adding new files would exceed the max files limit
		if (files.length + newFiles.length > maxFiles) {
			setError(`You can only upload up to ${maxFiles} files`);
			return;
		}

		// Check file size
		const oversizedFiles = newFiles.filter(
			(file) => file.size > maxSize * 1024 * 1024
		);
		if (oversizedFiles.length > 0) {
			setError(`Some files exceed the ${maxSize}MB limit`);
			return;
		}

		const newFilesWithPreview = newFiles.map((file) => ({
			file,
			id: crypto.randomUUID(),
			url: URL.createObjectURL(file),
		}));

		const updatedFiles = [...files, ...newFilesWithPreview];
		setFiles(updatedFiles);

		if (onChange) {
			onChange(updatedFiles.map((f) => f.file));
		}

		// Reset input value so the same file can be selected again
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	const removeFile = (id: string) => {
		const updatedFiles = files.filter((f) => f.id !== id);
		setFiles(updatedFiles);

		if (onChange) {
			onChange(updatedFiles.map((f) => f.file));
		}
	};

	const previewFile = (url: string, type: string) => {
		window.open(url, '_blank');
	};

	const getFileIcon = (type: string, name: string) => {
		const extension = name.split('.').pop()?.toLowerCase();

		// First check by MIME type
		if (type.startsWith('image/'))
			return <FileImage className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />;
		if (type.startsWith('video/'))
			return <FileVideo className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />;
		if (type.startsWith('audio/'))
			return <FileAudio className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />;
		if (type.includes('pdf'))
			return <FileText className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />;

		// Then check by file extension
		switch (extension) {
			case 'pdf':
				return <FileText className="h-6 w-6" />;
			case 'zip':
			case 'rar':
			case '7z':
			case 'tar':
			case 'gz':
				return <FileArchive className="h-6 w-6" />;
			case 'doc':
			case 'docx':
				return <FileText className="h-6 w-6" />;
			case 'xls':
			case 'xlsx':
				return <FileSpreadsheet className="h-6 w-6" />;
			case 'ppt':
			case 'pptx':
				return <FileDigit className="h-6 w-6" />;
			case 'txt':
			case 'rtf':
				return <FileText className="h-6 w-6" />;
			case 'html':
			case 'htm':
			case 'xml':
			case 'json':
				return <FileCode className="h-6 w-6" />;
			default:
				return <File className="h-6 w-6" />;
		}
	};

	const getFileTypeLabel = (type: string, name: string) => {
		const extension = name.split('.').pop()?.toLowerCase();

		if (type.startsWith('image/')) return 'Image';
		if (type.startsWith('video/')) return 'Video';
		if (type.startsWith('audio/')) return 'Audio';
		if (type.includes('pdf')) return 'PDF';

		switch (extension) {
			case 'pdf':
				return 'PDF';
			case 'zip':
				return 'ZIP';
			case 'rar':
				return 'RAR';
			case 'doc':
			case 'docx':
				return 'Word';
			case 'xls':
			case 'xlsx':
				return 'Excel';
			case 'ppt':
			case 'pptx':
				return 'PowerPoint';
			case 'txt':
				return 'Text';
			case 'html':
			case 'htm':
				return 'HTML';
			case 'json':
				return 'JSON';
			default:
				return extension?.toUpperCase() || 'File';
		}
	};

	const handleUploadClick = () => {
		inputRef.current?.click();
	};

	return (
		<div className="w-full">
			<div className="flex flex-wrap gap-4">
				{files.map((file) => (
					<div
						key={file.id}
						className="relative h-32 w-32 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center bg-zinc-50 dark:bg-zinc-800/80 dark:border-zinc-700"
					>
						{file.file.type.startsWith('image/') ? (
							<Image
								src={file.url || '/placeholder.svg'}
								alt={file.file.name}
								fill
								className="object-cover"
							/>
						) : (
							<div className="flex flex-col items-center justify-center p-2">
								{getFileIcon(file.file.type, file.file.name)}
								<span className="text-xs mt-1 text-center font-medium">
									{getFileTypeLabel(file.file.type, file.file.name)}
								</span>
								<span className="text-xs text-center text-zinc-500 dark:text-zinc-300 truncate w-full">
									{file.file.name.length > 15
										? `${file.file.name.substring(0, 12)}...`
										: file.file.name}
								</span>
							</div>
						)}

						<div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
							<div className="flex gap-2">
								<button
									onClick={() => previewFile(file.url, file.file.type)}
									className="rounded-full bg-white p-1.5 text-gray-700 hover:text-gray-900"
									aria-label="Preview file"
								>
									<Eye className="h-4 w-4" />
								</button>
								<button
									onClick={() => removeFile(file.id)}
									className="rounded-full bg-white p-1.5 text-red-500 hover:text-red-700"
									aria-label="Remove file"
								>
									<Trash2 className="h-4 w-4" />
								</button>
							</div>
						</div>
					</div>
				))}

				<Button
					onClick={handleUploadClick}
					className={cn(
						'h-32 w-32 rounded-lg border-2 border-dashed dark:bg-zinc-800 dark:border-zinc-600 border-zinc-400 flex flex-col items-center justify-center text-zinc-500 hover:border-zinc-600 bg-zinc-200 hover:bg-zinc-200/80 transition-colors',
						error && 'border-red-300 hover:border-red-400'
					)}
				>
					<Upload className="h-6 w-6 mb-1 dark:text-zinc-400" />
					<span className="text-sm dark:text-zinc-400">Upload</span>
				</Button>

				<input
					ref={inputRef}
					type="file"
					accept={accept}
					multiple={maxFiles > 1}
					onChange={handleFileChange}
					className="hidden"
					aria-label="Upload files"
				/>
			</div>

			{error && <p className="text-sm text-red-500 mt-2">{error}</p>}
		</div>
	);
}

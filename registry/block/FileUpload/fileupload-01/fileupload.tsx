import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { X, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
	className?: string;
	multiple?: boolean;
	accept?: string;
	maxFiles?: number;
	maxSize?: number; // in bytes
	onFilesChange?: (files: File[]) => void;
}

export function FileUpload({
	className,
	multiple = true,
	accept,
	maxFiles,
	maxSize,
	onFilesChange,
}: FileUploadProps) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [files, setFiles] = React.useState<File[]>([]);
	const [error, setError] = React.useState<string | null>(null);
	const [isDragging, setIsDragging] = React.useState(false);

	const handleButtonClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleFileChange = (selectedFiles: File[]) => {
		setError(null);

		// Check max files
		if (maxFiles && files.length + selectedFiles.length > maxFiles) {
			setError(`You can only upload up to ${maxFiles} files.`);
			return;
		}

		// Check file sizes
		if (maxSize) {
			const oversizedFiles = selectedFiles.filter(
				(file) => file.size > maxSize
			);
			if (oversizedFiles.length > 0) {
				setError(
					`Some files exceed the maximum size of ${formatFileSize(maxSize)}.`
				);
				return;
			}
		}

		const updatedFiles = multiple
			? [...files, ...selectedFiles]
			: selectedFiles;
		setFiles(updatedFiles);
		onFilesChange?.(updatedFiles);
		if (inputRef.current) {
			inputRef.current.value = ''; // Reset input
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(e.target.files || []);
		handleFileChange(selectedFiles);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		const droppedFiles = Array.from(e.dataTransfer.files);
		handleFileChange(droppedFiles);
	};

	const removeFile = (index: number) => {
		const updatedFiles = files.filter((_, i) => i !== index);
		setFiles(updatedFiles);
		onFilesChange?.(updatedFiles);
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	const getFileType = (fileName: string) => {
		const extension = fileName.split('.').pop()?.toUpperCase();
		return extension || 'FILE';
	};

	const getFileIcon = (fileName: string) => {
		const extension = fileName.split('.').pop()?.toLowerCase();
		switch (extension) {
			case 'pdf':
				return '📄';
			case 'zip':
				return '📦';
			case 'xlsx':
			case 'xls':
				return '📊';
			case 'doc':
			case 'docx':
				return '📝';
			case 'jpg':
			case 'jpeg':
			case 'png':
			case 'gif':
				return '🖼️';
			default:
				return '📁';
		}
	};

	return (
		<div
			className={cn(
				'space-y-6 p-6 bg-[#ffff] dark:bg-zinc-950 rounded-xl shadow-lg',
				className
			)}
		>
			<div className="flex justify-between items-center">
				<h3 className="text-xl font-semibold dark:text-white">
					Files ({files.length})
				</h3>
				{files.length > 0 && (
					<Button
						type="submit"
						onClick={handleButtonClick}
						className="mt-6 w-max rounded-lg from-blue-600 to-blue-500 text-white bg-gradient-to-t 
						border border-b-2 border-blue-900/40 shadow-md shadow-blue-900/20 
						ring-1 ring-inset ring-white/25 
						transition-[filter] duration-200 hover:brightness-110 active:brightness-90 
						dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.1)] 
						dark:border-x-0 dark:border-t-0 dark:border-blue-900/50 
						dark:ring-white/5 dark:from-blue-700 dark:to-blue-600"
					>
						<Upload className="mr-2 h-4 w-4" /> Add More Files
					</Button>
				)}
				<Input
					ref={inputRef}
					type="file"
					className="hidden"
					multiple={multiple}
					accept={accept}
					onChange={handleInputChange}
				/>
			</div>

			{error && (
				<p className="text-sm font-medium text-red-400 bg-red-900/20 p-3 rounded-lg">
					{error}
				</p>
			)}

			<div
				className={cn(
					'rounded-lg border-2 border-dashed transition-colors duration-300',
					'border-zinc-400 dark:border-zinc-700 bg-zinc-200/70 dark:bg-zinc-900/90',
					'p-8'
				)}
				onDragOver={(e) => {
					e.preventDefault();
					setIsDragging(true);
				}}
				onDragLeave={() => setIsDragging(false)}
				onDrop={handleDrop}
			>
				{files.length === 0 ? (
					<div className="flex flex-col items-center justify-center text-center space-y-4">
						<Upload className="h-12 w-12 text-zinc-950 dark:text-zinc-50" />
						<p className="text-zinc-900 dark:text-zinc-50">
							{multiple
								? 'Drag and drop files here or '
								: 'Select a single file '}
							Browse
							{accept && ` (${accept})`}
							{maxSize && `, max ${formatFileSize(maxSize)} each`}
							{maxFiles && `, max ${maxFiles} files`}
						</p>
						<Button
							type="submit"
							onClick={handleButtonClick}
							className="mt-6 w-max rounded-lg from-blue-600 to-blue-500 text-white bg-gradient-to-t 
								border border-b-2 border-blue-900/40 shadow-md shadow-blue-900/20 
								ring-1 ring-inset ring-white/25 
								transition-[filter] duration-200 hover:brightness-110 active:brightness-90 
								dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.1)] 
								dark:border-x-0 dark:border-t-0 dark:border-blue-900/50 
								dark:ring-white/5 dark:from-blue-700 dark:to-blue-600"
						>
							Browse Files
						</Button>
					</div>
				) : (
					<Table>
						<TableHeader className="bg-zinc-600 dark:bg-gray-900/90">
							<TableRow>
								<TableHead className="w-[50px] dark:bg-zinc-950/70 text-zinc-800 font-bold dark:text-zinc-200 bg-zinc-400"></TableHead>
								<TableHead className="dark:bg-zinc-950/70 text-zinc-800 font-bold dark:text-zinc-200 bg-zinc-400">
									Name
								</TableHead>
								<TableHead className="dark:bg-zinc-950/70 text-zinc-800 font-bold dark:text-zinc-200 bg-zinc-400">
									Type
								</TableHead>
								<TableHead className="dark:bg-zinc-950/70 text-zinc-800 font-bold dark:text-zinc-200 bg-zinc-400">
									Size
								</TableHead>
								<TableHead className="text-right dark:bg-zinc-950/70 text-zinc-800 font-bold dark:text-zinc-200 bg-zinc-400">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{files.map((file, index) => (
								<TableRow
									key={`${file.name}-${file.size}-${index}`}
									className="transition-colors duration-200 bg-zinc-300 hover:bg-zinc-300 dark:bg-zinc-800/90"
								>
									<TableCell className="text-lg text-blue-400">
										{getFileIcon(file.name)}
									</TableCell>
									<TableCell className="font-medium text-zinc-800 dark:text-gray-200">
										{file.name}
									</TableCell>
									<TableCell className="text-zinc-800 dark:text-gray-300">
										{getFileType(file.name)}
									</TableCell>
									<TableCell className="text-zinc-800 dark:text-gray-300">
										{formatFileSize(file.size)}
									</TableCell>
									<TableCell className="text-right">
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-zinc-50 bg-red-600 hover:bg-red-400"
											onClick={() => removeFile(index)}
										>
											<X className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</div>
		</div>
	);
}

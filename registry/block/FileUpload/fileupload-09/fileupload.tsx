'use client';

import { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
	CheckCircle,
	X,
	AlertCircle,
	UploadCloud,
	Link as LinkIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FileWithProgress {
	file: File;
	id: string;
	progress: number;
	error?: string;
	uploaded: boolean;
}

interface FileUploadProps {
	multiple?: boolean;
	maxSize?: number;
	accept?: string;
	onUploadComplete?: (files: File[]) => void;
	onUploadStart?: (files: File[]) => void;
}

const formatBytes = (bytes: number, decimals: number = 1): string => {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return (
		parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
	);
};

function FileItem({
	file,
	onRemove,
}: {
	file: FileWithProgress;
	onRemove: (id: string) => void;
}) {
	const [isHovering, setIsHovering] = useState(false);

	return (
		<Card
			className="p-3 mb-2 flex items-center gap-3 relative transition-all duration-200"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<div className="h-10 w-10 flex items-center justify-center bg-muted rounded-md">
				<UploadCloud className="h-5 w-5" />
			</div>

			<div className="flex-1 min-w-0">
				<p className="text-sm font-medium truncate">{file.file.name}</p>
				<div className="flex items-center text-xs text-muted-foreground gap-2">
					<span>{formatBytes(file.file.size)}</span>
					{!file.uploaded && !file.error && file.progress < 100 && (
						<span>• {Math.round(file.progress)}%</span>
					)}
				</div>

				{!file.uploaded && !file.error && (
					<Progress
						value={file.progress}
						className="h-1 mt-1"
					/>
				)}

				{file.error && (
					<div className="flex items-center gap-1 text-xs text-destructive mt-1">
						<AlertCircle size={12} />
						<span>{file.error}</span>
					</div>
				)}
			</div>

			{file.uploaded && (
				<CheckCircle
					size={18}
					className="text-green-500 absolute right-8"
				/>
			)}

			<Button
				variant="ghost"
				size="icon"
				className={cn(
					'absolute right-1 h-6 w-6',
					!isHovering && !file.error && 'opacity-0'
				)}
				onClick={() => onRemove(file.id)}
			>
				<X size={16} />
			</Button>
		</Card>
	);
}

function UploadZone({
	onFilesDrop,
	maxSize,
	accept,
	multiple,
	disabled = false,
}: {
	onFilesDrop: (files: File[]) => void;
	maxSize: number;
	accept?: string;
	multiple: boolean;
	disabled?: boolean;
}) {
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		if (disabled) return;

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			onFilesDrop(Array.from(e.dataTransfer.files));
		}
	};

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			onFilesDrop(Array.from(e.target.files));
		}

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<div
			className={cn(
				'relative border-2 border-dashed rounded-lg p-6 transition-colors',
				'flex flex-col items-center justify-center text-center',
				isDragging
					? 'border-primary bg-primary/5'
					: 'border-muted-foreground/20',
				disabled && 'opacity-50 cursor-not-allowed',
				'hover:border-primary/50 hover:bg-secondary/50'
			)}
			onDragEnter={(e) => {
				e.preventDefault();
				if (!disabled) setIsDragging(true);
			}}
			onDragOver={(e) => {
				e.preventDefault();
				if (!disabled) setIsDragging(true);
			}}
			onDragLeave={(e) => {
				e.preventDefault();
				setIsDragging(false);
			}}
			onDrop={handleDrop}
			onClick={() => !disabled && fileInputRef.current?.click()}
		>
			<div className="bg-secondary rounded-full p-3 mb-4">
				<UploadCloud className="h-6 w-6 text-primary" />
			</div>

			<p className="text-sm font-medium mb-1">
				Drag and drop or{' '}
				<span className="text-primary cursor-pointer underline">
					select files
				</span>
			</p>

			<p className="text-xs text-muted-foreground">
				Max file size: {formatBytes(maxSize)}
			</p>

			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileInputChange}
				multiple={multiple}
				accept={accept}
				className="hidden"
				disabled={disabled}
			/>
		</div>
	);
}

export default function FileUpload09({
	multiple = true,
	maxSize = 104857600,
	accept,
	onUploadComplete,
	onUploadStart,
}: FileUploadProps) {
	const [files, setFiles] = useState<FileWithProgress[]>([]);
	const [uploading, setUploading] = useState(false);
	const [activeTab, setActiveTab] = useState('device');
	const [linkUrl, setLinkUrl] = useState('');

	const handleFiles = (newFiles: File[]) => {
		const filesWithProgress: FileWithProgress[] = newFiles.map((file) => ({
			file,
			id: Math.random().toString(36).substring(2, 15),
			progress: 0,
			uploaded: false,
		}));
		setFiles((prev) => [...prev, ...filesWithProgress]);
	};

	const handleRemoveFile = (id: string) => {
		setFiles((prev) => prev.filter((file) => file.id !== id));
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<div className="flex items-center justify-between p-4 border-b">
				<h2 className="text-lg font-semibold">Upload files</h2>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setFiles([])}
					className="h-8 w-8"
				>
					<X size={18} />
				</Button>
			</div>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
			>
				<TabsList className="w-full grid grid-cols-3">
					<TabsTrigger value="drive">Drive</TabsTrigger>
					<TabsTrigger value="device">Your device</TabsTrigger>
					<TabsTrigger value="link">Embed link</TabsTrigger>
				</TabsList>

				<TabsContent value="device">
					<CardContent className="p-4">
						<UploadZone
							onFilesDrop={handleFiles}
							maxSize={maxSize}
							accept={accept}
							multiple={multiple}
							disabled={uploading}
						/>

						{files.length > 0 && (
							<div className="mt-4 space-y-2">
								{files.map((file) => (
									<FileItem
										key={file.id}
										file={file}
										onRemove={handleRemoveFile}
									/>
								))}
							</div>
						)}

						<div className="flex justify-end gap-2 mt-4">
							<Button
								variant="outline"
								onClick={() => setFiles([])}
							>
								Cancel
							</Button>
							<Button
								onClick={async () => {
									if (files.length === 0 || uploading) return;

									setUploading(true);

									// Upload files sequentially with progress
									for (const file of files) {
										if (file.uploaded) continue;

										try {
											// Simulate upload progress
											const steps = 20;
											for (let i = 1; i <= steps; i++) {
												await new Promise((resolve) =>
													setTimeout(resolve, 150)
												);
												const progress = Math.min(100, (i / steps) * 100);
												setFiles((prev) =>
													prev.map((f) =>
														f.id === file.id ? { ...f, progress } : f
													)
												);
											}

											// Mark as uploaded
											setFiles((prev) =>
												prev.map((f) =>
													f.id === file.id ? { ...f, uploaded: true } : f
												)
											);
										} catch (error) {
											setFiles((prev) =>
												prev.map((f) =>
													f.id === file.id
														? { ...f, error: 'Upload failed' }
														: f
												)
											);
										}
									}

									setUploading(false);
								}}
								disabled={uploading || files.length === 0}
								className="bg-primary dark:bg-zinc-200 dark:hover:bg-zinc-100/80 dark:text-zinc-900 text-white hover:bg-zinc-900/80"
							>
								{uploading ? 'Uploading...' : 'Upload'}
							</Button>
						</div>
					</CardContent>
				</TabsContent>

				<TabsContent value="drive">
					<CardContent className="p-4 flex flex-col items-center justify-center h-[200px]">
						<div className="text-center text-muted-foreground">
							<p className="mb-4">Drive integration placeholder</p>
							<Button
								variant="outline"
								disabled
							>
								Connect to Drive
							</Button>
						</div>
					</CardContent>
				</TabsContent>

				<TabsContent value="link">
					<CardContent className="p-4">
						<div className="space-y-4">
							<div>
								<Label htmlFor="link-url">Enter URL</Label>
								<Input
									id="link-url"
									type="url"
									value={linkUrl}
									onChange={(e) => setLinkUrl(e.target.value)}
									placeholder="https://example.com/file.pdf"
									className="mt-1"
									disabled
								/>
							</div>
							<Button
								disabled
								className="w-full bg-zinc-800 dark:bg-zinc-500 "
							>
								<LinkIcon className="h-4 w-4 mr-2" />
								Add Link (Disabled)
							</Button>
						</div>
					</CardContent>
				</TabsContent>
			</Tabs>
		</Card>
	);
}

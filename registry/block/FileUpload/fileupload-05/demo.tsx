'use client';

import { useState } from 'react';
import FileUpload05 from './fileupload';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function Demo05() {
	const [files, setFiles] = useState<File[]>([]);

	const handleFileUpload = (files: File[]) => {
		setFiles(files);
		console.log('Files uploaded:', files);
	};

	const handleFileRemove = (file: File) => {
		console.log('File removed:', file);
	};

	return (
		<div className="w-full max-w-4xl mx-auto p-4">
			<Card className="shadow-md border-muted/40">
				<CardHeader>
					<CardTitle>File Upload</CardTitle>
					<CardDescription>
						Upload files by dragging & dropping or selecting them from your
						device
					</CardDescription>
				</CardHeader>
				<CardContent>
					<FileUpload05
						onChange={handleFileUpload}
						onRemove={handleFileRemove}
						value={files}
						maxFiles={5}
						maxSize={5 * 1024 * 1024} // 5MB
						className="w-full"
						dropzoneClassName="bg-muted/20 hover:bg-muted/30"
						fileCardClassName="bg-card hover:bg-card/90"
					/>
				</CardContent>
			</Card>
		</div>
	);
}

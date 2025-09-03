'use client';

import type React from 'react';

import { useState } from 'react';
import FileUpload06 from './fileupload';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function Demo06() {
	const [files, setFiles] = useState<File[]>([]);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
			<Card className="w-full max-w-2xl">
				<CardHeader>
					<CardTitle>File Upload</CardTitle>
					<CardDescription>
						Upload images and other files. Images will show previews, other
						files will display appropriate icons.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<FileUpload06
						onChange={setFiles}
						maxFiles={5}
						accept="image/*,application/pdf,text/*,audio/*,video/*"
						maxSize={10} // 10MB
					/>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline">Cancel</Button>
					<Button
						type="submit"
						className="bg-zinc-900 hover:bg-zinc-900/90	 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:bg-zinc-50/80 hover:shadow-md "
						disabled={files.length === 0}
					>
						Upload {files.length > 0 && `(${files.length})`}
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
}

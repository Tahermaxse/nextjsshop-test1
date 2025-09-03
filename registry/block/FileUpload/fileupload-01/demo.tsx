'use client';
import { FileUpload } from './fileupload';

export default function Demo() {
	return (
		<div className="max-w-3xl w-full px-4">
			<FileUpload
				multiple
				accept="image/*,.pdf,.doc,.docx"
				maxFiles={5}
				maxSize={5 * 1024 * 1024} // 5MB
				onFilesChange={(files) => console.log('Selected files:', files)}
			/>
		</div>
	);
}

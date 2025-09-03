import Dropdown06 from './dropdown';

export default function Demo06() {
	return (
		<div className="max-w-md w-full bg-zinc-50 dark:bg-zinc-950/90 shadow-md rounded-md p-6">
			<h3 className="text-zinc-700 dark:text-zinc-50 mb-4">
				Search the history
			</h3>
			<div className="w-full flex justify-center">
				<Dropdown06 placeholder="Search..." />
			</div>{' '}
		</div>
	);
}

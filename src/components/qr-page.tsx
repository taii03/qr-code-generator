import { LogoIcon } from './logo-icon';

interface Props {
	qrCodeURL: string;
}

export const QRPage = ({ qrCodeURL }: Props) => {
	const handleShare = async () => {
		const data = await fetch(qrCodeURL);
		const blob = await data.blob();
		await navigator.clipboard.write([
			new ClipboardItem({
				[blob.type]: blob,
			}),
		]);
	};

	return (
		<main class="flex w-full max-w-2xl flex-col justify-center gap-y-20">
			<a href="/" class="absolute left-16 top-8">
				<LogoIcon className="h-8" />
			</a>
			<div class="relative flex items-center justify-center">
				<div class="absolute -z-10 h-80 w-80 rounded-full bg-secondary" />
				<img src={qrCodeURL} class="rounded-3xl" alt="QR Code" />
			</div>
			<div class="flex items-center justify-center gap-x-6">
				<a
					href={qrCodeURL}
					download="qr-code.png"
					class="rounded-xl bg-primary px-12 py-4 text-center text-white transition hover:bg-primary/80 active:scale-105"
				>
					Download
				</a>
				<button
					onClick={handleShare}
					class="rounded-xl bg-primary px-12 py-4 text-center text-white transition hover:bg-primary/80 active:scale-105"
				>
					Share
				</button>
			</div>
		</main>
	);
};

import qrcode from 'qrcode';
import { useState, type StateUpdater } from 'preact/hooks';
import type { JSXInternal } from 'node_modules/preact/src/jsx';

import { LogoIcon } from '@/components/logo-icon';

interface Props {
	setQRCodeURL: StateUpdater<string | undefined>;
}

export const FormPage = ({ setQRCodeURL }: Props) => {
	const [url, setURL] = useState<string | undefined>(undefined);
	const [isInvalidURL, setIsInvalidURL] = useState(false);

	const handleSubmit: JSXInternal.GenericEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		if (isInvalidURL === true || url === undefined) {
			return;
		}

		try {
			const urlObj = new URL(url);

			const qr = await qrcode.toDataURL(urlObj.href, {
				errorCorrectionLevel: 'H',
				width: 256,
				color: {
					dark: '#111729',
					light: '#ffffff',
				},
			});

			setQRCodeURL(qr);
			setURL(undefined);
		} catch (error) {
			setIsInvalidURL(true);
		}
	};

	const handleInput: JSXInternal.GenericEventHandler<HTMLInputElement> = (event) => {
		setURL(event.currentTarget.value);

		if (isInvalidURL === true) {
			setIsInvalidURL(false);
		}
	};

	return (
		<main class="w-full max-w-2xl space-y-8">
			<div class="flex w-full justify-center">
				<LogoIcon className="h-12" />
			</div>
			<form onSubmit={handleSubmit}>
				<div class="relative">
					<label htmlFor="url">
						<input
							id="url"
							type="text"
							value={url}
							onInput={handleInput}
							placeholder="Enter an url"
							class={`w-full rounded-3xl border-2 bg-dark-0 px-8 py-[22px] text-sm outline-none
                    transition-colors placeholder:font-semibold placeholder:text-dark-2
                    ${
						isInvalidURL
							? 'border-red-500 hover:border-red-500/80 focus:border-red-500/80'
							: 'border-primary hover:border-primary/80 focus:border-primary/80'
					}
                `}
						/>
					</label>
					<button
						type="submit"
						disabled={isInvalidURL}
						class={`absolute inset-y-0 end-0 m-2 rounded-2xl
                px-12 text-center text-white transition-colors
                ${
					isInvalidURL
						? 'cursor-not-allowed bg-red-500 opacity-50 hover:bg-red-500/80 focus:bg-red-500/80'
						: 'cursor-pointer bg-primary opacity-100 hover:bg-primary/80 focus:bg-primary/80'
				}
            `}
					>
						QR Code
					</button>
				</div>
			</form>
		</main>
	);
};

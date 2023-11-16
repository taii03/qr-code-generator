import { useState } from 'preact/hooks';

import { QRPage } from '@/components/qr-page';
import { FormPage } from '@/components/form-page';

export const QRCodeGenerator = () => {
	const [qrCodeURL, setQRCodeURL] = useState<string | undefined>(undefined);
	return qrCodeURL === undefined ? <FormPage setQRCodeURL={setQRCodeURL} /> : <QRPage qrCodeURL={qrCodeURL} />;
};

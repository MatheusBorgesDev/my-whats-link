import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@/components/ui/tooltip';
import { Clipboard, Check } from 'lucide-react';

function App() {
	const [phone, setPhone] = useState('');
	const [message, setMessage] = useState('');
	const [generatedLink, setGeneratedLink] = useState('');
	const [copied, setCopied] = useState(false);

	const formatPhoneNumber = (value: string) => {
		const cleaned = value.replace(/\D/g, '');

		if (cleaned.length <= 2) {
			return `(${cleaned}`;
		}

		if (cleaned.length <= 6) {
			return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
		}
		if (cleaned.length <= 10) {
			return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
		}
		if (cleaned.length <= 11) {
			return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
		}
		return value;
	};

	const handlePhoneChange = (e: { target: { value: string } }) => {
		const formattedPhone = formatPhoneNumber(e.target.value);
		setPhone(formattedPhone);
	};

	const generateLink = () => {
		if (!phone) return;
		const cleanedPhone = phone.replace(/\D/g, '');
		const encodedMessage = encodeURIComponent(message);
		setGeneratedLink(
			`https://wa.me/${cleanedPhone}${message ? `?text=${encodedMessage}` : ''}`,
		);
		setCopied(false);
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(generatedLink);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<main className="h-screen flex items-center justify-center bg-[url(./assets/background.jpg)] font-rubik relative z-0 text-center">
			<div className="bg-black/50 absolute inset-0 z-10" />
			<div className="z-20 mx-8">
				<Card className="w-full p-6 space-y-2 ">
					<h2 className="font-bold text-4xl bg-gradient-to-b from-primary to-green-500 bg-clip-text text-transparent">
						My Whats Link
					</h2>
					<div className="space-y-2">
						<h1 className="text-xl font-semibold text-primary">
							Gerador de Link do WhatsApp
						</h1>

						<p>
							Gere links com mensagens personalizadas para o WhatsApp de forma
							fácil e rápida!
						</p>
					</div>

					<div className="space-y-3">
						<Input
							placeholder="Número do WhatsApp (com DDD)"
							value={phone}
							onChange={handlePhoneChange}
						/>
						<Input
							placeholder="Mensagem (opcional)"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</div>

					<Button onClick={generateLink}>Gerar Link</Button>

					<CardContent className="flex flex-col items-center gap-2">
						<p className="text-sm text-muted-foreground">Seu link:</p>
						<div className="flex items-center gap-2 p-2 border rounded-lg">
							<span className="text-sm text-primary ">
								{generatedLink
									? generatedLink
									: 'Preencha os campos acima e gere seu link'}
							</span>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										disabled={!generatedLink}
										size="icon"
										onClick={copyToClipboard}
									>
										{copied ? (
											<Check className="text-green-500" />
										) : (
											<Clipboard />
										)}
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									{copied ? 'Copiado!' : 'Copiar link'}
								</TooltipContent>
							</Tooltip>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}

export default App;

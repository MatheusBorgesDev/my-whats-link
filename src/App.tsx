import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@/components/ui/tooltip';
import {
	Clipboard,
	Check,
	SignalHigh,
	BatteryFull,
	User,
	EllipsisVertical,
	Video,
	Phone,
	Laugh,
	Paperclip,
	Camera,
	Mic,
	CheckCheckIcon,
} from 'lucide-react';

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
			<div className="z-20 mx-8 flex gap-4">
				<Card className="p-6 space-y-2 ">
					<h2 className="font-bold text-5xl bg-gradient-to-b from-primary to-green-500 bg-clip-text text-transparent">
						My Whats Link
					</h2>
					<div className="space-y-2">
						<h1 className="text-3xl font-semibold text-primary">
							Gerador de Link do WhatsApp
						</h1>

						<p className="text-lg font-medium">
							Crie links com mensagens personalizadas para o WhatsApp de forma
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

				<div className="hidden md:flex md:flex-col md:justify-between max-w-76 w-76 min-w-76 min-h-[36rem] border-7 border-black border-t-14 border-b-14 rounded-2xl bg-[url(./assets/background.jpg)] bg-cover relative">
					<div className="bg-black">
						<div className="flex justify-between text-[11px] bg-background px-2 pt-1 rounded-t-lg">
							<span>16:40</span>

							<div className="w-3 h-3 bg-black rounded-full absolute top-2 left-34" />

							<div className="flex gap-1">
								<SignalHigh size={15} />
								<BatteryFull size={15} />
								<span>100%</span>
							</div>
						</div>

						<div className="bg-background w-full p-2 flex items-center justify-between shadow-xs">
							<div className="flex gap-1 items-center ">
								<div className="rounded-full bg-gray-200 w-6">
									<User className="text-white" />
								</div>
								<span className="text-[11px]">{phone}</span>
							</div>

							<div className="flex gap-3">
								<Video size={15} />
								<Phone size={13} />
								<EllipsisVertical size={15} />
							</div>
						</div>
					</div>

					<div className="flex-1 mt-2">
						<span className="bg-gray-100 px-2 py-1 rounded-2xl text-xs shadow">
							Hoje
						</span>
						<div className="flex justify-end mt-6 mr-4 pl-4 ">
							{message ? (
								<div className="bg-green-200 rounded-2xl p-4 w-fit text-xs shadow relative ">
									<span className="mr-10">{message}</span>
									<div className="flex items-center gap-0.5 bottom-0 right-0 p-2 absolute">
										<span className="text-[0.6rem]">16:40</span>
										<CheckCheckIcon size={14} />
									</div>
								</div>
							) : (
								''
							)}
						</div>
					</div>

					<div className="flex m-2 gap-2">
						<div className="flex-1 flex items-center gap-2 justify-between bg-background rounded-full p-2 shadow ">
							<div className="flex items-center gap-2">
								<Laugh size={15} />
								<span className="text-sm">|Message</span>
							</div>
							<div className="flex items-center gap-2 ">
								<Paperclip size={15} />
								<Camera size={15} />
							</div>
						</div>

						<div className="bg-primary px-2.5 text-white flex items-center justify-center rounded-full shadow ">
							<Mic size={17} />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default App;

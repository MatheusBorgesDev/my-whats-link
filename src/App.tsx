import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { format, toZonedTime } from 'date-fns-tz';

import { Clipboard, Check } from 'lucide-react';

import emojiClown from './assets/clown.png';
import emojiMuted from './assets/muted.png';
import emojiHappy from './assets/happy.png';
import emojiInLove from './assets/in-love.png';
import emojiThinking from './assets/thinking.png';
import emojiStarFace from './assets/star-face.png';

import { Input } from '@/components/ui/input';
import { Label } from './components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SmartPhonePreview } from './components/ui/smart-phone-preview';
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@/components/ui/tooltip';

const formSchema = z.object({
	phone: z
		.string()
		.transform((value) => value.replace(/\D/g, ''))
		.refine((value) => value.length >= 10 && value.length <= 11, {
			message: 'O número deve ter entre 10 e 11 dígitos',
		}),
	message: z
		.string()
		.max(200, 'A mensagem deve ter no máximo 200 caracteres')
		.optional(),
});

type FormData = z.infer<typeof formSchema>;

function formatPhoneNumber(value: string) {
	const cleaned = value.replace(/\D/g, '');

	if (cleaned.length <= 2) {
		return `${cleaned}`;
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
}

function App() {
	const [generatedLink, setGeneratedLink] = useState('');
	const [copied, setCopied] = useState(false);
	const [currentTime, setCurrentTime] = useState(new Date());

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date());
		}, 60000);

		return () => clearInterval(interval);
	}, []);

	function onSubmit(data: FormData) {
		const cleanedPhone = data.phone.replace(/\D/g, '');
		const encodedMessage = encodeURIComponent(data.message || '');
		setGeneratedLink(
			`https://wa.me/${cleanedPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`,
		);
		setCopied(false);
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(generatedLink);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	const brazilTime = toZonedTime(currentTime, 'America/Sao_Paulo');
	const formattedTime = format(brazilTime, 'HH:mm');

	const phoneValue = watch('phone');

	useEffect(() => {
		if (phoneValue) {
			const formattedPhone = formatPhoneNumber(phoneValue);
			setValue('phone', formattedPhone);
		}
	}, [phoneValue, setValue]);

	return (
		<main className="h-screen flex items-center justify-center bg-[url(./assets/background.jpg)] font-rubik relative z-0 text-center">
			<div className="bg-black/50 absolute inset-0 z-10" />
			<div className="z-20 mx-8 flex gap-4">
				<Card className="p-6 space-y-2 relative">
					<img
						src={emojiInLove}
						alt=""
						className="w-40 absolute -top-35 right-5 rotate-12 -z-10"
					/>

					<img
						src={emojiHappy}
						alt=""
						className="w-36 absolute top-40 -left-30 -rotate-12 -z-10"
					/>

					<img
						src={emojiStarFace}
						alt=""
						className="w-30 absolute -bottom-28 left-[calc(50%-60px)]"
					/>

					<div className="flex gap-4 items-center justify-center">
						<img src={emojiThinking} alt="" className="w-10" />
						<p className="text-lg font-medium">
							Como gerar um link para o meu WhatsApp?
						</p>
					</div>

					<div>
						<h2 className="font-bold text-5xl bg-gradient-to-t from-primary to-green-500 bg-clip-text text-transparent">
							My Whats Link
						</h2>
						<h1 className="text-2xl font-semibold text-primary">
							Gerador de Link do WhatsApp
						</h1>
					</div>

					<p className="text-lg font-medium">
						Crie links com mensagens personalizadas para o seu WhatsApp de forma
						fácil e rápida!
					</p>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div className="flex flex-col gap-1">
							<Label htmlFor="whatsapp-number" className="gap-1">
								Digite o número de WhatsApp com DDD
							</Label>
							<Input
								id="whatsapp-number"
								placeholder="(11) 99999-9999"
								className={`${errors.phone && 'focus-visible:border-red-500 focus-visible:ring-red-500/50'}`}
								{...register('phone')}
							/>
							{errors.phone && (
								<div className="text-sm text-red-500 flex items-center gap-2 justify-center">
									{errors.phone.message}
									<img src={emojiClown} alt="" className="w-6" />
								</div>
							)}
						</div>

						<div className="flex flex-col gap-1">
							<Label htmlFor="whatsapp-number" className="gap-1">
								Digite uma mensagem personalizada
								<span className="font-normal">(opcional)</span>
							</Label>
							<Input
								placeholder="Olá! Tudo bem?"
								className={`${errors.message && 'focus-visible:border-red-500 focus-visible:ring-red-500/50'}`}
								{...register('message')}
							/>
							{errors.message && (
								<div className="text-sm text-red-500 flex items-center gap-2 justify-center">
									{errors.message.message}
									<img src={emojiMuted} alt="" className="w-6" />
								</div>
							)}
						</div>

						<Button type="submit">Gerar Link</Button>
					</form>

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

				<SmartPhonePreview formattedTime={formattedTime} watch={watch} />
			</div>
		</main>
	);
}

export default App;

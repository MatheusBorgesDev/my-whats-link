import type { UseFormWatch } from 'react-hook-form';

import {
	BatteryFull,
	Camera,
	CheckCheckIcon,
	EllipsisVertical,
	Laugh,
	Mic,
	Paperclip,
	Phone,
	SignalHigh,
	User,
	Video,
} from 'lucide-react';

interface SmartPhonePreviewProps {
	formattedTime: string;
	watch: UseFormWatch<{
		phone: string;
		message?: string | undefined;
	}>;
}

export function SmartPhonePreview({
	formattedTime,
	watch,
}: SmartPhonePreviewProps) {
	return (
		<div className="hidden md:flex md:flex-col md:justify-between max-w-76 w-76 min-w-76 min-h-[36rem] border-7 border-black border-t-14 border-b-14 rounded-2xl bg-[url(./assets/background.jpg)] bg-cover z-0 relative ">
			<div className="bg-black overflow-hidden">
				<div className="flex justify-between text-[11px] bg-background px-2 pt-1 rounded-t-lg">
					<span>{formattedTime}</span>

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
						<span className="text-[11px]">{watch('phone')}</span>
					</div>

					<div className="flex gap-3">
						<Video size={15} />
						<Phone size={13} />
						<EllipsisVertical size={15} />
					</div>
				</div>
			</div>

			<div className="flex-1 mt-2">
				<span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-2xl text-xs shadow">
					Hoje
				</span>
				<div className="flex justify-end mt-6 mr-4 ">
					{watch('message') ? (
						<div className="bg-green-200 rounded-2xl p-4 w-fit text-xs shadow relative ">
							<span className="mr-10">{watch('message')}</span>
							<div className="flex items-center gap-0.5 bottom-0 right-0 p-2 absolute">
								<span className="text-[0.6rem]">{formattedTime}</span>
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
	);
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Toaster } from '@/components/ui/sonner';

const rootElement = document.getElementById('root');
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<App />
			<Toaster />
		</StrictMode>,
	);
} else {
	console.error('Root element not found');
}

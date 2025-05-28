// Internal state
let prefix = '';
let showTimestamp = false;
let isWebLogging = false;

// Timestamp helper
const getTimestamp = (): string => {
	return new Date().toISOString();
};

// Node-style (terminal) logger
const nodeLog = (color: string, label: string, ...message: any[]) => {
	const tag = `[${label.toUpperCase()}]`;
	const time = showTimestamp ? `[${getTimestamp()}] ` : '';
	const msg = `${time}${prefix}${tag}: ${message.join(' ')}`;
	console.log(`${color}${msg}\x1b[0m`);
};

// Web-style (browser) logger
const browserLog = (color: string, label: string, ...message: any[]) => {
	const tag = `[${label.toUpperCase()}]`;
	const time = showTimestamp ? `[${getTimestamp()}] ` : '';
	const style = `color: ${color}; font-weight: bold`;
	const fullMessage = `${time}${prefix}${message.join(' ')}`;

	// Apply the same style to both tag and message
	console.log(`%c${tag} %c${fullMessage}`, style, style);
};

// Selects appropriate log method
const log = (color: string, label: string, ...message: any[]) => {
	if (isWebLogging) {
		browserLog(color, label, ...message);
	} else {
		nodeLog(color, label, ...message);
	}
};

export const logger = {
	success: (...args: any[]) => log('green', 'success', ...args),
	error: (...args: any[]) => log('red', 'error', ...args),
	warning: (...args: any[]) => log('orange', 'warning', ...args),
	info: (...args: any[]) => log('blue', 'info', ...args),
	debug: (...args: any[]) => log('purple', 'debug', ...args),
	fatal: (...args: any[]) => log('black', 'fatal', ...args),

	custom: (message: string, options?: { color?: string }) => {
		const color = options?.color ?? 'gray';
		const tagText = '[LOG]';
		const time = showTimestamp ? `[${getTimestamp()}] ` : '';
		const msg = `${time}${prefix}${message}`;

		if (isWebLogging) {
			const style = `color: ${color}; font-weight: bold`;
			// Apply style to both tag and message
			console.log(`%c${tagText} %c${msg}`, style, style);
		} else {
			const rgb = hexToRGB(color);
			const ansiColor = rgb ? `\x1b[38;2;${rgb}m` : '';
			console.log(`${ansiColor}${tagText} ${msg}\x1b[0m`);
		}
	}
};

// Helpers
const hexToRGB = (hex: string): string | null => {
	const c = hex.startsWith('#') ? hex.slice(1) : hex;
	if (!/^[0-9A-Fa-f]{6}$/.test(c)) return null;

	const r = parseInt(c.slice(0, 2), 16);
	const g = parseInt(c.slice(2, 4), 16);
	const b = parseInt(c.slice(4, 6), 16);
	return `${r};${g};${b}`;
};

// Configuration
export const setLoggerPrefix = (name: string) => {
	prefix = name ? `[${name}] ` : '';
};

export const enableTimestamp = (enabled: boolean) => {
	showTimestamp = enabled;
};

export const webLogging = (enabled: boolean) => {
	isWebLogging = enabled;
};

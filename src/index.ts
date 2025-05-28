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
	const tag = `%c[${label.toUpperCase()}]`;
	const time = showTimestamp ? `[${getTimestamp()}] ` : '';
	const style = `color: ${color}; font-weight: bold`;
	const msg = `${time}${prefix}${message.join(' ')}`;
	console.log(tag, style, msg);
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
		const tag = isWebLogging ? `%c[LOG]` : '[LOG]';
		const time = showTimestamp ? `[${getTimestamp()}] ` : '';
		const msg = `${time}${prefix}${message}`;

		if (isWebLogging) {
			console.log(tag, `color: ${color}; font-weight: bold`, msg);
		} else {
			console.log(`\x1b[38;2;${hexToRGB(color)}m${tag} ${msg}\x1b[0m`);
		}
	},
};

// Helpers
const hexToRGB = (hex: string) => {
	const c = hex.replace(/^#/, '');
	if (!/^[0-9A-Fa-f]{6}$/.test(c)) return '255;255;255';
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

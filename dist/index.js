// ANSI color codes (same as before)
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    purple: '\x1b[35m',
    white: '\x1b[37m',
};
// Internal state
let prefix = '';
let logToFile = false;
let logFilePath = 'logs.txt';
let showTimestamp = false;
// Timestamp helper
const getTimestamp = () => {
    return new Date().toISOString();
};
// Convert hex color to ANSI escape code
const hexToAnsi = (hex) => {
    const c = hex.startsWith('#') ? hex.slice(1) : hex;
    if (!/^[0-9A-Fa-f]{6}$/.test(c))
        return ''; // Invalid hex, return empty string
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    return `\x1b[38;2;${r};${g};${b}m`;
};
// Core log function
const log = (color, label, ...message) => {
    const tag = `[${label.toUpperCase()}]`;
    const time = showTimestamp ? `[${getTimestamp()}] ` : '';
    const msg = `${time}${prefix}${tag}: ${message.join(' ')}`;
    console.log(`${color}${msg}${colors.reset}`);
};
export const logger = {
    success: (...args) => log(colors.green, 'success', ...args),
    error: (...args) => log(colors.red, 'error', ...args),
    warning: (...args) => log(colors.yellow, 'warning', ...args),
    info: (...args) => log(colors.blue, 'info', ...args),
    debug: (...args) => log(colors.purple, 'debug', ...args),
    fatal: (...args) => log(colors.white, 'fatal', ...args),
    custom: (message, options) => {
        const colorCode = options?.color
            ? hexToAnsi(options.color)
            : colors.white;
        // fallback if invalid hex returns empty string
        const color = colorCode || colors.white;
        const time = showTimestamp ? `[${getTimestamp()}] ` : '';
        const tag = '[LOG]';
        const msg = `${time} ${prefix}${tag}: ${message}`;
        console.log(`${color}${msg}${colors.reset}`);
    },
};
// Configuration functions
export const setLoggerPrefix = (name) => {
    prefix = name ? `[${name}] ` : '';
};
export const enableFileLogging = (path = 'logs.txt') => {
    logToFile = true;
    logFilePath = path;
};
export const enableTimestamp = (enabled) => {
    showTimestamp = enabled;
};
//# sourceMappingURL=index.js.map
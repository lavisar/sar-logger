//* ANSI color codes
const ANSI_COLORS = {
    reset: '\x1b[0m', // #FFFFFF
    red: '\x1b[31m', // #FF0000
    green: '\x1b[32m', // #008000
    lime: '\x1b[32;1m', // #00FF00
    yellow: '\x1b[33m', // #FFFF00
    blue: '\x1b[34m', // #0000FF
    purple: '\x1b[35m', // #800080
    white: '\x1b[37m', // #FFFFFF
};
let prefix = '';
let showTime = false;
//* Timestamp helper
const getTimestamp = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};
//* Logger
const loggerConfig = (color, label, ...message) => {
    const tag = `[${label.toUpperCase()}]`;
    const time = showTime ? `[${getTimestamp()}] ` : '';
    const formattedMessage = message
        .map((m) => (typeof m === 'object' ? JSON.stringify(m, null, 2) : m))
        .join(' ');
    const msg = `${time}${prefix ? prefix : tag}: ${formattedMessage}`;
    console.log(`${color}${msg}${ANSI_COLORS.reset}`);
};
//* Selects appropriate log method
const log = (color, label, ...message) => {
    loggerConfig(color, label, ...message);
};
export const logger = {
    success: (...args) => log(ANSI_COLORS.green, 'success', ...args),
    error: (...args) => log(ANSI_COLORS.red, 'error', ...args),
    warning: (...args) => log(ANSI_COLORS.yellow, 'warning', ...args),
    info: (...args) => log(ANSI_COLORS.blue, 'info', ...args),
    debug: (...args) => log(ANSI_COLORS.purple, 'debug', ...args),
    fatal: (...args) => log(ANSI_COLORS.white, 'fatal', ...args),
    /**
     * @param options.color - Custom color in hex format (e.g., '#FF5733').
     */
    custom: (message, options) => {
        var _a;
        const color = (_a = options === null || options === void 0 ? void 0 : options.color) !== null && _a !== void 0 ? _a : 'gray';
        const defaultPrefix = '[LOG]';
        const time = showTime ? `[${getTimestamp()}] ` : '';
        const msg = `${time}${prefix ? prefix : defaultPrefix}: ${message}`;
        const rgb = hexToRGB(color);
        const ansiColor = rgb ? `\x1b[38;2;${rgb}m` : '';
        console.log(`${ansiColor}${msg}\x1b[0m`);
    },
};
//* Helpers
const hexToRGB = (hex) => {
    const c = hex.startsWith('#') ? hex.slice(1) : hex;
    if (!/^[0-9A-Fa-f]{6}$/.test(c))
        return null;
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    return `${r};${g};${b}`;
};
//* Configuration
export const setLoggerPrefix = (name) => {
    prefix = name ? `[${name}]` : '';
};
export const enableTime = (enabled) => {
    showTime = enabled;
};

// Internal state
let prefix = '';
let showTimestamp = false;
let isWebLogging = false;
// Timestamp helper
const getTimestamp = () => {
    return new Date().toISOString();
};
// Node-style (terminal) logger
const nodeLog = (color, label, ...message) => {
    const tag = `[${label.toUpperCase()}]`;
    const time = showTimestamp ? `[${getTimestamp()}] ` : '';
    const msg = `${time}${prefix}${tag}: ${message.join(' ')}`;
    console.log(`${color}${msg}\x1b[0m`);
};
// Web-style (browser) logger
const browserLog = (color, label, ...message) => {
    const tag = `[${label.toUpperCase()}]`;
    const time = showTimestamp ? `[${getTimestamp()}] ` : '';
    const style = `color: ${color}; font-weight: bold`;
    const fullMessage = `${time}${prefix}${tag}: ${message.join(' ')}`;
    // Use a single %c for the whole message
    console.log(`%c${fullMessage}`, style);
};
// Selects appropriate log method
const log = (color, label, ...message) => {
    if (isWebLogging) {
        browserLog(color, label, ...message);
    }
    else {
        nodeLog(color, label, ...message);
    }
};
export const logger = {
    success: (...args) => log('green', 'success', ...args),
    error: (...args) => log('red', 'error', ...args),
    warning: (...args) => log('orange', 'warning', ...args),
    info: (...args) => log('blue', 'info', ...args),
    debug: (...args) => log('purple', 'debug', ...args),
    fatal: (...args) => log('black', 'fatal', ...args),
    custom: (message, options) => {
        var _a;
        const color = (_a = options === null || options === void 0 ? void 0 : options.color) !== null && _a !== void 0 ? _a : 'gray';
        const tagText = '[LOG]';
        const time = showTimestamp ? `[${getTimestamp()}] ` : '';
        const msg = `${time}${prefix}${message}`;
        if (isWebLogging) {
            const style = `color: ${color}; font-weight: bold`;
            // Apply style to both tag and message
            console.log(`%c${tagText} ${msg}`, style);
        }
        else {
            const rgb = hexToRGB(color);
            const ansiColor = rgb ? `\x1b[38;2;${rgb}m` : '';
            console.log(`${ansiColor}${tagText} ${msg}\x1b[0m`);
        }
    },
};
// Helpers
const hexToRGB = (hex) => {
    const c = hex.startsWith('#') ? hex.slice(1) : hex;
    if (!/^[0-9A-Fa-f]{6}$/.test(c))
        return null;
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    return `${r};${g};${b}`;
};
// Configuration
export const setLoggerPrefix = (name) => {
    prefix = name ? `[${name}] ` : '';
};
export const enableTimestamp = (enabled) => {
    showTimestamp = enabled;
};
export const webLogging = (enabled) => {
    isWebLogging = enabled;
};

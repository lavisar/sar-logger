# sar-logger

![npm](https://img.shields.io/npm/v/sar-logger)
![npm downloads](https://img.shields.io/npm/dt/sar-logger)
![install size](https://badgen.net/packagephobia/install/sar-logger)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/lavisar/sar-logger)

A lightweight TypeScript logger that adds colorful, time, and prefixed messages to your Node.js and web console.

---

## ✨ Features

- 🎨 Color-coded log levels
- ⏱ Auto-time output
- 🏷 Optional log prefix (e.g. `[API]`)
- 📁 Optional file logging (coming soon)
- 🪶 Lightweight — no external dependencies

---

## 📦 Install

Install via npm or yarn:

```bash
npm install sar-logger
```
or
```bash
yarn add sar-logger
```
## 🚀 Usage

```ts
import { logger, setLoggerPrefix } from 'sar-logger';

// Set a custom label prefix
setLoggerPrefix('SERVER');

// Show timestamp
enableTime(true)

// Log examples
logger.success('Server started successfully!');
logger.info('Listening on port 3000');
logger.warning('Memory usage is high');
logger.error('Failed to connect to database');
logger.debug('Debugging request:', { id: 42 });
logger.fatal('Unexpected shutdown occurred.');
// Custom color
logger.custom('Custom color', { color: '#FF5733' });

```
## 🖨 Sample Output
- Web Output:
![alt text](https://xgjzloifyvgpbmyonaya.supabase.co/storage/v1/object/public/files/Flb7lZ8XWE/original)
- Terminal Output:
![alt text](https://xgjzloifyvgpbmyonaya.supabase.co/storage/v1/object/public/files/uUp5brViwS/original)
- Show time Output:
![alt text](https://xgjzloifyvgpbmyonaya.supabase.co/storage/v1/object/public/files/Ml59dQewR1/original)


- File Output (log.txt): (coming soon)

## ⚙️ API
Set a global prefix (like [API] or [DB]).
```ts
setLoggerPrefix(name: string)
```
Show time in log [HH:MM:SS]
```ts
enableTime(enabled: boolean)
```

## 📜 License
MIT © 2025 lavisar <br/>
Feel free to contribute!


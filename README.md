# sar-logger

![npm](https://img.shields.io/npm/v/sar-logger)
![npm downloads](https://img.shields.io/npm/dt/sar-logger)
![install size](https://badgen.net/packagephobia/install/sar-logger)
![types](https://badgen.net/npm/types/sar-logger)

A lightweight TypeScript logger that adds colorful, timestamped, and prefixed messages to your Node.js console. Perfect for debugging and clean CLI output!

---

## ✨ Features

- 🎨 Color-coded log levels
- ⏱ Auto-timestamped output
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
import { logger, setLoggerPrefix, enableFileLogging,webLogging } from 'sar-logger';

// Set a custom label prefix
setLoggerPrefix('SERVER');

// Show timestamp
enableTimestamp(true)

// Log in web console
webLogging(true) // <- colorful log in web console

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
![alt text](https://xgjzloifyvgpbmyonaya.supabase.co/storage/v1/object/public/files/-YMZuA4wIH/original)
- Colorful Output:
![alt text](https://xgjzloifyvgpbmyonaya.supabase.co/storage/v1/object/public/files/Qt5B9gpNwC/original)
- Custom Color Output:
![alt text](https://xgjzloifyvgpbmyonaya.supabase.co/storage/v1/object/public/files/25Ag39GeKd/original)
- Timestamp Output:
![alt text](https://xgjzloifyvgpbmyonaya.supabase.co/storage/v1/object/public/files/PBuCoKfZeF/original)


- File Output (log.txt): (coming soon)

## ⚙️ API
```ts
setLoggerPrefix(name: string)
```
Set a global prefix (like [API] or [DB]).


## 📜 License
MIT © 2025 lavisar
Feel free to contribute!


# Browser UI Recorder

A Node.js/TypeScript application for recording browser interactions using the [Stagehand](https://www.npmjs.com/package/@browserbasehq/stagehand) library. This tool launches a local Chrome browser, records user events (clicks, inputs, changes, etc.), filters and saves them for later analysis or automation.

## Features

- Launches a local Chrome browser for interaction recording.
- Captures detailed DOM events (type, tag, id, value, etc.).
- Filters redundant input/change events for cleaner output.
- Simple web UI to start and finish recording.
- Saves recorded events to a file for further processing.

## Project Structure

```
.
├── eventCleaner.ts      # Filters and deduplicates recorded events
├── package.json         # Project dependencies and scripts
├── pnpm-lock.yaml       # Lockfile for pnpm
├── README.md            # Project documentation
├── recorder.ts          # Main server and recording logic
├── tsconfig.json        # TypeScript configuration
└── public/
    └── index.html       # Web UI for controlling the recorder
```

## Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- Google Chrome installed (used for recording)

## Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd Browser_recorder
   ```

2. **Install dependencies:**
   ```sh
   pnpm install
   ```
   Or use `npm install` if you prefer.

## Usage

1. **Start the server:**
   ```sh
   pnpm start
   ```
   This runs `ts-node recorder.ts` and starts the Express server on port 3030.

2. **Open the UI:**
   - Go to [http://localhost:3030](http://localhost:3030) in your browser.

3. **Record interactions:**
   - Click "Open Browser" to launch a Chrome window.
   - Interact with the browser as needed.
   - Click "Finish & Save" (or press Enter) to close the browser and save the events.

4. **Output:**
   - The recorded and filtered events are saved to a file (see `recorder.ts` for the output path).

## Main Files

- **recorder.ts**: Sets up the Express server, integrates Stagehand, exposes endpoints to start/finish recording, and manages event collection.
- **eventCleaner.ts**: Contains logic to filter and deduplicate input/change events for a cleaner event log.
- **public/index.html**: Simple UI to control the recording process.
- **package.json**: Lists dependencies (`@browserbasehq/stagehand`, `express`, TypeScript, etc.).

## Customization

- **Browser Profile**: The Chrome user data directory is set in `recorder.ts`. Change the `userDataDir` path as needed.
- **Event Filtering**: Adjust logic in `eventCleaner.ts` to change how events are filtered or deduplicated.
- **Port**: The server runs on port 3030 by default. Change the `PORT` variable in `recorder.ts` if needed.

## Dependencies

- [@browserbasehq/stagehand](https://www.npmjs.com/package/@browserbasehq/stagehand): For browser automation and event capture.
- [express](https://expressjs.com/): Web server for the UI and API.
- [TypeScript](https://www.typescriptlang.org/): Type-safe development.

## License

MIT
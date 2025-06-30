import express, { Request, Response } from "express";
import { Stagehand } from "@browserbasehq/stagehand";
import * as fs from "fs";
import { filterInputEvents } from "./eventCleaner"; // ✅ Your custom filter logic
// pnpm start
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3030;
app.use(express.static("public"));

let page: any;
let stagehand: any;
const recordedEvents: any[] = [];

app.post("/start", async (_: Request, res: Response) => {
  stagehand = new Stagehand({
    env: "LOCAL",
    localBrowserLaunchOptions: {
      headless: false,
      devtools: false,
      userDataDir: "C:\\Users\\Z360\\AppData\\Local\\Google\\Chrome\\User Data\\Default",
    }
  });

  await stagehand.init();
  page = stagehand.page;

  await page.exposeFunction("recordEvent", (event: any) => {
    recordedEvents.push({ ...event, time: Date.now() });
  });

  await page.addInitScript(() => {
    const handler = (event: any) => {
      const target = event.target as HTMLElement;
      const payload = {
        type: event.type,
        tag: target?.tagName || null,
        id: target?.id || null,
        name: (target as any)?.name || null,
        value: (target as HTMLInputElement)?.value || undefined,
        outerHTML: target?.outerHTML?.slice?.(0, 300),
      };
      // @ts-ignore
      window.recordEvent?.(payload);
    };
    ["click", "input", "change", "submit"].forEach(eventType => {
      window.addEventListener(eventType, handler, true);
    });
  });

  await page.goto("https://v0-complex-form-example.vercel.app/form/personal-info");
  console.log("✅ Browser started. Interact with it.");
  res.sendStatus(200);
});

app.post("/finish", async (_: Request, res: Response) => {
  const filename = `recorded-events-${Date.now()}.json`;

  // ✅ Clean the recorded events before saving
  const cleanedEvents = filterInputEvents(recordedEvents);
  fs.writeFileSync(filename, JSON.stringify(cleanedEvents, null, 2), "utf-8");
  console.log(`💾 Cleaned events saved to ${filename}`);

  if (stagehand?.close) {
    try {
      await stagehand.close();
      console.log("🛑 Browser closed successfully.");
    } catch (err) {
      console.error("❌ Error closing browser:", err);
    }
  }

  recordedEvents.length = 0;
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`🟢 Recorder UI: http://localhost:${PORT}`);
});

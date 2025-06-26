export function filterInputEvents(events: any[]): any[] {
  const filteredEvents: any[] = [];
  const lastInputIndex: Record<string, number> = {};

  for (const event of events) {
    const id = event.id;
    const type = event.type;

    if (type === "input" && id) {
      if (lastInputIndex[id] !== undefined) {
        filteredEvents[lastInputIndex[id]] = event;
      } else {
        lastInputIndex[id] = filteredEvents.push(event) - 1;
      }
    } else if (type === "change" && id) {
      let replaced = false;
      for (let i = filteredEvents.length - 1; i >= 0; i--) {
        if (filteredEvents[i].id === id && filteredEvents[i].type === "input") {
          filteredEvents[i] = event;
          replaced = true;
          break;
        }
      }
      if (!replaced) filteredEvents.push(event);
      delete lastInputIndex[id];
    } else {
      filteredEvents.push(event);
      if (id && lastInputIndex[id]) delete lastInputIndex[id];
    }
  }

  return filteredEvents.sort((a, b) => a.time - b.time);
}

// export const runtime = "nodejs"; // ensures streaming works on server

// export async function GET(request) {
//   const encoder = new TextEncoder();

//   const stream = new ReadableStream({
//     start(controller) {
//       controller.enqueue(encoder.encode(": connected\n\n"));
//       let id = 0;

//       const interval = setInterval(() => {
//         const payload = randomPayload(++id);
//         controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
//       }, 1000);

//       request.signal.addEventListener("abort", () => {
//         clearInterval(interval);
//         controller.close();
//       });
//     },
//   });

//   return new Response(stream, {
//     headers: {
//       "Content-Type": "text/event-stream",
//       "Cache-Control": "no-cache, no-transform",
//       Connection: "keep-alive",
//     },
//   });
// }

// function randomPayload(id) {
//   const now = new Date().toISOString();
//   return {
//     id,
//     timestamp: now,
//     temperature: (15 + Math.random() * 20).toFixed(2),
//     pressure: (980 + Math.random() * 40).toFixed(2),
//     humidity: (20 + Math.random() * 80).toFixed(2),
//     altitude: (Math.random() * 2000).toFixed(2),
//     latitude: (12 + Math.random() * 0.1).toFixed(6),
//     longitude: (77 + Math.random() * 0.1).toFixed(6),
//     velocity: (Math.random() * 50).toFixed(3),
//   };
// }
// app/api/stream/route.js



///New Line 



// export const runtime = "nodejs"; // keep server runtime

// const STORE_KEY = "__mock_nodemcu_snapshot__";

// if (!globalThis[STORE_KEY]) {
//   // initial snapshot
//   globalThis[STORE_KEY] = {
//     data: createInitial(),
//     timer: setInterval(() => {
//       globalThis[STORE_KEY].data = updateSnapshot(globalThis[STORE_KEY].data);
//     }, 1000),
//   };
// }

// export async function GET() {
//   const snapshot = globalThis[STORE_KEY].data;
//   return new Response(JSON.stringify(snapshot), {
//     headers: { "Content-Type": "application/json" },
//   });
// }

// /* ---------- helpers ---------- */

// function createInitial() {
//   return {
//     id: 1,
//     timestamp: new Date().toISOString(),
//     temperature: 25.00,
//     pressure: 1005.00,
//     humidity: 45.00,
//     altitude: 100.00,
//     latitude: 12.934560,
//     longitude: 77.605120,
//     velocity: 2.50,
//   };
// }

// function updateSnapshot(prev) {
//   return {
//     ...prev,
//     id: prev.id, // keep same id if you want; change if you want increment
//     timestamp: new Date().toISOString(),
//     temperature: jitter(prev.temperature, 0.3, 15, 40),
//     pressure: jitter(prev.pressure, 0.6, 900, 1100),
//     humidity: jitter(prev.humidity, 0.5, 0, 100),
//     altitude: jitter(prev.altitude, 0.7, 0, 2000),
//     velocity: jitter(prev.velocity, 0.5, 0, 100),
//     // latitude/longitude left constant to mimic fixed device — remove if you want small drift
//     latitude: prev.latitude,
//     longitude: prev.longitude,
//   };
// }

// function jitter(value, delta, min = -Infinity, max = Infinity) {
//   const change = (Math.random() * 2 - 1) * delta;
//   let v = Number((value + change).toFixed(2));
//   if (v < min) v = min;
//   if (v > max) v = max;
//   return v;
// }


export const runtime = "nodejs";

export async function GET(request) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(": connected\n\n"));

      let data = createInitial();

      const interval = setInterval(() => {
        data = updateSnapshot(data);
        const jsonString = JSON.stringify(data);
        controller.enqueue(encoder.encode(`data: ${jsonString}\n\n`));
      }, 1000);

      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

function createInitial() {
  return {
    id: 1,
    temperature: 25,
    pressure: 1005,
    humidity: 45,
    altitude: 100,
    latitude: 12.93456,
    longitude: 77.60512,
    velocity: 2.5,
    timestamp: new Date().toISOString(),
  };
}

function updateSnapshot(d) {
  const jitter = (v, delta) => Number((v + (Math.random() * 2 - 1) * delta).toFixed(2));
  return {
    ...d,
    temperature: jitter(d.temperature, 0.2),
    pressure: jitter(d.pressure, 0.5),
    humidity: jitter(d.humidity, 0.3),
    altitude: jitter(d.altitude, 0.2),
    velocity: jitter(d.velocity, 0.2),
    timestamp: new Date().toISOString(),
  };
}

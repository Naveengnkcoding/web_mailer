// A simple page that connects to /api/stream and displays the latest JSON object
// Put this file at: pages/stream.js
"use client"
import { useEffect, useState } from 'react';

export default function StreamPage() {
  const [latest, setLatest] = useState(null);
  const [log, setLog] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const es = new EventSource('/api/stream');

    es.onopen = () => setConnected(true);

    es.onmessage = (e) => {
      try {
        const obj = JSON.parse(e.data);
        setLatest(obj);
        setLog((l) => [obj, ...l].slice(0, 200)); // keep last 200 entries
      } catch (err) {
        console.error('failed to parse', err, e.data);
      }
    };

    es.onerror = () => {
      setConnected(false);
      // keep EventSource open; it will try to reconnect automatically
    };

    return () => {
      es.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">JSON Stream — 7-parameter random data</h1>
          <p className="text-sm text-gray-600">Streaming from <code>/api/stream</code>. Connection: {connected ? '🟢' : '🔴'}</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-2xl shadow">
            <h2 className="font-medium mb-2">Latest values</h2>
            {latest ? (
              <ul className="space-y-1 text-sm">
                <li><strong>id:</strong> {latest.id}</li>
                <li><strong>timestamp:</strong> {latest.timestamp}</li>
                <li><strong>temperature (°C):</strong> {latest.temperature}</li>
                <li><strong>pressure (hPa):</strong> {latest.pressure}</li>
                <li><strong>humidity (%):</strong> {latest.humidity}</li>
                <li><strong>altitude (m):</strong> {latest.altitude}</li>
                <li><strong>latitude:</strong> {latest.latitude}</li>
                <li><strong>longitude:</strong> {latest.longitude}</li>
                <li><strong>velocity (m/s):</strong> {latest.velocity}</li>
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Waiting for data...</p>
            )}
          </div>

          <div className="p-4 bg-white rounded-2xl shadow">
            <h2 className="font-medium mb-2">Raw JSON stream (newest first)</h2>
            <div className="h-64 overflow-auto text-xs font-mono bg-gray-900 text-white p-2 rounded">
              {log.length === 0 && <div className="text-gray-400">No data yet</div>}
              {log.map((item) => (
                <pre key={item.id} className="break-words">{JSON.stringify(item)}</pre>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-6 text-sm text-gray-500">
          Tip: open <code>/api/stream</code> directly in a terminal (curl) to see the raw SSE stream.
        </footer>
      </div>
    </div>
  );
}

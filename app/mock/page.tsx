"use client";
import { useEffect, useState } from "react";

export default function StreamPage() {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const es = new EventSource("/api/stream");

    es.onopen = () => setConnected(true);

    es.onmessage = (e) => {
      try {
        const obj = JSON.parse(e.data);
        setData(obj); // replaces data each update
      } catch (err) {
        console.error("Parse error:", err);
      }
    };

    es.onerror = () => setConnected(false);

    return () => es.close();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-3">Live NodeMCU Mock Data</h1>
        <p>Status: {connected ? "🟢 Live" : "🔴 Disconnected"}</p>

        <section className="bg-white rounded-xl shadow p-4 mt-4">
          {data ? (
            <ul className="font-mono text-sm space-y-1">
              {Object.entries(data).map(([k, v]) => (
                <li key={k}>
                  <strong>{k}:</strong> {v}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Waiting for live data...</p>
          )}
        </section>
      </div>
    </main>
  );
}
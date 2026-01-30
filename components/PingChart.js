"use client";

import { useEffect, useState } from "react";
import Chart from "./Chart";

export default function PingChart() {
  const [dataPoints, setDataPoints] = useState({});

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/ping");
      const data = await res.json();

      setDataPoints((prev) => {
        const updated = { ...prev };
        for (const host in data) {
          if (data[host] != null) {
            updated[host] = [...(updated[host] || []), data[host]].slice(-20);
          }
        }
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: Array.from({ length: 20 }, (_, i) => i + 1),
    datasets: Object.keys(dataPoints).map((host, idx) => ({
      label: host,
      data: dataPoints[host],
      borderColor: ["red", "blue", "green"][idx % 3],
      backgroundColor: "transparent",
    })),
  };

  return (
    <div
      style={{
        width: "850px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "white" }}>
        🌐 Multi-Host Ping Visualizer
      </h2>
      <Chart chartData={chartData} />
    </div>
  );
}

"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Gradient background plugin for chart area
const gradientPlugin = {
  id: "customGradient",
  beforeDraw: (chart) => {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, "rgba(2,0,36,0.6)");   // deep blue top
    gradient.addColorStop(0.5, "rgba(9,9,121,0.6)"); // indigo middle
    gradient.addColorStop(1, "rgba(10,128,83,0.6)"); // green bottom

    ctx.save();
    ctx.fillStyle = gradient;
    ctx.fillRect(chartArea.left, chartArea.top, chartArea.width, chartArea.height);
    ctx.restore();
  },
};

// Register Chart.js modules + plugin
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  gradientPlugin
);

export default function Chart({ chartData }) {
  return (
    <div style={{ width: "850px", margin: "40px auto", height: "400px" }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: "Time (Ping Interval)",
                font: { size: 14, weight: "bold" },
                color: "#fff",
              },
              ticks: { color: "#fff" },
              grid: { color: "rgba(255,255,255,0.2)" },
            },
            y: {
              title: {
                display: true,
                text: "Latency (ms)",
                font: { size: 14, weight: "bold" },
                color: "#fff",
              },
              beginAtZero: true,
              ticks: { color: "#fff" },
              grid: { color: "rgba(255,255,255,0.2)" },
            },
          },
          plugins: {
            legend: {
              labels: { color: "#fff" },
            },
            title: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

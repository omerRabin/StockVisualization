import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import 'chart.js/auto' for module-style import

interface BasicGraphProps {
  labels: string[];
  datasetLabel: string;
  data: number[];
}

function BasicGraph(props: BasicGraphProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null); // Store the Chart instance

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstanceRef.current) {
          // If a Chart instance already exists, destroy it before creating a new one
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar', // Change this to your desired chart type (e.g., 'line', 'pie', etc.)
          data: {
            labels: props.labels,
            datasets: [
              {
                label: props.datasetLabel,
                data: props.data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Example color
                borderColor: 'rgba(75, 192, 192, 1)', // Example color
                borderWidth: 1,
              },
            ],
          },
        });
      }
    }
  }, [props.data, props.labels, props.datasetLabel]);

  return (
    <div>
      <canvas ref={chartRef} width={400} height={400}></canvas>
    </div>
  );
}

export default BasicGraph;

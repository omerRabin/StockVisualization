import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { BasicLineChartProps } from '../interfaces';

const BasicLineChart = (props: BasicLineChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstanceRef.current) {
          // If a Chart instance already exists, destroy it before creating a new one
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
          type: 'line', // Change this to 'line' for a line chart
          data: {
            labels: props.labels,
            datasets: [
              {
                label: props.datasetLabel,
                data: props.data,
                fill: false, // Set to true if you want to fill the area under the line
                borderColor: 'rgba(75, 192, 192, 1)', // Line color
                borderWidth: 1,
                backgroundColor: 'rgba(0, 256, 0, 0.2)', // Set data point background color
              },
            ],
          },
        });
      }
    }
  }, [props.data, props.labels, props.datasetLabel]);

  useEffect(() => {
    if (chartRef.current && props.canvasBackgroundColor) {
      chartRef.current.style.backgroundColor = props.canvasBackgroundColor;
    }
  }, [props.canvasBackgroundColor]);

  return (
    <div>
      <canvas ref={chartRef} width={400} height={400}></canvas>
    </div>
  );
};

export { BasicLineChart };

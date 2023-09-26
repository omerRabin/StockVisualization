import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { BasicLineChartProps } from '../types';

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
          options: {
            responsive: true,
            maintainAspectRatio: false,
            color: 'white',
            backgroundColor: 'black',
          },
          type: 'line', // Change this to 'line' for a line chart
          data: {
            labels: props.labels,
            datasets: [
              {
                label: props.datasetLabel,
                data: props.data,
                fill: false, // Set to true if you want to fill the area under the line
                borderColor: 'rgb(75, 192, 192)', // Line color
                borderWidth: 1,
                backgroundColor: 'rgb(75, 192, 192)', // Set data point background color
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
    <div style={{ height: '40vh' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export { BasicLineChart };

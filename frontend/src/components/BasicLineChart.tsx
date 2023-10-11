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
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
          options: {
            responsive: true,
            maintainAspectRatio: false,
            color: 'white',
            backgroundColor: 'black',
            scales: {
              x: {
                display: false,
              },
              y: {
                display: true,
              },
            },
            interaction: {
              intersect: false,
              mode: 'index',
            },
          },
          plugins: [
            {
              id: 'canvasPlugin',
              afterDraw: (chart) => {
                if (chart.tooltip?.getActiveElements().length) {
                  let x = chart.tooltip.getActiveElements()[0].element.x;
                  let yAxis = chart.scales.y;
                  let ctx = chart.ctx;
                  ctx.save();
                  ctx.beginPath();
                  ctx.moveTo(x, yAxis.top);
                  ctx.lineTo(x, yAxis.bottom);
                  ctx.lineWidth = 1;
                  ctx.strokeStyle = '#ff0000';
                  ctx.stroke();
                  ctx.restore();
                }
              },
            },
          ],
          type: 'line',
          data: {
            labels: props.labels,
            datasets: [
              {
                label: props.datasetLabel,
                data: props.data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
                backgroundColor: 'rgb(75, 192, 192)',
                pointRadius: 0,
                pointHoverRadius: 0,
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

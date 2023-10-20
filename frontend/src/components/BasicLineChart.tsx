import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { BasicLineChartProps } from '../types';
import { ActiveElement } from 'chart.js/dist/plugins/plugin.tooltip';
import { isPositiveTrend } from 'src/utils';

const CHART_BACKGROUND_COLOR = 'black';
const POSITIVE_COLOR = 'rgb(0, 128, 0)';
const NEGATIVE_COLOR = 'rgb(255, 0, 0)';
const GRID_COLOR = '#ffffff';

const getDatesFromLabels = (labels: string[]) => {
  return labels.map((utc) => {
    const date = new Date(Number(utc) * 1000).toString();
    const endIndex = date.indexOf('GMT');
    return date.substring(0, endIndex).trim();
  });
};

const BasicLineChart = ({ labels, data, datasetLabel, canvasBackgroundColor }: BasicLineChartProps) => {
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
            backgroundColor: CHART_BACKGROUND_COLOR,
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
                  const x = chart.tooltip.getActiveElements()[0].element.x;
                  const yAxis = chart.scales.y;
                  const ctx = chart.ctx;
                  ctx.save();
                  ctx.beginPath();
                  ctx.moveTo(x, yAxis.bottom);
                  ctx.lineTo(x, chart.tooltip.getActiveElements()[0].element.y);
                  ctx.lineWidth = 1;
                  ctx.strokeStyle = GRID_COLOR;
                  ctx.setLineDash([5, 3]);
                  ctx.stroke();
                  ctx.restore();
                }
              },
            },
          ],
          type: 'line',
          data: {
            labels: getDatesFromLabels(labels),
            datasets: [
              {
                label: datasetLabel,
                data,
                fill: false,
                borderColor: () => {
                  return isPositiveTrend(data[0], data[data.length - 1]) ? POSITIVE_COLOR : NEGATIVE_COLOR;
                },
                borderWidth: 1,
                backgroundColor: 'white',
                pointRadius: 0,
                pointHoverRadius: 4,
              },
            ],
          },
        });
      }
    }
  }, [data, labels, datasetLabel]);

  useEffect(() => {
    if (chartRef.current && canvasBackgroundColor) {
      chartRef.current.style.backgroundColor = canvasBackgroundColor;
    }
  }, [canvasBackgroundColor]);

  return (
    <div style={{ height: '40vh' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export { BasicLineChart };

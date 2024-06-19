import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
);

interface LineGraphProps {
    dataPoints: number[];
    borderColor: string;
    backgroundColor: string;
}

const LineGraph: React.FC<LineGraphProps> = ({ dataPoints, borderColor, backgroundColor }) => {
    const maxDataPoint = Math.max(...dataPoints);
    const yAxisMax = Math.ceil(maxDataPoint * 1.1 / 5000000) * 5000000;
    const data = {
        labels: ['OCT 23', 'APR 24', 'JUN 24'],
        datasets: [
            {
                data: dataPoints,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: yAxisMax,
                ticks: {
                    color: '#fe5f55',
                    font: {
                        size: 14,
                    },
                },
                grid: {
                    color: 'rgba(0, 0, 0, .3)',
                    lineWidth: 1,
                    drawTicks: true,
                    drawOnChartArea: true,
                    drawBorder: true,
                    tickMarkLength: 10,
                    offset: false,
                },
            },
            x: {
                ticks: {
                    color: '#fe5f55',
                    font: {
                        size: 14,
                    },
                },
                grid: {
                    color: 'rgba(0, 0, 0,  .3)',
                    lineWidth: 1,
                    drawTicks: true,
                    drawOnChartArea: true,
                    drawBorder: true,
                    tickMarkLength: 10,
                    offset: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="chart-wrapper">
            <Line data={data} options={options} />
        </div>
    );
};

export default LineGraph;

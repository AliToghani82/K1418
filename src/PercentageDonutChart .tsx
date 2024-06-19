import React, { useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    DoughnutController // Import DoughnutController
} from 'chart.js';

// Register the components you're going to use
ChartJS.register(
    DoughnutController, // Register DoughnutController for doughnut charts
    ArcElement,
    Tooltip,
    Legend
);

// Define an interface for the component props
interface PercentageDonutChartProps {
    percentage: number;
}


const PercentageDonutChart: React.FC<PercentageDonutChartProps> = ({ percentage }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    let rotPercent = percentage;
    if(rotPercent > 100) {
        rotPercent = 100;
    }
    useEffect(() => {
        if (chartRef.current) {
            const canvas = chartRef.current;
            const ctx = canvas?.getContext('2d');
            if (!ctx) {
                return; // Exit if the context is not available
            }
            const donutChart = new ChartJS(ctx, {
                type: 'doughnut', // Specify the chart type
                data: {
                    labels: ['Completed', 'Remaining'],
                    datasets: [{
                        data: [percentage, 100 - rotPercent],
                        backgroundColor: [
                            '#fe5f55', // Color for the "Completed" section
                            '#27272b'  // Color for the "Remaining" section
                        ],
                        borderColor: [
                            '#fe5f55',
                            '#27272b'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    circumference: 180, // Makes it a semicircle, remove this line for a full donut
                    rotation: -90,      // Adjust the starting angle
                    cutout: '80%',      // Adjust the donut thickness
                    plugins: {
                        legend: {
                            display: false // Set to true if you want to display the legend
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed !== undefined) {
                                        label += new Intl.NumberFormat('en-US', { style: 'percent' }).format(context.parsed / 100);
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                }
            });

            return () => {
                donutChart.destroy();
            };
        }
    }, [percentage]);

    return (
        <div className="chart-container" style={{ position: 'relative', maxWidth: '200px', maxHeight: '200px' }}>
            <canvas ref={chartRef}></canvas>
            <div className="percentage-text" style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '20px', color: 'white' }}>
                {Math.round(percentage)}%
            </div>
        </div>
    );
};

export default PercentageDonutChart;

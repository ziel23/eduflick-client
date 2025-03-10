import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

function DonutChart({ chartData }) {
    const totalQuestions = chartData.correct + chartData.incorrect; // Change this dynamically if needed
    // const percentage = ((chartData.correct / totalQuestions) * 100).toFixed(1) + "%";

    const data = {
        labels: ["Correct", "Incorrect"],
        datasets: [
            {
                labels: ["Correct", "Incorrect"],
                data: [chartData.correct, chartData.incorrect],
                backgroundColor: ["#3d3369", "#dfc206"],
                hoverBackgroundColor: ["#3d3369", "#dfc206"],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top", // Places labels beside the donut
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const dataset = tooltipItem.dataset;
                        const dataIndex = tooltipItem.dataIndex;
                        const value = dataset.data[dataIndex];
                        const percentage = ((value / totalQuestions) * 100).toFixed(1) + "%"

                        return `${dataset.labels[dataIndex]}: ${value} (${percentage})`;
                    },
                },
            },
            datalabels: {
                color: "#fff",
                font: {
                    weight: "bold",
                },
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    return percentage > 0 ? `${percentage}%` : "";
                },
                anchor: "center",
                align: "center",
            },
        },
        cutout: "40%", // Creates the donut effect
    };

    return (
        <div style={{ width: "300px", height: "300px" }}>
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default DonutChart;

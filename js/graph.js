//chart
// script.js
const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'bar', // Specify the type of chart
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'], // X-axis labels
        datasets: [{
            label: 'Sales Data', // Label for the dataset
            data: [12, 19, 3, 5, 2, 3], // Data points
            backgroundColor: ['#00659460'], // Bar colors
            borderColor: ['#006494'], // Bar borders
            borderWidth: 1
        }]
    },
    options: {
        responsive: true, // Make the chart responsive
        scales: {
            y: {
                beginAtZero: true // Start the y-axis at 0
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                    }
                }
            }
        }
    }
});

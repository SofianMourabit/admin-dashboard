// Line Chart

const ctx = document.getElementById("traffic");
let data = {
  labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
  datasets: [
    {
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(212,117,0,0.4)",
      borderColor: "rgba(212,117,0,1)",
      pointBorderColor: "rgba(204,128,61,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(121,126,131,1)",
      pointHoverBorderColor: "rgba(204,128,61,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 10,
      pointStyle: 'circle',
      data: [0,750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2000, 1750, 2000]
    }
  ]
};

const options = {
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  },
  scales: {
    xAxes: [{
      gridLines: {
        offsetGridLines : true
      }
    }],
    yAxes: [{
      display: true,
      ticks: {
        beginAtZero: true,
        max: 2500
      }
    }]
  }
};
let traffic = new Chart(ctx, {
  type: 'line',
  data: data,
  options: options
});

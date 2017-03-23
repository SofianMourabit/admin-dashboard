// Line Chart

const trafficCanvas = document.getElementById("traffic");
const dailyTrafficCanvas = document.getElementById("dailyTraffic");
const mobileUsersCanvas = document.getElementById("mobileUsers");
let dataTraffic = {
  labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
  datasets: [
    {
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(231,110,60,0.4)",
      borderColor: "rgba(231,110,60,1)",
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
      data: [0,500, 1000, 750, 1250, 1750, 1250, 1500, 1000, 1500, 2000, 1500, 2000]
    }
  ]
};
let dataDailyTraffic = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [
    {
      fill: true,
      borderWidth: 2,
      backgroundColor: "rgba(194, 213, 216,0.4)",
      borderColor: "rgba(194, 213, 216,1)",
      data: [50, 75, 150, 100, 200, 175, 75]
    }
  ]
};
let dataMobileUsers = {
  labels: ["Phones", "Tablets", "Desktop"],
  datasets: [
    {
      data: [23, 26, 76],
      backgroundColor: [
        "#d47500",
        "#c2d5d8",
        "#2A3D45"
      ],
      hoverBackgroundColor: [
        "#d47500",
        "#c2d5d8",
        "#2A3D45"
      ]
    }
  ]
};

const lineOptions = {
  responsive: true,
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
      ticks: {
        beginAtZero: true,
        max: 2500
      },
    }]
  }
};
const barOptions = {
  responsive: true,
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  },
  scales: {
    yAxes: [{
      gridLines: { offsetGridLines: true },
      ticks: {
        beginAtZero: true,
        max: 250
      }
    }]
  }
};
const doughnutOptions = {
  responsive: true,
  tooltips: {
    enabled: false
  },
};

let traffic = new Chart(trafficCanvas, {
  type: 'line',
  data: dataTraffic,
  options: lineOptions
});
let dailyTraffic = new Chart(dailyTrafficCanvas, {
  type: 'bar',
  data: dataDailyTraffic,
  options: barOptions
});
let mobileUsers = new Chart(mobileUsersCanvas, {
  type: 'doughnut',
  data: dataMobileUsers,
  options: doughnutOptions
});

'use strict';
// Line Chart
const trafficCanvas = document.querySelector("#traffic");
const trafficJS = document.querySelector("#js__traffic");
let hourly = {
  labels: ["1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM","8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM","8 PM","9 PM", "10 PM", "11 PM", "12 PM"],
  datasets: [
    {
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(95,173,167,0.4)",
      borderColor: "rgba(95,173,167,1)",
      pointBackgroundColor: "#fff",
      pointRadius: 5,
      data: [0,2, 7, 5, 12,17, 40, 25, 5, 4, 10, 1, 2, 0, 3, 34, 44, 65, 22, 12, 5, 2, 1, 0,1]
    }
  ]
};
let daily = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [
    {
      fill: true,
      backgroundColor: "rgba(42,61,69,0.4)",
      borderColor: "rgba(42,61,69,1)",
      pointBackgroundColor: "#fff",
      pointRadius: 5,
      data: [100,250, 75, 50, 125, 175, 20]
    }
  ]
};
let weekly = {
  labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
  datasets: [
    {
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(231,110,60,0.4)",
      borderColor: "rgba(231,110,60,1)",
      pointBackgroundColor: "#fff",
      pointRadius: 5,
      data: [0,500, 1000, 750, 1250, 1750, 1250, 1500, 1000, 1500, 2000, 1500, 2000]
    }
  ]
};
let monthly = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "Juy", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      fill: true,
      backgroundColor: "rgba(194, 213, 216,0.4)",
      borderColor: "rgba(194, 213, 216,1)",
      pointBackgroundColor: "#fff",
      pointRadius: 5,
      data: [15000,22500, 12500, 20000, 15000, 17500, 20000,12500, 20000, 15000,15000,22500]
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
    }]
  }
};
let trafficChart = new Chart(trafficCanvas, {
  type: 'line',
  data: weekly,
  options: lineOptions
});
// Change charts contents
trafficJS.addEventListener('click', (e) =>{
  e.preventDefault();
  trafficChart.destroy();
  let dataTraffic = eval(e.target.getAttribute('data-name'));
  let dataType = e.target.getAttribute('data-type');
  let buttons = e.target.parentNode.childNodes;
  for (let i=0; i < buttons.length;  i++ ){
    buttons[i].className = "btn__tab--transparent";
  }
  e.target.className = "btn__tab--active";
  traffic = new Chart(trafficCanvas, {
    type: dataType,
    data: dataTraffic,
    options: lineOptions
  });
});

// Bar Chart
const dailyTrafficCanvas = document.getElementById("dailyTraffic");
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
let dailyTrafficChart = new Chart(dailyTrafficCanvas, {
  type: 'bar',
  data: dataDailyTraffic,
  options: barOptions
});


// Doughnut Chart
const mobileUsersCanvas = document.getElementById("mobileUsers");
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
const doughnutOptions = {
  responsive: true,
  tooltips: {
    enabled: false
  },
};
let mobileUsersChart = new Chart(mobileUsersCanvas, {
  type: 'doughnut',
  data: dataMobileUsers,
  options: doughnutOptions
});

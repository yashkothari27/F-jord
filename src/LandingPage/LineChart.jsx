import React from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ data, max, categories, title, chartHeight = 350 }) => {
  const chartOptions = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 450,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "12px",
        color: "#fff",
        fontFamily: "inherit",
      },
      marker: {
        show: true,
      },

      formatter: function (val, { series, seriesIndex, dataPointIndex }) {
        const category = categories[dataPointIndex];
        return `${category}: ${val}`;
      },
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      show: true,
      borderColor: "#e0e0e0",
      strokeDashArray: 4,
      position: "back",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
          //   strokeDashArray: 0,
        },
      },
    },
    xaxis: {
      title: {
        text: title,
        style: {
          color: "#fff",
          fontSize: "1em",
          fontWeight: "400",
          fontFamily: "inherit",
        },
      },
      labels: {
        style: {
          colors: "#ffffff",
          fontFamily: "inherit",
        },
      },
      categories: categories,
      min: 0,
      tickAmount: categories.length - 1,
      axisBorder: {
        show: true,
        color: "#ffffff",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff",
          fontFamily: "inherit",
        },
      },

      min: 0,
      max: max,
      axisBorder: {
        show: true,
        color: "#ffffff",
      },

      tickAmount: 2,
    },

    series: [
      {
        name: title,
        data: data,
      },
    ],
  };

  return (
    <div>
      {/* <h2>{title}</h2> */}
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="line"
        height={chartHeight}
      />
    </div>
  );
};

export default LineChart;

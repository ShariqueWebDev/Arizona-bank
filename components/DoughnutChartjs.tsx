"use client";
import React from "react";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Bubble } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip, Legend);

const DoughnutChartjs = ({ accounts }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: "Bank",
        data: [1250, 2500, 3750, 5200],
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa", "blue"],
      },
    ],
    labels: ["Bank1", "Bank2", "Bank3", "Bank4"],
  };
  return (
    <Doughnut
      data={data}
      options={{
        cutout: "70%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChartjs;

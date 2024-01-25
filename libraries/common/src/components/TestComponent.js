import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const businessActivationChart = [
  { name: "Active", value: 400 },
  { name: "KYC Pending", value: 100 },
  { name: "AMC Pending", value: 300 },
  { name: "Activation Pending", value: 500 }
];
const vendorActivationChart = [
    { name: "Active", value: 100 },
    { name: "KYC Pending", value: 200 },
    { name: "AMC Pending", value: 400 },
    { name: "Activation Pending", value: 700 },
    { name: "KYC Verification Pending", value: 300 },
    { name: "KYC Rejected", value: 150 },
  ];

const pieColors = ["#F49D7C", "#F4C17C", "#F6E277", "#63D99A", "#72A6F2", "#A772F2"];

const styles = makeStyles((theme) => ({
    mainDiv: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
        width: "70%",
        "& ul": {
            "& li": {
                fontSize: "12px",
            },
        },
    },
    pie: {
        border: "1px solid #c2c2c2",
        padding: "30px",
        color: "rgba(0,0,0,0.87)",
    },
}));

export default function App() {
    const classes = styles();
    return (
    <div className={classes.mainDiv}>
        <div className={classes.pie}>
            <Typography variant="h6">
                Business Activation
            </Typography>
            <PieChart 
                width={300} height={300}>
                <Pie
                    data={businessActivationChart}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={70}
                    outerRadius={100}
                    dataKey="value"
                    fill="#8884d8"
                    legendType="square"
                >
                    {businessActivationChart.map((entry, index) => (
                    <Cell
                        key={`cell - ${index}`}
                        fill={pieColors[index % pieColors.length]}
                    >
                    </Cell>
                    ))}
                </Pie>
                <Legend/>
            </PieChart>
        </div>
        <div className={classes.pie}>
            <Typography variant="h6">
                Vendor Activation
            </Typography>
            <PieChart 
                width={300} height={300}>
                <Pie
                    data={vendorActivationChart}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={70}
                    outerRadius={100}
                    dataKey="value"
                    fill="#8884d8"
                    legendType="square"
                >
                    {vendorActivationChart.map((entry, index) => (
                    <Cell
                        key={`cell - ${index}`}
                        fill={pieColors[index % pieColors.length]}
                    >
                    </Cell>
                    ))}
                </Pie>
                <Legend/>
            </PieChart>
        </div>
    </div>
  );
}

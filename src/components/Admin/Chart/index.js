import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function LineChartExample() {
    const data = [
        { name: 'January', sales: 100 },
        { name: 'February', sales: 200 },
        { name: 'March', sales: 150 },
        { name: 'April', sales: 300 },
        { name: 'May', sales: 400 },
        { name: 'June', sales: 250 },
    ];

    return (
        <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" />
        </LineChart>
    );
}

export default LineChartExample;

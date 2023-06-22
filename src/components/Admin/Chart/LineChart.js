import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Thứ 2',
        Online: 4000,
        Offline: 2400,
        amt: 2400,
    },
    {
        name: 'Thứ 3',
        Online: 3000,
        Offline: 1398,
        amt: 2210,
    },
    {
        name: 'Thứ 4',
        Online: 2000,
        Offline: 9800,
        amt: 2290,
    },
    {
        name: 'Thứ 6',
        Online: 2780,
        Offline: 3908,
        amt: 2000,
    },
    {
        name: 'Thứ 6',
        Online: 1890,
        Offline: 4800,
        amt: 2181,
    },
    {
        name: 'Thứ 7',
        Online: 2390,
        Offline: 3800,
        amt: 2500,
    },
    {
        name: 'Chủ Nhật',
        Online: 3490,
        Offline: 4300,
        amt: 2100,
    },
];

export default function Example() {
    return (
        <ResponsiveContainer width={700} height={400}>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Offline" fill="#8884d8" />
                <Bar dataKey="Online" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
}

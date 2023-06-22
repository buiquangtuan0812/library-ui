import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

class PieChartExample extends React.Component {
    render() {
        const data = [
            { name: 'Kinh tế', value: 400 },
            { name: 'Văn học', value: 300 },
            { name: 'Lịch sử', value: 200 },
            { name: 'KNGT', value: 100 },
            { name: 'Kỹ năng sống', value: 150 },
        ];

        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF8080'];

        return (
            <PieChart width={560} height={320}>
                <Pie data={data} dataKey="value" nameKey="name" cx="60%" cy="60%" outerRadius={80} fill="#8884d8" label>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        );
    }
}

export default PieChartExample;

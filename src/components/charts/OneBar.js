import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

const OneBar = (props) => {
    return (
        <div>
            <BarChart
                width={600}
                height={300}
                data={props.data}
                margin={{
                    top: 15, right: 20, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="classe" fill={props.color1}/>
            </BarChart>
        </div>
    );
};

export default OneBar;
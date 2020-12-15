import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

const CustomBar = (props) => {
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="homme" fill={props.color1}/>
                <Bar dataKey="femme" fill={props.color2}/>
            </BarChart>
        </div>
    );
};

export default CustomBar;
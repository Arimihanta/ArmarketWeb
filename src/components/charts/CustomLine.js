import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

const CustomLine = (props) => {
    
    return (
        <div>
            <LineChart
                width={600}
                height={300}
                
                data={props.data}
                margin={{
                    top: 10, right: 10, left: 10, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="0.5 0.5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                />
                <Legend/>
                <Line type="monotone" dataKey={props.key1} stroke={props.color1}/>
            </LineChart>
        </div>
    );
};

export default CustomLine;
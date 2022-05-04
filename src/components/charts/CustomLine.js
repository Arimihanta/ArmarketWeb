import React,{useEffect,useState} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

const CustomLine = (props) => {
    const [width,setWidth]=useState(window.innerWidth)
    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
    })
    return (
        <div>
            <LineChart
                width={(width/2)-80}
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
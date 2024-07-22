import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { createChart } from 'lightweight-charts';
import moment from 'moment';

const App = () => {
    const [data, setData] = useState(new Map());
    const [interval, setInterval] = useState('1D');
    const containerRef = useRef(null);

    useEffect(() => {
        const transformData = (data) => {
            return data.map(item => ({
                time: new Date(item.time).toISOString().split('T')[0], // Convertir la fecha al formato 'YYYY-MM-DD'
                value: item.ox_nitroso, // Usar el valor correcto
            }));
        };

        const groupByInterval = (data, interval) => {
            const grouped = {};

            data.forEach(item => {
                const date = moment(item.time);
                let key;

                switch (interval) {
                    case '1D':
                        key = date.format('YYYY-MM-DD');
                        break;
                    case '1W':
                        key = date.startOf('week').format('YYYY-MM-DD');
                        break;
                    case '1M':
                        key = date.startOf('month').format('YYYY-MM-DD');
                        break;
                    case '1Y':
                        key = date.startOf('year').format('YYYY-MM-DD');
                        break;
                    default:
                        key = date.format('YYYY-MM-DD');
                }

                if (!grouped[key]) {
                    grouped[key] = [];
                }
                grouped[key].push(item.value);
            });

            // Calcular el promedio de los valores para cada intervalo
            return Object.keys(grouped).map(key => ({
                time: key,
                value: grouped[key].reduce((acc, val) => acc + val, 0) / grouped[key].length,
            }));
        };

        const loadData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/data');
                const rawData = response.data;

                // Transformar y agrupar los datos para cada intervalo
                const dayData = groupByInterval(transformData(rawData), '1D');
                const weekData = groupByInterval(transformData(rawData), '1W');
                const monthData = groupByInterval(transformData(rawData), '1M');
                const yearData = groupByInterval(transformData(rawData), '1Y');

                setData(new Map([
                    ['1D', dayData],
                    ['1W', weekData],
                    ['1M', monthData],
                    ['1Y', yearData],
                ]));
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const chart = createChart(container, { width: 600, height: 400 });
        const lineSeries = chart.addLineSeries({ color: intervalColors[interval] });

        if (data.has(interval)) {
            lineSeries.setData(data.get(interval));
        }

        chart.timeScale().fitContent();

        return () => chart.remove();
    }, [interval, data]);

    const intervalColors = {
        '1D': '#2962FF',
        '1W': 'rgb(225, 87, 90)',
        '1M': 'rgb(242, 142, 44)',
        '1Y': 'rgb(164, 89, 209)',
    };

    return (
        <div>
            <div ref={containerRef} id="container" style={{ position: 'relative', height: '400px' }}></div>
            <div id="buttonsContainer">
                {['1D', '1W', '1M', '1Y'].map(intervalKey => (
                    <button key={intervalKey} onClick={() => setInterval(intervalKey)}>
                        {intervalKey}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default App;

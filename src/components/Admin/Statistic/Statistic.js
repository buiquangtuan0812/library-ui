import classNames from 'classnames/bind';
import styles from './Statistic.module.scss';

import React from 'react';
import Plot from 'react-plotly.js';

const cx = classNames.bind(styles);

function Statistic() {
    document.title = 'My Library | Admin';
    return (
        <div className={cx('body__admin')}>
            <div className={cx('container__statistic')}>
                <div className={cx('container__statistic-item')}>
                    <div className={cx('pie-chart')}>
                        <Plot
                            data={[
                                {
                                    values: [1000, 500, 1500],
                                    labels: ['Sale', 'Rent', 'Rest'],
                                    type: 'pie',
                                },
                            ]}
                            config={{
                                displayModeBar: false,
                            }}
                            layout={{
                                title: 'Book Statistic',
                                height: 380,
                                width: 500,
                                font: {
                                    size: 16,
                                    weight: 900,
                                },
                            }}
                        />
                    </div>

                    <div className={cx('chart__book-details')}>
                        <Plot
                            data={[
                                {
                                    type: 'bar',
                                    x: ['Tech', 'History', 'TLH', 'Liter', 'Business', 'Self'],
                                    y: [100, 200, 400, 230, 300, 120],
                                    marker: {
                                        line: {
                                            width: 1,
                                        },
                                    },
                                },
                            ]}
                            layout={{
                                height: 380,
                                width: 600,
                                title: 'Number of books in the library',
                                font: {
                                    size: 16,
                                    weight: 900,
                                },
                            }}
                            config={{
                                displayModeBar: false,
                            }}
                        />
                    </div>
                </div>

                <div className={cx('statistic__sales')}>
                    <div className={'chart__sales'}>
                        <Plot
                            data={[
                                {
                                    type: 'scatter',
                                    mode: 'lines',
                                    name: 'Online',
                                    x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                    y: [100, 123, 400, 233, 432, 231, 123],
                                    line: {
                                        color: '#17BECF',
                                    },
                                },
                                {
                                    type: 'scatter',
                                    mode: 'lines',
                                    name: 'Offline',
                                    x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                    y: [50, 120, 300, 212, 100, 203, 250],
                                    line: {
                                        color: '#7F7F7F',
                                    },
                                },
                            ]}
                            layout={{
                                title: 'Sales Analytics',
                                width: 780,
                                height: 400,
                                font: {
                                    size: 16,
                                    weight: 900,
                                },
                                yaxis: {
                                    autorange: true,
                                    range: [49, 450],
                                    type: 'linear',
                                },
                            }}
                            config={{
                                displayModeBar: false,
                            }}
                        />
                    </div>
                    <div className={cx('statistical__sales')}>
                        <div className={cx('total__money')}>
                            <p>Revenue</p>
                            Total Earning
                            <p>812,8M</p>
                            Online Revenue
                            <p>340,3M ~ 41.8%</p>
                            Offline Revenue
                            <p>449,1M ~ 55,2%</p>
                            Other
                            <p>23,4M ~ 2,8%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistic;

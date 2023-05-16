import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import SellPage from '~/components/Employee/SellBook/SellBook';
import LendPage from '~/components/Employee/Lend/Lend';
import Navigation from '~/components/Employee/NavEmployee/Navigation';
import Header from '~/components/Employee/HeaderEmployee/HeaderEmployee';
import ReturnPage from '~/components/Employee/ReturnBook/ReturnBook';

import React from 'react';
import Plot from 'react-plotly.js';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FcMoneyTransfer } from 'react-icons/fc';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';

const cx = classNames.bind(styles);

function HomeEmployee(props) {
    document.title = 'Employee | Home';
    const [thu, setThu] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState('');
    const [employee, setEmployee] = useState({});

    const location = useLocation();

    useEffect(() => {
        const date = new Date();
        const number = date.getDay();
        const day = date.getDate();
        const month = date.getMonth();
        if (day >= 10) {
            setDay(date.getDate());
        } else {
            setDay('0' + date.getDate());
        }
        if (month >= 9) {
            setMonth(date.getMonth() + 1);
        } else {
            setMonth('0' + (date.getMonth() + 1).toString());
        }
        var day_name = '';
        switch (number) {
            case 0:
                day_name = 'Chủ nhật';
                break;
            case 1:
                day_name = 'Thứ hai';
                break;
            case 2:
                day_name = 'Thứ ba';
                break;
            case 3:
                day_name = 'Thứ tư';
                break;
            case 4:
                day_name = 'Thứ năm';
                break;
            case 5:
                day_name = 'Thứ sáu';
                break;
            case 6:
                day_name = 'Thứ bảy';
        }
        setThu(day_name);
        setYear(date.getFullYear());
        setEmployee(location.state.data);
    }, []);

    const renderPage = (props) => {
        if (props.page === 'Sell') {
            return <SellPage data={employee} />;
        } else if (props.page === 'Lend') {
            return <LendPage data={employee} />;
        } else if (props.page === 'Return') {
            return <ReturnPage data={employee} />;
        } else {
            return (
                <div>
                    <div className={cx('item-revenue')}>
                        <div className={cx('item-revenue-1')}>
                            <span className={cx('container-icon')}>
                                <AiOutlineUsergroupAdd className={cx('icon')} />
                            </span>
                            <span>
                                <p style={{ fontSize: '16px', fontWeight: '500' }}>Khách hàng</p>
                                <p>100</p>
                            </span>
                        </div>
                        <div className={cx('item-revenue-2')}>
                            <span className={cx('container-icon')}>
                                <HiOutlineCurrencyDollar className={cx('icon')} />
                            </span>
                            <span>
                                <p style={{ fontSize: '16px', fontWeight: '500' }}>Bán sách</p>
                                <p>
                                    1.230.000
                                    <del>đ</del>
                                </p>
                            </span>
                        </div>
                        <div className={cx('item-revenue-3')}>
                            <span className={cx('container-icon')}>
                                <HiOutlineCurrencyDollar className={cx('icon')} />
                            </span>
                            <span>
                                <p style={{ fontSize: '16px', fontWeight: '500' }}>Thuê sách</p>
                                <p>
                                    500.000
                                    <del>đ</del>
                                </p>
                            </span>
                        </div>
                        <div className={cx('item-revenue-4')}>
                            <span className={cx('container-icon')}>
                                <FcMoneyTransfer className={cx('icon')} />
                            </span>
                            <span>
                                <p style={{ fontSize: '16px', fontWeight: '500' }}>Lợi nhuận</p>
                                <p>
                                    1.000.000
                                    <del>đ</del>
                                </p>
                            </span>
                        </div>
                    </div>

                    <div className={cx('container__content')}>
                        <div className={cx('item-static')}>
                            <div className={'chart__sales'}>
                                <Plot
                                    data={[
                                        {
                                            type: 'scatter',
                                            mode: 'lines',
                                            name: 'Bán sách',
                                            x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                            y: [100, 123, 400, 233, 432, 231, 123],
                                            line: {
                                                color: '#ff9b44',
                                            },
                                        },
                                        {
                                            type: 'scatter',
                                            mode: 'lines',
                                            name: 'Cho thuê sách',
                                            x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                            y: [200, 150, 300, 212, 100, 203, 250],
                                            line: {
                                                color: '#fc6075',
                                            },
                                        },
                                    ]}
                                    layout={{
                                        title: 'Doanh thu tuần trước',
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
                        </div>
                        <div className={cx('item-today')}>
                            <h3>Hôm nay</h3>
                            <div className={cx('item-today-content')}>
                                <div className={cx('static-1')}>
                                    <span className={cx('seperate')}>
                                        <p style={{ fontSize: '22px' }}>12</p>
                                        <p style={{ color: '#777777' }}>Đã bán</p>
                                    </span>
                                    <span>
                                        <p style={{ fontSize: '22px' }}>08</p>
                                        <p style={{ color: '#777777' }}>Cho thuê</p>
                                    </span>
                                </div>
                                <div className={cx('static-2')}>
                                    <span>
                                        <p style={{ fontSize: '22px' }}>10</p>
                                        <p style={{ color: '#777777' }}>Đã trả</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className={cx('container__page')}>
            <Navigation data={employee} />
            <div className={cx('container__page-content')}>
                <Header />
                <div className={cx('introduction')}>
                    <div className={cx('img-employee')}>
                        <img
                            src="https://smarthr.dreamguystech.com/html/template/assets/img/profiles/avatar-02.jpg"
                            alt=""
                        />
                    </div>
                    <div className={cx('infor')}>
                        <span className={cx('fullName')}>Xin Chào, {employee.fullName}</span>
                        <span className={cx('time')}>
                            {thu}, {day} tháng {month} năm {year}
                        </span>
                    </div>
                </div>
                {renderPage(props)}
            </div>
        </div>
    );
}

export default HomeEmployee;

import classNames from 'classnames/bind';
import styles from './HomeAdmin.module.scss';

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FaSupple } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';

import Navigation from '../../components/Admin/Navigation/Navigation';
import Chart from '../../components/Admin/Chart/index';
import LineeChart from '../../components/Admin/Chart/LineChart';
import PieChart from '../../components/Admin/Chart/PieChart';

const cx = classNames.bind(styles);

function HomeAdmin() {
    document.title = 'Admin | Home';
    const [admin, setAdmin] = useState({});
    const location = useLocation();
    const [thu, setThu] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState('');
    useEffect(() => {
        if (location.state) {
            setAdmin(location.state.user);
        }
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
    }, [location.state]);

    return (
        <div className={cx('container__admin')}>
            <Navigation data={admin} />
            <div className={cx('container__admin-conent')}>
                <div className={cx('header__admin')}>
                    <div className={cx('header__admin-statistic')}>
                        <span className={cx('header__admin-statistic-item')}>
                            <Link to="/admin/home">
                                <AiOutlineHome className={cx('icon-header')}></AiOutlineHome>
                                Trang chủ
                            </Link>
                        </span>

                        <span className={cx('header__admin-statistic-item')}>
                            <FaSupple className={cx('icon-header')}></FaSupple>
                            Nhà cung cấp
                        </span>
                        <span className={cx('header__admin-statistic-item')}>
                            <i className={cx('fa-solid fa-user-tie')}></i>
                            Nhân viên
                        </span>
                    </div>
                    <div className={cx('header__admin-interact')}>
                        <span className={cx('header__admin-interact-item')}>
                            <i className={cx('fa-regular fa-envelope')}></i>
                            <span>3</span>
                        </span>
                        <span className={cx('header__admin-interact-item')}>
                            <i className={cx('fa-regular fa-bell')}></i>
                            <span>2</span>
                        </span>
                        <span className={cx('header__admin-interact-item')}>
                            <GrUserAdmin className={cx('icon-admin')}></GrUserAdmin>
                            Admin
                        </span>
                    </div>
                </div>
                <div className={cx('introduction')}>
                    <div className={cx('img-admin')}>
                        <img
                            src="https://smarthr.dreamguystech.com/html/template/assets/img/profiles/avatar-02.jpg"
                            alt=""
                        />
                    </div>
                    <div className={cx('infor')}>
                        <span className={cx('fullName')}>Xin Chào, {admin.fullName}</span>
                        <span className={cx('time')}>
                            {thu}, {day} tháng {month} năm {year}
                        </span>
                    </div>
                </div>
                <div className={cx('body__admin')}>
                    <div className={cx('container__statistic')}>
                        <div className={cx('container__statistic-item')}>
                            <div className={cx('pie-chart')}>
                                <Chart />
                            </div>

                            <div className={cx('chart__book-details')}>
                                <span className={cx('title')}>Thống kê số lượng sách</span>
                                <PieChart />
                            </div>
                        </div>

                        <div className={cx('statistic__sales')}>
                            <div className={cx('chart__sales')}>
                                <LineeChart />
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
            </div>
        </div>
    );
}

export default HomeAdmin;

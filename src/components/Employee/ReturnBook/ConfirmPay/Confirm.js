import classNames from 'classnames/bind';
import styles from './ConfirmPay.module.scss';

import { useState, useEffect } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function ConfirmPay(props) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8086/employee/lend/order', {
                params: { _id: props.lend._id },

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${props.employee.token}`,
                },
            })
            .then((res) => {
                setBooks(res.data);
            })
            .catch((err) => console.log(err));
    }, [props]);

    const solveTime = (time) => {
        const date = new Date(time);
        if (date.getDate() < 10 && date.getMonth() >= 9) {
            return '0' + date.getDate() + ' - ' + (date.getMonth() + 1) + ' - ' + date.getFullYear();
        } else if (date.getDate() >= 10 && date.getMonth() < 9) {
            return date.getDate() + ' - ' + '0' + (date.getMonth() + 1) + ' - ' + date.getFullYear();
        } else if (date.getDate() < 10 && date.getMonth() < 9) {
            return '0' + date.getDate() + ' - ' + '0' + (date.getMonth() + 1) + ' - ' + date.getFullYear();
        } else {
            return date.getDate() + ' - ' + (date.getMonth() + 1) + ' - ' + date.getFullYear();
        }
    };

    const getCurrentTime = (time) => {
        const date = new Date();
        if (date.getDate() < 10 && date.getMonth() >= 9) {
            return '0' + date.getDate() + ' - ' + (date.getMonth() + 1) + ' - ' + date.getFullYear();
        } else if (date.getDate() >= 10 && date.getMonth() < 9) {
            return date.getDate() + ' - ' + '0' + (date.getMonth() + 1) + ' - ' + date.getFullYear();
        } else if (date.getDate() < 10 && date.getMonth() < 9) {
            return '0' + date.getDate() + ' - ' + '0' + (date.getMonth() + 1) + ' - ' + date.getFullYear();
        } else {
            return date.getDate() + ' - ' + (date.getMonth() + 1) + ' - ' + date.getFullYear();
        }
    };

    const countTime = (start) => {
        const dateStart = new Date(start);
        const dateEnd = new Date();
        if (dateEnd.getMonth() === dateStart.getMonth()) {
            return dateEnd.getDate() - dateStart.getDate();
        } else {
            return dateEnd.getDate() + 31 - dateStart.getDate();
        }
    };

    const renderBooks = books.map((book, index) => {
        return (
            <li key={index} className={cx('item-book')}>
                <span>{Number(`${index}`) + 1}.</span>
                <span>{book.name}</span>
            </li>
        );
    });

    const handleCancel = (e) => {
        e.preventDefault();
        props.handleChild(false);
    };

    const handlePay = (e) => {
        e.preventDefault();
        axios
            .post(
                'http://localhost:8086/employee/pay',
                { _id: props.lend._id, totalMoney: countTime(props.lend.created_at) * 1500 },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${props.employee.token}`,
                    },
                },
            )
            .then((res) => {
                props.handleChildData({
                    lend: res.data,
                    index: props.index,
                    state: false,
                    success: true,
                });
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={cx('ctn')}>
            <div className={cx('container__confirm')}>
                <nav className={cx('container__confirm-header')}>Thông tin hóa đơn</nav>

                <nav className={cx('container__confirm-body')}>
                    <ul>
                        <h3>Thông tin khách hàng</h3>
                        <li>
                            <span className={cx('title-item')}>Tên khách hàng:</span>
                            <span>{props.lend.customer.name}</span>
                        </li>
                        <li>
                            <span className={cx('title-item')}>Số điện thoại:</span>
                            <span>{props.lend.customer.tel}</span>
                        </li>
                        <li>
                            <span className={cx('title-item')}>Ngày thuê:</span>
                            <span>{solveTime(props.lend.created_at)}</span>
                        </li>
                        <li>
                            <span className={cx('title-item')}>Ngày trả:</span>
                            <span>{getCurrentTime('')}</span>
                        </li>
                        <li>
                            <span className={cx('title-item')}>Số ngày:</span>
                            <span>{countTime(props.lend.created_at)}</span>
                        </li>
                    </ul>
                    <ul>
                        <h3>Thông tin sách</h3>
                        {renderBooks}
                        <li>
                            <span className={cx('title-item')}>Số lượng:</span>
                            <span>{props.lend.orderBooks.length}</span>
                        </li>
                        <li>
                            <span className={cx('title-item')}>Giá thuê:</span>
                            <span>1.500 đồng/ngày</span>
                        </li>
                        <li>
                            <span className={cx('title-item')}>Thành tiền:</span>
                            <span>
                                {countTime(props.lend.created_at) * 1500}
                                <del>đ</del>
                            </span>
                        </li>
                    </ul>
                </nav>

                <nav className={cx('container__confirm-footer')}>
                    <button onClick={handleCancel}>Hủy</button>
                    <button onClick={handlePay}>Thanh toán</button>
                </nav>
            </div>
        </div>
    );
}

export default ConfirmPay;

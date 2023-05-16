import classNames from 'classnames/bind';
import styles from './Confirm.module.scss';

import axios from 'axios';
import { useState } from 'react';

import { BiErrorCircle } from 'react-icons/bi';

const cx = classNames.bind(styles);

function Confirm(props) {
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [message, setMessage] = useState('');

    const handlePost = (e) => {
        e.preventDefault();
        axios
            .post(
                'http://localhost:8086/employee/add/customer',
                { name: name, tel: tel },
                {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${props.employee.token}` },
                },
            )
            .then((res) => {
                if (res.data.message) {
                    setMessage(res.data.message);
                } else {
                    props.handleChildData({
                        state: false,
                        confirm: true,
                        customers: [...props.customers, res.data],
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        props.handleChildData({
            state: false,
            customers: props.customers,
            confirm: false,
        });
    };

    return (
        <div className={cx('ctn')}>
            <div className={cx('container__confirm')}>
                <div className={cx('container__confirm-header')}>
                    <h3>Thêm mới khách hàng</h3>
                </div>

                <div className={cx('container__confirm-body')}>
                    <div className={cx('name')}>
                        <label htmlFor="name">Tên</label>
                        <input
                            type="text"
                            placeholder="Nhập tên khách hàng"
                            id="name"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={cx('tel')}>
                        <label htmlFor="tel">Số điện thoại</label>
                        <input
                            type="text"
                            placeholder="Nhập số điện thoại"
                            id="tel"
                            name="tel"
                            onChange={(e) => setTel(e.target.value)}
                        />
                    </div>
                </div>

                <div className={cx(message !== '' ? 'container__confirm-message' : 'hide')}>
                    <span>
                        <BiErrorCircle className={cx('icon-err')} />
                    </span>
                    <span>Khách hàng này đã được thêm!</span>
                </div>

                <div className={cx('container__confirm-footer')}>
                    <button onClick={handlePost}>Thêm</button>
                    <button onClick={handleCancel}>Hủy</button>
                </div>
            </div>
        </div>
    );
}

export default Confirm;

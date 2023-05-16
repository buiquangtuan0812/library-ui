import classNames from 'classnames/bind';
import styles from './BillLend.module.scss';

import { useState } from 'react';

import { BsTrash } from 'react-icons/bs';
import { BiAddToQueue } from 'react-icons/bi';
import axios from 'axios';

const cx = classNames.bind(styles);

function BillLend(props) {
    const [count, setCount] = useState(0);
    const [books, setBooks] = useState([]);

    const handleInput = (value) => {
        if (value.length === 4) {
            axios
                .get('http://localhost:8086/library/books/find/by-code', { params: { code: value } })
                .then((res) => {
                    setBooks([...books, res.data._id]);
                })
                .catch((err) => console.error(err));
        } else {
            return;
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const data = {
            _idCustomer: props.customer._id,
            orderBooks: books,
        };
        axios
            .post('http://localhost:8086/employee/lend', data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${props.employee.token}`,
                },
            })
            .then((res) => {
                props.handleChild({
                    state: false,
                    index: props.index,
                    customer: res.data,
                    success: true,
                });
            })
            .catch((err) => console.error(err));
    };

    const handleCancel = () => {
        setCount(count - 1);
    };

    const handleClick = (e) => {
        e.preventDefault();
        props.handleChild({
            state: false,
            index: props.index,
            customer: props.customer,
            success: false,
        });
    };

    return (
        <div className={cx('ctn')}>
            <div className={cx('container__bill')}>
                <div className={cx('container__bill-header')}>
                    <h3>Thêm hóa đơn</h3>
                </div>

                <div className={cx('container__bill-body')}>
                    <div className={cx('customer')}>
                        <span>Khách hàng:</span>
                        <span className={cx('customer-name')}>{props.customer.name}</span>
                    </div>

                    <div className={cx('book')}>
                        <div className={cx('header')}>
                            <span>Thông tin sách</span>
                            <span onClick={() => setCount(count + 1)}>
                                <BiAddToQueue className={cx('icon-add')} />
                            </span>
                        </div>
                        <div className={cx('ctn-list')}>
                            <div className={cx('list-book')}>
                                <label htmlFor="codeBook">Mã sách</label>
                                <input
                                    type="text"
                                    id="codeBook"
                                    placeholder="Nhập mã sách"
                                    className={cx('input-code')}
                                    onChange={(e) => handleInput(e.target.value)}
                                />

                                <div className={cx('quantity')}>
                                    <span>Số lượng</span>
                                    <span style={{ fontSize: '18px' }}>1</span>
                                </div>

                                <span onClick={() => setCount(count - 1)}>
                                    <BsTrash />
                                </span>
                            </div>
                            <div className={cx(count >= 1 ? 'list-book' : 'hide')}>
                                <label htmlFor="codeBook">Mã sách</label>
                                <input
                                    type="text"
                                    id="codeBook"
                                    placeholder="Nhập mã sách"
                                    className={cx('input-code')}
                                    onChange={(e) => handleInput(e.target.value)}
                                />

                                <div className={cx('quantity')}>
                                    <span>Số lượng</span>
                                    <span style={{ fontSize: '18px' }}>1</span>
                                </div>
                                <span onClick={() => handleCancel(0)}>
                                    <BsTrash />
                                </span>
                            </div>
                            <div className={cx(count >= 2 ? 'list-book' : 'hide')}>
                                <label htmlFor="codeBook">Mã sách</label>
                                <input
                                    type="text"
                                    id="codeBook"
                                    placeholder="Nhập mã sách"
                                    className={cx('input-code')}
                                    onChange={(e) => handleInput(e.target.value)}
                                />

                                <div className={cx('quantity')}>
                                    <span>Số lượng</span>
                                    <span style={{ fontSize: '18px' }}>1</span>
                                </div>

                                <span onClick={() => handleCancel(1)}>
                                    <BsTrash />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('container__bill-footer')}>
                    <button onClick={handleSave}>Lưu</button>
                    <button onClick={handleClick}>Hủy</button>
                </div>
            </div>
        </div>
    );
}

export default BillLend;

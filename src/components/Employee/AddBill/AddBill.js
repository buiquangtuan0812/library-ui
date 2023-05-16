import classNames from 'classnames/bind';
import styles from './AddBill.module.scss';

import { useState } from 'react';

import { BsTrash } from 'react-icons/bs';
import { BiAddToQueue } from 'react-icons/bi';
import axios from 'axios';

const cx = classNames.bind(styles);

function AddBill(props) {
    const [count, setCount] = useState(0);
    const [books, setBooks] = useState([]);
    const [totalPrice, setPrice] = useState(0);

    const handleInput = (value) => {
        if (value.length === 4) {
            axios
                .get('http://localhost:8086/library/books/find/by-code', { params: { code: value } })
                .then((res) => {
                    setPrice(totalPrice + res.data.price);
                    setBooks([...books, res.data.code]);
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
            totalPrice: totalPrice,
        };
        axios
            .post('http://localhost:8086/employee/sell', data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${props.employee.token}`,
                },
            })
            .then((res) => {
                props.handleChild({
                    state: false,
                    customer: res.data,
                    success: true,
                });
            })
            .catch((err) => console.error(err));
    };

    const handleCancel = (index) => {
        setCount(count - 1);
        setPrice(totalPrice - books[index].price);
    };

    const handleClick = (e) => {
        e.preventDefault();
        props.handleChild({
            state: false,
            customer: props.customer,
            success: false,
        });
    };

    const solveString = (num) => {
        if (num === 0) {
            return num;
        }
        const str = num.toString();
        return str.slice(0, str.length - 3) + '.000';
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

                                <label htmlFor="quantity">Số lượng</label>
                                <input type="number" id="quantity" value={1} readOnly />

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

                                <label htmlFor="quantity">Số lượng</label>
                                <input type="number" id="quantity" value={1} readOnly />

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

                                <label htmlFor="quantity">Số lượng</label>
                                <input type="number" id="quantity" value={1} readOnly />

                                <span onClick={() => handleCancel(1)}>
                                    <BsTrash />
                                </span>
                            </div>
                            <div className={cx(count >= 3 ? 'list-book' : 'hide')}>
                                <label htmlFor="codeBook">Mã sách</label>
                                <input
                                    type="text"
                                    id="codeBook"
                                    placeholder="Nhập mã sách"
                                    className={cx('input-code')}
                                    onChange={(e) => handleInput(e.target.value)}
                                />

                                <label htmlFor="quantity">Số lượng</label>
                                <input type="number" id="quantity" value={1} readOnly />

                                <span onClick={() => handleCancel(2)}>
                                    <BsTrash />
                                </span>
                            </div>
                        </div>
                        <div className={cx('total-bill')}>
                            <span>Tổng</span>
                            <span className={cx('total')}>
                                {solveString(totalPrice)}
                                <del>đ</del>
                            </span>
                        </div>
                    </div>
                </div>

                <div className={cx('container__bill-footer')}>
                    <button onClick={handleSave}>Thêm</button>
                    <button onClick={handleClick}>Hủy</button>
                </div>
            </div>
        </div>
    );
}

export default AddBill;

import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';

import axios from 'axios';
import { IoIosAdd } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { RiSubtractFill } from 'react-icons/ri';

const cx = classNames.bind(styles);

function CartItem(props) {
    const [data, setDate] = useState({});
    useEffect(() => {
        axios
            .get('http://localhost:8086/library/books/by', { params: { _id: props.id } })
            .then((response) => setDate(response.data))
            .catch((err) => console.log(err));
    }, []);

    const countPrice = (price) => {
        const oldPrice = (Number(price) + (Number(price) * 20) / 100).toString();
        return oldPrice.slice(0, oldPrice.length - 3) + '.000';
    };
    const solveString = (num) => {
        const str = num.toString();
        return str.slice(0, str.length - 3) + '.000';
    };

    return (
        <div className={cx('container-item')}>
            <div className={cx('check-box')}>
                <input type="checkbox" />
            </div>
            <div className={cx('product')}>
                <span className={cx('product-img')}>
                    <img src={data.imgDes} alt="" />
                </span>
                <span className={cx('product-name')}>
                    <p className={cx('name')}>{data.name}</p>
                    <p className={cx('state')}>{props.state ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                </span>
            </div>
            <div className={cx('price')}>
                <span>
                    {solveString(`${data.price}`)}
                    <span className={cx('unit')}>đ</span>
                </span>
                <del className={cx('sales')}>
                    {countPrice(data.price)}
                    <span>đ</span>
                </del>
            </div>
            <div className={cx('quantity')}>
                <span className={cx('subtraction')}>
                    <RiSubtractFill />
                </span>
                <span className={cx('number')}>{props.quantity}</span>
                <span className={cx('summation')}>
                    <IoIosAdd />
                </span>
            </div>
            <div className={cx('money')}>
                {solveString(`${props.total}`)}
                <span className={cx('unit')}>đ</span>
            </div>
            <div className={cx('trash')}>
                <FaTrashAlt className={cx('icon-trash')} />
            </div>
        </div>
    );
}

export default CartItem;

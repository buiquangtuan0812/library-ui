import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';

import axios from 'axios';
import { IoIosAdd } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { RiSubtractFill } from 'react-icons/ri';

const cx = classNames.bind(styles);

function CartItem(props) {
    const [state, setState] = useState(false);
    const [data, setDate] = useState({});
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        axios
            .get('http://localhost:8086/library/books/by', { params: { _id: props.id } })
            .then((response) => {
                setDate(response.data);
                setPrice(response.data.price);
            })
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

    const handleReduce = () => {
        if (quantity == 1) {
            return;
        } else {
            setQuantity(quantity - 1);
        }
        if (state) {
            props.onData({
                type: 'Tru',
                state: state,
                value: (quantity - 1) * price,
                data: {
                    quantity: quantity - 1,
                    state: true,
                },
            });
        }
    };
    const handleIncrease = () => {
        setQuantity(quantity + 1);
        if (state) {
            props.onData({
                type: 'Cong',
                state: state,
                value: (quantity + 1) * price,
                data: {
                    quantity: quantity - 1,
                    state: true,
                },
            });
        }
    };

    const handleCheck = () => {
        setState(!state);
        props.onData({
            type: !state ? 'Cong' : 'Tru',
            state: !state,
            value: quantity * price,
            data: {
                quantity: quantity - 1,
                state: true,
            },
        });
    };

    return (
        <div className={cx('container-item')}>
            {props.select ? (
                <div className={cx('check-box')}>
                    <input type="checkbox" onClick={handleCheck} checked />
                </div>
            ) : (
                <div className={cx('check-box')}>
                    <input type="checkbox" onClick={handleCheck} />
                </div>
            )}
            <div className={cx('product')}>
                <span className={cx('product-img')}>
                    <img src={data.imgDes} alt="" />
                </span>
                <span className={cx('product-name')}>
                    <p className={cx('name')}>{data.name}</p>
                    <p className={cx('state')}>{props.stateCart ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
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
                <span className={cx('subtraction')} onClick={handleReduce}>
                    <RiSubtractFill />
                </span>
                <span className={cx('number')}>{quantity}</span>
                <span className={cx('summation')} onClick={handleIncrease}>
                    <IoIosAdd />
                </span>
            </div>
            <div className={cx('money')}>
                {solveString(price * quantity)}
                <span className={cx('unit')}>đ</span>
            </div>
            <div className={cx('trash')}>
                <FaTrashAlt className={cx('icon-trash')} />
            </div>
        </div>
    );
}

export default CartItem;

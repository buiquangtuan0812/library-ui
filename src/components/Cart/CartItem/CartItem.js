import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoIosAdd } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { RiSubtractFill } from 'react-icons/ri';

const cx = classNames.bind(styles);

function CartItem(props) {
    const [state, setState] = useState(false);
    const [data, setData] = useState({});
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [notice, setNotice] = useState(false);
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8086/library/books/by', { params: { _id: props.idBook } })
            .then((response) => {
                setData(response.data);
                setPrice(response.data.price);
            })
            .catch((err) => console.log(err));
    }, [props.idBook]);

    const countPrice = (price) => {
        const oldPrice = (Number(price) + (Number(price) * 20) / 100).toString();
        return oldPrice.slice(0, oldPrice.length - 3) + '.000';
    };
    const solveString = (num) => {
        const str = num.toString();
        return str.slice(0, str.length - 3) + '.000';
    };

    const handleReduce = () => {
        if (quantity === 1) {
            setConfirm(true);
            return;
        } else {
            setQuantity(quantity - 1);
        }
        if (state) {
            props.handleChildData({
                type: 'Tru',
                state: state,
                value: price,
                data: {
                    idCart: props.idCart,
                    value: data,
                    quantity: quantity - 1,
                },
            });
        }
    };
    const handleIncrease = () => {
        if (quantity === 3) {
            setNotice(true);
            return;
        }
        setQuantity(quantity + 1);
        if (state) {
            props.handleChildData({
                type: 'Cong',
                state: state,
                value: price,
                data: {
                    idCart: props.idCart,
                    value: data,
                    quantity: quantity + 1,
                },
            });
        }
    };

    const handleCheck = () => {
        props.handleChildData({
            type: !state === true ? 'Cong' : 'Tru',
            state: !state,
            value: quantity * price,
            data: {
                idCart: props.idCart,
                value: data,
                quantity: quantity,
            },
        });
        setState(!state);
    };

    if (notice) {
        setTimeout(() => {
            setNotice(false);
        }, 3000);
    }

    if (confirm) {
        setTimeout(() => {
            setConfirm(false);
        }, 3000);
    }

    return (
        <div className={cx(props.stateCart ? 'container-item-payed' : 'container-item')}>
            {props.stateCart ? (
                <div className={cx('check-box')}>
                    <input type="checkbox" onClick={handleCheck} disabled={props.stateCart ? true : false} />
                </div>
            ) : (
                <div className={cx('check-box')}>
                    {props.select ? (
                        <input type="checkbox" onClick={handleCheck} checked />
                    ) : (
                        <input type="checkbox" onClick={handleCheck} />
                    )}
                </div>
            )}
            <div className={cx('product')}>
                <span className={cx('product-img')}>
                    <img src={data.imgDes} alt="Cart" />
                </span>
                <span className={cx('product-name')}>
                    <Link className={cx('name')}>
                        <p>{data.name}</p>
                    </Link>
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
                {!props.stateCart ? (
                    <div>
                        <span className={cx('subtraction')} onClick={handleReduce}>
                            <RiSubtractFill />
                        </span>
                        <span className={cx('number')}>{quantity}</span>
                        <span className={cx('summation')} onClick={handleIncrease}>
                            <IoIosAdd />
                        </span>
                        {confirm ? <span className={cx('notice')}>Ít nhất 1 quyển!</span> : ''}
                        {notice ? <span className={cx('notice')}>Tối đa 3 quyển!</span> : ''}
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className={cx('money')}>
                {!props.stateCart ? (
                    <div>
                        {solveString(price * quantity)}
                        <span className={cx('unit')}>đ</span>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className={cx('trash')}>
                <FaTrashAlt className={cx('icon-trash')} />
            </div>
        </div>
    );
}

export default CartItem;

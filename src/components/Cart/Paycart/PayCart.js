import classNames from 'classnames/bind';
import styles from './PayCart.module.scss';

import axios from 'axios';
import { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { BsTelephone } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { AiTwotoneHome } from 'react-icons/ai';

import Confirm from '~/components/ConfirmPayment/ConfirmSuccess';

const cx = classNames.bind(styles);

function PayCart() {
    document.title = 'Thanh toán | My Library';

    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const [shipFee, setShipFee] = useState(0);
    const [totalBill, setTotalBill] = useState(0);
    const [index2, setIndex2] = useState(0);
    const [state, setState] = useState(false);
    const [checkPay, setCheckPay] = useState(false);
    const [checkPayType, setCheckPayType] = useState([true, false, false, false]);

    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setUser(location.state.user);
            setData(location.state.card);
            setTotalBill(location.state.totalBill);
        }
    }, [location.state]);

    const solveString = (num) => {
        if (num === 0) {
            return '0';
        } else {
            const str = num.toString();
            return str.slice(0, str.length - 3) + '.' + str.slice(str.length - 3, str.length);
        }
    };

    const countSalse = (value) => {
        if (value >= 200000) {
            return Number(value * 0.02);
        } else if (value >= 500000) {
            return Number(value * 0.05);
        } else if (value >= 1000000) {
            return Number(value * 0.1);
        } else {
            return 0;
        }
    };

    const renderCart = data.map((item, index) => {
        return (
            <div key={index} className={cx('item-card')}>
                <span className={cx('img')}>
                    <img src={item.value.imgDes} alt="" />
                </span>
                <span className={cx('name')}>
                    <p>{item.value.name}</p>
                    <p>SL: x{item.quantity}</p>
                </span>
                <span className={cx('price')}>
                    {solveString(item.value.price)}
                    <span className={cx('unit')}>đ</span>
                </span>
            </div>
        );
    });

    const handleCheckShip = () => {
        if (!state) {
            setShipFee(15000);
        } else {
            setShipFee(0);
        }
        setState(!state);
    };

    const handleCheckPay = (index) => {
        checkPayType[index2] = false;
        checkPayType[index] = true;
        setIndex2(index);
        setCheckPayType(checkPayType);
    };

    const handlePay = (e) => {
        e.preventDefault();
        const dataBill = {
            totalPrice: totalBill - countSalse(totalBill) + shipFee,
            pay: !checkPayType[0],
            listCart: data,
        };
        axios
            .post('https://be-library.vercel.app/user/pay', dataBill, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.accessToken}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setCheckPay(true);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={cx('container__page')}>
            <div className={cx('container__page-header')}>
                <div className={cx('item-header1')}>
                    <div className={cx('text')}>Thanh toán</div>
                </div>
                <div className={cx('logo')}>
                    <Link to="/home" state={''}>
                        <span className={cx('icon')}></span>
                    </Link>
                </div>

                <div className={cx('item-header2')}>
                    <div className={cx('icon-tel')}>
                        <BsTelephone />
                    </div>
                    <div className={cx('content')}>
                        <span className={cx('tel')}>1900 - 6080</span>
                        <span>8h - 20h, cả T7 & CN</span>
                    </div>
                </div>
            </div>
            <div className={cx('container__page-body')}>
                {checkPay ? <Confirm text="Bạn đã mua hàng thành công!" user={user} /> : ''}
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-9')}>
                            <div className={cx('container__left')}>
                                <div className={cx('container__delevery')}>
                                    <h2>Chọn hình thức giao hàng</h2>
                                    <div className={cx('content')}>
                                        <div className={cx('item-1')}>
                                            <span className={cx(state ? 'checked' : 'check')}>
                                                <label
                                                    className={cx('label')}
                                                    htmlFor="check"
                                                    onClick={() => handleCheckShip(0)}
                                                ></label>
                                                <input type="checkbox" id="check" />
                                            </span>
                                            <span className={cx('now')}>NOW</span>
                                            <span>Giao Ngay</span>
                                            <span className={cx('price-del')}>15K</span>
                                        </div>
                                        <div className={cx('item-2')}>
                                            <span className={cx(!state ? 'checked' : 'check')}>
                                                <label
                                                    className={cx('label')}
                                                    htmlFor="check"
                                                    onClick={() => handleCheckShip(1)}
                                                ></label>
                                                <input type="checkbox" id="check" />
                                            </span>
                                            <span className={cx('fast')}>FAST</span>
                                            <span>Giao Tiết Kiệm</span>
                                            <span className={cx('price-del')}>FREE</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('container__card')}>
                                    <h2>Đơn hàng</h2>
                                    <div className={cx('container__item')}>{renderCart}</div>
                                    <div className={cx('time-delivery')}>
                                        <span className={cx('icon-truck')}>
                                            <TbTruckDelivery />
                                        </span>
                                        {state ? (
                                            <span>Giao trong ngày mai!</span>
                                        ) : (
                                            <span>Giao sau hai ngày tới!</span>
                                        )}
                                    </div>
                                </div>

                                <div className={cx('container__payType')}>
                                    <h2>Chọn hình thức thanh toán</h2>
                                    <div className={cx('containter__type')}>
                                        <div className={cx('item-type')}>
                                            <span className={cx(checkPayType[0] ? 'checked' : 'check')}>
                                                <label
                                                    className={cx('label')}
                                                    htmlFor="check"
                                                    onClick={() => handleCheckPay(0)}
                                                ></label>
                                                <input
                                                    type="checkbox"
                                                    id="check"
                                                    onClick={(e) => console.log(e.target.value)}
                                                />
                                            </span>
                                            <span className={cx('img')}>
                                                <img
                                                    src="https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png"
                                                    alt=""
                                                />
                                            </span>
                                            <span className={cx('text')}>Thanh toán tiền mặt khi nhận hàng</span>
                                        </div>
                                        <div className={cx('item-type')}>
                                            <span className={cx(checkPayType[1] ? 'checked' : 'check')}>
                                                <label
                                                    className={cx('label')}
                                                    htmlFor="check"
                                                    onClick={() => handleCheckPay(1)}
                                                ></label>
                                                <input
                                                    type="checkbox"
                                                    id="check"
                                                    onClick={(e) => console.log(e.target.value)}
                                                />
                                            </span>
                                            <span className={cx('img')}>
                                                <img
                                                    src="https://salt.tikicdn.com/ts/upload/ce/f6/e8/ea880ef285856f744e3ffb5d282d4b2d.jpg"
                                                    alt=""
                                                />
                                            </span>
                                            <span className={cx('text')}>Thanh toán bằng ví MoMo</span>
                                        </div>

                                        <div className={cx('item-type')}>
                                            <span className={cx(checkPayType[2] ? 'checked' : 'check')}>
                                                <label
                                                    className={cx('label')}
                                                    htmlFor="check"
                                                    onClick={() => handleCheckPay(2)}
                                                ></label>
                                                <input
                                                    type="checkbox"
                                                    id="check"
                                                    onClick={(e) => console.log(e.target.value)}
                                                />
                                            </span>
                                            <span className={cx('img')}>
                                                <img
                                                    src="https://salt.tikicdn.com/ts/upload/2f/43/da/dd7ded6d3659036f15f95fe81ac76d93.png"
                                                    alt=""
                                                />
                                            </span>
                                            <span className={cx('text')}>Thanh toán bằng ví ZaloPay</span>
                                        </div>

                                        <div className={cx('item-type')}>
                                            <span className={cx(checkPayType[3] ? 'checked' : 'check')}>
                                                <label
                                                    className={cx('label')}
                                                    htmlFor="check"
                                                    onClick={() => handleCheckPay(3)}
                                                ></label>
                                                <input
                                                    type="checkbox"
                                                    id="check"
                                                    onClick={(e) => console.log(e.target.value)}
                                                />
                                            </span>
                                            <span className={cx('img')}>
                                                <img
                                                    src="https://salt.tikicdn.com/ts/upload/5f/f9/75/d7ac8660aae903818dd7da8e4772e145.png"
                                                    alt=""
                                                />
                                            </span>
                                            <span className={cx('text')}>Thanh toán bằng ví ViettelMoney</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-3')}>
                            <div className={cx('container__right')}>
                                <div className={cx('container__infor')}>
                                    <div className={cx('container__infor-header')}>
                                        <span>Giao tới</span>
                                        <span className={cx('btn-change')}>Thay đổi</span>
                                    </div>

                                    <div className={cx('container__infor-content')}>
                                        <div className={cx('information-user')}>
                                            <span className={cx('fullName')}>{user.fullName}</span>
                                            <span>{user.tel}</span>
                                        </div>
                                        <div className={cx('address')}>
                                            <span className={cx('address-icon')}>
                                                <AiTwotoneHome className={cx('icon-address')} />
                                            </span>
                                            <span className={cx('address-detail')}>{user.address}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('container__money')}>
                                    <div className={cx('container__money-anti')}>
                                        <span>Tạm tính</span>
                                        <span className={cx('container__money-anti-value')}>
                                            {solveString(totalBill)} đ
                                        </span>
                                    </div>
                                    <div className={cx('container__money-discount')}>
                                        <span>Giảm giá</span>
                                        {countSalse(totalBill) > 0 ? (
                                            <span className={cx('container__money-discount-value')}>
                                                -{solveString(countSalse(totalBill))} đ
                                            </span>
                                        ) : (
                                            <span className={cx('container__money-discount-value')}>
                                                {solveString(countSalse(totalBill))} đ
                                            </span>
                                        )}
                                    </div>
                                    <div className={cx('container__money-delivery')}>
                                        <span>Phí vận chuyển</span>
                                        {state ? (
                                            <span className={cx('container__money-delivery-value')}>
                                                +{solveString(shipFee)} đ
                                            </span>
                                        ) : (
                                            <span className={cx('container__money-delivery-value')}>
                                                {solveString(shipFee)} đ
                                            </span>
                                        )}
                                    </div>
                                    <div className={cx('container__money-total')}>
                                        <span>Tổng tiền</span>
                                        <span className={cx('container__money-total-value')}>
                                            {solveString(totalBill - countSalse(totalBill) + shipFee)}
                                            <span className={cx('unit')}>đ</span>
                                        </span>
                                    </div>
                                    <div className={cx('container__btn-buy')}>
                                        <button onClick={handlePay}>Đặt hàng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PayCart;

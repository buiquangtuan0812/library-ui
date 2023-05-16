import classNames from 'classnames/bind';
import styles from './ReturnBook.module.scss';

import Bill from './ConfirmPay/Confirm';
import ConfirmSuccess from '~/components/ConfirmSuccess/ConfirmSuccess';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { MdPayments } from 'react-icons/md';

const cx = classNames.bind(styles);

function ReturnBook(props) {
    document.title = 'Employee | Return Book';
    const [tel, setTel] = useState('');
    const [state, setState] = useState(false);
    const [notice, setNotice] = useState(false);
    const [employee, setEmployee] = useState({});
    const [lend, setLend] = useState({});
    const [index, setIndex] = useState(undefined);
    const [lends, setLends] = useState([]);
    const [success, setSuccess] = useState(false);

    const handleChild = (state) => {
        setState(state);
    };

    const handleChildData = (data) => {
        lends[data.index] = data.lend;
        setLends([...lends]);
        setState(data.state);
        setSuccess(data.success);
    };

    const hanleOnChange = (value) => {
        setNotice(false);
        setTel(value);
    };

    useEffect(() => {
        setEmployee(props.data);
        axios
            .get('http://localhost:8086/employee/lends', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${props.data.token}`,
                },
            })
            .then((res) => {
                setLends(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    const handleSearch = (e) => {
        e.preventDefault();
        axios
            .get('http://localhost:8086/employee/find/customer', { params: { tel: tel } })
            .then((res) => {
                if (res.data.message) {
                    setNotice(true);
                } else {
                    setNotice(false);
                }
            })
            .catch((err) => console.error(err));
    };
    const showBill = (value, index) => {
        if (lend.state === true) {
            return;
        } else {
            setState(true);
            setLend(value);
            setIndex(index);
        }
    };

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

    const renderLend = useCallback(
        lends.map((lend, index) => {
            if (lend.customer.tel.includes(tel)) {
                return (
                    <tr className={cx('lend-item')} key={index}>
                        <td className={cx('title-index')}>
                            <Link>{Number(`${index}`) + 1}</Link>
                        </td>
                        <td className={cx('title-name')}>
                            <Link>{lend.customer.name}</Link>
                        </td>
                        <td className={cx('title-tel')}>
                            <Link>{lend.customer.tel}</Link>
                        </td>
                        <td className={cx('title-buy')}>
                            <Link>{lend.orderBooks.length}</Link>
                        </td>
                        <td className={cx('title-buy')}>
                            <Link>{solveTime(lend.created_at)}</Link>
                        </td>
                        <td className={cx('title-buy')}>
                            <Link>{!lend.state ? 'Chưa thanh toán' : 'Đã thanh toán'}</Link>
                        </td>

                        <td className={cx('title-option')} onClick={() => showBill(lend, index)}>
                            <Link>
                                <MdPayments />
                            </Link>
                        </td>
                    </tr>
                );
            }
        }),
        [lends, tel],
    );

    if (success) {
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
    }

    return (
        <div className={cx('container__return')}>
            {state ? (
                <Bill
                    lend={lend}
                    employee={employee}
                    index={index}
                    handleChild={handleChild}
                    handleChildData={handleChildData}
                />
            ) : (
                ''
            )}
            <div className={cx('container__return-heading')}>
                <h3 className={cx('item-1')}>Danh sách khách hàng</h3>
                <div className={cx('item-2')}>
                    <input
                        placeholder="Nhập số điện thoại"
                        type="text"
                        onChange={(e) => hanleOnChange(e.target.value)}
                    />
                    <BiSearch className={cx('icon-search')} onClick={handleSearch} />
                </div>
                <div className={cx('item-3')}>
                    <button>
                        <IoMdAdd className={cx('icon-add')} />
                        Thêm KH
                    </button>
                </div>
            </div>

            {success ? <ConfirmSuccess type={false} text="Thanh toán trả sách thành công!" /> : ''}
            <div className={cx('container__lend')}>
                <div>
                    <table className={cx('table')}>
                        <thead>
                            <tr className="header">
                                <th scope="col" className={cx('header-title-index')}>
                                    STT
                                </th>
                                <th scope="col" className={cx('header-title')}>
                                    Tên khách hàng
                                </th>
                                <th scope="col" className={cx('header-title')}>
                                    Số điện thoại
                                </th>
                                <th scope="col" className={cx('header-title')}>
                                    Số lượng thuê
                                </th>
                                <th scope="col" className={cx('header-title')}>
                                    Ngày thuê
                                </th>
                                <th scope="col" className={cx('header-title')}>
                                    Trạng thái
                                </th>
                                <th scope="col" className={cx('header-title-option')}>
                                    Thanh toán
                                </th>
                            </tr>
                        </thead>
                        <tbody>{notice ? ' ' : renderLend}</tbody>
                        {/* {!notice ? <tbody>{renderLend}</tbody> : <tbody></tbody>} */}
                    </table>
                    {notice ? (
                        <div className={cx('container__notice')}>
                            <img
                                src="https://birli.es/wp-content/uploads/2019/12/errores-en-Instagram-1-2048x1365.jpg"
                                alt=""
                            />
                            Không tìm thấy khách hàng!
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReturnBook;

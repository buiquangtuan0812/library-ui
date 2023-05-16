import classNames from 'classnames/bind';
import styles from './Lend.module.scss';

import Confirm from '../ConfirmAdd/Confirm';
import BillLend from '../BillLend/BillLend';
import ConfirmSucess from '../../ConfirmSuccess/ConfirmSuccess';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { IoAddCircleOutline } from 'react-icons/io5';

const cx = classNames.bind(styles);

function Lend(props) {
    document.title = 'Employee | Lend Book';
    const [tel, setTel] = useState('');
    const [show, setShow] = useState(false);
    const [state, setState] = useState(false);
    const [success, setSuccess] = useState(false);
    const [notice, setNotice] = useState(false);
    const [employee, setEmployee] = useState({});
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState({});
    const [index, setIndex] = useState(undefined);
    const [confirm, setConfirm] = useState(false);

    const handleChildData = (data) => {
        setShow(data.state);
        setCustomers(data.customers);
        setSuccess(data.confirm);
    };
    const handleChild = (data) => {
        if (data.customer !== {}) {
            setConfirm(data.success);
            setState(data.state);
            customers[data.index] = data.customer;
            setCustomers([...customers]);
        } else {
            setState(data.state);
        }
    };

    useEffect(() => {
        setEmployee(props.data);
        axios
            .get('http://localhost:8086/employee/get/customers', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${props.data.token}`,
                },
            })
            .then((res) => {
                setCustomers(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const hanleOnChange = (value) => {
        setNotice(false);
        setTel(value);
    };

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
        setState(true);
        setCustomer(value);
        setIndex(index);
    };

    const renderCustomer = useCallback(
        customers.map((customer, index) => {
            if (customer.tel.includes(tel)) {
                return (
                    <tr className={cx('customer-item')} key={index}>
                        <td className={cx('title-index')}>
                            <Link>{Number(`${index}`) + 1}</Link>
                        </td>
                        <td className={cx('title-name')}>
                            <Link>{customer.name}</Link>
                        </td>
                        <td className={cx('title-tel')}>
                            <Link>{customer.tel}</Link>
                        </td>
                        <td className={cx('title-buy')}>
                            <Link>{customer.renting}</Link>
                        </td>
                        <td className={cx('title-buy')}>
                            <Link>{customer.returned}</Link>
                        </td>
                        <td className={cx('title-coin')}>
                            <Link>{customer.start}</Link>
                        </td>
                        <td className={cx('title-option')} onClick={() => showBill(customer, index)}>
                            <Link>
                                <IoAddCircleOutline />
                            </Link>
                        </td>
                    </tr>
                );
            }
        }),
        [customers, tel],
    );

    if (confirm) {
        setTimeout(() => {
            setConfirm(false);
        }, 3000);
    }

    return (
        <div className={cx('container__lend')}>
            {state ? (
                <BillLend
                    state={state}
                    employee={employee}
                    customer={customer}
                    index={index}
                    handleChild={handleChild}
                />
            ) : (
                ''
            )}
            {confirm ? <ConfirmSucess type={false} text="Cho thuê sách thành công!" /> : ''}

            {show ? <Confirm employee={employee} customers={customers} handleChildData={handleChildData} /> : ''}
            {success ? <ConfirmSucess type={false} text="Thêm mới khách hàng thành công!" /> : ''}
            <div className={cx('container__lend-heading')}>
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
                    <button onClick={() => setShow(true)}>
                        <IoMdAdd className={cx('icon-add')} />
                        Thêm KH
                    </button>
                </div>
            </div>

            <div className={cx('container__customer')}>
                <div>
                    <table className={cx('table')}>
                        <thead>
                            <tr className="header">
                                <th scope="col" className={cx('header-title-index')}>
                                    STT
                                </th>
                                <th scope="col" className={cx('header-title')}>
                                    Tên
                                </th>
                                <th scope="col" className={cx('header-title')}>
                                    Số điện thoại
                                </th>
                                <th scope="col" className={cx('header-title')}>
                                    Đang thuê
                                </th>
                                <th scope="col" className={cx('header-title')}>
                                    Đã trả
                                </th>
                                <th scope="col" className={cx('header-title')}>
                                    Điểm tích lũy
                                </th>
                                <th scope="col" className={cx('header-title-option')}>
                                    Thêm
                                </th>
                            </tr>
                        </thead>
                        <tbody>{notice ? '' : renderCustomer}</tbody>
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

export default Lend;

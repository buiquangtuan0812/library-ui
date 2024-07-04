import classNames from 'classnames/bind';
import styles from './ManagementBook.module.scss';

import axios from 'axios';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { BiSearch } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';
import { FaSupple } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

import Navigation from '../Navigation/Navigation';

const cx = classNames.bind(styles);

function ManagementBook() {
    document.title = 'Management Book';
    const [dataBook, setdataBook] = useState([]);
    const [nameBook, setnameBook] = useState('');
    const [id, setId] = useState(1);
    const [indexNav, setIndex] = useState(0);
    const [admin, setDataUser] = useState({});
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setDataUser(location.state.admin);
            setIndex(location.state.index);
        }
        axios
            .get('https://be-library.vercel.app/library/books')
            .then((res) => setdataBook(res.data))
            .catch((err) => {
                console.error(err);
            });
    }, [location.state]);

    const renderBooks = useCallback(
        dataBook.map((book, index) => {
            if (index < 15 * (id - 1) || index >= 15 * id) {
                return;
            } else {
                return (
                    <tr className={cx('manage__book-item')} key={index}>
                        <td className={cx('title-index')}>{Number(`${index}`) + 1}</td>
                        <td className={cx(book.name.length > 50 ? 'title-books' : 'title-book')}>{book.name}</td>
                        <td className={cx('title-author')}>{book.author}</td>
                        <td className={cx('title-type')}>{book.type}</td>
                        <td className={cx('title-price')}>{book.publish}</td>
                        <td className={cx('title-quantity')}>{book.numberPage}</td>
                        <td className={cx('title-quantity')}>{book.sold}</td>
                        <td className={cx('details_book')}>
                            <Link
                                to={`/admin/manage/book/${book.name}`}
                                state={{ book: book, admin: admin, index: indexNav }}
                            >
                                <i className={cx('fa-solid fa-circle-info')}></i>
                            </Link>
                        </td>
                    </tr>
                );
            }
        }),
        [dataBook, id],
    );

    const handleSearch = () => {
        axios
            .get('https://be-library.vercel.app/library/books/search', { params: { name: nameBook } })
            .then((response) => {
                if (response.data.length > 1) {
                    setdataBook(response.data);
                } else {
                    setdataBook([response.data]);
                }
            })
            .catch((err) => console.error(err));
    };

    const [indexArr, setArr] = useState([true, false, false, false, false]);
    const handleDivide = (value) => {
        const arr = [false, false, false, false, false];
        for (var i = 0; i < arr.length; i++) {
            if (value === i + 1) {
                arr[i] = true;
            }
        }
        setArr(arr);
        setId(value);
    };
    const handlePre = () => {
        if (id === 1) {
            return;
        } else {
            const value = id - 1;
            const arr = [false, false, false, false];
            for (var i = 0; i < arr.length; i++) {
                if (value === i + 1) {
                    arr[i] = true;
                }
            }
            setArr(arr);
            setId(value);
        }
    };

    const handleNext = () => {
        if (id === 5) {
            return;
        } else {
            const value = id + 1;
            const arr = [false, false, false, false];
            for (var i = 0; i < arr.length; i++) {
                if (value === i + 1) {
                    arr[i] = true;
                }
            }
            setArr(arr);
            setId(value);
        }
    };

    const hanleOnChange = (e) => {
        setnameBook(e);
    };
    const handleFilter = (e) => {
        if (e === '') {
            axios
                .get('https://be-library.vercel.app/library/books')
                .then((response) => {
                    setdataBook(response.data);
                })
                .catch((err) => console.error(err));
        } else {
            axios
                .get('https://be-library.vercel.app/library/books/get-by-type', { params: { type: e } })
                .then((response) => {
                    setdataBook(response.data);
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <div className={cx('container__page')}>
            <Navigation data={admin} index={indexNav} />
            <div className={cx('container__manage')}>
                <div className={cx('header__admin')}>
                    <div className={cx('header__admin-statistic')}>
                        <span className={cx('header__admin-statistic-item')}>
                            <Link to="/admin/home" state={{ user: admin }}>
                                <AiOutlineHome className={cx('icon-header')}></AiOutlineHome>
                                Trang chủ
                            </Link>
                        </span>

                        <span className={cx('header__admin-statistic-item')}>
                            <FaSupple className={cx('icon-header')}></FaSupple>
                            Nhà cung cấp
                        </span>
                        <span className={cx('header__admin-statistic-item')}>
                            <i className={cx('fa-solid fa-user-tie')}></i>
                            Nhân viên
                        </span>
                    </div>
                    <div className={cx('header__admin-interact')}>
                        <span className={cx('header__admin-interact-item')}>
                            <i className={cx('fa-regular fa-envelope')}></i>
                            <span>3</span>
                        </span>
                        <span className={cx('header__admin-interact-item')}>
                            <i className={cx('fa-regular fa-bell')}></i>
                            <span>2</span>
                        </span>
                        <span className={cx('header__admin-interact-item')}>
                            <GrUserAdmin className={cx('icon-admin')}></GrUserAdmin>
                            Admin
                        </span>
                    </div>
                </div>
                <div className={cx('container__manage-header')}>
                    <div className={cx('container__manage-header-title')}>Danh sách</div>
                    <div className={cx('container__manage-header-search')}>
                        <input
                            placeholder="Nhập tên sách"
                            type="text"
                            onChange={(e) => hanleOnChange(e.target.value)}
                        />
                        <BiSearch className={cx('icon-search')} onClick={handleSearch} />
                    </div>
                    <div className={cx('container__manage-header-filter')}>
                        <select onChange={(e) => handleFilter(e.target.value)}>
                            <option value="">Tất cả</option>
                            <option value="Văn học">Văn học</option>
                            <option value="Kinh tế">Kinh tế</option>
                            <option value="History">Lịch sử</option>
                            <option value="Chiêm nghiệm cuộc sống">Chiêm nghiệm</option>
                            <option value="Psychology">Tâm lý học</option>
                            <option value="Kỹ năng sống">Kỹ năng sống</option>
                            <option value="Kỹ năng giao tiếp">Kỹ năng giao tiếp</option>
                            <option value="Phát triển bản thân">Phát triển bản thân</option>
                        </select>
                    </div>
                </div>
                <div className={cx('container__manage-main')}>
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th scope="col" className={cx('header-title-index')}>
                                    STT
                                </th>
                                <th scope="col" className={cx('header-title')}>
                                    Tên
                                </th>
                                <th scope="col" className={cx('header-title')}>
                                    Tác giả
                                </th>
                                <th scope="col" className={cx('header-title')}>
                                    Thể loại
                                </th>
                                <th scope="col" className={cx('header-title')}>
                                    Ngày phát hành
                                </th>
                                <th scope="col" className={cx('header-title')}>
                                    Số trang
                                </th>
                                <th scope="col" className={cx('header-title')}>
                                    Đã bán
                                </th>
                                <th scope="col" className={cx('header-title-option')}>
                                    Options
                                </th>
                            </tr>
                        </thead>
                        <tbody>{renderBooks}</tbody>
                    </table>
                </div>
                {dataBook.length > 15 ? (
                    <div className={cx('divide-page')}>
                        <span className={cx('icon-pre')} onClick={handlePre}>
                            <GrFormPrevious />
                        </span>
                        <span
                            className={cx(indexArr[0] === true ? 'index-curr' : 'index')}
                            onClick={() => handleDivide(1)}
                        >
                            1
                        </span>
                        <span
                            className={cx(indexArr[1] === true ? 'index-curr' : 'index')}
                            onClick={() => handleDivide(2)}
                        >
                            2
                        </span>
                        <span
                            className={cx(indexArr[2] === true ? 'index-curr' : 'index')}
                            onClick={() => handleDivide(3)}
                        >
                            3
                        </span>
                        <span
                            className={cx(indexArr[3] === true ? 'index-curr' : 'index')}
                            onClick={() => handleDivide(4)}
                        >
                            4
                        </span>
                        <span
                            className={cx(indexArr[4] === true ? 'index-curr' : 'index')}
                            onClick={() => handleDivide(5)}
                        >
                            5
                        </span>
                        <span>
                            <GrFormNext className={cx('icon-next')} onClick={handleNext} />
                        </span>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

export default ManagementBook;

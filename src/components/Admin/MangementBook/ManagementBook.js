import classNames from 'classnames/bind';
import styles from './ManagementBook.module.scss';

import axios from 'axios';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

const cx = classNames.bind(styles);

function ManagementBook(props) {
    const [dataBook, setdataBook] = useState([]);
    const [nameBook, setnameBook] = useState('');
    const [id, setId] = useState(1);
    const [dataUser, setDataUser] = useState({});

    useEffect(() => {
        setDataUser(props.data);
        axios
            .get('http://localhost:8086/library/books')
            .then((res) => setdataBook(res.data))
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const renderBooks = useCallback(
        dataBook.map((book, index) => {
            if (index < 20 * (id - 1) || index >= 20 * id) {
                return;
            } else {
                return (
                    <tr className={cx('manage__book-item')} key={index}>
                        <td className={cx('title-index')}>{Number(`${index}`) + 1}</td>
                        <td className={cx(book.name.length > 50 ? 'title-books' : 'title-book')}>{book.name}</td>
                        <td className={cx('title-author')}>{book.author}</td>
                        <td className={cx('title-type')}>{book.type}</td>
                        <td className={cx('title-price')}>{book.price}</td>
                        <td className={cx('title-quantity')}>100</td>
                        <td className={cx('details_book')}>
                            <Link to={`/admin/manage/book/${book.name}`} state={{ book: book, data: dataUser }}>
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
            .get('http://localhost:8086/library/books/search', { params: { name: nameBook } })
            .then((response) => {
                if (response.data.length > 1) {
                    setdataBook(response.data);
                } else {
                    setdataBook([response.data]);
                }
            })
            .catch((err) => console.error(err));
    };

    const [indexArr, setArr] = useState([true, false, false, false]);
    const handleDivide = (value) => {
        const arr = [false, false, false, false];
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
        if (id === 4) {
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

    return (
        <div className={cx('container__manage')}>
            <div className={cx('container__manage-header')}>
                <div className={cx('container__manage-header-title')}>Danh sách</div>
                <div className={cx('container__manage-header-search')}>
                    <form className={cx('d-flex')} action="/library/books/search" method="GET">
                        <input
                            className={cx('form-control')}
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            name="name"
                            onChange={(e) => setnameBook(e.target.value)}
                        />
                        <Link to={`/admin/manage/books/${nameBook}`}>
                            <button className={cx('btn')} type="submit" onClick={handleSearch}>
                                Tìm kiếm
                            </button>
                        </Link>
                    </form>
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
                                Giá
                            </th>
                            <th scope="col" className={cx('header-title')}>
                                Số lượng
                            </th>
                            <th scope="col" className={cx('header-title-option')}>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>{renderBooks}</tbody>
                </table>
            </div>
            <div className={cx('divide-page')}>
                <span className={cx('icon-pre')} onClick={handlePre}>
                    <GrFormPrevious />
                </span>
                <span className={cx(indexArr[0] === true ? 'index-curr' : 'index')} onClick={() => handleDivide(1)}>
                    1
                </span>
                <span className={cx(indexArr[1] === true ? 'index-curr' : 'index')} onClick={() => handleDivide(2)}>
                    2
                </span>
                <span className={cx(indexArr[2] === true ? 'index-curr' : 'index')} onClick={() => handleDivide(3)}>
                    3
                </span>
                <span className={cx(indexArr[3] === true ? 'index-curr' : 'index')} onClick={() => handleDivide(4)}>
                    4
                </span>
                <span>
                    <GrFormNext className={cx('icon-next')} onClick={handleNext} />
                </span>
            </div>
        </div>
    );
}

export default ManagementBook;

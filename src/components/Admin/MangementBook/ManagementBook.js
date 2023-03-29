import classNames from 'classnames/bind';
import styles from './ManagementBook.module.scss';

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function ManagementBook() {
    const [dataBook, setdataBook] = useState([]);
    const [nameBook, setnameBook] = useState('');
    const [book, setBook] = useState({});
    const [state, setState] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8086/library/books')
            .then((res) => setdataBook(res.data))
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const renderBooks = dataBook.map((book, index) => {
        return (
            <tr className={cx('manage__book-item')} key={index}>
                <td className={cx('title-index')}>{Number(`${index}`) + 1}</td>
                <td className={cx('title-book')}>{book.name}</td>
                <td className={cx('title-author')}>{book.author}</td>
                <td className={cx('title-type')}>{book.type}</td>
                <td className={cx('title-price')}>{book.price}</td>
                <td className={cx('title-quantity')}>100</td>
                <td className={cx('details_book')}>
                    <i className={cx('fa-solid fa-circle-info')}></i>
                </td>
            </tr>
        );
    });

    const handleSearch = () => {
        axios
            .get('http://localhost:8086/library/books/search', { params: { name: nameBook } })
            .then((response) => {
                console.log(response.data);
                setBook(response.data);
                setState(true);
            })
            .catch((err) => console.error(err));
    };
    return (
        <div className={cx('container__manage')}>
            <div className={cx('container__manage-header')}>
                <div className={cx('container__manage-header-title')}>Library book list</div>
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
                                Search
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
                                Name
                            </th>
                            <th scope="col" className={cx('header-title')}>
                                Author
                            </th>
                            <th scope="col" className={cx('header-title')}>
                                Type
                            </th>
                            <th scope="col" className={cx('header-title')}>
                                Price
                            </th>
                            <th scope="col" className={cx('header-title')}>
                                Quantity
                            </th>
                            <th scope="col" className={cx('header-title-option')}>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {state === false ? (
                            renderBooks
                        ) : (
                            <tr className={cx('manage__book-item')}>
                                <td className={cx('title-index')}>1</td>
                                <td className={cx('title-book-one')}>{book.name}</td>
                                <td className={cx('title-author')}>{book.author}</td>
                                <td className={cx('title-type')}>{book.type}</td>
                                <td className={cx('title-price')}>{book.price}</td>
                                <td className={cx('title-quantity')}>100</td>
                                <td className={cx('details_book')}>
                                    <i className={cx('fa-solid fa-circle-info')}></i>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManagementBook;

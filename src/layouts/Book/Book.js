import classNames from 'classnames/bind';
import styles from './Book.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Header from '~/components/Display/Header/Header';
import Footer from '~/components/Display/Footer/Footer';
import CategoryBook from './CategoryBook/CategoryBook';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function BookPage() {
    const [dataBook, setdataBook] = useState([]);
    const [inputBook, setinputBook] = useState('');
    document.title = 'Book | My Library';

    const [user, setUser] = useState([]);
    const location = useLocation();
    useEffect(() => {
        if (location.state) {
            setUser(location.state.user);
        }
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8086/library/books')
            .then((res) => setdataBook(res.data))
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const renderBook = useCallback(
        dataBook.map((book, index) => {
            return (
                <div className={cx('col-3')} key={index}>
                    <Link className={cx('link-item')} to={`/library/book/detail/${book.name}`} state={{ user: user }}>
                        <div className={cx('book-item')}>
                            <div className={cx('card')}>
                                <img src={book.imgDes} className={cx('card-img-top')} alt="..." />
                                <div className={cx('card-body')}>
                                    <div className={cx('card-title')}>
                                        <span className={cx('card-name')}>{book.name}</span>
                                        <span className={cx('card-text')}> ({book.author})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            );
        }),
        [dataBook],
    );

    const searchBook = () => {
        axios
            .get('http://localhost:8086/library/books/search', { params: { name: inputBook } })
            .then((response) => {
                if (response.data.length > 1) {
                    setdataBook(response.data);
                } else {
                    setdataBook([response.data]);
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <Header user={user} />
            <div className={cx('container')}>
                <div className={cx('separate')}></div>
                <div className={cx('btn-back')}>
                    <Link to="/home">
                        <i className={cx('fa-solid fa-arrow-left')}></i>
                        Back
                    </Link>
                </div>
                <div className={cx('row')}>
                    <div className={cx('col-2')}>
                        <CategoryBook user={user} />
                    </div>
                    <div className={cx('col-10')}>
                        <div className={cx('row')}>
                            <div className={cx('form-serach')}>
                                <div className={cx('col-1')} id="btnSubmit">
                                    {/* <Link to={`/library/book/detail/${inputBook}`}> */}
                                    <button onClick={searchBook} className={cx('btn-search')}>
                                        Search
                                    </button>
                                    {/* </Link> */}
                                </div>
                                <div className={cx('col-6 search__input form-group')}>
                                    <label htmlFor="name"></label>
                                    <input
                                        type="text"
                                        className={cx('input__value')}
                                        name="name"
                                        id="name"
                                        placeholder="Nhập từ khóa tìm kiếm!"
                                        value={inputBook}
                                        onChange={(e) => setinputBook(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('row row-cols-auto"')}>{renderBook}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BookPage;

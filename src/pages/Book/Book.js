import classNames from 'classnames/bind';
import styles from './Book.module.scss';
import Header from '~/components/Display/Header/Header';
import Footer from '~/components/Display/Footer/Footer';
import CategoryBook from './CategoryBook/CategoryBook';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

const cx = classNames.bind(styles);

function BookPage() {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [arrPage, setArr] = useState([]);
    const [numberCart, setNumberCart] = useState(0);
    const [dataBook, setdataBook] = useState([]);
    const [inputBook, setinputBook] = useState('');
    const [noticeSearch, setNoticeSearch] = useState(false);
    document.title = 'Book | My Library';

    const [user, setUser] = useState([]);
    const location = useLocation();
    useEffect(() => {
        if (location.state.user) {
            setUser(location.state.user);
        }
        axios
            .get('https://library-be-wine.vercel.app/users/cart', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${location.state.user.accessToken}`,
                },
            })
            .then((res) => {
                setNumberCart(res.data.length);
            })
            .catch((err) => console.error(err));
    }, [location.state]);

    const getBooks = (page) => {
        axios
            .get('https://library-be-wine.vercel.app/library/books', {
                params: {
                    page: page,
                },
            })
            .then((res) => {
                setdataBook(res.data.books);
                setTotalPage(res.data.totalPages);
                setPage(res.data.page);
                const arr = [];
                for (let i = 1; i <= res.data.totalPages; i++) {
                    if (i === page) {
                        arr.push(true);
                    } else {
                        arr.push(false);
                    }
                }
                setArr(arr);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getBooks(1);
    }, []);
    const renderBook = dataBook.map((book, index) => {
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
    });

    const searchBook = () => {
        axios
            .get('https://library-be-wine.vercel.app/library/books/search', { params: { key: inputBook } })
            .then((response) => {
                setdataBook(response.data);
                if (response.data.length > 0) {
                    setNoticeSearch(false);
                } else {
                    setNoticeSearch(true);
                }
            })
            .catch((err) => console.error(err));
    };
    const handleDivide = (value) => {
        setPage(value);
        getBooks(value);
    };
    const handlePre = () => {
        if (page === 1) {
            return;
        } else {
            const value = page - 1;
            getBooks(value);
            setPage(value);
        }
    };

    const handleNext = () => {
        if (page === totalPage) {
            return;
        } else {
            const value = page + 1;
            getBooks(value);
            setPage(value);
        }
    };

    const renderPage = arrPage.map((value, index) => {
        return (
            <span className={cx(value ? 'index-curr' : 'index')} onClick={() => handleDivide(index + 1)} key={index}>
                {index + 1}
            </span>
        );
    });

    return (
        <div>
            <Header user={user} numberCart={numberCart} page="book" />
            <div className={cx('container')}>
                <div className={cx('separate')}></div>
                <div className={cx('btn-back')}>
                    <Link to="/home">
                        <span>
                            <i className={cx('fa-solid fa-arrow-left')}></i>
                        </span>
                        Quay lại
                    </Link>
                </div>
                <div className={cx('row')}>
                    <div className={cx('col-2')}>
                        <CategoryBook user={user} />
                    </div>
                    <div className={cx('col-10')}>
                        <div className={cx('row')}>
                            <div className={cx('form-serach')}>
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
                                <div className={cx('col-2')} id="btnSubmit">
                                    <button onClick={searchBook} className={cx('btn-search')}>
                                        Tìm kiếm
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('row row-cols-auto"')}>{renderBook}</div>
                        {dataBook.length >= 20 && (
                            <div className={cx('divide-page')}>
                                <span className={cx('icon-pre')} onClick={handlePre}>
                                    <GrFormPrevious />
                                </span>
                                {renderPage}
                                <span>
                                    <GrFormNext className={cx('icon-next')} onClick={handleNext} />
                                </span>
                            </div>
                        )}
                        {noticeSearch && <div className={cx('notice-search')}>Không tìm thấy sách bạn muốn!</div>}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BookPage;

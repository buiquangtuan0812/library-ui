import classNames from 'classnames/bind';
import styles from './BookDetail.module.scss';

import Header from '~/components/Display/Header/Header';
import Footer from '~/components/Display/Footer/Footer';
import CategoryBook from '../Book/CategoryBook/CategoryBook';
import Comment from '~/components/Comment/Comment';

import { BsFillSendFill } from 'react-icons/bs';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function BookDetail() {
    let { nameBook } = useParams();
    const [book, setBook] = useState([]);
    document.title = 'Book | ' + nameBook;
    const [user, setUser] = useState([]);
    const [comment, setComment] = useState([]);
    const [cmtUser, setCmtUser] = useState('');
    const [stateCmt, setStateCmt] = useState(false);

    const location = useLocation();
    useEffect(() => {
        if (location.state) {
            setUser(location.state.user);
        }
    });

    useEffect(() => {
        axios
            .get('http://localhost:8086/users/cmt', { params: { nameBook: nameBook } })
            .then((cmts) => {
                setComment(cmts.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8086/library/books/detail', { params: { name: nameBook } })
            .then((res) => {
                setBook(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const renderCmt = comment.map((cmt, index) => {
        return (
            <div key={index}>
                <Comment user={cmt.user} title={cmt.title} />
            </div>
        );
    });

    const handleCmt = () => {
        const data = {
            username: user.username,
            nameBook: nameBook,
            title: cmtUser,
            img: user.imgDes,
        };
        axios
            .post('http://localhost:8086/users/cmt/create', data, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => {
                console.log(response.data);
                setStateCmt(true);
            })
            .catch((err) => console.log(err));
    };
    document.onkeyup = (e) => {
        const data = {
            username: user.username,
            nameBook: nameBook,
            title: cmtUser,
            img: user.imgDes,
        };
        if (e.key === 'Enter' && cmtUser !== '') {
            axios
                .post('http://localhost:8086/users/cmt/create', data, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then((response) => {
                    console.log(response.data);
                    setStateCmt(true);
                })
                .catch((err) => console.log(err));
        }
    };
    const countPrice = (price) => {
        const oldPrice = (Number(price) + (Number(price) * 20) / 100).toString();
        return oldPrice.slice(0, oldPrice.length - 3) + '.000';
    };
    const solveString = (num) => {
        const str = num.toString();
        return str.slice(0, str.length - 3) + '.000';
    };
    return (
        <div>
            <Header user={user} />
            <div className={cx('container')}>
                <div className={cx('separate')}></div>
                <div className={cx('btn-back')}>
                    <Link to="/library/books">
                        <i className={cx('fa-solid fa-arrow-left')}></i>
                        Back
                    </Link>
                </div>
                <div className={cx('row')}>
                    <div className={cx('col-2')}>
                        <CategoryBook user={user} />
                    </div>
                    <div className={cx('col-10')}>
                        <div className={cx('row row-cols-auto')}>
                            <div className={cx('col-8')}>
                                <nav className={cx('container__book-heading')}>
                                    <div id="nameBook">{book.name}</div>
                                    <div className={cx('book-author')}>Edit by {book.author}</div>
                                </nav>
                                <div className={cx('container__book-content')}>
                                    <h3>OVERVIEW</h3>
                                    <span className={cx('container__book-content-des')}>
                                        Description:
                                        <p>{book.description}</p>
                                    </span>
                                    <span className={cx('container__book-content-page')}>
                                        Number of pages:
                                        <p>{book.numberPage}</p>
                                    </span>
                                    <span className={cx('container__book-content-date')}>
                                        Date publish:
                                        <p>{book.publish}</p>
                                    </span>
                                    <span className={cx('container__book-content-type')}>
                                        Type:
                                        <p>{book.type}</p>
                                    </span>
                                    <span className={cx('container__book-content-language')}>
                                        Language:
                                        <p>{book.language}</p>
                                    </span>
                                    <span className={cx('container__book-content-company')}>
                                        Publisher:
                                        <p>{book.publishCompany}</p>
                                    </span>
                                </div>
                                <div className={cx('container__book-feedback')}>
                                    <h3>Rating - Comments from readers</h3>
                                    {comment.length ? renderCmt : <div className={cx('not-cmt')}>No reviews yet!</div>}
                                    <div className={cx(user.token ? 'comment__user' : 'hide')}>
                                        <div className={cx('imgDes-user')}>
                                            <img
                                                src="https://scontent.fhan5-10.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=vvZ-RZ-N9xEAX_I0180&_nc_ht=scontent.fhan5-10.fna&oh=00_AfBALTQWTvlWud1daS15sRYC6kcsWv3YwfAtwigrAgMlbg&oe=643ABAF8"
                                                alt=""
                                            />
                                        </div>
                                        <div className={cx('comment__user-text')}>
                                            <form>
                                                <textarea
                                                    className={cx('input-cmt')}
                                                    type="text"
                                                    placeholder="Write a review - comment"
                                                    name="comment"
                                                    spellCheck={false}
                                                    maxLength="200"
                                                    value={stateCmt ? '' : cmtUser}
                                                    onChange={(e) => setCmtUser(e.target.value)}
                                                />
                                                <BsFillSendFill className={cx('icon-send')} onClick={handleCmt} />
                                            </form>
                                            <span>Press Enter to post.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-4')}>
                                <div className={cx('container__book-cart')}>
                                    <div className={cx('container__book-cart-img')}>
                                        <img src={book.imgDes} alt="" />
                                    </div>
                                    <div className={cx('container__book-cart-price')}>
                                        <span>Price: </span>
                                        <span className={cx('value')}>{solveString(`${book.price}`)}đ</span>
                                    </div>
                                    <div className={cx('container__book-cart-save')}>
                                        <span>List Price:</span>
                                        <span>{countPrice(`${book.price}`)}đ</span>
                                        <span> (Save: 20%)</span>
                                        <p>Free shipping</p>
                                    </div>
                                    <div className={cx('bar-code-book')}></div>
                                    <div className={cx('container__book-cart-btn')}>
                                        <button>ADD TO CART</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BookDetail;

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Header from '~/components/Display/Header/Header';
import Footer from '~/components/Display/Footer/Footer';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const AuthorInfor = () => {
    const [user, setUser] = useState({});
    const [numberCart, setNumberCart] = useState(0);
    const [author, setAuthor] = useState({});
    const [literary, setLiterary] = useState([]);

    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setUser(location.state.user);
            axios
                .get('https://be-library.vercel.app/users/cart', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${location.state.user.accessToken}`,
                    },
                })
                .then((res) => {
                    setNumberCart(res.data.length);
                })
                .catch((err) => console.error(err));
        }
    }, [location.state]);

    useEffect(() => {
        axios
            .get('https://be-library.vercel.app/library/author/get_literary', {
                params: {
                    name: location.state.name,
                },
            })
            .then((res) => {
                setAuthor(res.data[0]);
                setLiterary(res.data[0].literary);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const renderBook = literary.map((item, index) => {
        return (
            <div key={index}>
                <Link className={cx('card')} to={`/library/book/detail/${item.name}`} state={{ user: user }}>
                    <img alt="" src={item.imgDes} />
                    <span>{item.name}</span>
                </Link>
            </div>
        );
    });

    return (
        <div>
            <Header user={user} numberCart={numberCart} page="home" />
            <div className={cx('container')}>
                <div className={cx('btn-back')}>
                    <Link to="/library/authors">
                        <span>
                            <i className={cx('fa-solid fa-arrow-left')}></i>
                        </span>
                        Quay lại
                    </Link>
                </div>
                <div className={cx('container__name')}>
                    <h3>{author.name}</h3>
                    <p>{author.birthday}</p>
                </div>
                <div className={cx('row row-cols-auto')}>
                    <div className={cx('col-8')}>
                        <div className={cx('container__image')}>
                            <img alt="" src={author.image} sizes="center" />
                        </div>

                        <div className={cx('container__intro')}>
                            <span>{author.introduce}</span>
                        </div>
                    </div>

                    <div className={cx('col-4')}>
                        <div className={cx('content')}>
                            <h2>Tác Phẩm</h2>
                            {renderBook}
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AuthorInfor;

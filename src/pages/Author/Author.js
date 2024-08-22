import axios from 'axios';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useLocation, Link } from 'react-router-dom';

import Header from '~/components/Display/Header/Header';
import Footer from '~/components/Display/Footer/Footer';
import styles from './Author.module.scss';

const cx = classNames.bind(styles);

const AuthorComponent = () => {
    const [user, setUser] = useState({});
    const [lstAuthor, setLstAuthor] = useState([]);
    const [numberCart, setNumberCart] = useState(0);

    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setUser(location.state.user);
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
        }
    }, [location.state]);

    useEffect(() => {
        axios
            .get('https://library-be-wine.vercel.app/library/author/get_all')
            .then((res) => {
                setLstAuthor(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const renderItem = lstAuthor.map((item, index) => {
        return (
            <div key={index} className={cx('col-3')}>
                <Link
                    to={`/library/author/infor/${item.name}`}
                    state={{ user: user, name: item.name }}
                    style={{ textDecoration: 'none', color: '#000' }}
                >
                    <div className={cx('card')}>
                        <div className={cx('image')}>
                            <img src={item.image} alt="" sizes="cover" />
                        </div>
                        <p className={cx('name')}>{item.name}</p>
                    </div>
                </Link>
            </div>
        );
    });

    return (
        <div>
            <Header user={user} numberCart={numberCart} page="author" />
            <div className={cx('container')}>
                <h3>Những tác giả xuất sắc trong thế kỷ XXI</h3>
                <div className={cx('row row-cols-auto')}>{renderItem}</div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthorComponent;

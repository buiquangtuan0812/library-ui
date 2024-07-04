import classNames from 'classnames/bind';
import styles from './Blog.module.scss';

import Header from '~/components/Display/Header/Header';
import Footer from '~/components/Display/Footer/Footer';

import { BsThreeDots } from 'react-icons/bs';
import { FaPen } from 'react-icons/fa';

import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Blog() {
    document.title = 'My Library | Blogs';
    const [blogs, setBlogs] = useState([]);
    const [dataUser, setUser] = useState([]);
    const [numberCart, setNumberCart] = useState(0);
    const location = useLocation();

    useEffect(() => {
        if (location.state.user) {
            setUser(location.state.user);
        }
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
        axios
            .get('https://be-library.vercel.app/library/blogs')
            .then((res) => setBlogs(res.data))
            .catch((err) => console.error(err));
    }, [location.state]);
    const countTime = (time) => {
        const currentTime = new Date();
        const timePost = new Date(time);
        const seconds = Math.floor((currentTime - timePost) / 1000);
        const minutes = Math.floor((currentTime - timePost) / (1000 * 60));
        const hours = Math.floor((currentTime - timePost) / (1000 * 60 * 60));
        const days = Math.floor((currentTime - timePost) / (1000 * 60 * 60 * 24));
        var months =
            (currentTime.getFullYear() - timePost.getFullYear()) * 12 + (currentTime.getMonth() - timePost.getMonth());
        if (currentTime.getDate() < timePost.getDate()) {
            months--;
        }
        if (months === 0) {
            if (days === 0) {
                if (hours === 0) {
                    if (minutes === 0) {
                        return seconds + ' giây trước';
                    } else {
                        return minutes + ' phút trước';
                    }
                } else {
                    return hours + ' giờ trước';
                }
            } else {
                return days + ' ngày trước';
            }
        } else {
            return months + ' tháng trước';
        }
    };

    const sovleString = (string) => {
        return string.slice(0, 1).toUpperCase() + string.slice(1, string.length);
    };

    const renderBlogs = blogs.map((blog, index) => {
        return (
            <Link
                key={index}
                to={`/library/blog-detail/${blog._id}`}
                state={dataUser ? { user: dataUser, idBlog: blog._id } : { idBlog: blog._id }}
                className={cx('blog-detail')}
            >
                <div className={cx('container__blog')}>
                    <div className={cx('container__blog-header')}>
                        <span className={cx('img-author')}>
                            <img alt="" src={blog.author.imgDes} />
                            {sovleString(blog.author.name)}
                        </span>
                        <span>
                            <BsThreeDots />
                        </span>
                    </div>
                    <div className={cx('container__blog-title')}>
                        <div className={cx('nav-left')}>
                            <p className={cx('title')}>{blog.title}</p>
                            <p className={cx('shortDes')}>{blog.shortDes}</p>
                        </div>

                        <div className={cx('nav-right')}>
                            <img src={blog.content.image} alt="" />
                        </div>
                    </div>

                    <div className={cx('time-post')}>{countTime(blog.created_at)}</div>
                </div>
            </Link>
        );
    });

    return (
        <div>
            <Header user={dataUser} numberCart={numberCart} page="blog" />
            <div className={cx('container')}>
                <div className={cx('header-page')}>
                    <div>
                        <h1>Bài viết nổi bật</h1>
                        <p>Tổng hợp các bài viết chia sẻ về sách.</p>
                    </div>
                    <div className={cx('btn-create')}>
                        <Link to={'/library/blogs/create'} state={dataUser ? { user: dataUser } : ''}>
                            <button>
                                <FaPen className={cx('icon-pen')} /> Viết blog
                            </button>
                        </Link>
                    </div>
                </div>

                <div className={cx('container_list-blog')}>
                    <div className={cx('row')}>
                        <div className={cx('col-9')}>{renderBlogs}</div>
                        <div className={cx('col-3')}>
                            <div className={cx('container_suggest')}>
                                <h1>Các chủ đề được đề xuất</h1>
                                <div>
                                    <span>Sách</span>
                                    <span>Tác giả</span>
                                    <p>Góc suy ngẫm</p>
                                    <span>Tán văn hay</span>
                                    <p>Văn hóa đọc</p>
                                    <span>Other</span>
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

export default Blog;

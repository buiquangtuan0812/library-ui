import classNames from 'classnames/bind';
import styles from './BlogDetail.module.scss';

import AccountReview from '../../components/AccountReview/AccountReview';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Link, useLocation } from 'react-router-dom';

import { BsThreeDots, BsFillBookmarkFill } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import axios from 'axios';

const cx = classNames.bind(styles);

function BlogDetail() {
    const location = useLocation();
    const _id = location.state.idBlog;
    const [user, setUser] = useState({});
    const [contentBlog, setContentBlog] = useState({});
    const [author, setAuthor] = useState({});
    useEffect(() => {
        if (location.state.user) {
            setUser(location.state.user);
        }
        axios
            .get('http://localhost:8086/library/blogs/details', { params: { _id: location.state.idBlog } })
            .then((res) => {
                setAuthor(res.data.blog.author);
                setContentBlog(res.data.blog.content);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [location.state, _id]);

    const renderTippy = (prop) => {
        return (
            <div>
                <AccountReview />
            </div>
        );
    };

    // const sovleString = (string) => {
    //     return string.slice(0, 1).toUpperCase() + string.slice(1, string.length);
    // };
    return (
        <div>
            <div className={cx('header')}>
                <div className={cx('btn-back')}>
                    <span className={cx('icon-back')}>
                        <MdOutlineArrowBackIosNew />
                    </span>
                    <span className={cx('back')}>
                        <Link to="/library/blogs" state={{ user }}>
                            Quay lại
                        </Link>
                    </span>
                </div>
                <div className={cx('logo')}>
                    <Link to="/home" state={{ user }}>
                        <span className={cx('icon')}></span>
                    </Link>
                </div>
                <div className={cx('header-item')}>
                    <span className={cx('my-blog')}>Blog của tôi</span>
                    <span>
                        <FaBell className={cx('notification')} />
                    </span>
                    <Tippy render={renderTippy} interactive delay={[200, 100]} offset={[-85, 12]} placement="bottom">
                        <span className={cx('my-account')}>
                            <img className={cx('icon-user')} src={user.imgDes} alt="" />
                        </span>
                    </Tippy>
                </div>
            </div>
            <div className={cx('mt')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-2')}>
                            <div className={cx('container__left')}>
                                <div className={cx('container__left-user')}>
                                    <div className={cx('container__left-user-info')}>
                                        <img src={author.imgDes} alt="" />
                                        <span>{author.name}</span>
                                    </div>
                                </div>
                                <div className={cx('container__left-interact')}>
                                    <span>
                                        <AiOutlineHeart />
                                    </span>
                                    <span>
                                        <BsFillBookmarkFill />
                                    </span>
                                    <span>
                                        <BsThreeDots />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-7')}>
                            <div className={cx('container__content')}>
                                <ReactMarkdown children={contentBlog.text} remarkPlugins={[remarkGfm]} />
                            </div>
                        </div>
                        <div className={cx('col-3')}>
                            <div className={cx('container__cmtUser')}>
                                <div className={cx('container__cmtUser-header')}>
                                    <h3>Bình luận của độc giả</h3>
                                </div>
                                <div className={cx('container__cmtUser-notice')}>Chưa có bình luận từ độc giả!</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;

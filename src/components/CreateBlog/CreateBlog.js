import classNames from 'classnames/bind';
import styles from './CreateBlog.module.scss';

import Footer from '../Display/Footer/Footer';
import AccountReview from '../Display/AccountReview/AccountReview';
import ConfirmPost from './ConfirmPost/ConfirmPost';

// import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
// import '@wcj/dark-mode';

import Tippy from '@tippyjs/react/headless';

import { MdClear } from 'react-icons/md';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

const cx = classNames.bind(styles);

function CreateBlog() {
    document.title = 'Create Blog';
    const location = useLocation();
    const [user, setUser] = useState([]);
    const [state, setState] = useState(false);
    const [title, setTitle] = useState('');
    const [markdownVal, setMarkdownVal] = useState('');
    const toolbarConfig = {
        h1: true,
        h2: true,
        h3: true,
        h4: true,
        h5: true,
        img: true,
        bold: true,
        link: true,
        code: true,
        undo: true,
        expand: true,
    };
    const handleEditorChange = ({ html, text }) => {
        setMarkdownVal(text);
    };
    const render = (text) => {
        return <ReactMarkdown>{text}</ReactMarkdown>;
    };
    const handleShow = () => {
        if (title !== '' && markdownVal !== '') {
            setState(true);
        } else {
            return;
        }
    };
    const handleHide = () => {
        setState(false);
    };

    useEffect(() => {
        if (location.state.user) {
            setUser(location.state.user);
        }
    }, [user]);

    const renderTippy = (prop) => {
        return (
            <div>
                <AccountReview />
            </div>
        );
    };

    return (
        <div>
            <div className={cx(state ? 'hide' : '')}>
                <div className={cx('header')}>
                    <div className={cx('btn-back')}>
                        <span className={cx('icon-back')}>
                            <MdOutlineArrowBackIosNew />
                        </span>
                        <span className={cx('back')}>
                            <Link to="/library/blogs" state={{ user: user }}>
                                Quay lại
                            </Link>
                        </span>
                    </div>
                    <div className={cx('logo')}>
                        <Link to="/home" state={{ user: user }}>
                            <span className={cx('icon')}></span>
                        </Link>
                    </div>
                    <div className={cx('header-item')}>
                        <span className={cx(title !== '' && markdownVal !== '' ? 'btn-success-post' : 'btn-post')}>
                            <button onClick={handleShow}>Post Blog</button>
                        </span>
                        <span className={cx('my-blog')}>My blog</span>
                        <Tippy
                            render={renderTippy}
                            interactive
                            delay={[200, 100]}
                            offset={[-85, 12]}
                            placement="bottom"
                        >
                            <span className={cx('my-account')}>
                                <img className={cx('icon-user')} src={user.imgDes} alt="" />
                            </span>
                        </Tippy>
                    </div>
                </div>

                <div className={cx('container__createBlog')}>
                    <div className={cx('container__createBlog-header')}>
                        <input
                            type="text"
                            className={cx('input-title')}
                            placeholder="Title of blog"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className={cx('container__createBlog-content')}>
                        {/* <dark-mode dark="Dark" light="Light"></dark-mode> */}
                        <div className={cx('markdown-editor')}>
                            <MarkdownEditor
                                value={markdownVal}
                                placeholder="Edit blog content here"
                                renderHTML={(text) => render(text)}
                                onChange={handleEditorChange}
                                toolbar={toolbarConfig}
                                className={cx('editor')}
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            <div className={cx(!state ? 'hide' : '')}>
                <div className={cx('btn-back')} onClick={handleHide}>
                    <MdClear className={cx('icon-back')} />
                </div>
                <ConfirmPost title={title} markdownVal={markdownVal} user={user} />
            </div>
        </div>
    );
}

export default CreateBlog;

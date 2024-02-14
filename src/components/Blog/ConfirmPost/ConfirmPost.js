import classNames from 'classnames/bind';
import styles from './Confirm.module.scss';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { BsFillCloudUploadFill } from 'react-icons/bs';

const cx = classNames.bind(styles);

function ConfirmPost(props) {
    document.title = 'Create blog';
    const [urlImg, setUrl] = useState('');
    const [shortDes, setshortDes] = useState('');
    const [state, setState] = useState(false);
    const [check, setCheck] = useState(false);

    const convertToBase64 = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setUrl(reader.result);
            setState(true);
        };
        reader.onerror = (err) => {
            console.log(err);
        };
    };

    const handlePost = () => {
        const data = {
            name: props.user.username,
            imgDes: props.user.imgDes,
            title: props.title,
            role: props.user.role,
            shortDes: shortDes,
            content: {
                text: props.markdownVal,
                image: urlImg,
            },
        };
        axios
            .post('http://localhost:8086/library/blogs/create', data, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => {
                console.log(response.data);
                setCheck(true);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className={cx('container')}>
            <div className={cx(check ? 'confirm-success' : 'hide')}>
                <span className={cx('icon-success')}>
                    <i className={cx('fa-solid fa-circle-check')}></i>
                </span>
                <span className={cx('separate')}></span>
                <span className={cx('text')}>Bạn đã đăng blog thành công!</span>
                <Link to="/library/blogs" state={{ user: props.user }}>
                    <button>Quay lại</button>
                </Link>
            </div>
            <div className={cx('row')}>
                <div className={cx('col-6')}>
                    <div className={cx('nav-left')}>
                        <h2>Preview</h2>
                        <div className={cx(state ? 'hide' : 'simulation-img')}>
                            <label htmlFor="file">
                                <p>Adding a profile picture will make your blog more attractive to readers</p>
                                <p className={cx('icon-upload')}>
                                    <BsFillCloudUploadFill />
                                </p>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="file"
                                className={cx('chose-file')}
                                onChange={(e) => convertToBase64(e)}
                            />
                        </div>
                        {state ? (
                            <div>
                                <label htmlFor="file-change">
                                    <img src={urlImg} alt="" />
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="file-change"
                                    className={cx('change-file')}
                                    onChange={(e) => convertToBase64(e)}
                                />
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <div className={cx('col-6')}>
                    <div className={cx('nav-right')}>
                        <div className={cx('simulation-content')}>
                            <h2>{props.title}</h2>
                            <input placeholder="Description when shown" onChange={(e) => setshortDes(e.target.value)} />
                            <div>
                                <strong>Note</strong>: Editing here will change the way the article is displayed on the
                                homepage, featured news - Not the content of your article.
                            </div>
                        </div>

                        <div className={cx('btn-post')}>
                            <button onClick={handlePost}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmPost;

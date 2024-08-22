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
    const [objectImg, setObjectImg] = useState({});

    const convertToBase64 = (e) => {
        const file = e.target.files[0];
        const objectImg = {
            uri: '',
            name: file.name,
            type: file.type,
        };
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setUrl(reader.result);
            setState(true);
            const base64 = reader.result.split(',')[1];
            objectImg.uri = base64;
            setObjectImg(objectImg);
        };
        reader.onerror = (err) => console.error(err);
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
                image: objectImg,
            },
        };
        axios
            .post('https://library-be-wine.vercel.app/library/blogs/create', data, {
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
            {check && (
                <div className={cx('confirm__form')}>
                    <div className={cx('confirm-success')}>
                        <span className={cx('icon-success')}>
                            <i className={cx('fa-solid fa-circle-check')}></i>
                        </span>
                        {/* <span className={cx('separate')}></span> */}
                        <span className={cx('text')}>Bạn đã đăng blog thành công!</span>
                        <Link to="/library/blogs" state={{ user: props.user }}>
                            <button>Quay lại</button>
                        </Link>
                    </div>
                </div>
            )}
            <div className={cx('btn-close')} onClick={props.handleHide}>
                <i className={cx('fa-solid fa-xmark')}></i>
            </div>
            <div className={cx('body')}>
                <div className={cx('row')}>
                    <div className={cx('col-6')}>
                        <div className={cx('nav-left')}>
                            <h2>Preview</h2>
                            <div className={cx(state ? 'hide' : 'simulation-img')}>
                                <label htmlFor="file">
                                    <p>Thêm ảnh đại diện sẽ làm cho blog của bạn hấp dẫn hơn đối với người đọc</p>
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
                                <input placeholder="Mô tả khi hiển thị" onChange={(e) => setshortDes(e.target.value)} />
                                <div>
                                    <strong>Note</strong>: Việc chỉnh sửa ở đây sẽ thay đổi cách bài viết được hiển thị
                                    trên trang chủ, tin tức nổi bật - Không phải nội dung bài viết của bạn.
                                </div>
                            </div>

                            <div className={cx('btn-post')}>
                                <button onClick={handlePost}>Đăng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmPost;

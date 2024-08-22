import classNames from 'classnames/bind';
import styles from './CreateBook.module.scss';

import Navigation from '../Navigation/Navigation';
import ConfirmSuccess from '~/components/Admin/ConfirmSuccess/ConfirmSuccess';
import ConfirmWarn from '~/components/Admin/ConfirmWarn/index';

import { FaCloudUploadAlt } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { FaSupple } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import { BsFillCloudUploadFill, BsFillSendFill } from 'react-icons/bs';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const cx = classNames.bind(styles);

function CreateBook() {
    document.title = 'Admin | Create Book';
    const [index, setIndex] = useState(0);
    const [admin, setAdmin] = useState({});
    const [urlImg, setUrl] = useState('');
    const [state, setState] = useState(false);
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [publish, setPublish] = useState('');
    const [publisher, setPublisher] = useState('');
    const [numberpage, setPage] = useState(0);
    const [price, setPrice] = useState(0);
    const [type, setType] = useState('Kỹ năng sống');
    const [description, setDescription] = useState(' ');
    const [country, setCountry] = useState('foreign');
    const [language, setLanguage] = useState('Việt Nam');

    const [text, setText] = useState('');
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [itemWarning, setItemWarning] = useState([false, false, false, false, false]);

    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setIndex(location.state.index);
            setAdmin(location.state.admin);
        }
    }, [location.state]);

    const handleProps = (value) => {
        setSuccess(value);
    };

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

    const convertDate = (value) => {
        const date = new Date(value);
        var time;
        if (date.getDate() < 10 && date.getMonth() >= 9) {
            time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + '0' + date.getDate();
        } else if (date.getDate() > 9 && date.getMonth() < 9) {
            time = date.getFullYear() + '-' + '0' + (date.getMonth() + 1) + '-' + date.getDate();
        } else if (date.getMonth() < 9 && date.getDate() < 10) {
            time = date.getFullYear() + '-' + '0' + (date.getMonth() + 1) + '-' + '0' + date.getDate();
        } else {
            time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
        setPublish(time);
    };
    const createBook = (e) => {
        if (type === 'Economy') {
            setType('Kinh tế');
        } else if (type === 'Literature') {
            setType('Văn học');
        } else if (type === 'Self growth') {
            setType('Phát triển bản thân');
        } else if (type === 'Contemplation') {
            setType('Chiêm nghiệm cuộc sống');
        } else if (type === 'Communicate') {
            setType('Kỹ năng giao tiếp');
        } else {
            setType('Kỹ năng sống');
        }
        if (!name) {
            setItemWarning([true, false, false, false, false]);
            e.preventDefault();
            return;
        } else if (!author) {
            setItemWarning([false, true, false, false, false]);
            e.preventDefault();
            return;
        } else if (!publish) {
            setItemWarning([false, false, true, false, false]);
            e.preventDefault();
            return;
        } else if (price === 0) {
            setItemWarning([false, false, false, true, false]);
            e.preventDefault();
            return;
        } else if (numberpage === 0) {
            setItemWarning([false, false, false, false, true]);
            e.preventDefault();
            return;
        } else {
            setItemWarning([false, false, false, false, false]);
        }
        const dataBook = {
            name: name,
            author: author,
            publish: publish,
            publisher: publisher,
            numberPage: numberpage,
            price: price,
            imgDes: urlImg,
            type: type,
            region: country,
            description: description,
            language: language,
        };
        if (!urlImg) {
            setText('Vui lòng thêm ảnh cho sách!');
            setWarning(true);
            e.preventDefault();
        } else {
            axios
                .post('https://library-be-wine.vercel.app/admin/create-book', dataBook, {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${admin.accessToken}` },
                })
                .then((response) => {
                    if (response.data.message === 'Book already exists!') {
                        setText('Quyển sách này đã được thêm!');
                        setWarning(true);
                    } else if (response.data.message === 'Book created successfully!') {
                        setSuccess(true);
                    } else {
                        setText('Thêm mới thất bại!');
                        setWarning(true);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    const handleEditorChange = ({ html, text }) => {
        setDescription(text);
    };

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
    const render = (text) => {
        return <ReactMarkdown>{text}</ReactMarkdown>;
    };
    if (warning) {
        setTimeout(() => {
            setWarning(false);
        }, 3000);
    }

    return (
        <div className={cx('container__page')}>
            <Navigation data={admin} index={index} />
            {success ? (
                <ConfirmSuccess
                    message={'Thêm mới sách thành công!'}
                    messageLink={'Complete'}
                    admin={admin}
                    handleProps={handleProps}
                />
            ) : (
                ''
            )}
            <div className={cx('main__page')}>
                <div className={cx('header__admin')}>
                    <div className={cx('header__admin-statistic')}>
                        <span className={cx('header__admin-statistic-item')}>
                            <Link to="/admin/home" state={{ user: admin }}>
                                <AiOutlineHome className={cx('icon-header')}></AiOutlineHome>
                                Trang chủ
                            </Link>
                        </span>

                        <span className={cx('header__admin-statistic-item')}>
                            <FaSupple className={cx('icon-header')}></FaSupple>
                            Nhà cung cấp
                        </span>
                        <span className={cx('header__admin-statistic-item')}>
                            <i className={cx('fa-solid fa-user-tie')}></i>
                            Nhân viên
                        </span>
                    </div>
                    <div className={cx('header__admin-interact')}>
                        <span className={cx('header__admin-interact-item')}>
                            <i className={cx('fa-regular fa-envelope')}></i>
                            <span>3</span>
                        </span>
                        <span className={cx('header__admin-interact-item')}>
                            <i className={cx('fa-regular fa-bell')}></i>
                            <span>2</span>
                        </span>
                        <span className={cx('header__admin-interact-item')}>
                            <GrUserAdmin className={cx('icon-admin')}></GrUserAdmin>
                            Admin
                        </span>
                    </div>
                </div>
                <div className={cx('container')}>
                    <h3 className={cx('header')}>Thêm mới một sách</h3>
                    <div className={cx('container__content')}>
                        {warning ? <ConfirmWarn text={text} /> : ''}
                        <div className={cx('container__content-field')}>
                            <div className={cx('item-1')}>
                                <div className={cx('container__content-field-name')}>
                                    <label htmlFor="nameBook">Tên sách</label>
                                    <span className={cx('required1')}>*</span>
                                    <input
                                        type="text"
                                        name="nameBook"
                                        placeholder="Nhập tên sách!"
                                        id="nameBook"
                                        className={cx('input-title')}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <span className={cx(itemWarning[0] ? 'warning' : 'hide')}>
                                        Tên sách không được bỏ trống!
                                    </span>
                                </div>

                                <div className={cx('container__content-field-author')}>
                                    <label htmlFor="author">Tên tác giả</label>
                                    <span className={cx('required2')}>*</span>
                                    <input
                                        type="text"
                                        name="author"
                                        placeholder="Nhập tên tác giả!"
                                        id="author"
                                        className={cx('input-author')}
                                        onChange={(e) => setAuthor(e.target.value)}
                                    />
                                    <span className={cx(itemWarning[1] ? 'warning' : 'hide')}>
                                        Tên tác giả không được bỏ trống!
                                    </span>
                                </div>
                            </div>

                            <div className={cx('item-2')}>
                                <div className={cx('container__content-field-des')}>
                                    <label htmlFor="description">Mô tả khái quát</label>
                                    <MarkdownEditor
                                        value={description}
                                        placeholder="Nhập mô tả của sách tại đây"
                                        renderHTML={(text) => render(text)}
                                        onChange={handleEditorChange}
                                        toolbars={toolbarConfig}
                                        className={cx('editor')}
                                    />
                                </div>
                            </div>

                            <div className={cx('item-3')}>
                                <div className={cx('container__content-field-publish')}>
                                    <label htmlFor="pusblish">Ngày xuất bản</label>
                                    <span className={cx('required3')}>*</span>
                                    <input
                                        type="date"
                                        name="pusblish"
                                        id="pusblish"
                                        placeholder="Nhập ngày xuất bản!"
                                        className={cx('input-date')}
                                        onChange={(e) => convertDate(e.target.value)}
                                    />
                                    <span className={cx(itemWarning[2] ? 'warning' : 'hide')}>
                                        Ngày xuất bản không được bỏ trống!
                                    </span>
                                </div>

                                <div className={cx('container__content-field-publisher')}>
                                    <label htmlFor="publisher">Nhà xuất bản</label>

                                    <input
                                        type="text"
                                        name="publisher"
                                        id="publisher"
                                        placeholder="Nhập tên nhà xuất bản!"
                                        onChange={(e) => setPublisher(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={cx('item-4')}>
                                <div className={cx('container__content-field-price')}>
                                    <label htmlFor="price">Giá bán</label>
                                    <span className={cx('required4')}>*</span>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        placeholder="Nhập giá bán!"
                                        className={cx('input-price')}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <span className={cx(itemWarning[3] ? 'warning' : 'hide')}>
                                        Giá bán không được bỏ trống!
                                    </span>
                                </div>

                                <div className={cx('container__content-field-numberPage')}>
                                    <label htmlFor="page">Số trang</label>
                                    <span className={cx('required5')}>*</span>
                                    <input
                                        type="number"
                                        id="page"
                                        name="page"
                                        placeholder="Nhập số trang!"
                                        onChange={(e) => setPage(e.target.value)}
                                    />
                                    <span className={cx(itemWarning[4] ? 'warning' : 'hide')}>
                                        Số trang không được bỏ trống!
                                    </span>
                                </div>
                            </div>
                            <div className={cx('item-5')}>
                                <div className={cx('container__content-field-type')}>
                                    <label htmlFor="type">Thể loại</label>
                                    <select name="type" id="type" onChange={(e) => setType(e.target.value)}>
                                        <option value="Kỹ năng sống">Life skills</option>
                                        <option value="Kỹ năng giao tiếp">Communication</option>
                                        <option value="Phát triển bản thân">Self growth</option>
                                        <option value="Văn học">Literature</option>
                                        <option value="Kinh tế">Economy</option>
                                        <option value="Psychology">Psychology</option>
                                        <option value="History">History</option>
                                    </select>
                                </div>

                                <div className={cx('container__content-field-lang')}>
                                    <label htmlFor="language">Ngôn ngữ</label>
                                    <select
                                        name="language"
                                        id="language"
                                        className={cx('select-lang')}
                                        onChange={(e) => setLanguage(e.target.value)}
                                    >
                                        <option value="Việt Nam">Việt Nam</option>
                                        <option value="English">English</option>
                                    </select>
                                </div>
                                <div className={cx('container__content-field-country')}>
                                    <label htmlFor="country">Phạm vi</label>
                                    <select
                                        name="country"
                                        id="country"
                                        className={cx('select-lang')}
                                        onChange={(e) => setCountry(e.target.value)}
                                    >
                                        <option value="foreign">Foreign</option>
                                        <option value="domestic">Domestic</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={cx('container__content-upload')}>
                            <div className={cx(state === false ? 'container__content-upload-img' : 'hide')}>
                                <FaCloudUploadAlt className={cx('icon-cloud')} />
                                <div className={cx('select-title')}>Chọn ảnh từ máy</div>
                                <div className={cx('type-img')}>Type image: .png .jbg .gif .tiff</div>
                                <div className={cx('size-img')}>Tối đa 1 GB</div>
                                <div className={cx('btn-upload')}>
                                    <label htmlFor="file">
                                        <div className={cx('button')}>
                                            <div>
                                                <span>
                                                    <p className={cx('upload')}>Chọn ảnh</p>
                                                </span>
                                            </div>
                                            <div>
                                                <span>
                                                    <p className={cx('icon-upload')}>
                                                        <BsFillCloudUploadFill />
                                                    </p>
                                                </span>
                                            </div>
                                        </div>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="file"
                                        className={cx('chose-file')}
                                        onChange={(e) => convertToBase64(e)}
                                    />
                                </div>
                            </div>
                            <div className={cx(state === true ? 'container__img' : 'hide')}>
                                <img src={urlImg} alt="" />
                                <label htmlFor="btn-change">
                                    <div className={cx('btn-change')}>Thay đổi</div>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="btn-change"
                                    className={cx('chose-file')}
                                    onChange={(e) => convertToBase64(e)}
                                />
                            </div>
                            <div className={cx('container__content-upload-submit')}>
                                <button onClick={createBook}>
                                    Tạo mới
                                    <BsFillSendFill className={cx('icon-send')} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBook;

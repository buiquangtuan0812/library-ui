import classNames from 'classnames/bind';
import styles from './CreateBook.module.scss';

import Notification from '~/components/Display/Notification/Notification';

import { FaCloudUploadAlt } from 'react-icons/fa';
import { BsFillCloudUploadFill, BsFillSendFill } from 'react-icons/bs';

import axios from 'axios';
import React, { useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const cx = classNames.bind(styles);

function CreateBook(props) {
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
    const [language, setLanguage] = useState('Vietnamese');

    const [notice, setNotice] = useState(false);

    const createBook = async () => {
        if (type === 'Economy') {
            setType('Kinh tế');
        }
        if (type === 'Literature') {
            setType('Văn học');
        }
        if (type === 'Self growth') {
            setType('Phát triển bản thân');
        }
        if (type === 'Contemplation') {
            setType('Chiêm nghiệm cuộc sống');
        }
        if (type === 'Communicate') {
            setType('Kỹ năng giao tiếp');
        }
        const dataBook = {
            name: name,
            author: author,
            publish: publish,
            publisher: publisher,
            numberPage: Number(numberpage),
            price: Number(price),
            imgDes: urlImg,
            type: type,
            region: country,
            description: description,
            language: language,
        };
        await axios
            .post('http://localhost:8086/admin/create-book', dataBook, {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${props.data.token}` },
            })
            .then((response) => setNotice(true))
            .catch((err) => console.log(err));
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

    return (
        <div className={cx('container')}>
            <div className={cx(notice ? 'show' : 'hide-content')}>
                <Notification
                    token={''}
                    message={'Create a new book successfully !'}
                    messageLink={'Complete'}
                    check={true}
                    count={0}
                />
            </div>
            <h3 className={cx('header')}>Thêm mới một sách</h3>
            <div className={cx('container__content')}>
                <div className={cx('container__content-field')}>
                    <div className={cx('item-1')}>
                        <div className={cx('container__content-field-name')}>
                            <label htmlFor="nameBook">Tên sách</label>
                            <input
                                type="text"
                                name="nameBook"
                                placeholder="Nhập tên sách!"
                                id="nameBook"
                                className={cx('input-title')}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className={cx('container__content-field-author')}>
                            <label htmlFor="author">Tên tác giả</label>
                            <input
                                type="text"
                                name="author"
                                placeholder="Nhập tên tác giả!"
                                id="author"
                                className={cx('input-author')}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
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
                            <input
                                type="text"
                                name="pusblish"
                                id="pusblish"
                                placeholder="Nhập ngày xuất bản!"
                                className={cx('input-date')}
                                onChange={(e) => setPublish(e.target.value)}
                            />
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
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Nhập giá bán!"
                                className={cx('input-price')}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className={cx('container__content-field-numberPage')}>
                            <label htmlFor="page">Số trang</label>
                            <input
                                type="number"
                                id="page"
                                name="page"
                                placeholder="Nhập số trang!"
                                onChange={(e) => setPage(e.target.value)}
                            />
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
                                <option value="Vietnamese">Vietnamese</option>
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
    );
}

export default CreateBook;

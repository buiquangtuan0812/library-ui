import classNames from 'classnames/bind';
import styles from './ViewBook.module.scss';
import Navigation from '../Navigation/Navigation';
import ConfirmDelete from './ConfirmDelete/ConfirmDelete';
import ConfirmSuccess from '../ConfirmSuccess/ConfirmSuccess';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaCloudUploadAlt, FaEdit } from 'react-icons/fa';
import { BsFillCloudUploadFill, BsFillSendFill } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';
import { FaSupple } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';

const cx = classNames.bind(styles);

function ViewBookComponent() {
    document.title = 'View Book';
    const [dataBook, setData] = useState({});
    const [dataUser, setDataUser] = useState({});
    const [index, setIndex] = useState(0);
    const location = useLocation();

    const [edit, setEdit] = useState(false);
    const [state, setState] = useState(true);
    const [imgDes, setUrl] = useState('');
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [publish, setPublish] = useState('');
    const [publishCompany, setPublisher] = useState('');
    const [numberPage, setPage] = useState(0);
    const [price, setPrice] = useState(0);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [region, setCountry] = useState('');
    const [language, setLanguage] = useState('');

    const [notice, setNotice] = useState(false);
    const [showFormDel, setShow] = useState(false);
    useEffect(() => {
        setUrl(location.state.book.imgDes);
        if (location.state) {
            setIndex(location.state.index);
            setData(location.state.book);
            setDescription(location.state.book.description);
            setDataUser(location.state.admin);
            setUrl(location.state.book.imgDes);
            setName(location.state.book.name);
            setAuthor(location.state.book.author);
            setPublish(location.state.book.publish);
            setPublisher(location.state.book.publishCompany);
            setPage(location.state.book.numberPage);
            setPrice(location.state.book.price);
            setType(location.state.book.type);
            setDescription(location.state.book.description);
            setCountry(location.state.book.region);
            setLanguage(location.state.book.language);
        }
    }, [dataBook, location.state]);

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

    const handleBtn = () => {
        if (edit) {
            return;
        } else {
            setEdit(true);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            _id: dataBook._id,
            name: name,
            author: author,
            publish: publish,
            publishCompany: publishCompany,
            description: description,
            imgDes: imgDes,
            numberPage: numberPage,
            language: language,
            type: type,
            region: region,
            price: price,
        };
        setData(data);
        axios
            .put('https://library-be-wine.vercel.app/admin/update-book', data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${dataUser.accessToken}`,
                },
            })
            .then((res) => {
                setNotice(true);
                setEdit(false);
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = () => {
        setShow(true);
    };
    const handleChild = (value) => {
        setNotice(value.notice);
        setShow(value.show);
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

    const handleProps = (value) => {
        setNotice(value);
    };

    return (
        <div className={cx('container__page')}>
            {showFormDel ? <ConfirmDelete id={dataBook._id} data={dataUser} handleChild={handleChild} /> : ''}
            {notice ? (
                <ConfirmSuccess
                    message={'Xoá sách thành công!'}
                    messageLink={'Complete'}
                    admin={dataUser}
                    handleProps={handleProps}
                />
            ) : (
                ''
            )}
            <Navigation data={dataUser} index={index} />
            <div className={cx('main-content')}>
                <div className={cx('header__admin')}>
                    <div className={cx('header__admin-statistic')}>
                        <span className={cx('header__admin-statistic-item')}>
                            <Link to="/admin/home" state={{ user: dataUser }}>
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
                    <h3 className={cx('header')}>View book</h3>
                    <div className={cx('container__content')}>
                        <div className={cx('container__content-field')}>
                            <div className={cx('item-1')}>
                                <div className={cx('container__content-field-name')}>
                                    <label htmlFor="nameBook">Tên</label>
                                    <input
                                        type="text"
                                        name="nameBook"
                                        placeholder="Enter name !"
                                        id="nameBook"
                                        className={cx(edit ? 'input-title' : 'input-notEdit')}
                                        defaultValue={name}
                                        disabled={edit ? '' : 'disabled'}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className={cx('container__content-field-author')}>
                                    <label htmlFor="author">Tác giả</label>
                                    <input
                                        type="text"
                                        name="author"
                                        placeholder="Enter author !"
                                        id="author"
                                        className={cx(edit ? 'input-author' : 'input-notEdit')}
                                        disabled={edit ? '' : 'disabled'}
                                        defaultValue={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={cx('item-2')}>
                                <div className={cx('container__content-field-des')}>
                                    <label htmlFor="description">Mô tả</label>
                                    <MarkdownEditor
                                        value={description}
                                        renderHTML={(text) => render(text)}
                                        onChange={handleEditorChange}
                                        toolbars={toolbarConfig}
                                        className={cx(edit ? 'editor' : 'notEditor')}
                                        disabled={edit ? false : true}
                                        readOnly={edit ? false : true}
                                    />
                                </div>
                            </div>

                            <div className={cx('item-3')}>
                                <div className={cx('container__content-field-publish')}>
                                    <label htmlFor="pusblish">Ngày xuất bản</label>
                                    <input
                                        type="date"
                                        name="pusblish"
                                        id="pusblish"
                                        placeholder="Enter release date !"
                                        className={cx(edit ? 'input-date' : 'input-notEdit')}
                                        disabled={edit ? '' : 'disabled'}
                                        defaultValue={publish}
                                        onChange={(e) => setPublish(e.target.value)}
                                    />
                                </div>

                                <div className={cx('container__content-field-publisher')}>
                                    <label htmlFor="publisher">Nhà xuất bản</label>
                                    <input
                                        type="text"
                                        name="publisher"
                                        id="publisher"
                                        className={cx(edit ? '' : 'input-notEdit')}
                                        placeholder="Enter the publisher !"
                                        disabled={edit ? '' : 'disabled'}
                                        defaultValue={publishCompany}
                                        onChange={(e) => setPublisher(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={cx('item-4')}>
                                <div className={cx('container__content-field-price')}>
                                    <label htmlFor="price">Giá</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        placeholder="Enter price of book!"
                                        className={cx(edit ? 'input-price' : 'input-notEdit')}
                                        disabled={edit ? '' : 'disabled'}
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className={cx('container__content-field-numberPage')}>
                                    <label htmlFor="page">Số trang</label>
                                    <input
                                        type="number"
                                        id="page"
                                        name="page"
                                        className={cx(edit ? '' : 'input-notEdit')}
                                        placeholder="Enter number pages !"
                                        disabled={edit ? '' : 'disabled'}
                                        value={numberPage}
                                        onChange={(e) => setPage(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={cx('item-5')}>
                                <div className={cx('container__content-field-type')}>
                                    <label htmlFor="type">Thể loại</label>
                                    <select
                                        name="type"
                                        id="type"
                                        onChange={(e) => setType(e.target.value)}
                                        value={type}
                                        className={cx(edit ? '' : 'notSelect')}
                                    >
                                        <option value="Kỹ năng sống">Life skills</option>
                                        <option value="Kỹ năng giao tiếp">Communication</option>
                                        <option value="Phát triển bản thân">Self growth</option>
                                        <option value="Văn học">Literature</option>
                                        <option value="Kinh tế">Economy</option>
                                        <option value="Psychology">Psychology</option>
                                    </select>
                                </div>

                                <div className={cx('container__content-field-lang')}>
                                    <label htmlFor="language">Ngôn ngữ</label>
                                    <select
                                        name="language"
                                        id="language"
                                        className={cx(edit ? 'select-lang' : 'notSelect')}
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                    >
                                        <option value="Việt Nam">Việt Nam</option>
                                        <option value="English">English</option>
                                    </select>
                                </div>
                                <div className={cx('container__content-field-region')}>
                                    <label htmlFor="country">Phạm vi</label>
                                    <select
                                        name="country"
                                        id="country"
                                        value={region}
                                        className={cx(edit ? 'select-lang' : 'notSelect')}
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
                                <div className={cx('select-title')}>Select image to upload</div>
                                <div className={cx('type-img')}>Type image: .png .jbg .gif .tiff</div>
                                <div className={cx('size-img')}>Less than 1 GB</div>
                                <div className={cx('btn-upload')}>
                                    <label htmlFor="file">
                                        <div className={cx('button')}>
                                            <div>
                                                <span>
                                                    <p className={cx('upload')}>Upload</p>
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
                                <img src={edit ? imgDes : dataBook.imgDes} alt="" />
                                <label htmlFor="btn-change">
                                    <div className={cx(edit ? 'btn-change' : 'btn-notChange')}>Thay đổi</div>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="btn-change"
                                    className={cx('chose-file')}
                                    onChange={(e) => convertToBase64(e)}
                                    disabled={edit ? '' : 'disabled'}
                                />
                            </div>
                            <div className={cx('container__content-upload-submit')}>
                                {!edit ? (
                                    <button onClick={handleBtn} className={cx('btn-edit')}>
                                        Sửa
                                        <FaEdit className={cx('icon-edit')} />
                                    </button>
                                ) : (
                                    <button onClick={handleUpdate} className={cx('btn-edit')}>
                                        Cập nhật
                                        <BsFillSendFill className={cx('icon-send')} />
                                    </button>
                                )}
                                <button className={cx('btn-delete')} onClick={handleDelete}>
                                    Xóa <RiDeleteBin5Fill className={cx('icon-delete')} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewBookComponent;

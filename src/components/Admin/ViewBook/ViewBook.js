import classNames from 'classnames/bind';
import styles from './ViewBook.module.scss';
import ConfirmDelete from './ConfirmDelete/ConfirmDelete';
import Notification from '~/components/Display/Notification/Notification';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaCloudUploadAlt, FaEdit } from 'react-icons/fa';
import { BsFillCloudUploadFill, BsFillSendFill } from 'react-icons/bs';
import axios from 'axios';

const cx = classNames.bind(styles);

function ViewBookComponent() {
    const [dataBook, setData] = useState({});
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
    const [count, setCount] = useState(0);
    useEffect(() => {
        setUrl(location.state.book.imgDes);
        if (location.state) {
            setData(location.state.book);
        }
    }, []);

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

    const handleUpdate = () => {
        const data = {
            _id: dataBook._id,
            name: name ? name : dataBook.name,
            author: author ? author : dataBook.author,
            publish: publish ? publish : dataBook.published,
            publishCompany: publishCompany ? publishCompany : dataBook.publishCompany,
            description: description ? description : dataBook.description,
            imgDes: imgDes ? imgDes : dataBook.imgDes,
            numberPage: numberPage ? numberPage : dataBook.numberPage,
            language: language ? language : dataBook.language,
            type: type ? type : dataBook.type,
            region: region ? region : dataBook.region,
            price: price ? price : dataBook.price,
        };
        axios
            .put('http://localhost:8086/admin/update-book', data, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((res) => {
                setNotice(true);
                setEdit(false);
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <ConfirmDelete count={count} id={dataBook._id} />
            {notice ? (
                <Notification
                    token={''}
                    message={'Update book successfully!'}
                    messageLink={'Complete'}
                    check={true}
                    count={0}
                />
            ) : (
                ''
            )}
            <div className={cx('container')}>
                <h3 className={cx('header')}>View book</h3>
                <div className={cx('container__content')}>
                    <div className={cx('container__content-field')}>
                        <div className={cx('item-1')}>
                            <div className={cx('container__content-field-name')}>
                                <label htmlFor="nameBook">Book title</label>
                                <input
                                    type="text"
                                    name="nameBook"
                                    placeholder="Enter name !"
                                    id="nameBook"
                                    className={cx('input-title')}
                                    defaultValue={dataBook.name}
                                    disabled={edit ? '' : 'disabled'}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className={cx('container__content-field-author')}>
                                <label htmlFor="author">Name of author</label>
                                <input
                                    type="text"
                                    name="author"
                                    placeholder="Enter author !"
                                    id="author"
                                    className={cx('input-author')}
                                    disabled={edit ? '' : 'disabled'}
                                    defaultValue={dataBook.author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={cx('item-2')}>
                            <div className={cx('container__content-field-des')}>
                                <label htmlFor="description">Description of the book</label>
                                <textarea
                                    name="description"
                                    spellCheck={false}
                                    placeholder="Description of the book"
                                    className={cx('description')}
                                    defaultValue={dataBook.description}
                                    disabled={edit ? '' : 'disabled'}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className={cx('item-3')}>
                            <div className={cx('container__content-field-publish')}>
                                <label htmlFor="pusblish">Release date</label>
                                <input
                                    type="text"
                                    name="pusblish"
                                    id="pusblish"
                                    placeholder="Enter release date !"
                                    className={cx('input-date')}
                                    disabled={edit ? '' : 'disabled'}
                                    defaultValue={dataBook.publish}
                                    onChange={(e) => setPublish(e.target.value)}
                                />
                            </div>

                            <div className={cx('container__content-field-publisher')}>
                                <label htmlFor="publisher">Publisher</label>
                                <input
                                    type="text"
                                    name="publisher"
                                    id="publisher"
                                    placeholder="Enter the publisher !"
                                    disabled={edit ? '' : 'disabled'}
                                    defaultValue={dataBook.publishCompany}
                                    onChange={(e) => setPublisher(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={cx('item-4')}>
                            <div className={cx('container__content-field-price')}>
                                <label htmlFor="price">Price of book</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="Enter price of book!"
                                    className={cx('input-price')}
                                    disabled={edit ? '' : 'disabled'}
                                    defaultValue={dataBook.price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className={cx('container__content-field-numberPage')}>
                                <label htmlFor="page">Number pages of book</label>
                                <input
                                    type="number"
                                    id="page"
                                    name="page"
                                    placeholder="Enter number pages !"
                                    disabled={edit ? '' : 'disabled'}
                                    defaultValue={dataBook.numberPage}
                                    onChange={(e) => setPage(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx(edit === false ? 'item-5s' : 'hide-content')}>
                            <div className={cx('container__content-field-type')}>
                                <label htmlFor="price">Type of book</label>
                                <input
                                    disabled={edit ? '' : 'disabled'}
                                    defaultValue={dataBook.type}
                                    // onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className={cx('container__content-field-lang')}>
                                <label htmlFor="page">Language</label>
                                <input
                                    disabled={edit ? '' : 'disabled'}
                                    defaultValue={dataBook.language}
                                    // onChange={(e) => setPage(e.target.value)}
                                />
                            </div>

                            <div className={cx('container__content-field-region')}>
                                <label htmlFor="page">Region</label>
                                <input
                                    disabled={edit ? '' : 'disabled'}
                                    defaultValue={dataBook.region}
                                    // onChange={(e) => setPage(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx(edit ? 'item-5' : 'hide-content')}>
                            <div className={cx('container__content-field-type')}>
                                <label htmlFor="type">Type of book</label>
                                <select name="type" id="type" onChange={(e) => setType(e.target.value)}>
                                    <option value="Kỹ năng sống">Life skills</option>
                                    <option value="Kỹ năng giao tiếp">Communication</option>
                                    <option value="Phát triển bản thân">Self growth</option>
                                    <option value="Văn học">Literature</option>
                                    <option value="Kinh tế">Economy</option>
                                    <option value="Psychology">Psychology</option>
                                </select>
                            </div>

                            <div className={cx('container__content-field-lang')}>
                                <label htmlFor="language">Language</label>
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
                            <div className={cx('container__content-field-region')}>
                                <label htmlFor="country">Country</label>
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
                                <div className={cx('btn-change')}>Change</div>
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
                                    Edit
                                    <FaEdit className={cx('icon-edit')} />
                                </button>
                            ) : (
                                <button onClick={handleUpdate} className={cx('btn-edit')}>
                                    Update
                                    <BsFillSendFill className={cx('icon-send')} />
                                </button>
                            )}
                            <button className={cx('btn-delete')} onClick={handleDelete}>
                                Delete <RiDeleteBin5Fill className={cx('icon-delete')} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewBookComponent;

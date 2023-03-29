import classNames from 'classnames/bind';
import styles from './CreateBook.module.scss';

import Notification from '~/components/Display/Notification/Notification';

import { FaCloudUploadAlt } from 'react-icons/fa';
import { BsFillCloudUploadFill, BsFillSendFill } from 'react-icons/bs';

import axios from 'axios';
import { useState } from 'react';

const cx = classNames.bind(styles);

function CreateBook() {
    const [urlImg, setUrl] = useState('');
    const [state, setState] = useState(false);
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [publish, setPublish] = useState('');
    const [publisher, setPublisher] = useState('');
    const [numberpage, setPage] = useState(0);
    const [price, setPrice] = useState(0);
    const [type, setType] = useState('Kỹ năng sống');
    const [description, setDescription] = useState('');
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
                headers: { 'Content-Type': 'application/json' },
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
            <h3 className={cx('header')}>Create a new book</h3>
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
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={cx('item-2')}>
                        <div className={cx('container__content-field-des')}>
                            <label htmlFor="description">Description of the book</label>
                            <textarea
                                name="description"
                                placeholder="Description of the book"
                                className={cx('description')}
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
                                onChange={(e) => setPage(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('item-5')}>
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
                        <div className={cx('container__content-field-country')}>
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
                        <img src={urlImg} alt="" />
                        <label htmlFor="btn-change">
                            <div className={cx('btn-change')}>Change</div>
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
                            Create
                            <BsFillSendFill className={cx('icon-send')} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBook;

import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { BsTelephone } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { GrShieldSecurity } from 'react-icons/gr';

import Header from '../../components/Display/Header/Header';
import Footer from '../../components/Display/Footer/Footer';
import FormUpdate from './FormUpdate/FormUpdate';
import ConfirmSuccess from '~/components/ConfirmPayment/ConfirmSuccess';

const cx = classNames.bind(styles);

function Profile() {
    document.title = 'Profile';
    const location = useLocation();
    const [user, setUser] = useState({});
    const [imgUser, setImgUser] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [state, setState] = useState(false);
    const [numberCart, setNumberCart] = useState(0);
    const [type, setType] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        setUser(location.state.user);
        setDay(location.state.user.birthDate.slice(0, 2));
        setMonth(location.state.user.birthDate.slice(3, 5));
        setYear(location.state.user.birthDate.slice(6, 10));
        setUsername(location.state.user.username);
        setFullName(location.state.user.fullName);
        setNumberCart(location.state.numberCart);
        setImgUser(location.state.user.imgDes);
    }, [user, location.state]);

    const convertToBase64 = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImgUser(reader.result);
        };
        reader.onerror = (err) => {
            console.log(err);
        };
    };

    const handleProps = (data) => {
        setShow(data.show);
        setUser(data.user);
        setState(data.state);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        user.username = username;
        user.imgDes = imgUser;
        user.fullName = fullName;
        user.address = address || user.address;
        user.birthDate = day + '/' + month + '/' + year || user.birthDate;
        setUser(user);
        axios
            .put('https://be-library.vercel.app/user/update/profile', user, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.accessToken}`,
                },
            })
            .then((res) => {
                setUser(res.data);
                setState(true);
            })
            .catch((err) => console.log(err));
    };

    if (state) {
        setTimeout(() => {
            setState(false);
        }, 3000);
    }

    const handleClick = (value) => {
        setType(value);
        setShow(true);
    };

    return (
        <div>
            <Header user={user} numberCart={numberCart} />
            {show ? (
                <FormUpdate user={user} tel={user.tel} email={user.email} type={type} handleProps={handleProps} />
            ) : (
                ''
            )}
            <div className={cx('ctn')}>
                {state ? <ConfirmSuccess type={true} text="Cập nhật thông tin cá nhân thành công!" /> : ''}
                <div className={cx('container')}>
                    <h3>Thông tin tài khoản</h3>
                    <div className={cx('container__profile')}>
                        <div className={cx('row')}>
                            <div className={cx('col-7')}>
                                <div className={cx('container__profile-infor')}>
                                    <div style={{ color: 'rgb(100, 100, 109)', fontSize: '18px' }}>
                                        Thông tin cá nhân
                                    </div>
                                    <div className={cx('container__profile-infor-item')}>
                                        <label htmlFor="inputImg">
                                            <div>
                                                <img alt="" src={imgUser} />
                                            </div>
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="inputImg"
                                            style={{ display: 'none' }}
                                            onChange={(e) => convertToBase64(e)}
                                        />
                                        <div className={cx('title')}>
                                            <p>Họ & Tên</p>
                                            <p className={cx('title-2')}>Nickname</p>
                                        </div>
                                        <div className={cx('values')}>
                                            <input
                                                type="text"
                                                placeholder={fullName}
                                                className={cx('value-1')}
                                                onChange={(e) => setFullName(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className={cx('container__profile-infor-item')}>
                                        <div className={cx('birthday')}>Ngày sinh</div>
                                        <select
                                            className={cx('date')}
                                            value={day}
                                            onChange={(e) => setDay(e.target.value)}
                                        >
                                            <option value="">Ngày</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">21</option>
                                        </select>

                                        <select
                                            className={cx('month')}
                                            value={month}
                                            onChange={(e) => setMonth(e.target.value)}
                                        >
                                            <option value="">Tháng</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>

                                        <select
                                            className={cx('year')}
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                        >
                                            <option value="">Năm</option>
                                            <option value="1986">1986</option>
                                            <option value="1987">1987</option>
                                            <option value="1989">1989</option>
                                            <option value="1990">1990</option>
                                            <option value="1992">1992</option>
                                            <option value="1993">1993</option>
                                            <option value="1994">1994</option>
                                            <option value="1995">1995</option>
                                            <option value="1996">1996</option>
                                            <option value="1997">1997</option>
                                            <option value="1998">1998</option>
                                            <option value="1999">1999</option>
                                            <option value="2000">2000</option>
                                            <option value="2001">2001</option>
                                            <option value="2002">2002</option>
                                            <option value="2003">2003</option>
                                            <option value="2004">2004</option>
                                            <option value="2005">2005</option>
                                        </select>
                                    </div>

                                    <div className={cx('container__profile-infor-item')}>
                                        {user.address !== '' ? (
                                            <div className={cx('address')}>
                                                <span>Địa chỉ</span>
                                                <span className={classNames('address-value')}>{user.address}</span>
                                            </div>
                                        ) : (
                                            <div className={cx('address')}>
                                                <span>Địa chỉ</span>
                                                <div className={cx('form-add')}>
                                                    <input
                                                        type="text"
                                                        placeholder="Nhập địa chỉ"
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className={cx('btn-save')}>
                                        <button onClick={handleUpdate}>Lưu thay đổi</button>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-5')}>
                                <div className={cx('container__profile-nav')}>
                                    <div style={{ color: 'rgb(100, 100, 109)', fontSize: '18px' }}>
                                        Số điện thoại và Email
                                    </div>

                                    <div className={cx('container__profile-nav-tel')}>
                                        <span className={cx('icon-phone')}>
                                            <BsTelephone />
                                        </span>
                                        <span className={cx('phone')}>
                                            <p>Số điện thoại</p>
                                            <p>{user.tel}</p>
                                        </span>
                                        <span className={cx('btn-update')}>
                                            <button onClick={() => handleClick('tel')}>Cập nhật</button>
                                        </span>
                                    </div>

                                    <div className={cx('container__profile-nav-mail')}>
                                        <span className={cx('icon-mail')}>
                                            <AiOutlineMail />
                                        </span>
                                        <span className={cx('mail')}>
                                            <p>Địa chỉ Email</p>
                                            <p>{user.email}</p>
                                        </span>
                                        <span className={cx('btn-update')}>
                                            <button onClick={() => handleClick('email')}>Cập nhật</button>
                                        </span>
                                    </div>
                                </div>

                                <div className={cx('container__profile-security')}>
                                    <div style={{ color: 'rgb(100, 100, 109)', fontSize: '18px' }}>Bảo mật</div>
                                    <div className={cx('container__profile-security-pw')}>
                                        <span className={cx('icon-pw')}>
                                            <GrShieldSecurity className={cx('icon')} />
                                            Đổi mật khẩu
                                        </span>
                                        <span className={cx('btn-update')}>
                                            <button onClick={handleClick}>Cập nhật</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '-100px' }}>
                <Footer />
            </div>
        </div>
    );
}

export default Profile;

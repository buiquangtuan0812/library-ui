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
import ConfirmUpdate from '~/components/ConfirmUpdate/ConfirmUpdate';

const cx = classNames.bind(styles);

function Profile() {
    document.title = 'Profile';
    const location = useLocation();
    const user = location.state?.user;
    const accessToken = user?.accessToken;

    // Group related states into a single object
    const [profile, setProfile] = useState({
        accessToken: accessToken,
        imgUser: '',
        fullName: '',
        username: '',
        tel: '',
        email: '',
        address: '',
        day: '',
        month: '',
        year: '',
    });

    const [state, setState] = useState(false);
    const [type, setType] = useState('');
    const [show, setShow] = useState(false);
    const [objectImg, setObjectImg] = useState({});

    // Fetch user profile on mount
    useEffect(() => {
        if (!accessToken) {
            console.error('Access token is missing.');
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const { data } = await axios.get('https://library-be-wine.vercel.app/user/get-profile', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setProfile({
                    ...profile,
                    imgUser: data.imgDes,
                    fullName: data.fullName,
                    username: data.username,
                    address: data.address,
                    tel: data.tel,
                    email: data.email,
                    day: data.birthDate.slice(0, 2),
                    month: data.birthDate.slice(3, 5),
                    year: data.birthDate.slice(6, 10),
                });
            } catch (error) {
                console.error('Failed to fetch user profile:', error.message);
            }
        };

        fetchUserProfile();
    }, [accessToken]);

    // Convert file to base64
    const convertToBase64 = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            setObjectImg({ uri: base64, name: file.name, type: file.type });
            setProfile((prev) => ({ ...prev, imgUser: reader.result }));
        };
        reader.onerror = (err) => console.error(err);
    };

    // Handle update profile
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedUser = {
            username: profile.username,
            imgDes: objectImg.uri ? objectImg : profile.imgUser,
            fullName: profile.fullName,
            address: profile.address || user?.address,
            birthDate: `${profile.day}/${profile.month}/${profile.year}` || user?.birthDate,
        };
        try {
            const res = await axios.put('https://library-be-wine.vercel.app/user/update/profile', updatedUser, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (res.status === 200) {
                setState(true);
            } else {
                console.error('Failed to update profile:', res.data);
            }
        } catch (err) {
            console.error('Failed to update profile:', err);
        }
    };

    // Reset state message
    useEffect(() => {
        if (state) {
            const timer = setTimeout(() => setState(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [state]);

    // Handle update type and form visibility
    const handleClick = (value) => {
        setType(value);
        setShow(true);
    };

    const renderOptions = (count, pad = 2, start = 1) => {
        return Array.from({ length: count }, (_, i) => (
            <option key={start + i} value={String(start + i).padStart(pad, '0')}>
                {String(start + i).padStart(pad, '0')}
            </option>
        ));
    };

    return (
        <div>
            <Header user={user} numberCart={location.state.numberCart} />
            {show && (
                <FormUpdate
                    user={profile}
                    type={type}
                    handleProps={(data) => {
                        setProfile(data.user);
                        setShow(data.show);
                        setState(data.state);
                    }}
                />
            )}
            <div className={cx('ctn')}>
                {state && <ConfirmUpdate type={true} text="Cập nhật thông tin cá nhân thành công!" />}
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
                                                <img alt="User Avatar" src={profile.imgUser} />
                                            </div>
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="inputImg"
                                            style={{ display: 'none' }}
                                            onChange={convertToBase64}
                                        />
                                        <div className={cx('title')}>
                                            <p>Họ & Tên</p>
                                            <p className={cx('title-2')}>Nickname</p>
                                        </div>
                                        <div className={cx('values')}>
                                            <input
                                                type="text"
                                                placeholder={profile.fullName}
                                                className={cx('value-1')}
                                                onChange={(e) =>
                                                    setProfile((prev) => ({ ...prev, fullName: e.target.value }))
                                                }
                                            />
                                            <input
                                                type="text"
                                                placeholder={profile.username}
                                                onChange={(e) =>
                                                    setProfile((prev) => ({ ...prev, username: e.target.value }))
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className={cx('container__profile-infor-item')}>
                                        <div className={cx('birthday')}>Ngày sinh</div>
                                        <select
                                            className={cx('date')}
                                            value={profile.day}
                                            onChange={(e) => setProfile((prev) => ({ ...prev, day: e.target.value }))}
                                        >
                                            <option value="">Ngày</option>
                                            {renderOptions(31)}
                                        </select>

                                        <select
                                            className={cx('month')}
                                            value={profile.month}
                                            onChange={(e) => setProfile((prev) => ({ ...prev, month: e.target.value }))}
                                        >
                                            <option value="">Tháng</option>
                                            {renderOptions(12)}
                                        </select>

                                        <select
                                            className={cx('year')}
                                            value={profile.year}
                                            onChange={(e) => setProfile((prev) => ({ ...prev, year: e.target.value }))}
                                        >
                                            <option value="">Năm</option>
                                            {renderOptions(20, 4, 1985)} {/* Custom year range */}
                                        </select>
                                    </div>

                                    <div className={cx('container__profile-infor-item')}>
                                        <div className={cx('address')}>
                                            <span>Địa chỉ</span>
                                            {profile.address ? (
                                                <span className={cx('address-value')}>{profile.address}</span>
                                            ) : (
                                                <div className={cx('form-add')}>
                                                    <input
                                                        type="text"
                                                        placeholder="Nhập địa chỉ"
                                                        onChange={(e) =>
                                                            setProfile((prev) => ({
                                                                ...prev,
                                                                address: e.target.value,
                                                            }))
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </div>
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
                                            <p>{profile.tel}</p>
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
                                            <p>{profile.email}</p>
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
                                            <button onClick={() => handleClick('password')}>Cập nhật</button>
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

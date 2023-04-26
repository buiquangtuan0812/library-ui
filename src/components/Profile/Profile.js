import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

import { useLocation } from 'react-router-dom';

import { BsTelephone } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { GrShieldSecurity } from 'react-icons/gr';

import Header from '../Display/Header/Header';
import Footer from '../Display/Footer/Footer';

const cx = classNames.bind(styles);

function Profile() {
    const location = useLocation();
    return (
        <div>
            <Header user={location.state.user} numberCart={location.state.numberCart} />
            <div className={cx('ctn')}>
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
                                        <img alt="" src={location.state.user.imgDes} />
                                        <div className={cx('title')}>
                                            <p>Họ & Tên</p>
                                            <p className={cx('title-2')}>Nickname</p>
                                        </div>
                                        <div className={cx('values')}>
                                            <input
                                                type="text"
                                                value={location.state.user.fullName}
                                                className={cx('value-1')}
                                            />
                                            <input type="text" value={location.state.user.username} />
                                        </div>
                                    </div>

                                    <div className={cx('container__profile-infor-item')}>
                                        <div className={cx('birthday')}>Ngày sinh</div>
                                        <select className={cx('date')}>
                                            <option>Ngày</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
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

                                        <select className={cx('month')}>
                                            <option>Tháng</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>

                                        <select className={cx('year')}>
                                            <option>Năm</option>
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
                                        <div className={cx('address')}>
                                            <span>Địa chỉ</span>
                                            <span className={classNames('address-value')}>
                                                {location.state.user.address}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={cx('btn-save')}>
                                        <button>Lưu thay đổi</button>
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
                                            <p>{location.state.user.numberPhone}</p>
                                        </span>
                                        <span className={cx('btn-update')}>
                                            <button>Cập nhật</button>
                                        </span>
                                    </div>

                                    <div className={cx('container__profile-nav-mail')}>
                                        <span className={cx('icon-mail')}>
                                            <AiOutlineMail />
                                        </span>
                                        <span className={cx('mail')}>
                                            <p>Địa chỉ Email</p>
                                            <p>{location.state.user.email}</p>
                                        </span>
                                        <span className={cx('btn-update')}>
                                            <button>Cập nhật</button>
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
                                            <button>Cập nhật</button>
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

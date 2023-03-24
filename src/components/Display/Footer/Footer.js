import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('col-3')}>
                        <div className={cx('footer-item')}>
                            <ul className={cx('interact')}>
                                <li>FOLLOW US</li>
                                <li>
                                    <i className={cx('fa-brands fa-facebook-f icon__social')} />
                                </li>
                                <li>
                                    <i className={cx('fa-brands fa-twitter icon__social')} />
                                </li>
                                <li>
                                    <i className={cx('fa-brands fa-square-instagram icon__social')} />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('col-3')}>
                        <div className={cx('footer-item')}>
                            <ul className={cx('service')}>
                                <li>Contact US</li>
                                <li>Customer Service</li>
                                <li>Feedback Service</li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('col-3')}>
                        <div className={cx('footer-item')}>
                            <ul className={cx('rules')}>
                                <li>Rights & Permissions</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('col-3')}>
                        <div className={cx('footer-item')}>
                            <ul className={cx('address')}>
                                <li>
                                    Address:
                                    <span>Ha Noi - Viet Nam</span>
                                </li>
                                <li>
                                    Hotline:
                                    <span>18001027</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

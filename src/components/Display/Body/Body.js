import classNames from 'classnames/bind';
import styles from './Body.module.scss';
import Image from '~/img/gate_library.jpg';

const cx = classNames.bind(styles);

function Body() {
    return (
        <div className={cx('container')}>
            <div className={cx('container__body')}>
                <div className={cx('container__img')}>
                    <div className={cx('btn-pre')}>
                        <i className={cx('fa-solid fa-chevron-left')}></i>
                    </div>
                    <img className={cx('img__library')} src={Image} alt="..." />
                    <div className={cx('btn-next')}>
                        <i className={cx('fa-solid fa-chevron-right')}></i>
                    </div>
                </div>
                <div className={cx('header__desc')}>Introduction</div>
                <div className={cx('description__library')}>
                    <div className={cx('row')}>
                        <div className={cx('col')}>
                            <p className={cx('item-left')}>
                                Thư viện Geisel là tòa nhà thư viện chính của Đại học California, San Diego. Nó được đặt
                                tên để vinh danh Audrey và Theodor Seuss Geisel. Theodor được biết đến nhiều hơn với tư
                                cách là tác giả dành cho trẻ em, Tiến sĩ Seuss. Kiến trúc đặc biệt của tòa nhà, được mô
                                tả là chiếm "mối liên hệ hấp dẫn giữa chủ nghĩa tàn bạo và chủ nghĩa vị lai ", đã khiến
                                nó được xuất hiện trong biểu tượng UC San Diego và trở thành tòa nhà dễ nhận biết nhất
                                trong khuôn viên trường.
                            </p>
                            <p className={cx('item-left')}>
                                Thư viện được thiết kế bởi William Pereira và mở cửa vào năm 1970 với tên gọi Thư viện
                                Trung tâm. Thư viện UC San Diego bao gồm Thư viện Geisel và Tòa nhà Thư viện Y sinh, với
                                các vị trí bên ngoài khuôn viên trường tại Scripps Archives and Library Annex, Tòa nhà
                                Phụ lục Lưu trữ Phố Thương mại và Cơ sở Thư viện Khu vực phía Nam của UC. Thư viện
                                Geisel nằm ở trung tâm của khuôn viên UC San Diego. Nó chứa hơn 7 triệu tập để hỗ trợ
                                các mục tiêu giáo dục và nghiên cứu của trường đại học.
                            </p>
                            <p className={cx('item-left')}>
                                Nó cũng chứa Bộ sưu tập và Lưu trữ Đặc biệt Mandeville, nơi chứa Bộ sưu tập của Tiến sĩ
                                Seuss, chứa các bản vẽ gốc, bản phác thảo, bản kiểm chứng, sổ ghi chép, bản thảo bản
                                thảo, sách, băng ghi âm và video, ảnh và kỷ vật. Khoảng 8.500 mục trong bộ sưu tập ghi
                                lại đầy đủ các thành tựu sáng tạo của Tiến sĩ Seuss, bắt đầu từ năm 1919 với các hoạt
                                động ở trường trung học của ông và kết thúc khi ông qua đời vào năm 1991.
                            </p>
                        </div>
                        <div className={cx('col')}>
                            <p className={cx('item-right')}>
                                Geisel ban đầu đặc biệt được thiết kế vào cuối những năm 1960 bởi William Pereira nằm ở
                                đầu hẻm núi. Các mái vòm của tòa nhà, kết hợp với thiết kế của các tầng riêng lẻ, nhằm
                                mục đích trông giống như những bàn tay đang ôm một chồng sách. William Pereira &
                                Associates đã chuẩn bị một báo cáo chi tiết vào năm 1969. Ban đầu Pereira hình thành một
                                tòa nhà khung thép hình nấm, nhưng chi phí xây dựng và bảo trì dự kiến buộc ông phải
                                chuyển sang kết cấu bê tông cốt thép.
                            </p>
                            <p className={cx('item-right')}>
                                Sự thay đổi vật liệu này tạo cơ hội cho một thiết kế điêu khắc hơn, cũng như mở ra không
                                gian nội thất vốn đã bị chia cắt bởi các khung thép. Trước khi xây dựng, mô hình tỷ lệ
                                1/2 của một trong những cột bên ngoài đã được xây dựng và trải qua nhiều thử nghiệm khác
                                nhau. Người ta hình dung rằng những bổ sung trong tương lai cho tòa nhà ban đầu sẽ tạo
                                thành các bậc thang xung quanh chân tháp đi xuống hẻm núi. Để phù hợp với quy hoạch tổng
                                thể ban đầu, chúng được "thiết kế có chủ ý để phù hợp với hình thức hình học mạnh mẽ của
                                thư viện hiện có".
                            </p>
                            <p className={cx('item-right')}>
                                Trong hai tầng ngầm của nó là các phần thư viện khác cũng như không gian nghiên cứu và
                                phòng máy tính. Tòa nhà đã được Architecture Daily mô tả là "một mối liên hệ hấp dẫn
                                giữa chủ nghĩa tàn bạo và chủ nghĩa vị lai". Tòa tháp của nó tăng 8 tầng với chiều cao
                                110 ft (33,5 m). Năm tầng trên của các bộ sưu tập nhà tháp, không gian học tập cá nhân
                                và phòng học nhóm.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;

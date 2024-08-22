import config from '~/config';

// Layouts
import Home from '~/layouts/Home/Home';
import Book from '~/pages/Book/Book';
import BookTypePage from '~/pages/BookTypePage/BookTypePage';
import BookDetail from '~/pages/BookDetail/BookDetail';
import LoginUser from '~/layouts/User/LoginUser/LoginUser';
import SignUpForm from '~/layouts/User/SignUp/SignUp';
import Blog from '~/pages/Blog/Blog';
import CreateBlog from '~/components/Blog/CreateBlog/CreateBlog';
import BlogDetail from '~/pages/BlogDetail/BlogDetail';
import Profile from '~/pages/Profile/Profile';
import CartUser from '~/pages/CartUser/CartUser';
import PayCart from '~/components/Cart/Paycart/PayCart';
import Order from '~/pages/Order/Order';
import AuthorComponent from '~/pages/Author/Author';
import AuthorInfor from '~/pages/AuthorInfor/AuthorInfor';

import HomeAdmin from '~/pages/HomeAdmin/HomeAdmin';
import ManagementBook from '~/components/Admin/MangementBook/ManagementBook';
import ViewBookComponent from '~/components/Admin/ViewBook/ViewBook';
import CreateBook from '~/components/Admin/CreateBook/CreateBook';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.homePage, component: Home },
    { path: config.routes.book, component: Book },
    { path: config.routes.bookType, component: BookTypePage },
    { path: config.routes.bookAuthor, component: BookTypePage },
    { path: config.routes.bookDetail, component: BookDetail },
    { path: config.routes.login, component: LoginUser },
    {
        path: config.routes.signup,
        component: SignUpForm,
    },
    {
        path: config.routes.blog,
        component: Blog,
    },
    {
        path: config.routes.blogDetail,
        component: BlogDetail,
    },
    {
        path: config.routes.profile,
        component: Profile,
    },
    {
        path: config.routes.cart,
        component: CartUser,
    },
    {
        path: config.routes.payCart,
        component: PayCart,
    },
    {
        path: config.routes.createBlog,
        component: CreateBlog,
    },
    {
        path: config.routes.homeAdmin,
        component: HomeAdmin,
    },
    {
        path: config.routes.manageBook,
        component: ManagementBook,
    },
    {
        path: config.routes.viewBook,
        component: ViewBookComponent,
    },
    {
        path: config.routes.createBook,
        component: CreateBook,
    },
    {
        path: config.routes.order,
        component: Order,
    },
    {
        path: config.routes.author,
        component: AuthorComponent,
    },
    {
        path: config.routes.authorInfor,
        component: AuthorInfor,
    },
];

export { publicRoutes };

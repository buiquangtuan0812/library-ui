import config from '~/config';

// Layouts
import Home from '~/layouts/Home/Home';
import Book from '~/pages/Book/Book';
import BookTypePage from '~/pages/BookTypePage/BookTypePage';
import BookDetail from '~/pages/BookDetail/BookDetail';
import LoginUser from '~/layouts/User/LoginUser/LoginUser';
import SignUpForm from '~/layouts/User/SignUp/SignUp';
import Blog from '~/components/Blog/Blog';
import CreateBlog from '~/components/Blog/CreateBlog/CreateBlog';
import BlogDetail from '~/pages/BlogDetail/BlogDetail';
import Profile from '~/pages/Profile/Profile';
import CartUser from '~/pages/CartUser/CartUser';
import PayCart from '~/components/Cart/Paycart/PayCart';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.homePage, component: Home },
    { path: config.routes.book, component: Book },
    { path: config.routes.bookType, component: BookTypePage },
    { path: config.routes.bookdetail, component: BookDetail },
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
];

export { publicRoutes };

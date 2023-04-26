import Home from '~/layouts/Home/Home';

import SignUpForm from '~/layouts/User/SignUp/SignUp';
import LoginForm from '~/layouts/User/LoginUser/LoginUser';

import BookPage from '~/layouts/Book/Book';
import BookDetail from '~/layouts/BookDetail/BookDetail';
import BookTypePage from '~/layouts/Book/BookTypePage/BookTypePage';

import Blog from '~/layouts/Blogs/Blog';
import BlogDetail from '~/components/BlogDetail/BlogDetail';
import CreateBlog from './components/CreateBlog/CreateBlog';
import EditBlog from '~/components/CreateBlog/ConfirmPost/ConfirmPost';

import HomeAdmin from '~/components/Admin/HomeAdmin/HomeAdmin';
import LoginAdmin from '~/components/Admin/LoginAdmin/LoginAdmin';

import ProfileUser from '~/components/Profile/Profile';
import CartUser from './layouts/CartUser/CartUser';

import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route exact index element={<Home />}></Route>
            {/* User */}
            <Route path="home" element={<Home />}></Route>
            <Route path="user/login" element={<LoginForm />}></Route>
            <Route path="user/signup" element={<SignUpForm />}></Route>
            <Route path="library/books" element={<BookPage />}></Route>
            <Route path="library/book/:type" element={<BookTypePage />}></Route>
            <Route path="library/book/author/:author" element={<BookTypePage />}></Route>
            <Route path="library/book/detail/:nameBook" element={<BookDetail />}></Route>
            {/* Blog */}
            <Route path="library/blogs" element={<Blog />}></Route>
            <Route path="library/blog-detail/:title" element={<BlogDetail />}></Route>
            <Route path="library/blogs/create" element={<CreateBlog />}></Route>
            <Route path="library/blogs/create/edit" element={<EditBlog />}></Route>
            {/* Admin */}
            <Route path="admin/login" element={<LoginAdmin />}></Route>
            <Route path="admin/home" element={<HomeAdmin page="Statistic" />}></Route>
            <Route path="admin/manage/books" element={<HomeAdmin page="ManagementBook" />}></Route>
            <Route
                path="admin/manage/books/:nameBook"
                element={<HomeAdmin page="ManagementBook" name="Book" />}
            ></Route>
            <Route path="admin/manage/book/:nameBook" element={<HomeAdmin page="View" />}></Route>
            <Route path="admin/manage/book-create" element={<HomeAdmin page="Create" />}></Route>
            {/* Cart user */}
            <Route path="library/user/cart" element={<CartUser />}></Route>
            {/* Profile User */}
            <Route path="user/profile" element={<ProfileUser />}></Route>
        </Routes>
    );
}

export default App;

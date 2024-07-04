const routes = {
    homePage: '/',
    home: '/home',
    login: '/user/login',
    signup: '/user/signup',
    book: '/books',
    bookType: '/book/:type',
    bookAuthor: '/book/author/:author',
    bookdetail: '/book/detail/:nameBook',
    blog: '/blogs',
    createBlog: '/blogs/create',
    blogDetail: '/blog-detail/:title',
    author: '/authors',
    authorInfor: '/author/infor/:name',
    profile: '/user/profile',
    cart: '/user/carts',
    payCart: '/user/payment',
    order: '/user/order',
    homeAdmin: '/admin/home',
    manageBook: '/admin/manage/books',
    viewBook: '/admin/manage/book/:name',
    createBook: '/admin/manage/book-create',
};

export default routes;

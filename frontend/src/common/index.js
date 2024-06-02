
const Backenddomain = "https://mern-backend-6-2024.onrender.com/"

const SumaryApi ={

    SignUp:{
        url: `${Backenddomain}/api/signup`,
        method: "post"
    },

    SignIn:{
        url: `${Backenddomain}/api/signin`,
        method: "post"
    },
    Current_user:{
        url: `${Backenddomain}/api/user-detail`,
        method: "get",
    },

    logout_user:{
        url:`${Backenddomain}/api/userlogout`,
        method: "get"
    },

    allUsers:{
        url:`${Backenddomain}/api/all-users`,
        method: "get",
    },

    updateUser:{
        url:`${Backenddomain}/api/update-user`,
        method:"post"
    },

    upLoadproDuct:{
        url:`${Backenddomain}/api/upload-product`,
        method:"post"
    },

    Allproduct:{
        url:`${Backenddomain}/api/get-product`,
        method: "get"
    },
    UpdateProduct:{
        url:`${Backenddomain}/api/update-product`,
        method:"post"
    },

    categoryProduct: {
        url:`${Backenddomain}/api/get-categoryproduct`,
        method:"get"
    },

    categoryWiseProduct:{
        url:`${Backenddomain}/api/category-product`,
        method:"post"
    },
    productDetail:{
        url:`${Backenddomain}/api/product-detail`,
        method:"post"
    },
    addToCartProduct : {
        url : `${Backenddomain}/api/addtocart`,
        method : 'post'
    },

    addToCartProductCount:{
        url:`${Backenddomain}/api/countAddToCartProduct`,
        method: "get"
    },
    addToCartProductView:{
        url:`${Backenddomain}/api/view-card-product`,
        method:"get"
    },
    updateCartProduct : {
        url : `${Backenddomain}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${Backenddomain}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${Backenddomain}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${Backenddomain}/api/filter-product`,
        method : 'post'
    }
    
}

export default SumaryApi

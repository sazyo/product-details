// دالة للحصول على تفاصيل المنتج بناءً على id
const getProductDetails = async () => {
    const URLparams = new URLSearchParams(window.location.search);
    const productId = URLparams.get('id');
        const { data } = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        return data;

}

const displayProductDetails = async () => {
    const product = await getProductDetails(); 
    const result = `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-price">$${product.price}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-rating"> ${product.rating.rate} (${product.rating.count} reviews)</div>
            </div>
        </div>
    `;

    document.querySelector(".categories .container .row").innerHTML = result;
}


displayProductDetails();

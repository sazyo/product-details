// دالة للحصول على المنتجات بناءً على الفئة
const getCategoryProducts = async () => {
    const URLparams = new URLSearchParams(window.location.search);
    const categoryName = URLparams.get('categories');

    if (!categoryName) {
        console.error('No category found!');
        return [];
    }

    try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
        return data;
    } catch (error) {
        console.error('Failed to fetch category products:', error);
        return [];
    }
}

// دالة لعرض المنتجات في الصفحة
const displayProducts = async () => {
    const products = await getCategoryProducts();
    console.log(products);

    const result = products.map(product => {
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-info">
                    <div class="product-title">${product.title}</div>
                    <a href='./productdetails.html?id=${product.id}'>View more</a>
                </div>
            </div>
        `;
    }).join('');

    document.querySelector(".categories .container .row").innerHTML = result;
}

displayProducts();

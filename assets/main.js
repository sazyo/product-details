const getCategory = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products/categories");
    return data;
}

const displayCategory = async () => {
    const categories = await getCategory();
    console.log(categories);

    const result = categories.map((item) => {
        return `
            <div class="category">
                <h2>${item}</h2>
                <a href='./detals.html?categories=${item}'>View more</a>
            </div>
        `;
    }).join('');

    document.querySelector(".categories .container .row").innerHTML = result;
}

displayCategory();

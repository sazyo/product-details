let currentPage = 1; 
const productsPerPage = 3; 
let totalProducts = 0;

const getCategoryProducts = async (page = 1) => {
    const URLparams = new URLSearchParams(window.location.search);
    const categoryName = URLparams.get('categories');

    if (!categoryName) {
        console.error('No category found!');
        return [];
    }

    try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
        totalProducts = data.length; 
        return data.slice((page - 1) * productsPerPage, page * productsPerPage); 
    } catch (error) {
        console.error('Failed to fetch category products:', error);
        return [];
    } finally {
        document.querySelector(".positionAbs").classList.add("d-none");
        document.querySelector(".loader").classList.add("d-none");
    }
};

const displayProducts = async (page = 1) => {
    const products = await getCategoryProducts(page);
    console.log(products);

    const result = products.map(product => {
        return `
            <div class="product-card">
                <div class="imge">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <div class="product-title">${product.title}</div>
                </div>
            </div>
        `;
    }).join('');

    document.querySelector(".categories .container .row").innerHTML = result;
    generatePagination(page);
    modal();
};

const generatePagination = (page) => {
    const numberOfPages = Math.ceil(totalProducts / productsPerPage); 
    let paginationLink = '';

    if (page > 1) {
        paginationLink += `<li><button onclick="displayProducts(${page - 1})">&lt;</button></li>`;
    } else {
        paginationLink += `<li><button disabled>&lt;</button></li>`;
    }

    for (let i = 1; i <= numberOfPages; i++) {
        paginationLink += `<li><button onclick="displayProducts(${i})" ${i === page ? 'class="active"' : ''}>${i}</button></li>`;
    }

    if (page < numberOfPages) {
        paginationLink += `<li><button onclick="displayProducts(${page + 1})">&gt;</button></li>`;
    } else {
        paginationLink += `<li><button disabled>&gt;</button></li>`;
    }

    document.querySelector(".pagination").innerHTML = paginationLink;
};

const modal = () => {
    const leftButton = document.querySelector(".lb");
    const rightButton = document.querySelector(".rb");
    const modal = document.querySelector(".modal");
    const closeButton = document.querySelector(".cb");
    const imge = document.querySelectorAll(".imge");
    const modalImage = modal.querySelector("img");

    let currentImageIndex = 0;
    const images = Array.from(document.querySelectorAll(".product-card .imge img"));

    imge.forEach((img, index) => {
        img.addEventListener("click", (e) => {
            currentImageIndex = index;
            modal.classList.remove("d-none");
            modalImage.setAttribute("src", images[currentImageIndex].src);
        });
    });

    closeButton.addEventListener("click", () => {
        modal.classList.add("d-none");
        console.log("close");
    });

    leftButton.addEventListener("click", () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
        } else {
            currentImageIndex = images.length - 1;
        }
        modalImage.setAttribute("src", images[currentImageIndex].src);
        console.log(currentImageIndex);
    });

    rightButton.addEventListener("click", () => {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0;
        }
        modalImage.setAttribute("src", images[currentImageIndex].src);
        console.log(currentImageIndex);
    });
};

displayProducts(currentPage);
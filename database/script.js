import { fetchAPI } from "../fetchAPI.js";
const fetchListProduct = async (url) => {
    let data = await fetchAPI(url);
    let html = "";
    data.forEach((v) => {

        html += `
        <div class="infor">
            <img src="${v.images}" alt="img">
            <h3>${v.title}</h3>
            <div class="money">
            <p class="price">${v.price}$</p>
            <p class="stock">Còn lại : ${v.stock}</p>
            </div>
            <p class="discountPercentage">-${v.discountPercentage}%</p>
        </div>
        `;
    });
    document.querySelector('.inforProduct').innerHTML = html;
}
fetchListProduct(`http://localhost:3000/products`);

const select = document.querySelector(".select");
let currName;
const fetchNameProduct = async (url) => {
    let data = await fetchAPI(url);
    let mySet = new Set();
    data.forEach((v) => {
        mySet.add(v.category);
    });
    mySet.forEach((v) => {
        let html = `<a href="#" class="a-nameProduct"><div class="nameProduct__category">${v}</div></a>`;
        document.querySelector('.nameProduct__container').innerHTML += html;
    })
    const nameProduct = document.querySelectorAll('.nameProduct__category').forEach((v) => {
        v.addEventListener('click', () => {
            const name = v.innerHTML;
            currName  = name;
            fetchListProduct(`http://localhost:3000/products?category=${name}`);
        });
    });
};
select.addEventListener('change', () => {
    const sort = select.value;
    if (sort == "hightPrice") {
        fetchListProduct(`http://localhost:3000/products?category=${currName}&_sort=-price`);
    } else if (sort == "lowPrice") {
        fetchListProduct(`http://localhost:3000/products?category=${currName}&_sort=price`);
    } else if (sort == "disc") {
        fetchListProduct(`http://localhost:3000/products?category=${currName}&_sort=-discountPercentage`);
    } else {
        fetchListProduct(`http://localhost:3000/products?category=${currName}`);
    }
});
// const select = document.querySelector(".select");
// const fetchNameProduct = async (url) => {
//     let data = await fetchAPI(url);
//     let mySet = new Set();
//     data.forEach((v) => {
//         mySet.add(v.category);
//     });
//     mySet.forEach((v) => {
//         let html = `<a href="#" class="a-nameProduct"><div class="nameProduct__category">${v}</div></a>`;
//         document.querySelector('.nameProduct__container').innerHTML += html;
//     })
//     const nameProduct = document.querySelectorAll('.nameProduct__category').forEach((v) => {
//         v.addEventListener('click', () => {
//             const name = v.innerHTML;
    
//             // Gọi API với danh mục được chọn
//             fetchListProduct(`http://localhost:3000/products?category=${name}`);
    
//             // Gán lại sự kiện 'change' để cập nhật giá trị 'name'
//             const select = document.querySelector(".select");
//             select.replaceWith(select.cloneNode(true)); // Xóa sự kiện cũ và tạo bản sao sạch
//             const newSelect = document.querySelector(".select");
//             newSelect.addEventListener('change', () => {
//                 const sort = newSelect.value;
//                 if (sort == "hightPrice") {
//                     fetchListProduct(`http://localhost:3000/products?category=${name}&_sort=-price`);
//                 } else if (sort == "lowPrice") {
//                     fetchListProduct(`http://localhost:3000/products?category=${name}&_sort=price`);
//                 } else if (sort == "disc") {
//                     fetchListProduct(`http://localhost:3000/products?category=${name}&_sort=-discountPercentage`);
//                 } else {
//                     fetchListProduct(`http://localhost:3000/products?category=${name}`);
//                 }
//             });
//         });
//     });
// };
fetchNameProduct("http://localhost:3000/products");
const button = document.querySelector(".button");
const search = document.querySelector(".search");

button.addEventListener('click', () => {
    const name = search.value;
    fetchListProduct(`http://localhost:3000/products?title=${name}`);
})

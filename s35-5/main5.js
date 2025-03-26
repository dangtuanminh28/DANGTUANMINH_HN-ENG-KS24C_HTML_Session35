const addCategoryBtn = document.getElementById('addCategoryBtn');
const categoryModal = document.getElementById('categoryModal');
const closeBtn = document.querySelector('.close');
const categoryForm = document.getElementById('categoryForm');
const categoryList = document.getElementById('categoryList');

let editIndex = -1;
addCategoryBtn.addEventListener('click', function () {
    categoryModal.style.display = 'block';
    categoryForm.reset();
    editIndex = -1;
});

closeBtn.addEventListener('click', function () {
    categoryModal.style.display = 'none';
});

categoryForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const id = document.getElementById('categoryId').value;
    const name = document.getElementById('categoryName').value;
    const status = document.querySelector('input[name="status"]:checked').value;

    saveCategory(id, name, status);

    categoryModal.style.display = 'none';
    categoryForm.reset();
});

function saveCategory(id, name, status) {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];

    if (editIndex === -1) {
        categories.push({ id, name, status });
    } else {
        categories[editIndex] = { id, name, status };
    }

    localStorage.setItem('categories', JSON.stringify(categories));
    displayCategories();
}

function displayCategories() {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    let categoryListHtml = '';

    categories.forEach((category, index) => {
        categoryListHtml += `
            <tr>
                <td>${category.id}</td>
                <td>${category.name}</td>
                <td>${category.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}</td>
                <td>
                    <button onclick="editCategory(${index})">Sửa</button>
                    <button onclick="deleteCategory(${index})">Xóa</button>
                </td>
            </tr>
        `;
    });

    categoryList.innerHTML = categoryListHtml;
}

function editCategory(index) {
    let categories = JSON.parse(localStorage.getItem('categories'));
    let category = categories[index];

    document.getElementById('categoryId').value = category.id;
    document.getElementById('categoryName').value = category.name;

    if (category.status === 'active') {
        document.getElementById('active').checked = true;
    } else {
        document.getElementById('inactive').checked = true;
    }

    categoryModal.style.display = 'block';
    editIndex = index;
}

function deleteCategory(index) {
    let categories = JSON.parse(localStorage.getItem('categories'));
    categories.splice(index, 1);
    localStorage.setItem('categories', JSON.stringify(categories));
    displayCategories();
}

displayCategories();
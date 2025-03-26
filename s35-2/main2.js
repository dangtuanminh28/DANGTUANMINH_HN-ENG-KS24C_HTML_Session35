let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

let addBookmarkBtn = document.querySelector('.addBookmarkBtn');
let saveBtn = document.querySelector('.saveBtn');
let closeBtn = document.querySelector('.closeBtn');
let container = document.querySelector('.websitesList');
let formContainer = document.querySelector('.formContainer');
let mainBody = document.getElementById('mainBody');

function displayBookmarks() {
    container.innerHTML = '';
    for (let i in bookmarks) {
        let bookmark = bookmarks[i];

        container.innerHTML += `
            <section class="bookmarkItem">
                <img src="${bookmark.url}/favicon.ico" alt="">
                ${bookmark.name}
                <button class="deleteBtn" onclick="deleteBookmark(${i})">x</button>
            </section>
        `;
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    displayBookmarks();
}
addBookmarkBtn.onclick = function () {
    formContainer.classList.remove('hide');
};

saveBtn.onclick = function () {
    let name = document.getElementById('bookmarkName').value.trim();
    let url = document.getElementById('bookmarkURL').value.trim();
    if (name === '' || url === '') {
        alert('Invalid input');
    } else {
        bookmarks.push({ name, url });
    }
    formContainer.classList.add('hide');
    displayBookmarks();
};
closeBtn.onclick = function () {
    formContainer.classList.add('hide');
};
displayBookmarks();
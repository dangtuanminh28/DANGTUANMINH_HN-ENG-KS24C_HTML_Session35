let data = JSON.parse(localStorage.getItem('emp')) || [
    { id: 1, name: 'Nguyen Van A', pos: 'Dev' },
    { id: 2, name: 'Nguyen Van B', pos: 'Dev' },
    { id: 3, name: 'Nguyen Van C', pos: 'Dev' },
    { id: 4, name: 'Nguyen Van D', pos: 'Dev' },
    { id: 5, name: 'Nguyen Van E', pos: 'Dev' },
    { id: 6, name: 'Nguyen Van F', pos: 'Dev' },
    { id: 7, name: 'Nguyen Van G', pos: 'Dev' },
    { id: 8, name: 'Nguyen Van H', pos: 'Dev' },
    { id: 9, name: 'Nguyen Van I', pos: 'Dev' },
    { id: 10, name: 'Nguyen Van K', pos: 'Dev' },
    { id: 11, name: 'Nguyen Van L', pos: 'Dev' },
    { id: 12, name: 'Nguyen Van M', pos: 'Dev' }
];
localStorage.setItem('emp', JSON.stringify(data));

let page = 1, perPage = 3;

function show(page) {
    let list = document.getElementById('list');
    list.innerHTML = '';
    let start = (page - 1) * perPage;
    data.slice(start, start + perPage).forEach(emp => {
        list.innerHTML += `<tr><td>${emp.id}</td><td>${emp.name}</td><td>${emp.pos}</td></tr>`;
    });
}

function paginate() {
    let pages = document.getElementById('pages');
    pages.innerHTML = '';
    let total = Math.ceil(data.length / perPage);
    for (let i = 1; i <= total; i++) {
        let btn = document.createElement('button');
        btn.innerText = i;
        btn.classList.toggle('active', i === page);
        btn.onclick = () => { page = i; show(page); paginate(); };
        pages.appendChild(btn);
    }
}

document.getElementById('add').onclick = () => {
    let name = document.getElementById('name').value.trim();
    let pos = document.getElementById('pos').value.trim();
    if (!name || !pos) return alert("Không để trống!");
    data.push({ id: data.length + 1, name, pos });
    localStorage.setItem('emp', JSON.stringify(data));
    show(page);
    paginate();
};

show(page);
paginate();
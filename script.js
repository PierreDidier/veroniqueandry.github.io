let currentItems = [];
let currentIndex = 0;

const views = {
    'nav-galerie': document.getElementById('view-gallery'),
    'nav-apropos': document.getElementById('view-about'),
    'link-feux-follets': document.getElementById('view-feux-follets'),
    'link-untitled': document.getElementById('view-untitled'),
    'link-saisons': document.getElementById('view-saisons')
};

function showView(viewId) {
    Object.values(views).forEach(v => { if(v) v.style.display = 'none'; });
    if(views[viewId]) views[viewId].style.display = 'block';
    
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active-link'));
    if(viewId.includes('link-')) {
        document.getElementById('nav-series').classList.add('active-link');
    } else {
        const link = document.getElementById(viewId);
        if(link) link.classList.add('active-link');
    }
    window.scrollTo(0, 0);
}

Object.keys(views).forEach(id => {
    const el = document.getElementById(id);
    if(el) el.onclick = (e) => { e.preventDefault(); showView(id); };
});

const modal = document.getElementById('modal');

function initGallery() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.onclick = () => {
            currentItems = Array.from(item.closest('section').querySelectorAll('.gallery-item'));
            currentIndex = currentItems.indexOf(item);
            openModal();
        };
    });
}

function openModal() {
    modal.classList.add('show');
    updateModal();
    document.body.style.overflow = 'hidden';
}

function updateModal() {
    const item = currentItems[currentIndex];
    const data = item.dataset;
    document.getElementById('modal-img').src = item.querySelector('img').src;
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-date').innerText = data.date;
    document.getElementById('modal-details').innerText = `${data.medium} | ${data.format}`;
    
    const sLink = document.getElementById('modal-series-link');
    sLink.innerText = data.seriesName;
    sLink.onclick = (e) => { e.preventDefault(); closeModal(); showView(data.seriesId); };
}

function changeImage(dir) {
    currentIndex = (currentIndex + dir + currentItems.length) % currentItems.length;
    updateModal();
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

document.onkeydown = (e) => {
    if(!modal.classList.contains('show')) return;
    if(e.key === "ArrowRight") changeImage(1);
    if(e.key === "ArrowLeft") changeImage(-1);
    if(e.key === "Escape") closeModal();
};

initGallery();

document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    let constextMenu = document.querySelector('.file__contextmenu');
    if(constextMenu !== null) {
        document.body.removeChild(constextMenu);
    }
    const clikedItemClass = e.target.getAttribute("class");
    if(['mainSection__file', 'mainSection__file-box', 'mainSection__file-name', 'mainSection__file-filesize', 'mainSection__file-uploadTime'].indexOf(clikedItemClass) >= 0) {
        constextMenu = CreateContextMenu(e.clientX, e.clientY);
        document.body.appendChild(constextMenu);
    }
});
document.addEventListener('click', (e) => {
    e.preventDefault();
    let constextMenu = document.querySelector('.file__contextmenu');
    if(constextMenu !== null) {
        document.body.removeChild(constextMenu);
    }
});
const CreateContextMenu = (posX, posY) => {
    const contextmenu = document.createElement('div');
    contextmenu.classList.add('file__contextmenu');
    contextmenu.innerHTML = `<button class="file__contextmenu-item" id="file__cm-moveBtn">
            <i class="file__contextmenu-btn-icon icon-doc-inv"></i>
            <span class="file__contextmenu-btn-text">Move</span>
        </button>
        <button class="file__contextmenu-item" id="file__cm-downloadBtn">
            <i class="file__contextmenu-btn-icon icon-doc-inv"></i>
            <span class="file__contextmenu-btn-text">Download</span>
        </button>
        <button class="file__contextmenu-item" id="file__cm-downloadBtn">
            <i class="file__contextmenu-btn-icon icon-doc-inv"></i>
            <span class="file__contextmenu-btn-text">Delete</span>
        </button>
        <button class="file__contextmenu-item" id="file__cm-downloadBtn">
            <i class="file__contextmenu-btn-icon icon-doc-inv"></i>
            <span class="file__contextmenu-btn-text">Share...</span>
        </button>`;
    contextmenu.style.top = posY + "px";
    contextmenu.style.left = posX + "px";
    return contextmenu;
};
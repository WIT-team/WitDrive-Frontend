export default params =>
    {
        return `<nav class="up_navigation">
<div class="up_navigation__leftBox">
    <img class="up_navigation__logo" src="assets/imgs/logo_2.svg" onclick="router.loadRoute('')"></img>
</div>
<div class="up_navigation__rightBox">
    <ul class="up_navigation__list" id="userAccountNav">
       
    </ul>
</div>
</nav>
<section class="up_mainSection">
<div class="up_mainSection__menu">
    <ul class="up_mainSection__menu-list">
        <li class="up_mainSection__menu-item">
            <button class="up_mainSection__upBtn">Upload</button>
        </li>
        <li class="up_mainSection__menu-item"><a onclick="router.loadRoute('files','myFiles')" class="up_mainSection__menu-item-link">My files</a></li>
        <li class="up_mainSection__menu-item"><a onclick="router.loadRoute('files', '')" class="up_mainSection__menu-item-link">Shared</a></li>
        <li class="up_mainSection__menu-item"><a onclick="router.loadRoute('files', '')" class=up_mainSection__menu-item-link">Recycle bin</a></li>
    </ul>
    <div class="up_mainSection__f-space-info">
        <h2 class="up_mainSection__f-space-h">Free space</h2>
        <p class="up_mainSection__f-space-details">1,3GB of 15GB used</p>
    </div>
</div>
<section class="up_mainSection">
        <div class="up_mainSection__menu">
            <ul class="up_mainSection__menu-list">
                <li class="up_mainSection__menu-item">
                    <button class="up_mainSection__upBtn">Upload</button>
                </li>
                <li class="up_mainSection__menu-item"><a href="#" class="up_mainSection__menu-item-link">My files</a></li>
                <li class="up_mainSection__menu-item"><a href="#" class="up_mainSection__menu-item-link">Shared</a></li>
                <li class="up_mainSection__menu-item"><a href="#" class="up_mainSection__menu-item-link">Recycle bin</a></li>
            </ul>
            <div class="up_mainSection__f-space-info">
                <h2 class="up_mainSection__f-space-h">Free space</h2>
                <p class="up_mainSection__f-space-details">1,3GB of 15GB used</p>
            </div>
        </div>
        <div class="up_mainSection__files-box">
            <header>
                <h1 class="up_mainSection__header">Files</h1>
                <div class="up_mainSection__file-atrubutes">
                    <span class="up_mainSection__file-atrubutes-name">Name</span>
                    <span class="up_mainSection__file-atrubutes-up-date">Upload date</span>
                    <span class="up_mainSection__file-atrubutes-size">Size</span>
                </div>
            </header>
            <ul class="up_mainSection__file-list" id="fileList"></ul>
        </div>
    </section>`
    }
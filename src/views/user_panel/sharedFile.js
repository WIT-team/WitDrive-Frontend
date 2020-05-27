export default params => {
    return `<nav class="up_navigation">
<div class="up_navigation__leftBox">
    <img class="up_navigation__logo" src="assets/imgs/logo_2.svg" onclick="router.loadRoute('')"></img>
</div>
</nav>
<section class="up_mainSection">
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
</section>`;
};
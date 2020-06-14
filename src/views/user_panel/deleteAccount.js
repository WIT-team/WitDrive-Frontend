export default `
<nav class="up_navigation">
<div class="up_navigation__leftBox">
    <img class="up_navigation__logo" src="assets/imgs/logo_2.svg" onclick="router.loadRoute('files')"></img>
</div>
<div class="up_navigation__rightBox">
    <ul class="up_navigation__list" id="userAccountNav"></ul>
</div>
</nav>
<section class="up_mainSection mainSection--settingsPanel">
<div class="up_mainSection__menu">
    <header>
        <h2 class="up_mainSection__h">Settings</h2>
    </header>
    <ul class="up_mainSection__menu-list">
        <li class="up_mainSection__menu-item"><a onclick="router.loadRoute('passwordChange')" class="up_mainSection__menu-item-link">Password</a></li>
        <li class="up_mainSection__menu-item"><a onclick="router.loadRoute('deleteAccount')" class="up_mainSection__menu-item-link">Delete account</a></li>
    </ul>
</div>
<div class="up_mainSection__settings-box">
    <form class="up_mainSection__form" id="deleteAccountForm">
        <h2 class="up_mainSection__form-header">Delete Account</h2>
        <label for="Password" class="up_mainSection__form-label">To delete account enter password:</label>
        <input type="password" name="Password" class="up_mainSection__form-input" placeholder="Password">
        <div class="up_mainSection__form-btns">
            <button class="up_mainSection__form-btn cancelBtn" id="mainSection__form-cancel-btn">Cancel</button>
            <button type="submit" class="up_mainSection__form-btn" id="mainSection__form-Sbtn">Delete</button>
        </div>
    </form>
</div>
</section>
`
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
    <form action="#" class="up_mainSection__form" id="passwordChangeForm">
        <h2 class="up_mainSection__form-header">Change your password:</h2>
        <label for="oldPassword" class="up_mainSection__form-label">Old password:</label>
        <input type="password" name="oldPassword" class="up_mainSection__form-input" placeholder="Old password">
        <label for="newPassword" class="up_mainSection__form-label">New password:</label>
        <input type="password" name="newPassword" class="up_mainSection__form-input"  placeholder="New password">
        <label for="newPassword_r" class="up_mainSection__form-label">Repeat new password:</label>
        <input type="password" name="newPassword_r" class="up_mainSection__form-input" placeholder="Repeat new password">
        <div class="up_mainSection__form-btns">
            <button class="up_mainSection__form-btn cancelBtn" id="mainSection__form-cancel-btn">Cancel</button>
            <button type="submit" class="up_mainSection__form-btn" id="mainSection__form-Sbtn">Change</button>
        </div>
    </form>
</div>
</section>
`
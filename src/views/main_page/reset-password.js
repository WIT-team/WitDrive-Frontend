export default
`<nav class="navigation">
        <div class="navigation__leftBox">
            <img class="navigation__logo" src="assets/imgs/logo_2.svg" onclick="router.loadRoute('files')"></img>
            <ul class="navigation__list">
                <li class="navigation__item"><a onclick="router.loadRoute('')" class="navigation__link">Home page</a></li>
                <li class="navigation__item"><a onclick="router.loadRoute('faq')" class="navigation__link">FAQ</a></li>
            </ul>
        </div>
        <div class="navigation__rightBox">
            <ul class="navigation__list" id="userAccountNav">
                <li class="navigation__item"><a onclick="router.loadRoute('login')" class="navigation__link">Sign in</a></li>
                <li class="navigation__item"><a onclick="router.loadRoute('register')" class="navigation__link navigation__link--bolded">Sign up</a></li>
            </ul>
        </div>
    </nav>
    <section class="newPasswordSection" id="newPasswordSection">
        <form action="#" class="newPassword__form" id="newPasswordForm">
            <h2 class="newPassword__form-header">Reset your password:</h2>
            <label for="email" class="newPassword__form-label">Email:</label>
            <input type="email" name="email" class="newPassword__form-input"  placeholder="James-Smith@mail.com">
            <label for="code" class="newPassword__form-label">Verify code:</label>
            <input type="text" name="code" class="newPassword__form-input"  placeholder="Code from email">
            <label for="newPassword" class="newPassword__form-label">New password:</label>
            <input type="password" name="newPassword" class="newPassword__form-input"  placeholder="New password">
            <label for="newPassword_r" class="newPassword__form-label">Repeat new password:</label>
            <input type="password" name="newPassword_r" class="newPassword__form-input" placeholder="Repeat new password">
            <div class="newPassword__form-btns">
                <button class="newPassword__form-btn cancelBtn" id="newPassword__form-cancel-btn">Cancel</button>
                <button type="submit" class="newPassword__form-btn" id="newPassword__form-Sbtn">Change</button>
            </div>
        </form>
        </form>
    </section>
    <footer class="footer">
        <div class="footer__top">
            <ul class="footer__list">
                <h5 class="footer__list-header">Links</h5>
                <li class="footer__list-item"><a class="footer__list-link" onclick="router.loadRoute('login')">Sign in</a></li>
                <li class="footer__list-item"><a class="footer__list-link" onclick="router.loadRoute('faq')">FAQ</a></li>
            </ul>
            <ul class="footer__list">
                <h5 class="footer__list-header">Social</h5>
                <li class="footer__list-item"><a class="footer__list-link" href="https://github.com/WIT-team">Github</a></li>
                <li class="footer__list-item"><a class="footer__list-link" href="mailto:wit-team@gmail.com">E-mail</a></li>
            </ul>
            <ul class="footer__list">
                <h5 class="footer__list-header">Contact</h5>
                <li class="footer__list-item">E-mail address: wit-team@gmail.com</li>
                <li class="footer__list-item">Phone number: +48 542-654-123</li>
                <li class="footer__list-item">Poland</li>
            </ul>
        </div>
        <div class="footer__bottom">
            <p class="footer__bottom-text">
                All rights reserved 2020. Created by Wit-Team.
            </p>
        </div>
    </footer>`
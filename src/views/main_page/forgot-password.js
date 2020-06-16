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
    <section class="mainPasswordResetSection" id="mainPasswordResetSection">
        <form action="#" class="mainSection__form mainSection__form--reset" id="forgotPasswordForm">
            <h3 class="mainSection__form-header mainSection__form-header--reset">Reset your password</h3>
            <label for="username" class="mainSection__form--label">Your e-mail:</label>
            <input type="email" name="email" id="emailInput" class="mainSection__form--input" placeholder="James-Smith@mail.com">
            <div class="mainPasswordResetSection__btns">
                <a onclick="router.loadRoute('login')" class="mainSection__CancelBtn">Cancel</a>
            <button type="submit" class="mainSection__SubmitBtn mainSection__SubmitBtn--reset" id="SubmitBtn">Reset</button>
            </div>
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
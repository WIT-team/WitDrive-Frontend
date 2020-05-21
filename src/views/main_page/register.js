export default
`<nav class="navigation">
<div class="navigation__leftBox">
    <img class="navigation__logo" src="assets/imgs/logo_2.svg" onclick="router.loadRoute('')"></img>
    <ul class="navigation__list">
        <li class="navigation__item"><a class="navigation__link" onclick="router.loadRoute('')">Home page</a></li>
        <li class="navigation__item"><a class="navigation__link" onclick="router.loadRoute('faq')">FAQ</a></li>
    </ul>
</div>
<div class="navigation__rightBox">
    <ul class="navigation__list" id="userAccountNav">
        <li class="navigation__item"><a onclick="router.loadRoute('login')" class="navigation__link ">Sign in</a></li>
    </ul>
</div>
</nav>
<section class="mainSection">
<div class="mainSection__rightSide">
    <form action="#" class="mainSection__form" id="registerForm">
        <h3 class="mainSection__form-header">Create account</h3>
        <label for="username" class="mainSection__form--label">Username:</label>
        <input type="text" name="username" id="usernameInput" class="mainSection__form--input" placeholder="James-Smith">
        <label for="email" class="mainSection__form--label" >E-mail address:</label>
        <input type="text" name="email" id="emailInput" class="mainSection__form--input" placeholder="James-Smith@mail.com">
        <label for="password" class="mainSection__form--label">Password:</label>
        <input type="password" name="password" id="passwordInput" class="mainSection__form--input" placeholder="Secure password">
        <label for="r_password" class="mainSection__form--label">Repeat your password:</label>
        <input type="password" name="r_password" id="r_passwordInput" class="mainSection__form--input" placeholder="Repeat password"> 
        <button type="submit" class="mainSection__SubmitBtn" id="SubmitBtn">Sign up</button>
    </form>
</div>
</section>
<footer class="footer">
<div class="footer__top">
    <ul class="footer__list">
        <h5 class="footer__list-header">Links</h5>
        <li class="footer__list-item"><a class="footer__list-link" onclick="router.loadRoute('login')">Sign in</a></li>
        <li class="footer__list-item"><a class="footer__list-link" onclick="router.loadRoute('about')">About</a></li>
        <li class="footer__list-item"><a class="footer__list-link" onclick="router.loadRoute('faq')">FAQ</a></li>
    </ul>
    <ul class="footer__list">
        <h5 class="footer__list-header">Social</h5>
        <li class="footer__list-item"><a class="footer__list-link" href="#">Github</a></li>
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
</footer>
`
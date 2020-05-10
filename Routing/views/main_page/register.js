export default props => `
<section class="mainSection">
<div class="mainSection__rightSide">
    <form action="#" class="mainSection__form">
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
        <li class="footer__list-item"><a class="footer__list-link" href="#">Sign in</a></li>
        <li class="footer__list-item"><a class="footer__list-link" href="#">About</a></li>
        <li class="footer__list-item"><a class="footer__list-link" href="#">FAQ</a></li>
    </ul>
    <ul class="footer__list">
        <h5 class="footer__list-header">Social</h5>
        <li class="footer__list-item"><a class="footer__list-link" href="#">Github</a></li>
        <li class="footer__list-item"><a class="footer__list-link" href="#">E-mail</a></li>
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
`;
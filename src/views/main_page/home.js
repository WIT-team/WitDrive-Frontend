export default 
`<nav class="navigation">
        <div class="navigation__leftBox">
            <img class="navigation__logo" src="assets/imgs/logo_2.svg" onclick="router.loadRoute('files')"></img>
            <ul class="navigation__list">
                <li class="navigation__item"><a class="navigation__link" onclick="router.loadRoute('faq')">FAQ</a></li>
            </ul>
        </div>
        <div class="navigation__rightBox">
            <ul class="navigation__list" id="userAccountNav">
                <li class="navigation__item"><a onclick="router.loadRoute('login')" class="navigation__link">Sign in</a></li>
                <li class="navigation__item"><a onclick="router.loadRoute('register')" class="navigation__link navigation__link--bolded">Sign up</a></li>
            </ul>
        </div>
    </nav>
    <section class="mainSection">
        <div class="mainSection__leftSide">
            <img src="assets/imgs/logo_gray.svg" alt="WitDrive logo" class="mainSection__logo">
            <div class="mainSection__desc">
                <h1 class="mainSection__header">Right place for your files.</h1>
            <p class="mainSection__p">
                WitDrive is a secure colud storage platform,
created with passion to help people keep
all their memories on our servers.
            </p>
            </div>
        </div>
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
    <div class="alertBar">
        <p class="alertBar__p">Our website uses cookies. Make sure you accept that.</p>
        <!--<a class="alertBar__btn" id="">Accept</a>-->
        <a href="https://www.google.com/" class="alertBar__btn">Deny</a>
    </div>
    <section class="stepsSection">
        <h2 class="stepsSection__header1">
            It is pretty easy to set up your storage account
        </h2>
        <h3 class="stepsSection__header2">
            A FEW EASY STEPS TO GET STARTED
        </h3>
        <div class="stepsSection__steps">
            <div class="stepsSection__stepbox">
                <header class="stepsSection__stepHerader">
                    <h4 class="stepsSection__sepnum">1</h4>
                    <h4 class="stepsSection__septitle">Create an account</h4>
                </header>
                <i class="icon-user-plus stepsSection__icon"></i>
                <p class="stepsSection__stepFakeBtn">Sign up</p>
            </div>
            <div class="stepsSection__stepbox">
                <header class="stepsSection__stepHerader">
                    <h4 class="stepsSection__sepnum">2</h4>
                    <h4 class="stepsSection__septitle">Send your data</h4>
                </header>
                <i class="icon-folder-1 stepsSection__icon"></i>
                <p class="stepsSection__stepFakeBtn">Send</p>
            </div>
            <div class="stepsSection__stepbox">
                <header class="stepsSection__stepHerader">
                    <h4 class="stepsSection__sepnum">3</h4>
                    <h4 class="stepsSection__septitle">Share with others</h4>
                </header>
                <i class="icon-network stepsSection__icon"></i>
                <p class="stepsSection__stepFakeBtn">Share</p>
            </div>
        </div>
        
        <a onclick="router.loadRoute('login')" class="stepsSection__Btn">Start now!</a>
    </section>
    <section class="services" id="services">
        <h3 class="services__header">Our services ensure all you need</h3>
        <div class="services__box">
            <img class="services__comp-logo"src="assets/imgs/logo_dashed_b.png">
            <div class="services__serviceBox services__box--1">
                <h4 class="services__service-title">Easy management</h4>
                <p class="services__service-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <i class="services__service-icon services__service-icon--1 icon-folder-1 "></i>
            </div>
            <div class="services__serviceBox services__box--2">
                <h4 class="services__service-title">Safety for documents</h4>
                <p class="services__service-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <i class="services__service-icon services__service-icon--2 icon-doc-text-inv"></i>
            </div>
            <div class="services__serviceBox services__box--3">
                <h4 class="services__service-title">Mobile access</h4>
                <p class="services__service-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <i class="services__service-icon services__service-icon--3 icon-mobile"></i>
            </div>
            <div class="services__serviceBox services__box--4">
                <h4 class="services__service-title">15GB free disk space</h4>
                <p class="services__service-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <i class="services__service-icon services__service-icon--4 icon-database"></i>
            </div>
            <div class="services__serviceBox services__box--5">
                <h4 class="services__service-title">Worldwide access</h4>
                <p class="services__service-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <i class="services__service-icon services__service-icon--5 icon-network"></i>
            </div>
        </div>
    </section>
    <section class="suppSection">
        <div class="suppSection__leftBox">
            <img src="assets/imgs/gear.png" alt="" class="suppSection__image">
            <p class="suppSection__question">Do you need help?</p>
        </div>
        <div class="suppSection__rightBox">
            <h3 class="suppSection__header">24/7 online support</h3>
            <p class="suppSection__desc">If you've got any problem with WitDrive or you just want to ask about anything, our consultants are available all the time.</p>
            <a href="mailto:wit-team@gmail.com" class="stepsSection__link">Click for support</a>
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
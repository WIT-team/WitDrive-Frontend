export default
`<nav class="navigation">
    <div class="navigation__leftBox">
        <img class="navigation__logo" src="assets/imgs/logo_2.svg" onclick="router.loadRoute('files')"></img>
        <ul class="navigation__list">
        <li class="navigation__item"><a class="navigation__link" onclick="router.loadRoute('')">Home page</a></li>
        </ul>
    </div>
    <div class="navigation__rightBox">
        <ul class="navigation__list" id="userAccountNav">
            <li class="navigation__item"><a onclick="router.loadRoute('login')" class="navigation__link">Sign in</a></li>
            <li class="navigation__item"><a class="navigation__link navigation__link--bolded" onclick="router.loadRoute('register')">Sign up</a></li>
        </ul>
    </div>
</nav>
<section class="FAQ">
    <header >
        <h1 class="FAQ__header">Frequently Asked Questions</h1>
    </header>
    <div class="FAQ__content">
        <div class="Questions">
            <div class="Questions__section">
                <h2 class="Question__section-topic">Pricing</h2>
                <div class="Questions__Question-box">
                    <p class="Questions__Question">Q: What is the cost of registering for the WitDrive service?</p>
                    <p class="Questions__Answer">A: Registering on this website costs nothing. The WitDrive website does not require any cost for user registration.</p>
                </div>
                <div class="Questions__Question-box">
                    <p class="Questions__Question">Q: How much does it cost to increase the memory limit?</p>
                    <p class="Questions__Answer">A: Depending on how much space you want to increase, the minimum price for increasing 25 GB of space is 5 PLN.  It is possible to adjust the price to the disk space to which the registered user can adjust himself. When paying for increasing the memory limit, the user has to pay monthly the amount that he has previously agreed to. The user can adjust the memory limit before the transaction, but you should know that it is not possible to reduce the memory after the payment. If the user wants to reduce the limit, he should wait until a month has passed since his deposit.</p>
                </div>
                <div class="Questions__Question-box">
                    <p class="Questions__Question">Q: Do I have to pay for maintaining files in the cloud?</p>
                    <p class="Questions__Answer">A: No. To ensure that your files are stored on the WitDrive server, you need at least 6 months to look at your file profile so that the server knows that you are still active on the cloud drive. Otherwise ALL files will be deleted!</p>
                </div>
            </div>
            <div class="Questions__section">
                <h2 class="Question__section-topic">Security</h2>
                <div class="Questions__Question-box">
                    <p class="Questions__Question">Q: If someone hacks into my account, can I lock my drive in the cloud somehow?</p>
                    <p class="Questions__Answer">A: Of course. Any doubts about unwanted access to your account can be reported to us via e-mail: <a href="mailto:wit-drive@gmail.com">wit-drive@gmail.com</a>, which works all day long and will be happy to answer any questions within 10 minutes. In order to recover a lost or hacked account, the user must prove that the account is his property. In this case, he should save the security key in a safe place and send it with an attachment to our address. It is also possible to send a confirmation of payment for the increase of the space limit, as a proof of purchase to the account.</p>
                </div>
                <div class="Questions__Question-box">
                    <p class="Questions__Question">Q: Do the stored files have any security?</p>
                    <p class="Questions__Answer">A: Each file uploaded to the WitDrive website is secured in such a way that only the user has access to it and no third party can access it. Unless you otherwise share a file of your choice, the security is mitigated.</p>
                </div>
            </div>
            <div class="Questions__section">
                <h2 class="Question__section-topic">Privacy</h2>
                <div class="Questions__Question-box">
                    <p class="Questions__Question">Q: Does WitDrive offer file sharing?</p>
                    <p class="Questions__Answer">A: Yes, WitDrive has the ability to share files by generating a link to which there is unlimited access. Please note that the shared file is poorly encrypted.</p>
                </div>
                <div class="Questions__Question-box">
                    <p class="Questions__Question">Q: Am I sure that no one, not even a WitDrive page or hackers will be able to read my disk contents??</p>
                    <p class="Questions__Answer">A: We, WitDrive, care about users and try to respect privacy. We are not able to read content from the server side, because our security database is updated daily and we have no idea how we can get to the contents of the drive. This makes it difficult for hackers to get to the disk.</p>
                </div>
            </div>
        </div>
        <img src="assets/imgs/logo_1.svg" class="FAQ__logo">
    </div>
</section>
<div class="alertBar">
    <p class="alertBar__p">If you need more details, contact with us:</p>
    <a onclick="router.loadRoute('help') class="alertBar__btn">click for help</a>
</div>
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

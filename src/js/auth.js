class Auth {
    api = 'https://witdrive-api.azurewebsites.net:443/api/';
    constructor() {
        this.validateRedirection();
        this.initNavBar();
    }
    getRegisterParameters(form) {
        return {
            username : registerForm.elements.namedItem("username").value,
            email : registerForm.elements.namedItem("email").value,
            password : registerForm.elements.namedItem("password").value,
            r_password : registerForm.elements.namedItem("r_password").value,
        };
    }
    validatePassword(password, r_password) {
        const passMatch = password === r_password;
        const longEnough = password.length >= 6;
        const hasUpperL = /[A-Z]/g.test(password);
        const hasLowerL = /[a-z]/g.test(password);
        const hasNumber = /[0-9]/g.test(password);
        const hasSpecialCh = /\W/g.test(password);
        return passMatch && longEnough && hasUpperL && hasLowerL && hasNumber && hasSpecialCh;
    }
    validateUsername(username) {
        return username.length > 0;
    }
    validateEmail(email) {
        const re = /\S+@\S+\.\S+/
        return re.test(email);
    }
    register(registerForm) {
        const reg_params = this.getRegisterParameters(registerForm);
        const validationResult = this.validateUsername(reg_params.username) &&
                                this.validatePassword(reg_params.password, reg_params.r_password)
                                && this.validateEmail(reg_params.email);
        if(validationResult == true) {
            const result = this.sendRegisterRequest(reg_params);
            if(result.status == 201)
                alert("Congrats, registered!");
                //There will be called redirection to login page instead of alert
            else {
                const errors = JSON.parse(result.response);
                this.displayErrorModal(errors);
            }   
            registerForm.reset();
        }
        else {
            const errors = [
                {
                    code : "PasswordTooShort",
                    description : "Passwords must be at least 6 characters."
                },
                {
                    code : "PasswordRequiresNonAlphanumeric",
                    description : "Passwords must have at least one non alphanumeric character."
                },
                {
                    code : "PasswordRequiresDigit",
                    description : "Passwords must have at least one digit ('0'-'9')."
                },
                {
                    code : "PasswordRequiresUpper",
                    description : "Passwords must have at least one uppercase ('A'-'Z')."
                },
            ];
            this.displayErrorModal(errors);
        }
    }
    displayErrorModal(erorrs) {
        const errorModal = document.createElement('div');
        errorModal.classList.add('ErrorModal');
        let modalBody = `<header>
                <h2 class="ErrorModal__header">Ups, something gone wrong!</h2>
            </header>
            <div class="ErrorModal__content">`;
            erorrs.forEach(error => {
                modalBody += `<p class="ErrorModal__p">${error.description}</p>`;
            });
            modalBody += `<div class="ErrorModal__btns" id="ErrorModal__btns">
                    <button class="ErrorModal__CloseBtn" id="modalCloseBtn">Close</button>
                </div>
            </div>`;
        errorModal.innerHTML = modalBody;
        document.body.appendChild(errorModal); 
        errorModal.querySelector("#modalCloseBtn").addEventListener('click', (e) => {
            e.preventDefault();
            document.body.removeChild(errorModal);
        });
    }
    sendRegisterRequest(req_params) {
        const XHR = new XMLHttpRequest();
        XHR.open( 'POST', this.api + "auth/register",false);
        XHR.setRequestHeader('Content-Type', 'application/json');
        XHR.send(JSON.stringify(req_params));
        return XHR;
    }
    initRegisterForm() {
        const registerForm = document.querySelector("#registerForm");
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.register(registerForm);
        });
    }
    initPassResetForm() {
        const pResetForm = document.querySelector("#passwordResetForm");
        pResetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.resetPassword(pResetForm);
        });
    }
    resetPassword(form) {
        const email = form.elements.namedItem("email").value;
        try {
            if(email.length > 0) {
                const result = this.sendPResetRequest(email);
                if(result.status == 200) {
                    const mainSection = document.querySelector("#mainPasswordResetSection");
                    const successH = document.createElement("h2");
                    successH.classList.add("mainPasswordResetSection__successH");
                    successH.textContent = "To reset password check your email and follow next steps."
                    mainSection.appendChild(successH);
                    mainSection.removeChild(form);
                }
                else {
                    const errors = JSON.parse(result.response);
                    this.displayErrorModal(errors);
                    registerForm.reset();
                }   
            }
            else {
                this.displayErrorModal([
                    {
                        code : "EmailInvalid",
                        description : "Invalid email"
                    }]
                );
            }
        } catch (error) {
            this.displayErrorModal([{
                "code" : "Uknown error",
                "description" : "Uknown error. Try again later."
            }]);
        }
    }
    initNewPassForm() {
        const newPasswordForm = document.querySelector("#newPasswordForm");
        newPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.newPassword(newPasswordForm);
        });
    }
    newPassword(form) {
        const req_params = {
            newPassword : form.elements.namedItem("newPassword").value,
            newPassword_r : form.elements.namedItem("newPassword_r").value,
        }
        
        const newPasswordErrorMsg = [{
            code : "InvalidPasswords",
            description : "Invalid inputs!"
        }];
        if(this.validatePassword(req_params.newPassword, req_params.newPassword_r)) {
            try {
                const result = this.sendNewPasswordRequest(req_params);
                if(result.status == 200) {
                    const mainSection = document.querySelector("#newPasswordSection");
                    const successH = document.createElement("h2");
                    successH.classList.add("mainPasswordResetSection__successH");
                    successH.textContent = "Your password has been succesfuly changed!"
                    mainSection.appendChild(successH);
                    mainSection.removeChild(form);
                }
                else if(result.status == 401) {
                    this.displayErrorModal(newPasswordErrorMsg);
                }
                else {
                    this.displayErrorModal([{
                        code : "UknownError",
                        description : "Uknown error. Please try again later."
                    }]);
                }   
                form.reset();
            } catch (error) {
                this.displayErrorModal([{
                    code : "UknownError",
                    description : "Uknown error. Please try again later."
                }]);
            }
        }
        else {
            this.displayErrorModal(newPasswordErrorMsg);
        }
    }
    sendNewPasswordRequest(req_params) {
        const XHR = new XMLHttpRequest();
        XHR.open( 'POST', this.api + "auth/newPassword",false);
        XHR.setRequestHeader('Content-Type', 'application/json');
        XHR.send(JSON.stringify(req_params));
        return XHR; 
    }
    sendPResetRequest(email) {
        const reg_params = {email:email};
        const XHR = new XMLHttpRequest();
        XHR.open( 'POST', this.api + "auth/resetPassword",false);
        XHR.setRequestHeader('Content-Type', 'application/json');
        XHR.send(JSON.stringify(reg_params));
        return XHR;
    }
    initLoginForm() {
        const loginForm = document.querySelector("#loginForm");
        if(loginForm != null) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.login(loginForm);
            });
        }
    }
    login(form) {
        const req_params = {
            username : form.elements.namedItem("username").value,
            password : form.elements.namedItem("password").value,
        }
        const userloginErrorMsg = [{
            code : "InvalidPasswordOrUsername",
            description : "Invalid password or username."
        }];
        if(req_params.username.length > 0 && req_params.password.length > 0) {
            const result = this.sendLoginRequest(req_params);
            if(result.status == 200) {
                this.saveToLocalStorage(result.response);
                //There will be called redirection by router
                this.routerRedirect("userpanel");
            }
            else if(result.status == 401) {
                this.displayErrorModal(userloginErrorMsg);
            }
            else {
                this.displayErrorModal([{
                    code : "UknownError",
                    description : "Uknown error. Please try again later."
                }]);
            }   
            form.reset();
        }
        else {
            this.displayErrorModal(userloginErrorMsg);
        }
    }
    sendLoginRequest(req_params) {
        const XHR = new XMLHttpRequest();
        XHR.open( 'POST', this.api + "auth/login",false);
        XHR.setRequestHeader('Content-Type', 'application/json');
        XHR.send(JSON.stringify(req_params));
        return XHR;
    }
    saveToLocalStorage(UserAuthData) {
        localStorage.setItem("UserAuthData", UserAuthData);
    }
    getUserName() {
        const UserAuthData = JSON.parse(localStorage.getItem("UserAuthData"));
        return UserAuthData.user.username;
    }
    validateUserAuthData() {

    }
    logout() {
        localStorage.removeItem("UserAuthData");
        this.routerRedirect("index");
    }
    isUserLoged() {
        return localStorage.getItem("UserAuthData") != null;
    }
    routerRedirect(page) {
        window.location.href = `${page}.html`;
    }
    routerGetCurrentRoute() {
        let route = window.location.href;
        route = route.split("/");
        route = route[route.length - 1];
        route = route.split(".")[0];
        return route;
    }
    initpasswordChangeForm() {
        const passwordChangeForm = document.querySelector("#passwordChangeForm");
        
        if(passwordChangeForm != null) {
            const submitBtn = passwordChangeForm.querySelector("#mainSection__form-Sbtn");
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.changePassword(passwordChangeForm);
            });
            passwordChangeForm.querySelector("#mainSection__form-cancel-btn").addEventListener('click', (e) => {
                e.preventDefault();
                this.routerRedirect("userpanel");
            });
        }
    }
    changePassword(form) {
        const req_params = {
            oldPassword : form.elements.namedItem("oldPassword").value,
            newPassword : form.elements.namedItem("newPassword").value,
            newPassword_r : form.elements.namedItem("newPassword_r").value,
        }
        
        const userPasswordsCErrorMsg = [{
            code : "InvalidPasswords",
            description : "Invalid inputs!"
        }];
        if(req_params.oldPassword.length > 0 && this.validatePassword(req_params.newPassword, req_params.newPassword_r)) {
            try {
                const result = this.sendChangePasswordRequest(req_params);
                if(result.status == 200) {
                    alert("Password changed");
                }
                else if(result.status == 401) {
                    this.displayErrorModal(userPasswordsCErrorMsg);
                }
                else {
                    this.displayErrorModal([{
                        code : "UknownError",
                        description : "Uknown error. Please try again later."
                    }]);
                }   
                form.reset();
            } catch (error) {
                this.displayErrorModal([{
                    code : "UknownError",
                    description : "Uknown error. Please try again later."
                }]);
            }
            
           
        }
        else {
            this.displayErrorModal(userPasswordsCErrorMsg);
        }
    }
    sendChangePasswordRequest(req_params) {
        const XHR = new XMLHttpRequest();
        XHR.open( 'POST', this.api + "auth/changePassword",false);
        XHR.setRequestHeader('Content-Type', 'application/json');
        XHR.send(JSON.stringify(req_params));
        return XHR;
    }
    initNavBar() {
        const accountNav = document.querySelector("#userAccountNav");
        if (this.isUserLoged()) {
            const username = this.getUserName();
            accountNav.innerHTML = `
            <li class="navigation__item navigation--email">${username}</li>
            <li class="navigation__item navigation__link" id="settingsBtn"><i class="icon-cog"></i></li>
            <li class="navigation__item navigation__link navigation__link--bolded" id="logoutBtn">Log out</li>
            `;
            accountNav.querySelector("#logoutBtn").addEventListener('click', e => {
                e.preventDefault();
                this.logout();
            });
            accountNav.querySelector("#settingsBtn").addEventListener('click', e => {
                e.preventDefault();
                this.routerRedirect("userSettings");
            });
        }
        else {
            const currentRoute = this.routerGetCurrentRoute();
            if(currentRoute == "login")
                accountNav.innerHTML = `
                <li class="navigation__item"><a href="register.html" class="navigation__link navigation__link--bolded">Sign up</a></li>`;
            else if(currentRoute == "register")
                accountNav.innerHTML = `
                <li class="navigation__item"><a href="login.html" class="navigation__link">Sign in</a></li>`;
            else
                accountNav.innerHTML = `
                <li class="navigation__item"><a href="login.html" class="navigation__link">Sign in</a></li>
                <li class="navigation__item"><a href="register.html" class="navigation__link navigation__link--bolded">Sign up</a></li>`;
        }
    }
    validateRedirection() {
        const currentRoute = this.routerGetCurrentRoute();
        if(this.isUserLoged()) {
            if(currentRoute == "login" || currentRoute == "register" || currentRoute == "PasswordReset") {
                this.routerRedirect("userpanel");
            }
            if(currentRoute == "userSettings")
                this.initpasswordChangeForm();
        }
        else {
            switch (currentRoute) {
                case "userpanel":
                    this.routerRedirect("index");
                    break;
                case "userSettings":
                    this.routerRedirect("index");
                    break;
                case "login":
                    this.initLoginForm();
                    break;
                case "register":
                    this.initRegisterForm();
                    break;
                case "PasswordReset":
                    this.initPassResetForm();
                    break;
                case "index":
                    this.initRegisterForm();
                    break;
                case "newPasswordForm":
                    this.initNewPassForm();
                    break;
                default:
                    break;
            }
        }
    } 
}

const auth = new Auth();
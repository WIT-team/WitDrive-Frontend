function loadingON()
{
  
  const El = document.querySelector('#loading');
  El.style="background-color: rgba(233, 233, 233, 0.7);position: fixed;width: 100%;height: 100%;z-index: 100;display: block;";
}
function loadingOFF()
{
  const El = document.querySelector('#loading');
  El.style="background-color: rgba(233, 233, 233, 0.7);position: fixed;width: 100%;height: 100%;z-index: 100;display: none;";
}
export default class Auth {
    constructor(api) {
        this.api = api;
    }
    setRouter(router) {
        this.router = router;
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
        loadingON();
        setTimeout(() => {
        loadingOFF();
        const reg_params = this.getRegisterParameters(registerForm);
        const validationResult = this.validateUsername(reg_params.username) &&
                                this.validatePassword(reg_params.password, reg_params.r_password)
                                && this.validateEmail(reg_params.email);
        if(validationResult == true) {
            const result = this.sendRegisterRequest(reg_params);
            if(result.status == 201) {
                this.router.loadRoute('login');
                alert("Congrats, registered!");
            }  
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
    },100);
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
        this.router.routerDataEl.appendChild(errorModal); 
        errorModal.querySelector("#modalCloseBtn").addEventListener('click', (e) => {
            e.preventDefault();
            this.router.routerDataEl.removeChild(errorModal);
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
    initforgotPassForm() {
        const pResetForm = document.querySelector("#forgotPasswordForm");
        pResetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.forgotPassword(pResetForm);
        });
    }
    forgotPassword(form) {
        const email = form.elements.namedItem("email").value;
        try {
            if(email.length > 0) {
                const result = this.sendPResetRequest(email);
                if(result.status == 200) {
                    const mainSection = document.querySelector("#mainPasswordResetSection");
                    const successH = document.createElement("h2");
                    successH.classList.add("mainPasswordResetSection__successH");
                    successH.textContent = "To reset password check your email and follow next steps.";
                    mainSection.appendChild(successH);
                    const nextSBtn = document.createElement("a");
                    nextSBtn.addEventListener('click', _ => {
                        this.router.loadRoute('reset-password');
                    });
                    nextSBtn.classList.add("mainPasswordResetSection__nextS");
                    nextSBtn.textContent = 'Next step';
                    
                    mainSection.appendChild(nextSBtn);
                    mainSection.removeChild(form);
                }
                else {
                    const errors = JSON.parse(result.response);
                    this.displayErrorModal(errors);
                    form.reset();
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
    initResetPassForm() {
        const newPasswordForm = document.querySelector("#newPasswordForm");
        newPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.newPassword(newPasswordForm);
        });
    }
    newPassword(form) {
        const req_params = {
            Email : form.elements.namedItem("email").value,
            Code : form.elements.namedItem("code").value,
            Password : form.elements.namedItem("newPassword").value,
            ConfirmPassword : form.elements.namedItem("newPassword_r").value,
        }
        
        const newPasswordErrorMsg = [{
            code : "InvalidPasswords",
            description : "Invalid inputs!"
        }];
        if(this.validatePassword(req_params.Password, req_params.ConfirmPassword)) {
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
                else if(result.status == 400) {
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
        XHR.open( 'POST',`${this.api}recovery/reset-password`,false);
        XHR.setRequestHeader('Content-Type', 'application/json');
        XHR.send(JSON.stringify(req_params));
        return XHR; 
    }
    sendPResetRequest(email) {
        const XHR = new XMLHttpRequest();
        XHR.open( 'POST',`${this.api}recovery/forgot-password`,false);
        XHR.setRequestHeader('Content-Type', 'application/json');
        XHR.send(JSON.stringify({Email:email}));
        return XHR;
    }
    initLoginForm() {
        const loginForm = document.querySelector("#loginForm");
        if(loginForm != null) {
            loginForm.addEventListener('submit', (e) => {

                e.preventDefault();
                loadingON();
                setTimeout(() => { 
                this.login(loginForm);
                //loadingOFF();
            }, 100);
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
                this.router.loadRoute("files");
            }
            else if(result.status == 401) {
                loadingOFF();
                setTimeout(() => {
                this.displayErrorModal(userloginErrorMsg);
                },100);
            }
            else {
                loadingOFF();
                setTimeout(() => {
                this.displayErrorModal([{
                    code : "UknownError",
                    description : "Uknown error. Please try again later."
                }]);
            },100);
            }   
            form.reset();
        }
        else {
            loadingOFF();
            setTimeout(() => {
            this.displayErrorModal(userloginErrorMsg);
            },100);
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
    getUserId() {
        const UserAuthData = JSON.parse(localStorage.getItem("UserAuthData"));
        return UserAuthData.user.id;
    }
    getUserToken() {
        const UserAuthData = JSON.parse(localStorage.getItem("UserAuthData"));
        return UserAuthData.token;
    }
    logout() {
        localStorage.removeItem("UserAuthData");
        localStorage.removeItem("rootId");
        this.router.loadRoute('');
    }
    isUserLoged() {
        return localStorage.getItem("UserAuthData") != null;
    }
    initpasswordChangeForm() {
        const passwordChangeForm = document.querySelector("#passwordChangeForm");
        
        if(passwordChangeForm != null) {
            const submitBtn = passwordChangeForm.querySelector("#mainSection__form-Sbtn");
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                loadingON();
                setTimeout(() => { 
                this.changePassword(passwordChangeForm);
                loadingOFF();
            }, 100);
            });
            passwordChangeForm.querySelector("#mainSection__form-cancel-btn").addEventListener('click', (e) => {
                e.preventDefault();
                router.loadRoute('files');
            });
        }
    }
    changePassword(form) {
        const req_params = {
            OldPassword : form.elements.namedItem("oldPassword").value,
            NewPassword : form.elements.namedItem("newPassword").value,
            NewPassword_r : form.elements.namedItem("newPassword_r").value,
        }
        
        const userPasswordsCErrorMsg = [{
            code : "InvalidPasswords",
            description : "Invalid inputs!"
        }];
        if(req_params.OldPassword.length > 0 && this.validatePassword(req_params.NewPassword, req_params.NewPassword_r)) {
            try {
                delete req_params.NewPassword_r;
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
        const userId = this.getUserId();
        const XHR = new XMLHttpRequest();
        XHR.open( 'POST', `${this.api}u/${userId}/account/edit-password`,false);
        XHR.setRequestHeader('Content-Type', 'application/json');
        XHR.setRequestHeader("Authorization", "Bearer " + this.getUserToken());
        XHR.send(JSON.stringify(req_params));
        return XHR;
    }
    getDomain() {
        let route = window.location.href;
        route = route.split("/");
        return `${route[0]}//${route[2]}`;
    } 
    // Account delete
    initdeleteAccountForm() {
        const deleteAccountForm = document.querySelector("#deleteAccountForm");
        deleteAccountForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.deleteAccount(deleteAccountForm);
        });
        deleteAccountForm.querySelector("#mainSection__form-cancel-btn").addEventListener('click', (e) => {
            e.preventDefault();
            router.loadRoute('files');
        });
    }
    deleteAccount(form) {
        const password = form.elements.namedItem("Password").value;
        if(password.length > 0) {
            const result = this.deleteAccountRequest(password);
                if(result.status == 200) {
                    alert("Account deleted.");
                    this.logout();
                }
                else if(result.status == 401) {
                    this.logout();
                }
                else {
                    this.displayErrorModal([{
                        code : "UknownError",
                        description : "Uknown error. Please try again later."
                    }]);
                }   
                form.reset();
        }
    }
    deleteAccountRequest(password) {
        const userId = this.getUserId();
        const XHR = new XMLHttpRequest();
        XHR.open( 'DELETE', `${this.api}u/${userId}/account`,false);
        XHR.setRequestHeader('Content-Type', 'application/json');
        XHR.setRequestHeader("Authorization", "Bearer " + this.getUserToken());
        XHR.send(JSON.stringify({Password : password}));
        return XHR;
    }
}

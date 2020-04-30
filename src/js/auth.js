class Auth {
    api = 'http://localhost:5000/api/';
    constructor() {
        this.initRegisterForm();
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
            else {
                const errors = JSON.parse(result.response);
                this.displayRegisterErrorModal(errors);
            }
                //alert(result.response);
                
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
            this.displayRegisterErrorModal(errors);
        }
    }
    displayRegisterErrorModal(erorrs) {
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
    sendRegisterRequest(reg_params) {
        const XHR = new XMLHttpRequest();
        XHR.open( 'POST', this.api + "auth/register",false);
        XHR.setRequestHeader('Content-Type', 'application/json');
        XHR.send(JSON.stringify(reg_params));
        return XHR;
    }
    initRegisterForm() {
        const registerForm = document.querySelector("#registerForm");
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.register(registerForm);
        });
    }
}

const auth = new Auth();
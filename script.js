const form = document.getElementById('form');
const name = document.getElementById('firstName');
const last = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if(firstnameValue === '') {
        setError(firstname, 'First Name cannot be empty');
    } else {
        setSuccess(firstname);
    }
};


if(lastnameValue === '') {
    setError(lastname, 'Last Name cannot be empty');
} else {
    setSuccess(lastname);
}

if(emailValue === '') {
    setError(email, 'Email is required');
} else if (!isValidEmail(emailValue)) {
    setError(email, 'Looks like this is not an email');
} else {
    setSuccess(email);
}


if(passwordValue === '') {
    setError(password, 'Password is required');
} else if (passwordValue.length < 8 ) {
    setError(password, 'Password cannot be empty')
} else {
    setSuccess(password);
}

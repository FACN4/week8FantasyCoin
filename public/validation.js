/* global signUp */
/* eslint-disable no-param-reassign */


const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const form = document.getElementsByTagName('form')[0];
const meter = document.getElementById('meter');

const usernameErr = document.getElementById('usernameErr');
const passwordErr = document.getElementById('passwordErr');
const confirmErr = document.getElementById('confirmErr');

function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}

const checkUsername = () => {
  if (username.validity.valueMissing) {
    displayErr(usernameErr, 'Please enter a username');
  } else if (false) {
    // userNameUsed(username.value) not already in database
    displayErr(usernameErr, 'Sorry, this username has already been used');
  } else {
    displayErr(usernameErr, '');
    return true;
  }
  return false;
};

const checkPw = () => {
  if (password.validity.patternMismatch) {
    displayErr(
      passwordErr,
      'Password must contain at least eight characters, including one letter and one number',
    );
    return false;
  } if (password.validity.valueMissing) {
    displayErr(passwordErr, 'Please enter a password');
    return false;
  }
  displayErr(passwordErr, '');
  return true;
};

const checkConfirmPw = () => {
  if (password.value !== confirmPassword.value) {
    displayErr(confirmErr, 'Passwords do not match');
    return false;
  } if (confirmPassword.validity.valueMissing) {
    displayErr(confirmErr, 'Please confirm your password');
    return false;
  }
  displayErr(confirmErr, '');
  return true;
};

const passwordScore = () => {
  const pass = password.value;
  const user = username.value;
  let score = 0;
  if (pass.length > 8) score += 1;
  if (/(?=.*[A-Z])(?=.*[a-z])/.test(pass)) score += 1; // Upper and Lower case
  if (/[0-9]/.test(pass)) score += 1; // Numbers
  if (/[^A-Za-z0-9]/.test(pass)) score += 1; // Special characters
};

username.addEventListener('focusout', checkUsername);
password.addEventListener('focusout', checkPw);
confirmPassword.addEventListener('focusout', checkConfirmPw);

password.addEventListener('keyup', passwordScore);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (checkUsername() && checkPw() && checkConfirmPw()) {
    const userDetails = { username: username.value, password: password.value };
    signUp(userDetails, errMsg => displayErr(usernameErr, errMsg));
  }
});

const registerForm = document.querySelector('#register-form');
const name = registerForm['name'];
const email = registerForm['email'];
const password = registerForm['password'];
const nameErrors = document.querySelector('#nameErrors');
const emailErrors = document.querySelector('#emailErrors');
const passwordErrors = document.querySelector('#passwordErrors');
const errors = document.querySelector('#backend');

function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (name.value === '') {
    nameErrors.style.display = 'block';
    name.style.border = '1px solid var(--danger)';
    nameErrors.innerHTML = '<p>Name is required</p>';
  } else if (email.value === '') {
    emailErrors.style.display = 'block';
    email.style.border = '1px solid var(--danger)';
    emailErrors.innerHTML = '<p>Email is required</p>';
  } else if (!validateEmail(email.value)) {
    emailErrors.style.display = 'block';
    email.style.border = '1px solid var(--danger)';
    emailErrors.innerHTML = '<p>Invalid email</p>';
  } else if (password.value === '') {
    passwordErrors.style.display = 'block';
    password.style.border = '1px solid var(--danger)';
    passwordErrors.innerHTML = '<p>Password is required</p>';
  } else if (password.value.length < 4) {
    passwordErrors.style.display = 'block';
    password.style.border = '1px solid var(--danger)';
    passwordErrors.innerHTML = '<p>Password must be atleat 4 characters</p>';
  } else {
    name.style.border = '1px solid var(--success)';
    email.style.border = '1px solid var(--success)';
    password.style.border = '1px solid var(--success)';
    nameErrors.style.display = 'none';
    emailErrors.style.display = 'none';
    passwordErrors.style.display = 'none';
    createUser(name.value, email.value, password.value);
    registerForm.reset();
    name.style.border = '1px solid var(--danger)';
    email.style.border = '1px solid var(--danger)';
    password.style.border = '1px solid var(--danger)';
  }
});

async function createUser(name, email, password) {
  const res = await axios.post(
    'https://exam-seats.herokuapp.com/api/auth/signup',
    { name, email, password }
  );
  const data = res.data;
  token = data.token;
  username = data.user.name;
  userEmail = data.user.email;
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('name', username);
  errors.style.display = 'block';
  errors.innerHTML = `<p class="text-center success">${data.msg}</p>`;
  setTimeout(() => errors.remove(), 5000);
  if (userEmail === 'dushimeemma@gmail.com') {
    window.location.href = 'hod.html';
  } else if (userEmail === 'dushimeemma2@gmail.com') {
    window.location.href = 'finance.html';
  } else if (userEmail === 'dushimeemma3@gmail.com') {
    window.location.href = 'secretary.html';
  } else {
    window.location.href = 'index.html';
  }
}

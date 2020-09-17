const loginForm = document.querySelector('#login-form');
const email = loginForm['email'];
const password = loginForm['password'];
const errors = document.querySelector('#backend');
const emailErrors = document.querySelector('#emailErrors');
const passwordErrors = document.querySelector('#passwordErrors');

function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (email.value === '') {
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
    email.style.border = '1px solid var(--success)';
    password.style.border = '1px solid var(--success)';
    emailErrors.style.display = 'none';
    passwordErrors.style.display = 'none';
    loginUser(email.value, password.value);
    loginForm.reset();
    email.style.border = '1px solid var(--danger)';
    password.style.border = '1px solid var(--danger)';
  }
});

async function loginUser(email, password) {
  const res = await axios.post(
    'https://exam-seats.herokuapp.com/api/auth/login',
    { email, password }
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

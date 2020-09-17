const p = document.querySelector('.copyright');
const currentYear = new Date().getFullYear();
p.innerHTML = `&copy; ${currentYear}. EXAM SEATS ARRANGEMENT`;

let token;
let username;
let userEmail;

username = window.localStorage.getItem('name');

let nav = document.querySelector('nav');

let guestLink =
  '<ul><li><a href="register.html" class="underline">Register</a></li><li><a href="login.html" class="underline">Login</a></li></ul>';

let authLink = `<ul><li>Welcome<a href="register.html" class="underline capitalize">${username}</a></li><li><a href="login.html" class="underline" id="logout">Logout</a></li></ul>`;

if (username) {
  nav.innerHTML = authLink;
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    window.localStorage.clear();
    window.location.href = 'login.html';
  });
} else {
  nav.innerHTML = guestLink;
}

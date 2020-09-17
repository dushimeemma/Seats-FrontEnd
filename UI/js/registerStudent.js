const registerStudent = document.querySelector('#register-student');
const name = registerStudent['name'];
const reg = registerStudent['reg'];
const level = registerStudent['level'];
const dept = registerStudent['dept'];
const errors = document.querySelector('#backend');
const nameErrors = document.querySelector('#nameErrors');
const regErrors = document.querySelector('#regErrors');
const levelErrors = document.querySelector('#levelErrors');
const deptErrors = document.querySelector('#deptErrors');

registerStudent.addEventListener('submit', (e) => {
  e.preventDefault();
  if (name.value === '') {
    nameErrors.style.display = 'block';
    name.style.border = '1px solid var(--danger)';
    nameErrors.innerHTML = '<p>Name is required</p>';
  } else if (reg.value === '') {
    regErrors.style.display = 'block';
    reg.style.border = '1px solid var(--danger)';
    regErrors.innerHTML = '<p>Registration number is required</p>';
  } else if (level.value === '') {
    levelErrors.style.display = 'block';
    level.style.border = '1px solid var(--danger)';
    levelErrors.innerHTML = '<p>Level is required</p>';
  } else if (dept.value === '') {
    deptErrors.style.display = 'block';
    dept.style.border = '1px solid var(--danger)';
    deptErrors.innerHTML = '<p>Department is required</p>';
  } else {
    name.style.border = '1px solid var(--success)';
    reg.style.border = '1px solid var(--success)';
    level.style.border = '1px solid var(--success)';
    dept.style.border = '1px solid var(--success)';
    nameErrors.style.display = 'none';
    regErrors.style.display = 'none';
    levelErrors.style.display = 'none';
    deptErrors.style.display = 'none';

    createStudent(name.value, reg.value, level.value, dept.value);

    registerStudent.reset();
    name.style.border = '1px solid var(--danger)';
    reg.style.border = '1px solid var(--danger)';
    level.style.border = '1px solid var(--danger)';
    dept.style.border = '1px solid var(--danger)';
  }
});

async function createStudent(name, reg, level, dept) {
  const res = await axios.post(
    'https://exam-seats.herokuapp.com/api/students',
    { name, reg, level, dept }
  );
  const data = res.data;
  errors.style.display = 'block';
  errors.innerHTML = `<p class="text-center success">${data.msg}</p>`;
  setTimeout(() => errors.remove(), 5000);
  window.location.href = 'hod.html';
}

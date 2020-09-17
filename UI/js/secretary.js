const seatForm = document.querySelector('#seat-form');
const reg = seatForm['reg'];
const exam = seatForm['exam'];
const room = seatForm['room'];
const seat = seatForm['seat'];
const errors = document.querySelector('#backend');

async function getStudent() {
  const res = await axios.get('https://exam-seats.herokuapp.com/api/students');
  let students = res.data.students;
  students.forEach((std) => {
    let option = document.createElement('option');
    let text = document.createTextNode(std.reg);
    option.appendChild(text);
    option.setAttribute('value', std._id);
    reg.appendChild(option);
  });
}
getStudent();

seatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  assignSeat(reg.value, exam.value, room.value, seat.value);
});

async function assignSeat(reg, exam, room, seat) {
  const res = await axios.post('https://exam-seats.herokuapp.com/api/seats', {
    reg,
    exam,
    room,
    seat,
  });
  const data = res.data;
  errors.style.display = 'block';
  errors.innerHTML = `<p class="text-center success">${data.msg}</p>`;
  setTimeout(() => errors.remove(), 5000);
}

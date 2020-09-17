const seats = document.querySelector('.badge');
seats.style.display = 'none';
const viewSeatForm = document.querySelector('#view-seat');
const stdReg = viewSeatForm['reg'];

viewSeatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  getStudent(stdReg.value);
  seats.style.display = 'block';
});

const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

async function getStudent(reg) {
  const res = await axios.post(
    'https://exam-seats.herokuapp.com/api/students/seat',
    { reg },
    config
  );
  const students = res.data.students;
  const name = students.name;
  const stdRg = students.reg;
  const seats = students.seat;
  seats.forEach((seat) => {
    const exam = seat.exam;
    const room = seat.room;
    const seatNum = seat.seat;
    let ul = document.querySelector('#seat-details');
    ul.innerHTML = `<li>Name : ${name}</li>
    <hr />
    <li>Reg No : ${stdRg}</li>
    <hr />
    <li>Exam : ${exam}</li>
    <hr />
    <li>Room : ${room}</li>
    <hr />
    <li>Seat: ${seatNum}</li>`;
  });
}

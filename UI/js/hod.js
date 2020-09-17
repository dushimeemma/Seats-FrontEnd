const tableBCS = document.querySelector('#bcs-table');

async function getStudent() {
  const res = await axios.get('https://exam-seats.herokuapp.com/api/students');
  const data = res.data;
  const students = data.students;

  students.forEach((student) => {
    let id = student._id;
    let row = tableBCS.insertRow(tableBCS.rows.length);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell1.innerHTML = tableBCS.rows.length - 1;
    cell2.innerHTML = student.reg;
    cell3.innerHTML = student.atd;
    cell4.innerHTML =
      `<button onclick="onClickDelete('` +
      id +
      `')"><i class="fas fa-trash-alt"></i></button
      ><button onclick="onClickUpdate('` +
      id +
      `')"><i class="fas fa-pencil-alt"></i></button>`;
    let count = tableBCS.rows.length;
    let displayCount = document.querySelector('#bcs-student');
    displayCount.innerHTML = `${count - 1} `;
  });
}

getStudent();

async function onClickDelete(id) {
  const res = await axios.delete(
    `https://exam-seats.herokuapp.com/api/students/${id}`
  );
  window.location.href = 'hod.html';
}

async function onClickUpdate(id) {
  const res = await axios.put(
    `https://exam-seats.herokuapp.com/api/students/attendance/${id}`
  );
  window.location.href = 'hod.html';
}

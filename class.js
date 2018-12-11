const listStudents = [];

class Student {
  static addStudent(name, age, isFemale) {
    if (name !== '' && (undefined !== age && Number.isInteger(age)) && typeof(isFemale) === 'boolean') {
      return listStudents.push({
        name: name,
        age: age,
        isFemale: isFemale
      });
    }

    throw 'Something went wrong!';
  }

  static getStudentByIndex(index) {
    if (undefined !== index && Number.isInteger(index)) {
      return listStudents[index];
    }

    throw 'Wrong index!';
  }

  static getStudentByName(name) {
    if (listStudents.length > 0) {
      listStudents.map(student => console.log(student))
    }
  }

  static deleteStudentByName() {

  }
}

Student.addStudent('Tony', 24, true);
Student.addStudent('Tony', 24, true);

Student.addStudent('Tony', 24, true);
Student.addStudent('Tony', 20, true);
Student.addStudent('Tony', 24, true);
Student.addStudent('Tony', 24, true);

console.log(listStudents);
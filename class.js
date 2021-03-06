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
      listStudents.map(function(student) {
        if (student.name === name) {
          console.log(student);
        }
      });
    }
  }

  static deleteStudentByName(name) {
    if (listStudents.length > 0) {
      for( var i = 0; i < listStudents.length; i++) { 
        if ( listStudents[i].name === name) {
         listStudents.splice(i, 1); 
        }
      }
    }
  }

}

Student.addStudent('Tony', 24, true);
Student.addStudent('e', 24, true);
Student.addStudent('d', 24, true);
Student.addStudent('c', 20, true);
Student.addStudent('b', 24, true);
Student.addStudent('a', 24, true);

Student.getStudentByName('a');

Student.deleteStudentByName('Tony');
console.log(listStudents);

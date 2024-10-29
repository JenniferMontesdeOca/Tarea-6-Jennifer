class User {
    constructor({name, surname, email, role}) {
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.role = role;
      this.courses = [];
      this.messageHistory = [];
    }
  
    addCourse(course, level) {
      this.courses.push({course, level});
    }
  
    removeCourse(course) {
      this.courses = this.courses.filter(c => c.course !== course);
    }
  
    editCourse(course, level) {
      let courseToEdit = this.courses.find(c => c.course === course);
      if (courseToEdit) {
        courseToEdit.level = level;
      } else {
        this.courses.push({course, level});
      }
    }
  
    sendMessage(from, message) {
      this.messageHistory.push({from: from.email, to: this.email, message});
      this.sendEmail(from.email, this.email, message);
    }
  
    sendEmail(from, to, message) {
      // Simulamos el envío del correo electrónico
      console.log(`Email sent from ${from} to ${to}: ${message}`);
    }
  
    showMessagesHistory() {
      this.messageHistory.forEach(msg => {
        console.log(`${msg.from} -> ${msg.to}: ${msg.message}`);
      });
    }
  }
  
  class ExtendedUser extends User {
    get fullName() {
      return `${this.name} ${this.surname}`;
    }
  
    set fullName(fullName) {
      const [name, surname] = fullName.split(' ');
      this.name = name;
      this.surname = surname;
    }
  }
  
  class Teacher extends ExtendedUser {
    constructor({name, surname, email}) {
      super({name, surname, email, role: 'teacher'});
    }
  }
  
  class Student extends ExtendedUser {
    constructor({name, surname, email}) {
      super({name, surname, email, role: 'student'});
    }
  }
  
  // Pruebas del sistema
  let student1 = new Student({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com'});
  let student2 = new Student({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com'});
  let teacher1 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});
  
  student1.addCourse('maths', 2);
  teacher1.addCourse('biology', 3);
  teacher1.editCourse('chemistry', 4);
  
  console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fife: 1 courses
  console.log(`${teacher1.fullName}: ${teacher1.courses.length} courses`); // -> Paula Thompkins: 2 courses
  
  student1.fullName = 'Rafael Fifer';
  console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fifer: 1 courses
  
  const users = [];
  const userForm = document.getElementById('user-form');
  const usersList = document.getElementById('users');
  
  userForm.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
  
    let newUser;
    if (role === 'student') {
      newUser = new Student({name, surname, email});
    } else {
      newUser = new Teacher({name, surname, email});
    }
  
    users.push(newUser);
    displayUsers();
  
    userForm.reset();
  });
  
  function displayUsers() {
    usersList.innerHTML = '';
    users.forEach(user => {
      const userItem = document.createElement('li');
      userItem.textContent = `${user.fullName} (${user.role}) - ${user.email}`;
      usersList.appendChild(userItem);
    });
  }
  
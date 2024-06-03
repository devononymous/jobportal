export default class UserModel {
  constructor(id, name, email, password, userType) {
    (this.id = id),
      (this.name = name),
      (this.email = email),
      (this.password = password),
      (this.userType = userType);
  }
  static add(name, email, password, userType) {
    const newUser = new UserModel(
      users.length + 1,
      name,
      email,
      password,
      userType
    );
    users.push(newUser);
  }
  static isValidUser(email, password) {
    const result = users.find(
      (e) => e.email === email && e.password === password
    );
    console.log("users models line 23 >>>", users)
  }

}
var users = [];

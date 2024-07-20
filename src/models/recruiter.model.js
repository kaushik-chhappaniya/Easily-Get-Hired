import { hash} from "bcrypt";
export default class Recruiter {
    constructor (_id, _name, _email, _password, _jobs=[]) {
        this.id = _id;
        this.name = _name;
        this.email = _email;
        this.jobs = _jobs;
        (async () => {
            try {
              const hashedPassword = await this.hashPassword(_password);
              this.password = hashedPassword;
            } catch (error) {
              console.error("Error hashing password:", error);
              // Handle hashing errors appropriately (e.g., throw an exception)
            }
          })();
        // this.password = this.hashPassword(_password);

    }

    //Add new recruiter to the system
    static addRecruiter(name, email, password) {
        const newUser = new Recruiter (
            recruiters.length + 1,
            name,
            email,
            password
        )
        recruiters.push(newUser);
    }

    // Get all the recruiters list
    static getRecruiters () {
        return recruiters;
    }

    // Get recruiter by the ID   
    static getRecruiterById(id){
        return recruiters.find((p) => p.id == id);
    }

    // Hash the password for storing in the array
    async hashPassword(password) {
    try {
      const hashedPassword = await hash(password, 10); // Adjust cost factor as needed
    //   this.password = hashedPassword;
      return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        // Handle hashing errors appropriately (e.g., throw an exception)
    }
}

    static confirmLogin = (data) => {
    const { email, password } = data;
    let userResult = null;
    users.forEach((user) => {
      if (user.email === email.toLowerCase() && user.password === password) userResult = user;
    });
    return userResult;
  };

}

// Database
var recruiters = [
    new Recruiter (
        1, "Raj C", "Raj34@gmail.com", "Password", [2,3, 4, 5, 13,15, 17, 21, 22, 23,24 ,25 ]
    ),

    new Recruiter (
        2, "Kunal B", "b19kunal@gmail.com", "19BKunal292", [1, 6, 26, 27, 28]
    ),
    new Recruiter (
        3, "Vishal", "Vishal12@gmail.com", "vishal123", [7, 8]
    ),
    new Recruiter (
        4, "Kanu", "dumm@gmail.com", "password" , [9, 18, 19, 20]
    ),
    new Recruiter (
        5, "Aakash", "akash@gmail.com", "pass1234", [10, 11, 14,12]
    ),
]

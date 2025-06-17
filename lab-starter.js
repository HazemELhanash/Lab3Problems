"use strict";
// ========================
// 🧪 TypeScript HR Lab Starter
// ========================
// TODO: 1. Define enum Role
var Role;
(function (Role) {
    Role["Employee"] = "Employee";
    Role["Manager"] = "Manager";
})(Role || (Role = {}));
// TODO: 3. Define abstract class User
class User {
    id;
    name;
    email;
    password;
    createdAt;
    constructor(name, email, password) {
        this.id = HR.generateUserId();
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
    }
    authenticate(email, password) {
        return this.email === email && this.password === password;
    }
}
// TODO: 4. Define Department class
class Department {
    name;
    employees = [];
    constructor(name) {
        this.name = name;
    }
    AddEmployee(emp) {
        this.employees.push(emp);
    }
    GetDepartmentSize() {
        return this.employees.length;
    }
}
// TODO: 5. Define Employee class
class Employee extends User {
    salary;
    department;
    constructor(name, email, password, salary, department) {
        super(name, email, password);
        this.salary = salary;
        this.department = department;
    }
    getRole() {
        return Role.Employee;
    }
    setSalary(sal) {
        if (sal >= 3000) {
            this.salary = sal;
        }
        else {
            throw new Error("Salary must be more than 3000");
        }
    }
    getSalary() {
        return this.salary;
    }
    promote(percentage) {
        this.salary = this.salary + (this.salary * (percentage / 100));
    }
    getNetSalary() {
        return this.salary - HR.calculateTax(this.salary);
    }
}
// TODO: 6. Define Manager class
class Manager extends Employee {
    team;
    constructor(name, email, password, salary, department) {
        super(name, email, password, salary, department);
        this.team = [];
    }
    getRole() {
        return Role.Manager;
    }
    AddEmployeeToTeam(emp) {
        this.team.push(emp);
    }
    RemoveEmployeeFromTeam(empId) {
        this.team = this.team.filter(emp => emp.id !== empId);
    }
    getTeamReport() {
        return this.team.map(e => `Name:${e.name} as ${e.getRole()} his salary is ${e.getSalary()}`);
    }
}
// TODO: 7. Define HR utility class
class HR {
    static currentId = 1;
    static generateUserId() {
        return this.currentId++;
    }
    static calculateTax(salary) {
        return salary * 0.1;
    }
    static isEmailValid(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    static generateReport(users) {
        return users.map(u => `Name:${u.name} , Role:${u.getRole()}`);
    }
}
// Final test scenario can be written here...
const devDept = new Department("Development");
const emp1 = new Employee("Alice", "alice@example.com", "pass123", 5000, devDept);
const emp2 = new Employee("Will", "will@example.com", "pass123", 5500, devDept);
devDept.AddEmployee(emp1);
devDept.AddEmployee(emp2);
const mgr1 = new Manager("Bob", "bob@example.com", "admin123", 8000, devDept);
mgr1.AddEmployeeToTeam(emp1);
mgr1.AddEmployeeToTeam(emp2);
console.log(HR.generateReport([emp1, emp2, mgr1]));
console.log(mgr1.getTeamReport());

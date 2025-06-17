// ========================
// 🧪 TypeScript HR Lab Starter
// ========================

// TODO: 1. Define enum Role
enum Role {
   Employee="Employee",
   Manager="Manager"
}
// TODO: 2. Define Interface Loginable
interface Loginable{
    authenticate(email: string, password: string): boolean;
}
// TODO: 3. Define abstract class User
abstract class User implements Loginable{
    readonly id:number;
    name:string;
    email:string;
    private password:string;
    createdAt:Date;
    constructor(name:string,email:string,password:string){
        this.id=HR.generateUserId();
        this.name=name;
        this.email=email;
        this.password=password;
        this.createdAt=new Date();
    }
    authenticate(email: string, password: string): boolean {
        return this.email===email && this.password===password;
    }
    abstract getRole(): string;
}
// TODO: 4. Define Department class
class Department{
    name:string;
    employees:Employee[]=[];
    constructor(name:string){
        this.name=name;
    }
    AddEmployee(emp:Employee):void{
        this.employees.push(emp);
    }
    GetDepartmentSize():number{
        return this.employees.length;
    }
}
// TODO: 5. Define Employee class
class Employee extends User{
    private salary:number;
    protected department:Department;
    constructor(name:string,email:string,password:string,salary:number,department:Department){
        super(name,email,password);
        this.salary=salary;
        this.department=department;
    }
    getRole(): string {
        return Role.Employee;
    }
    setSalary(sal:number):void{
        if(sal>=3000){
            this.salary=sal;
        }
        else{
            throw new Error("Salary must be more than 3000");
            
        }
    }
    getSalary():number{
        return this.salary;
    }
    promote(percentage:number):void{
        this.salary=this.salary+(this.salary*(percentage/100));
    }
    getNetSalary():number{
        return this.salary-HR.calculateTax(this.salary);
    }
}
// TODO: 6. Define Manager class
class Manager extends Employee{
    team:Employee[];
    constructor(name:string,email:string,password:string,salary:number,department:Department){
        super(name,email,password,salary,department);
        this.team=[];
    }
    getRole(): string {
        return Role.Manager;
    }
    AddEmployeeToTeam(emp:Employee):void{
        this.team.push(emp);
    }
    RemoveEmployeeFromTeam(empId:number):void{
        this.team=this.team.filter(emp=>emp.id!==empId);
    }
    getTeamReport():string[]{
        return this.team.map(e=>`Name:${e.name} as ${e.getRole()} his salary is ${e.getSalary()}`);
    }
} 
// TODO: 7. Define HR utility class
class HR{
    private static currentId:number=1;
    static generateUserId():number{
        return this.currentId++;
    }
    static calculateTax(salary:number):number{
        return salary*0.1;
    }
    static isEmailValid(email:string):boolean{
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    static generateReport(users:User[]):string[]{
        return users.map(u=>`Name:${u.name} , Role:${u.getRole()}`);
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

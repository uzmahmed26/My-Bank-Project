#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber; // this refer current object
        this.balance = balance;
    }
    // Debit money method
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawl of ${amount} successful.Remaining balance: 1002${this.balance}`);
        }
        else {
            console.log("\n You have Insufficient balance");
        }
    }
    //credit money method
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; ///$1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(`Deposit of ${amount} successful. Remaining balance: ${this.balance}`);
    }
    ///check balance
    checkBalance() {
        console.log(`Your current balance: ${this.balance}`);
    }
}
// customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// create Bank Account Class
const accounts = [
    new BankAccount(1001, 1000),
    new BankAccount(1002, 2000),
    new BankAccount(1003, 3000),
];
// create customers 
const customers = [
    new Customer("Mohammad", "Ahmed", "Male", 47, 3332386369, accounts[0]),
    new Customer("Samar", "Jahan", "Female", 56, 3132992139, accounts[1]),
    new Customer("Uzma", "Ahmed", "Female", 34, 3322236597, accounts[2])
];
// function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: chalk.red.bold("\n Enter your account number:")
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}`);
            const ans = await inquirer.prompt([{
                    name: "option",
                    type: "list",
                    message: chalk.green.bold("\n What would you like to do?"),
                    choices: ["Withdraw", "Deposit", "Check Balance", "Exit"]
                }]);
            switch (ans.option) {
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.yellowBright("\n How much would you like to withdraw?")
                    });
                    customer.account.deposit(withdrawAmount.amount);
                    break;
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.red.bold("\n How much would you like to deposit?")
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.yellowBright.bold("\n Exiting bank Program"));
                    console.log(chalk.green.bold("\n Thank you for using bank services. have a great day!"));
                    return;
            }
        }
        else {
            console.log(chalk.yellow.bold("Invalid account number"));
        }
    } while (true);
}
service();

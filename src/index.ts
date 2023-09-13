#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const rendomnuber = generateRandomNumber(1, 100);
let attempts = 0;

const prompt = inquirer.createPromptModule();

function validateNumber(input: string): boolean | string {
    const number = parseFloat(input);
    if (isNaN(number)) {
        return "Please enter a valid number";
    }
    if (number < 0 || number > 100) {
        return "Please enter the number between 1 and 100 "
    }
    return true;
}
async function main() {


    const input = await prompt(
        [


            {
                name: "num1",
                type: "guess",
                message: "Please guess the number:",
                validate: validateNumber,
            },
        ])
    
    const guessnumber = parseInt(input.num1)
    attempts++;

    if (guessnumber === rendomnuber) {
        console.log(chalk.bgGreen.black(`Congratulations! You guessed the correct number ${rendomnuber} in ${attempts} attempts.`));

    } else if (guessnumber < rendomnuber) {
        console.log(chalk.red(`The rendom number is higher than your selected number ${guessnumber}, Please Try again.`));
        main();

    } else {
        console.log(chalk.red(`The rendom number  is lower than your selected number ${guessnumber}, Please Try again.`));
        main();
    }
}
console.log(chalk.green('Welcome to the Number Guessing Game!'));
console.log(chalk.green('Try to guess the secret number between 1 and 100.'));
main();  
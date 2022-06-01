import { AbstractControl } from "@angular/forms"

//custom validator for checking if the sum of the 2 values displayed is correct
export class MathValidators {
    static addition(target: string, sourceOne: string, sourceTwo: string) {
        return (form: AbstractControl) => {
            const sum = form.value[target]
            const firstNumber = form.value[sourceOne]
            const secondNumber = form.value[sourceTwo]

            if (firstNumber + secondNumber === parseInt(sum)) {
                return null
            }
            return { addition: true }
        }


        
    }
}


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { delay, filter, scan } from 'rxjs/operators';
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  secondsPerSolution: number = 0
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl('')
    }, 
    [
      MathValidators.addition('answer', 'a', 'b'),
      Validators.required
    ]
  )

  constructor() { }

  //2 different ways
  get a() { return this.mathForm.get('a')!.value; }
  get b() { return this.mathForm.value.b }

  ngOnInit(): void {
    this.mathForm.statusChanges.pipe(
      filter(status => status === 'VALID'),
      delay(200),
      scan((acc) => {
        return {
          numberSolved: acc.numberSolved + 1,
          startTime: acc.startTime
        }
      }, { numberSolved: 0, startTime: new Date()})
    ).subscribe(({ numberSolved, startTime }) => {
      this.secondsPerSolution = (
        new Date().getTime() - startTime.getTime()
      ) / numberSolved / 1000
      this.mathForm.setValue({
        a: this.randomNumber(),
        b: this.randomNumber(),
        answer: ''
      })

    })
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

}

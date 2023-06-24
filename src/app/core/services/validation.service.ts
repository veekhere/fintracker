import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const defaultMessages = {
};

export const validators = {
};

function error(name: string, message: string): any {
  return { [name]: { message } };
}

@Injectable({ providedIn: 'root' })
export class ValidationService {
  validators = validators;
}

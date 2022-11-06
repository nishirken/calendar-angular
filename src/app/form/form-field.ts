import { FormControl } from "@angular/forms";

/**
 * Field works according to the flow: submit -> show first error -> change value -> hide error
 */
export class FormField<T extends string> {
    constructor(public readonly control: FormControl<T>, public errorMessages: Record<string, string>) {}

    isErrorShown = false;

    get errorMessage(): string {
        if (!this.control.errors || !this.isErrorShown) {
            return '';
        }

        const keys: any[] = Object.keys(this.control.errors);

        if (keys.length === 0) {
            return '';
        }

        return this.errorMessages[keys[0]] ?? '';
    }

    showError = (): void => {
        this.isErrorShown = true;
    }

    hideError = (): void => {
        this.isErrorShown = false;
    }

    setValue = (value: T): void => {
        this.hideError();
        this.control.setErrors({});
        this.control.setValue(value);
    }

    get value(): T {
        return this.control.value;
    }

    addErrorMesssages = (errorMessages: Record<string, string>): void => {
        this.errorMessages = { ...this.errorMessages, ...errorMessages };
    }

    setErrorMessage = (error: string, value: string): void => {
        this.errorMessages[error] = value;
    }

    addErrors = (errors: Record<string, boolean>) => {
        this.control.setErrors({...(this.control.errors ?? {}), ...errors });
    }
}
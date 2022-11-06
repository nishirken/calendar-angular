export class Form {
    isErrorsShown = false;

    showErrors = () => {
        this.isErrorsShown = true;
    }

    hideErrors = () => {
        this.isErrorsShown = false;
    }
}
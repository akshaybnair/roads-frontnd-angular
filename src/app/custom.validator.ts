import { FormControl } from '@angular/forms';

function validLatitude(control: FormControl): { [s: string]: boolean } {
    if (+control.value < 0 || +control.value > 90) {
        return { 'vaildLatitude': true };
    }
    return null;
}
function validLongitude(control: FormControl): { [s: string]: boolean } {
    if (+control.value < 0 || +control.value > 180) {
        return { 'validLongitude': true };
    }
    return null;
}

export {validLatitude, validLongitude};
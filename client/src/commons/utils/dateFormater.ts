/**
 * Converts a standard Date object into a displayable string
 * @param date the date
 * @returns the date converted to a string
 */
function dateToString(date: Date): string{

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} at ${zeroFill(date.getHours(), 2)}:${zeroFill(date.getMinutes(), 2)}`;
}

/**
 * Converts a number into a string and prepends 0s
 * @param number the number to convert to string
 * @param length the length of the returned string
 * @returns string of set length representing the number
 * @example zeroFill(3,4) == "0003"
 */
function zeroFill(number: number, length: number){

    let num = number.toString();

    let missing = length-num.length;
    let prefix = "";
    for(let i = 0; i < missing; i++){
        prefix += "0";
    }
    prefix += num;

    return prefix;
}

export {dateToString};

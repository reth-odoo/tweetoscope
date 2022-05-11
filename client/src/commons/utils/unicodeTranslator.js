function translateUnicode(char, styleType) {

  if("abcdefghijklmnopqrstuvwxyz".includes(char.toLowerCase())) {

    let diff = 0;

    let styleUp = "A";
    let styleDown = "a";

    if(styleType === "bold") {
      styleUp = "𝗔";
      styleDown = "𝗮";
    }

    else if(styleType === "italic") {
      styleUp = "𝘈";
      styleDown = "𝘢";
    }

    // this part of the code was given from the user Albert Stein, found on https://stackoverflow.com/questions/57827828/javascript-convert-text-to-bold-unicode-charset
    if(/[A-Z]/.test(char)) {
      diff = styleUp.codePointAt(0) - "A".codePointAt(0);
    }

    else {
      diff = styleDown.codePointAt(0) - "a".codePointAt(0);
    }

    return String.fromCodePoint(char.codePointAt(0) + diff);
  }

  return char;
}

export default translateUnicode;

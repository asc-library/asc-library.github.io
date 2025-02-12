//convert arabic numeral input to return properly formatted capitalised  roman numerals

function roman(arabic) {
	let roman = '';
	let working = arabic;
	
	//broadly speaking we're working left-to-right listing out largest to smallest units - as we write in the roman version of a unit, we subtract that value from the working number.
	//C can be subtracted from M and D, X from C, and I from V and X. Those letter pairs are treated as single units.
	
	while (working >= 10000) {
	roman += "&#08578;";
	//this (https://en.wiktionary.org/wiki/%E2%86%82) is using apostrophus notation (https://en.wikipedia.org/wiki/Roman_numerals#Large_numbers) for units of 10,000 to reduce the number of Ms returned. The HTML entity will display, but copy-pasting it back into the reciprocal function arabic(roman) won't work correctly because it won't be read in as a single character. Possibly should add an option to return it as Ms instead
	working = working - 10000;
	}
	while (working >= 1000) {
	roman += "M";
	working = working - 1000;
	}
	while (working >= 900) {
	roman += "CM";
	working = working - 900;
	}
	while (working >= 500) {
	roman += "D";
	working = working - 500;
	}
	while (working >= 400) {
	roman += "CD";
	working = working - 400;
	}
	while (working >= 100) {
	roman += "C";
	working = working - 100;
	}
	while (working >= 90) {
	roman += "XC";
	working = working - 90;
	}
	while (working >= 50) {
	roman += "L";
	working = working - 50;
	}
	while (working >= 40) {
	roman += "XL";
	working = working - 40;
	}
	while (working >= 10) {
	roman += "X";
	working = working - 10;
	}
	while (working >= 9) {
	roman += "IX";
	working = working - 9;
	}
	while (working >= 5) {
	roman += "V";
	working = working - 5;
	}
	while (working >= 4) {
	roman += "IV";
	working = working - 4;
	}
	while (working >= 1) {
	roman += "I";
	working = working - 1;
	}
	while (working >= 0.5) {
	roman += "S";
	working = working - 0.5;
	}
	//as with the 10,000s unit, this won't work if you put it back in to arabic() - to be honest both of these are mostly because I was excited to learn that they *could* appear in numbers
	while (working >= (1/12)) {
	roman += "&middot;";
	working = working - (1/12);
	}

return roman;
}


//accept a roman numeral as a string, process it assuming it's a roman numeral, and return the arabic numeral equivalent if one exists, otherwise return an error message

function arabic(roman) {
	let working = roman.toUpperCase(); //regularise case
	let arabic = 0;
	
	//check that all the characters are valid in a roman numeral.
	try {
		let check = working.replace(/M|D|C|L|X|V|I|J|S/g, ''); //these are the characters that the function knows how to deal with, so remove them to see if anything's left
		if (check.length > 0) throw check.split('').join(', '); //combine any characters we can't process into a string and throw it as an error
	}
	catch(invalid) {
		return "[Conversion failed; did not recognize: " + invalid + "]"; //return the list so the user can modify their input accordingly
	}
	
	//now read in the string from left to right, processing each character, adding the corresponding value to the arabic variable, and then removing the character from the working string before moving on.
	
	//We aren't assuming uniformly formatted numbers, so any character can be repeated an arbitrary number of times, and every character but M can be used subtractively if they're at the start of a string - so D, DM, CCCCC, CCCCCM, VDIIIII, CDC etc. will all return '500'. If a letter representing a larger unit is present later in the string, we assume the initial character is being used for subtraction. As long as the string consists of valid numerals, it will be parsed on the assumption that it is supposed to be a number.
	
	//If multiple characters being used for subtraction each will be processed individually - e.g. IVX will return 4 [X-I-V == 10-1-5] not 6 [X-IV == X-(V-I) == 10-4] 
	
	while (working.length > 0) {
		while (working.startsWith("M")) {
			arabic += 1000;
			working = working.slice(1);
			}
		while (working.startsWith("D")) {
				if (working.includes("M")) {
				arabic += -500;
				working = working.slice(1)
				}
				else {
				arabic += 500;
				working = working.slice(1);
				}
			}
		while (working.startsWith("C")) {
				if (working.includes("D")||working.includes("M")) {
				arabic += -100;
				working = working.slice(1)
				}
				else {
				arabic += 100;
				working = working.slice(1);
				}
			}
		while (working.startsWith("L")) {
				if (working.includes("C")||working.includes("D")||working.includes("M")) {
				arabic += -50;
				working = working.slice(1)
				}
				else {
				arabic += 50;
				working = working.slice(1);
				}
			}
		while (working.startsWith("X")) {
				if (working.includes("L")||working.includes("C")||working.includes("D")||working.includes("M")) {
				arabic += -10;
				working = working.slice(1)
				}
				else {	
				arabic += 10;
				working = working.slice(1);
				}
			}
		while (working.startsWith("V")) {
				if (working.includes("X")||working.includes("L")||working.includes("C")||working.includes("D")||working.includes("M")) {
				arabic += -5;
				working = working.slice(1)
				}
				else {
				arabic += 5;
				working = working.slice(1);
				}
			}
		while (working.startsWith("I")||working.startsWith("J")) { //J is equivalent to I because it's often used (in manuscript especially) for the last i in a lower-case numeral e.g. viij for 8
				if (working.includes("V")||working.includes("X")||working.includes("L")||working.includes("C")||working.includes("D")||working.includes("M")) {
				arabic += -1;
				working = working.slice(1)
				}
				else {
				arabic += 1;
				working = working.slice(1);
				}
			}
		while (working.startsWith("S")) {
				if (working.includes("I")||working.includes("V")||working.includes("X")||working.includes("L")||working.includes("C")||working.includes("D")||working.includes("M")) {
				arabic += -0.5;
				working = working.slice(1)
				}
				else {
				arabic += 0.5;
				working = working.slice(1);
				}
			}
	}

return arabic;
}
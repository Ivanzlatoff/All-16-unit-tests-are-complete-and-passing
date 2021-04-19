let regex = /[a-z]+|[^a-z]+/gi;

function ConvertHandler() {
  this.getNum = function(input) {
    let result = input.match(regex)[0];

    let numRegex = /\d/;

    if (numRegex.test(result) === false) {
      result = 1;
    }

    if (result.toString().includes("/")) {
      let values = result.toString().split("/");
      if (values.length != 2) {
        result = "invalid number";
      } else {
        values[0] = parseFloat(values[0]);
        values[1] = parseFloat(values[1]);
        result = parseFloat(values[0] / values[1]).toFixed(5);
      }
    }

    if (isNaN(result)) {
      result = "invalid number";
    }
    return result;
  };
  this.getUnit = function(input) {
    let result = input.match(regex)[1];

    if (!result) {
      result = input.match(regex)[0];
    }

    let validUnits = [
      "gal",
      "l",
      "mi",
      "km",
      "lbs",
      "kg",
      "GAL",
      "L",
      "MI",
      "KM",
      "LBS",
      "KG"
    ];

    if (!validUnits.includes(result)) {
      return "invalid unit";
    }

    if (result === "l" || result === "L") {
      return result.toUpperCase();
    } else {
      return result.toLowerCase();
    }
  };

  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit) {
      case "gal":
        result = "L";
        break;
      case "L":
        result = "gal";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit) {
      case "gal":
        result = "gallons";
        break;
      case "L":
        result = "liters";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
    }
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case "gal":
        result = (initNum * galToL).toFixed(5);
        break;
      case "L":
        result = (initNum / galToL).toFixed(5);
        break;
      case "mi":
        result = (initNum * miToKm).toFixed(5);
        break;
      case "km":
        result = (initNum / miToKm).toFixed(5);
        break;
      case "lbs":
        result = (initNum * lbsToKg).toFixed(5);
        break;
      case "kg":
        result = (initNum / lbsToKg).toFixed(5);
        break;
    }
    return parseFloat(result);
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result =
      initNum +
      " " +
      this.spellOutUnit(initUnit) +
      " converts to " +
      returnNum.toFixed(5) +
      " " +
      this.spellOutUnit(returnUnit);

    return result;
  };
}

module.exports = ConvertHandler;

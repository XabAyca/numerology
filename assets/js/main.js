document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit_btn");
  const userFormular = document.getElementById("user_formular");
  const reTestBtn = document.getElementById("retest");
  const blockFormular = document.getElementById("formular");
  const blockresponse = document.getElementById("response");
  const firstNameInput = document.getElementById("floatingFirstName");
  const lastNameInput = document.getElementById("floatingLastName");
  const dateInput = document.getElementById("floatingDate");
  const lifeRoadHtml = document.getElementById("life_road");
  const numberOfAchievementsHtml = document.getElementById("number_of_achievements");
  const personnalYearHtml = document.getElementById("personnal_year");
  const birthDayVibrationHtml = document.getElementById("birth_day_vibration");
  const spiritualInitiationHtml = document.getElementById("spiritual_initiation");
  const expressionHtml = document.getElementById("expression");
  const spiritualImpulseHtml = document.getElementById("spiritual_impulse");
  const intimateSelfHtml = document.getElementById("intimate_self");
  const activeNumberHtml = document.getElementById("active_number");
  const heredityNumberHtml = document.getElementById("heredity_number");
  const lifeNumberHtml = document.getElementById("life_number");
  const firstNameHtml = document.getElementById("first_name");
  const lastNameHtml = document.getElementById("last_name");
  const birthdayHtml = document.getElementById("birthday");
  const printBtn = document.getElementById("print-btn");
  const printArea = document.getElementById("print-area");
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const list = [
    "lifeRoad",
    "numberOfAchievements",
    "personnalYear",
    "birthDayVibration",
    "spiritualInitiation",
    "expression",
    "spiritualImpulse",
    "intimateSelf",
    "activeNumber",
    "heredityNumber",
    "lifeNumber",
    "firstName",
    "lastName",
    "birthday",
  ];
  let letterValues;
  async function getLetterValues() {
    const reponse = await fetch("./data/letter_value.json");
    letterValues = await reponse.json();
  }
  getLetterValues();

  ///////////////////////// Print /////////////////////////
  const print = () => {
    let printContents = response.innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    document.body.classList.remove("body");
    document.body.classList.add("print-body");

    window.print();
    location.reload();
  };

  printBtn.addEventListener("click", print);

  ///////////////////////// Btn Animation /////////////////////////
  const animateButton = (e) => {
    e.target.classList.remove("animate");
    e.target.classList.add("animate");
    setTimeout(function () {
      e.target.classList.remove("animate");
    }, 700);
  };

  submitBtn.addEventListener("click", animateButton);

  ///////////////////////// Toggl block /////////////////////////
  const togglblock = (e) => {
    let isValid = userFormular.checkValidity();

    if (!isValid) {
      userFormular.reportValidity();
    } else {
      e.preventDefault();
      setTimeout(function () {
        if (e.target == submitBtn) {
          displayResponse();
          blockFormular.style.display = "none";
          blockresponse.style.display = "block";
        } else if (e.target == reTestBtn) {
          resetFields();
          resetDatas();
          blockFormular.style.display = "block";
          blockresponse.style.display = "none";
        }
      }, 700);
    }
  };

  const resetFields = () => {
    inputs = blockFormular.getElementsByTagName("input");
    for (let i = 0, max = inputs.length; i < max; i++) {
      inputs[i].value = null;
    }
  };

  const resetDatas = () => {
    for (let i = 0, max = list.length; i < max; i++) {
      eval(`${list[i]}Html`).innerHTML = "";
    }
  };

  submitBtn.addEventListener("click", togglblock);
  reTestBtn.addEventListener("click", togglblock);

  ///////////////////////// Calcul helpers /////////////////////////
  const baseString = (string) => {
    let result = string.toLowerCase().match(/\p{Ll}/gu);

    return Array.isArray(result) ? result.join("") : "";
  };

  const letterToNumber = (letter) => {
    let result = "";
    Object.keys(letterValues).forEach((key) => {
      letterValues[key].includes(letter) ? (result = key) : null;
    });
    return result;
  };

  const textToNumber = (text) => {
    if (text == "") {
      return 0;
    } else {
      return baseString(text)
        .split("")
        .map((letter) => {
          return letterToNumber(letter);
        })
        .join("");
    }
  };

  const onlyVowels = (string) => {
    let result = baseString(string).match(/[aeiouàáâãäåæèéêëìíîïòóôõöùúûüýÿ]/g);

    return Array.isArray(result) ? result.join("") : "";
  };

  const onlyConsonants = (string) => {
    let result = baseString(string).match(
      /[^aeiouàáâãäåæèéêëìíîïòóôõöùúûüýÿ]/g
    );

    return Array.isArray(result) ? result.join("") : "";
  };

  const calculBaseNine = (number) => {
    let result = number
      .toString()
      .split("")
      .map((digit) => parseInt(digit))
      .reduce((a, b) => {
        return a + b;
      });
    if (result < 10 || [11, 22].includes(result)) {
      return result;
    } else {
      return calculBaseNine(result);
    }
  };

  const month = () => {
    return dateInput.value.split("-")[1];
  };

  const day = () => {
    return dateInput.value.split("-")[2];
  };

  const year = () => {
    return dateInput.value.split("-")[0];
  };

  const firstName = () => {
    return firstNameInput.value;
  };

  const lastName = () => {
    return lastNameInput.value;
  };

  const birthday = () => {
    return `${day()} ${months[parseInt(month()) - 1]} ${year()}`;
  };

  ///////////////////////// Calculs /////////////////////////
  const lifeRoad = () => {
    return calculBaseNine(parseInt(`${day()}${month()}${year()}`));
  };

  const numberOfAchievements = () => {
    return calculBaseNine(parseInt(`${day()}${month()}`));
  };

  const personnalYear = () => {
    return calculBaseNine(
      parseInt(`${new Date().getFullYear()}${day()}${month()}`)
    );
  };

  const birthDayVibration = () => {
    return calculBaseNine(parseInt(`${day()}`));
  };

  const spiritualInitiation = () => {
    return calculBaseNine(
      calculBaseNine(
        parseInt(`${expression()}${lifeRoad()}${day()}${spiritualImpulse()}`)
      )
    );
  };

  const expression = () => {
    return calculBaseNine(textToNumber(`${firstName()}${lastName()}`));
  };

  const spiritualImpulse = () => {
    return calculBaseNine(
      textToNumber(`${onlyVowels(firstName())}${onlyVowels(lastName())}`)
    );
  };

  const intimateSelf = () => {
    return calculBaseNine(
      textToNumber(
        `${onlyConsonants(firstName())}${onlyConsonants(lastName())}`
      )
    );
  };

  const activeNumber = () => {
    return calculBaseNine(textToNumber(firstName()));
  };

  const heredityNumber = () => {
    return calculBaseNine(textToNumber(lastName()));
  };

  const lifeNumber = () => {
    return calculBaseNine(expression() + lifeRoad());
  };

  ///////////////////////// Display methods /////////////////////////
  const displayResponse = () => {
    for (let i = 0, max = list.length; i < max; i++) {
      eval(`${list[i]}Html`).innerHTML = eval(`${list[i]}()`);
    }
  };
});

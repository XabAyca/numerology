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
  const missingNumberHtml = document.getElementById("missing_number");
  const firstCycleHtml = document.getElementById("first-cycle");
  const firstApogeeHtml = document.getElementById("first-apogee");
  const firstApogeeDurationHtml = document.getElementById("first-apogee-duration");
  const secondApogeeDurationHtml = document.getElementById("second-apogee-duration");
  const secondApogeeDurationBisHtml = document.getElementById("second-apogee-duration-bis");
  const thirdApogeeDurationHtml = document.getElementById("third-apogee-duration");
  const thirdApogeeDurationBisHtml = document.getElementById("third-apogee-duration-bis");
  const fourthApogeeDurationHtml = document.getElementById("fourth-apogee-duration");
  const secondCycleHtml = document.getElementById("second-cycle");
  const thirdCycleHtml = document.getElementById("third-cycle");
  const secondApogeeHtml = document.getElementById("second-apogee");
  const thirdApogeeHtml = document.getElementById("third-apogee");
  const fourthApogeeHtml = document.getElementById("fourth-apogee");
  const karmicDebt13Html = document.getElementById("karmic-debt-13");
  const karmicDebt14Html = document.getElementById("karmic-debt-14");
  const karmicDebt16Html = document.getElementById("karmic-debt-16");
  const karmicDebt19Html = document.getElementById("karmic-debt-19");
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
    "missingNumber",
    "firstCycle",
    "secondCycle",
    "thirdCycle",
    "firstApogee",
    "firstApogeeDuration",
    "secondApogeeDuration",
    "secondApogeeDurationBis",
    "thirdApogeeDuration",
    "thirdApogeeDurationBis",
    "fourthApogeeDuration",
    "secondApogee",
    "thirdApogee",
    "fourthApogee",
    "karmicDebt13",
    "karmicDebt14",
    "karmicDebt16",
    "karmicDebt19"
  ];
  let letterValues;
  async function getLetterValues() {
    const reponse = await fetch("./data/letter_value.json");
    letterValues = await reponse.json();
  }
  getLetterValues();

  ///////////////////////// Print /////////////////////////
  const print = () => {
    window.print();
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
    let result = baseString(string).match(/[aeiouyàáâãäåæèéêëìíîïòóôõöùúûüýÿ]/g);

    return Array.isArray(result) ? result.join("") : "";
  };

  const onlyConsonants = (string) => {
    let result = baseString(string).match(
      /[^aeiouyàáâãäåæèéêëìíîïòóôõöùúûüýÿ]/g
    );

    return Array.isArray(result) ? result.join("") : "";
  };

  const calculBaseNine = (number, with_specific = true, karmic = false) => {
    if (number < 10 || ([11, 22, 33].includes(number) && with_specific) && !karmic) {
      return parseInt(number);
    } else if (karmic && ([13, 14, 16, 19].includes(number))) {
      return parseInt(number);
    }

    let result = number
      .toString()
      .split("")
      .map((digit) => parseInt(digit))
      .reduce((a, b) => {
        return a + b;
      });

    return calculBaseNine(result, with_specific, karmic);
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

  const karmicCalculs = () => {
    return [
      calculBaseNine(day(), true, true),
      calculBaseNine((day() + month()), true, true),
      calculBaseNine((day() + month() + year()), true, true)
    ]
  }

  ///////////////////////// Calculs /////////////////////////
  const lifeRoad = () => {
    return calculBaseNine(parseInt(`${day()}${month()}${year()}`));
  };

  const numberOfAchievements = () => {
    return calculBaseNine(parseInt(`${day()}${month()}`));
  };

  const personnalYear = () => {
    return calculBaseNine(
      parseInt(`${new Date().getFullYear()}${day()}${month()}`), false
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

  const missingNumber = () => {
    let presentNumbers = textToNumber(`${firstName()}${lastName()}`).split("")
    let allNumbers = Object.keys(letterValues)

    return allNumbers.filter(numb => {
      return !presentNumbers.includes(numb)
    }).join(", ")
  };

  const firstCycle = () => {
    return calculBaseNine(month());
  }

  const firstApogee = () => {
    return calculBaseNine(
      parseInt(`${day()}${month()}`)
    );
  }

  const firstApogeeDuration = () => {
    return 36 - lifeRoad();
  }

  const secondApogeeDuration = () => {
    return firstApogeeDuration();
  }

  const secondApogeeDurationBis = () => {
    return firstApogeeDuration() + 9;
  }

  const thirdApogeeDuration = () => {
    return secondApogeeDurationBis();
  }

  const thirdApogeeDurationBis = () => {
    return secondApogeeDurationBis() + 9;
  }

  const fourthApogeeDuration = () => {
    return thirdApogeeDurationBis();
  }

  const secondApogee = () => {
    return calculBaseNine(
      parseInt(`${day()}${year()}`)
    );
  }

  const thirdApogee = () => {
    return calculBaseNine(
      parseInt(`${firstApogee()}${secondApogee()}`)
    );
  }

  const fourthApogee = () => {
    return calculBaseNine(
      parseInt(`${month()}${year()}`)
    );
  }

  const secondCycle = () => {
    return calculBaseNine(day());
  }

  const thirdCycle = () => {
    return calculBaseNine(year());
  }

  const karmicDebt13 = () => {
    return karmicCalculs().filter(el => el == 13).length
  }
  const karmicDebt14 = () => {
    return karmicCalculs().filter(el => el == 14).length
  }
  const karmicDebt16 = () => {
    return karmicCalculs().filter(el => el == 16).length
  }
  const karmicDebt19 = () => {
    return karmicCalculs().filter(el => el == 19).length
  }

  ///////////////////////// Display methods /////////////////////////
  const displayResponse = () => {
    for (let i = 0, max = list.length; i < max; i++) {
      eval(`${list[i]}Html`).innerHTML = eval(`${list[i]}()`);
    }
  };
});

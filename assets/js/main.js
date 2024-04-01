document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit_btn");
  const userFormular = document.getElementById("user_formular");
  const reTestBtn = document.getElementById("retest");
  const blockFormular = document.getElementById("formular");
  const blockresponse = document.getElementById("response");
  const firstNameInput = document.getElementById("floatingFirstName");
  const lastNameInput = document.getElementById("floatingLastName");
  const dateInput = document.getElementById("floatingDate");
  let letterValue;
  async function getLetterValue() {
    const reponse = await fetch("./data/letter_value.json");
    letterValue = await reponse.json();
  }
  getLetterValue();

  // Btn Animation //
  const animateButton = (e) => {
    e.target.classList.remove("animate");
    e.target.classList.add("animate");
    setTimeout(function () {
      e.target.classList.remove("animate");
    }, 700);
  };

  submitBtn.addEventListener("click", animateButton);

  // Toggl block //
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
    personnalYearHtml.innerHTML = "";
    birthDayVibrationHtml.innerHTML = "";
    spiritualInitiationHtml.innerHTML = "";
    lifeRoadHtml.innerHTML = "";
    numberOfAchievementsHtml.innerHTML = "";
  }

  submitBtn.addEventListener("click", togglblock);
  reTestBtn.addEventListener("click", togglblock);

  // Calcul helpers //
  const baseString = (string) => {
    return string
      .toLowerCase()
      .match(/\p{Ll}/gu)
      .join("");
  };

  const onlyVowels = (string) => {
    return baseString(string)
      .match(/[aeiouàáâãäåæèéêëìíîïòóôõöùúûüýÿ]/g)
      .join("");
  };

  const onlyConsonants = (string) => {
    return baseString(string)
      .match(/[^aeiouàáâãäåæèéêëìíîïòóôõöùúûüýÿ]/g)
      .join("");
  };

  const calculBaseNine = (number) => {
    let result = number
      .toString()
      .split("")
      .map((digit) => parseInt(digit))
      .reduce((a, b) => {
        return a + b;
      });

    if (result > 9) {
      return calculBaseNine(result);
    } else {
      return result;
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

  // Calculs //
  const lifeRoad = () => {
    return calculBaseNine(parseInt(`${day()}${month()}${year()}`));
  };

  const numberOfAchievements = () => {
    return calculBaseNine(parseInt(`${day()}${month()}`));
  };

  const personnalYear = () => {
    return calculBaseNine(parseInt(`${new Date().getFullYear()}${day()}${month()}`));
  };

  const birthDayVibration = () => {
    return calculBaseNine(parseInt(`${day()}`));
  };

  const spiritualInitiation = () => {
    // Expression + ch de vie + elan spirit + jour N
    return calculBaseNine(parseInt(`${day()}`));
  };

  // Display methods //
  const lifeRoadHtml = document.getElementById("life_road");
  const numberOfAchievementsHtml = document.getElementById(
    "number_of_achievements"
  );
  const personnalYearHtml = document.getElementById("personnal_year");
  const birthDayVibrationHtml = document.getElementById("birth_day_vibration");
  const spiritualInitiationHtml = document.getElementById(
    "spiritual_initiation"
  );

  const displayResponse = () => {
    lifeRoadHtml.innerHTML = lifeRoad();
    numberOfAchievementsHtml.innerHTML = numberOfAchievements();
    personnalYearHtml.innerHTML = personnalYear();
    birthDayVibrationHtml.innerHTML = birthDayVibration();
    spiritualInitiationHtml.innerHTML = spiritualInitiation();
  };
});

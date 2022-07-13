function bmiCalculator() {
    var weight = document.getElementById("weight").value;
    var height = document.getElementById("height").value / 100;

    var BMI = weight / Math.pow(height, 2);
    if (BMI <= 18.5) return alert("BMI " + BMI +", Underweight");
    if (BMI <= 25) return alert("BMI " + BMI +", Normal");
    if (BMI <= 30) return alert("BMI " + BMI +", Overweight");
    return alert("BMI " + BMI +", Obese");

  }
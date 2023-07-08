export function arrangeSeats(people) {
  let cars = [];
  let passengers = [];
  // Separate people with cars and without cars
  for (let i = 0; i < people.length; i++) {
    if (people[i][1] > 0) {
      cars.push(people[i]);
    } else {
      passengers.push(people[i]);
    }
  }
  // Sort cars based on available seats in descending order
  cars.sort((a, b) => b[1] - 1 - (a[1] - 1));

  // Remove 1 seat from each car for the driver
  for (let i = 0; i < cars.length; i++) {
    cars[i][1]--;
  }

  // Assign passengers to cars
  let carIndex = 0;
  const max = cars.length;
  for (let i = 0; i < passengers.length; i++) {
    let count = 0;
    while (cars[carIndex][1] === 0) {
      if (count > max - 1) {
        return "Niet genoeg beschikbare plaatsen";
      }

      carIndex = (carIndex + 1) % cars.length;
      count++;
    }
    cars[carIndex][1]--;
    cars[carIndex].push(passengers[i][0]);
    carIndex = (carIndex + 1) % cars.length;
  }

  for (let j = 0; j < cars.length; j++) {
    const backupCar = [];
    for (let i = 0; i < cars[j].length; i++) {
      if (isNaN(cars[j][i])) {
        backupCar.push(cars[j][i]);
      }
    }
    cars[j] = backupCar;
  }

  let result = "";
  for (let i = 0; i < cars.length; i++) {
    const driver = cars[i][0];
    const passengers = cars[i]; // Include the driver
    result += `${driver}'s auto: ${passengers.join(", ")}` + "\n";
  }
  return result;
}

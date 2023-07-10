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
    try {
      while (cars[carIndex][1] === 0) {
        if (count > max - 1) {
          return "Niet genoeg beschikbare plaatsen";
        }

        carIndex++;
        count++;
      }
    } catch (e) {
      return "Niet genoeg beschikbare plaatsen";
    }
    cars[carIndex][1]--;
    cars[carIndex].push(passengers[i][0]);
  }

  cars = optimizeDrivers(cars);

  // Remove the number of seats from each car
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
    result += `${driver}'s auto: ${passengers.join(", ")}` + "\n" + "\n";
  }
  return result;
}

function optimizeDrivers(drivers) {
  let seatsNeeded = 0;
  for (let i = 0; i < drivers.length; i++) {
    seatsNeeded += drivers[i].length - 1;
  }

  // We know how many seats we need, now we need to minimize the number of drivers
  let count = 0;
  const actualDrivers = [];
  while (count < seatsNeeded) {
    const currentCar = drivers.shift();
    count += currentCar.length - 1 + currentCar[1];
    actualDrivers.push(currentCar);
  }

  // Assign passengers to cars
  let carIndex = 0;
  const max = cars.length;
  for (let i = 0; i < drivers.length; i++) {
    while (actualDrivers[carIndex][1] === 0) {
      carIndex++;
    }
    actualDrivers[carIndex][1]--;
    actualDrivers[carIndex].push(drivers[i][0]);
    for (let i = 2; i < drivers[i].length; i++) {
      actualDrivers[carIndex].push(drivers[i][i]);
    }
  }

  return actualDrivers;
}

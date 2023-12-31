export const TemperatureUnits = {
  celsius: 'C',
  fahrenheit: 'F',
};

// Converts a temperature to the specified unit
export function convertTemperature(temp, toUnit) {
  if (!temp) return "--";

  if (toUnit === TemperatureUnits.celsius) {
    return ((temp - 32) * 5 / 9).toFixed(1);
  } else if (toUnit === TemperatureUnits.fahrenheit) {
    return (temp * 9 / 5 + 32).toFixed(1);
  }

  return temp; // Return as-is for unsupported units
}

// Return formatted temperature in the appropriate system
export function getFormattedTemperature({ rawTemp, currentUnit, returnUnit }) {
  if (!rawTemp) return `--°${returnUnit}`;

  return `${(currentUnit === returnUnit) ? rawTemp : convertTemperature(rawTemp, returnUnit)}°${returnUnit}`;
}

// -------- Heat index calculation
// Define the heat index categories and their thresholds
const heatIndexCategories = [
  { name: "No Caution", threshold: 80 },
  { name: "Caution", threshold: 90 },
  { name: "Extreme Caution", threshold: 105 },
  { name: "Danger", threshold: 130 },
  { name: "Extreme Danger", threshold: Infinity },
];
// Calculate heat index temperature and return the category
export function calculateHeatIndex({ rawTemp, currentUnit, rel_humidity, returnUnit }) {
  if (!rawTemp || !rel_humidity) return;

  // Make sure the input values are valid
  const tempF = (currentUnit === TemperatureUnits.fahrenheit)
    ? rawTemp :
    convertTemperature(rawTemp, TemperatureUnits.fahrenheit);
  if (rel_humidity < 0 || rel_humidity > 100) return null;

  let heatIndexF;

  if (tempF < 80) heatIndexF = tempF;
  else
    heatIndexF = Math.round(
      (
        -42.379 +
        (2.04901523 * tempF) +
        (10.14333127 * rel_humidity) -
        (0.22475541 * tempF * rel_humidity) -
        (0.00683783 * tempF * tempF) -
        (0.05481717 * rel_humidity * rel_humidity) +
        (0.00122874 * tempF * tempF * rel_humidity) +
        (0.00085282 * tempF * rel_humidity * rel_humidity) -
        (0.00000199 * tempF * tempF * rel_humidity * rel_humidity)
      )
      * 10
    ) / 10
      ;

  // Find the appropriate category for the calculated heat index
  const category = heatIndexCategories.find((c) => heatIndexF < c.threshold);
  // Return an object with the heat index and the category name
  const formattedHeatIndex = getFormattedTemperature({
    rawTemp: heatIndexF,
    currentUnit: TemperatureUnits.fahrenheit,
    returnUnit: returnUnit
  });

  if (formattedHeatIndex && isNaN(formattedHeatIndex) && category?.name) {
    return `Heat Index: ${formattedHeatIndex} - ${category?.name}`;
  }
  else return null;
}


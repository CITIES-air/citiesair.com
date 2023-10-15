import { fetchDataFromURL } from "../Components/DatasetDownload/DatasetFetcher";
import { calculateSensorStatus, SensorStatus } from "../Pages/Screen/ScreenUtils";
import convertToAQI from "./AirQualityIndexCalculator";
import AQIdatabase from "./AirQualityIndexHelper";
import parse from 'html-react-parser';

export const apiDomain = 'https://api.citiesair.com';

export const fetchAndProcessCurrentData = async (apiUrl) => {
  try {
    const data = await fetchDataFromURL(apiUrl, 'json', true);

    if (!data) {
      throw new Error('Returned data is empty');
    }

    try {
      return processCurrentData(data);
    } catch (error) {
      // Handle the case where data is not an iterable object
      console.error("Error: data is not iterable", error);
    }
  }
  catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

export const processCurrentData = (data) => {
  Object.entries(data).map(([_, sensorData]) => {
    // Calculate if the sensor is currently active or not
    const now = new Date();
    const currentTimestamp = new Date(sensorData.current?.timestamp);
    const lastSeenInHours = Math.round((now - currentTimestamp) / 1000 / 3600);
    if (sensorData.current) {
      sensorData.current.lastSeenInHours = lastSeenInHours;
      sensorData.current.sensor_status = calculateSensorStatus(lastSeenInHours);
    }

    // Calculate AQI from raw measurements
    if (sensorData.current?.["pm2.5"]) {
      const aqiObject = convertToAQI(sensorData.current["pm2.5"]);
      if (aqiObject) {
        const aqiCategory = AQIdatabase[aqiObject.aqi_category_index];
        sensorData.current.aqi = aqiObject.aqi;
        sensorData.current.category = aqiCategory.category;

        // Only add color and healthSuggestion if the sensor is active
        if (sensorData.current.sensor_status === SensorStatus.active) {
          sensorData.current = {
            ...sensorData.current,
            color: aqiCategory.lightThemeColor,
            healthSuggestion: aqiCategory.healthSuggestions[sensorData.sensor?.location_type] && parse(aqiCategory.healthSuggestions[sensorData.sensor?.location_type])
          };
        }
      }
    }
  });
  return data;
}
/* eslint-disable */

import { useState, useEffect, useContext, useMemo } from 'react';

import { GoogleContext } from '../../ContextProviders/GoogleContext';

import { Box, Stack } from '@mui/material/';

import { useTheme } from '@mui/material/styles';
import SeriesSelector from './SeriesSelector';

import { generateRandomID, returnGenericOptions, returnCalendarChartOptions, returnChartControlUI, ChartControlType, addTouchEventListenerForChartControl, getDateRangeForCalendarChart, getValueRangeForCalendarChart } from '../GoogleChartHelper';

import GoogleChartStyleWrapper from './GoogleChartStyleWrapper';

import LoadingAnimation from '../../Components/LoadingAnimation';

import ChartSubstituteComponentLoader from '../ChartSubstituteComponents/ChartSubstituteComponentLoader';

import { CalendarChart, getCalendarChartMargin, yearSpacing } from './NivoCalendarChart';

export default function SubChart(props) {
  // Props
  const { chartData, subchartIndex, windowSize, isPortrait, isHomepage, height, maxHeight } = props;
  // Early return if this doesn't contain a normal Google Chart but a chartSubstituteComponent
  const chartSubstituteComponentName = chartData.subcharts?.[subchartIndex].chartSubstituteComponentName;
  if (chartSubstituteComponentName) {
    return <ChartSubstituteComponentLoader chartSubstituteComponentName={chartSubstituteComponentName} />;
  }

  // Formulate the className
  const className = chartData.customClassName ? `${chartData.chartType} ${chartData.customClassName}` : chartData.chartType;

  // Use GoogleContext for loading and manipulating the Google Charts
  const [google, _] = useContext(GoogleContext);

  // States of the Google Charts
  const [dataTable, setDataTable] = useState();
  const [chartWrapper, setChartWrapper] = useState();
  const [dashboardWrapper, setDashboardWrapper] = useState();
  const [controlWrapper, setControlWrapper] = useState();

  // Get the current theme
  const theme = useTheme();

  // To determine the first time the chart renders to show/hide the LoadingAnimation
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Keep track of the columns (series) of the chart
  const [allInitialColumns, setAllInitialColumns] = useState();
  const [dataColumns, setDataColumns] = useState();
  const [initialVAxisRange, setInitialVAxisRage] = useState();

  // Define the DOM container's ID for drawing the google chart inside
  const [chartID, __] = useState(generateRandomID());

  // Calendar chart's properties
  const [chartTotalHeight, setChartTotalHeight] = useState(200);

  // Get the options object for chart
  let options = useMemo(() => {
    let opts = returnGenericOptions({ ...props, theme });
    if (chartData.chartType === 'Calendar') {
      opts = returnCalendarChartOptions(opts);
    }
    return opts;
  }, [props, theme, chartData.chartType]);
  // State to store transformed data for CalendarChart
  const [calendarData, setCalendarData] = useState(null);
  const [calendarHeight, setCalendarHeight] = useState(200);
  const [containerWidth, setContainerWidth] = useState(1200); // max width of the chart container
  // Early exit for 'Calendar' chartType
  if (chartData.chartType === 'Calendar') {
    useEffect(() => {
      const dataArray = chartData.dataArray
        || (chartData.subcharts
          && chartData.subcharts[subchartIndex].dataArray)
        || null
        || null;
      if (!dataArray) return; // early return if there is no data to render

      const dateStrings = dataArray.map(item => item.day);
      const values = dataArray.map(item => item.value);
      const dateRange = getDateRangeForCalendarChart(dateStrings);

      setCalendarData({
        data: dataArray,
        dateRange: dateRange,
        valueRange: getValueRangeForCalendarChart(values)
      });

      // Get the number of years in the dateRange
      const startYear = new Date(dateRange.min).getFullYear();
      const endYear = new Date(dateRange.max).getFullYear();
      const numberOfYear = endYear - startYear + 1;

      // Calculate the size of each cell
      const cellSize = Math.min(containerWidth / 60, 20); // max cell size of 20
      const yearHeight = cellSize * 7; // Height for one year

      const calendarChartMargin = getCalendarChartMargin(isPortrait);

      // Calculate the total height based on the number of years and margins
      let totalHeight;
      if (numberOfYear == 1) {
        totalHeight = yearHeight + yearSpacing + calendarChartMargin.top + calendarChartMargin.bottom
      }
      else {
        totalHeight = numberOfYear * (yearHeight + yearSpacing) + calendarChartMargin.top + calendarChartMargin.bottom;
      }
      setCalendarHeight(totalHeight);

    }, [chartData]);

    return (
      <GoogleChartStyleWrapper
        isPortrait={isPortrait}
        className={className}
        position="relative"
        minWidth="700px"
        minHeight={isPortrait ? '200px' : calendarHeight + 'px'}
        height={calendarHeight + 'px'}
        maxHeight={isPortrait && '550px'}
      >
        {calendarData ?
          <CalendarChart
            data={calendarData.data}
            dateRange={calendarData.dateRange}
            valueRange={calendarData.valueRange}
            isPortrait={isPortrait}
            options={options}
          />
          :
          (
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              <LoadingAnimation />

            </Box>
          )
        }
      </GoogleChartStyleWrapper>
    );
  }

  // Properties for chart control (if existed)
  let hasChartControl = false;
  let chartControlOptions;
  // Only show the chart control if:
  // It exists in the database (either for all subcharts or just for a particular subchart)
  // And if the chart is currently not shown on homePage
  let chartControl = chartData.control || chartData.subcharts?.[subchartIndex].control;
  if (chartControl && (isHomepage !== true)) {
    hasChartControl = true;

    // Get the options for chartControl if hasChartControl
    chartControlOptions = {
      ...chartControl.options,
      ui: returnChartControlUI({
        chartControl,
        mainChartData: chartData,
        mainChartOptions: options,
        subchartIndex,
        theme,
        isPortrait
      })
    };

    // Swap touch events for mouse events on ChartRangeControl
    // as it doesn't support touch events on mobile
    if (chartControl.controlType === 'ChartRangeFilter') {
      useEffect(() => {
        const cleanupTouchEventListener = addTouchEventListenerForChartControl({ controlWrapper, chartID });
        return cleanupTouchEventListener;
      }, [controlWrapper]);
    }
  }

  // Properties for selecting (showing or hiding) the serie(s)
  const seriesSelector = options.seriesSelector || false;

  // Set new options prop and re-render the chart if theme or isPortrait changes
  useEffect(() => {
    if (seriesSelector) handleSeriesSelection(dataColumns); // this function set new options, too
    else {
      chartWrapper?.setOptions({
        ...options,
        ...(chartData.chartType === 'Calendar' && { height: chartTotalHeight })
      });

      chartWrapper?.draw();
      if (hasChartControl) {
        controlWrapper?.setOptions(chartControlOptions);
        controlWrapper?.draw();
      }
    }
  }, [theme, isPortrait, windowSize, chartTotalHeight]);

  // Set new initialColumnsColors if the theme changes
  // This only applies to when seriesSelector.method == "setViewColumn"
  useEffect(() => {
    if (!dataColumns) return;
    if (seriesSelector && seriesSelector.method == "setViewColumn") {
      setInitialColumnsColors({ dataColumns: dataColumns });
      handleSeriesSelection(dataColumns);
    }
  }, [theme]);

  const getInitialColumns = ({ chartWrapper, dataTable, seriesSelector }) => {
    // Update the initial DataView's columns (often, all of the series are displayed initially)
    var initialView = chartWrapper.getView();
    // If (optional) columns is not specified in database
    // Assign it from DataTable
    if (initialView.columns == null) {
      const viewFromDataTable = new google.visualization.DataView(dataTable);
      chartWrapper.setView({
        columns: viewFromDataTable.columns
      });
      initialView = chartWrapper.getView();
    }

    let shouldAssignDomainRoleToFistColumn = true; // variable to only assign type: 'domain' to the very first column
    let dataSeriesIndex = 0;
    const allInitialColumns = initialView.columns.map((col, index) => {
      // A column can either be a number (that denotes the index of the sourceColumn) or an object
      // The code below harmonize all columns to be an object to store crucial data to toggle their visibility
      if (typeof col === 'number') col = {
        role: shouldAssignDomainRoleToFistColumn ? 'domain' : 'data',
        sourceColumn: col
      }
      col.label = dataTable.getColumnLabel(col.sourceColumn);
      col.indexInAllInitialColumns = index;

      shouldAssignDomainRoleToFistColumn = shouldAssignDomainRoleToFistColumn && false;

      // Set the visibility of data column, 
      if (col.role === 'data') {
        // initially, all data columns are selected if multiple series are selectable
        if (seriesSelector?.allowMultiple) {
          col.selected = true;
        } else {
          // else for single serie selector, only first data column is selected
          if (dataSeriesIndex === 0) {
            col.selected = true;
          } else {
            col.selected = false;
          }
        }
        col.seriesIndex = dataSeriesIndex;
        dataSeriesIndex++;
      }
      return col;
    });
    setAllInitialColumns(allInitialColumns);
    const initialVAxisRange = getInitialVAxisRange({ dataTable: dataTable, allInitialColumns: allInitialColumns });
    setInitialVAxisRage(initialVAxisRange);
    // To track selection, only get the columns that are:
    // role === 'data'
    // visibleInLegend !== false
    const dataColumns = allInitialColumns.filter((col) => {
      return col.role === 'data' && options.series?.[col.seriesIndex]?.visibleInLegend !== false;
    });

    if (seriesSelector.method === "setViewColumn") setInitialColumnsColors({ dataColumns: dataColumns });

    setDataColumns(dataColumns);
    return dataColumns;
  };

  const setInitialColumnsColors = ({ dataColumns }) => {
    dataColumns.forEach((col) => {
      // Assign inherit color to this data column
      col.color = options.colors[col.seriesIndex % options.colors.length];
      // Assign other inherit attributes from its serie object (if existed)
      col.serieAttribute = options.series?.[col.seriesIndex];
    });
  }

  const getInitialVAxisRange = ({ dataTable, allInitialColumns }) => {
    let vAxisMin, vAxisMax;
    allInitialColumns.forEach((col, index) => {
      if (index === 0) return; // the first column is the domain (hAxis)
      const range = dataTable.getColumnRange(col.sourceColumn);
      if (!isNaN(range.min) && range.min) vAxisMin = vAxisMin ? Math.min(vAxisMin, range.min) : range.min;
      if (!isNaN(range.max) && range.max) vAxisMax = vAxisMax ? Math.max(vAxisMax, range.max) : range.max;
    });
    return { min: vAxisMin, max: vAxisMax };
  }

  const handleSeriesSelection = (newDataColumns, _chartWrapper = chartWrapper) => {
    if (!allInitialColumns) return;

    setDataColumns(newDataColumns);

    if (seriesSelector.method === "toggleVisibility" || seriesSelector.method === null) {
      const hiddenSeriesObject = {};
      newDataColumns.forEach((col) => {
        if (!col.selected)
          hiddenSeriesObject[col.seriesIndex] = {
            color: 'transparent',
            enableInteractivity: false,
            visibleInLegend: false
          }; // 'hide' the serie by making it transparent
      });

      _chartWrapper?.setOptions({
        ...options,
        series: {
          ...options.series,
          ...hiddenSeriesObject
        }
      });
    }
    else if (seriesSelector.method === "setViewColumn") {
      let newViewColumns = [];
      newViewColumns.push(0); // this is the domain column
      newDataColumns.forEach((dataColumn) => {
        if (dataColumn.selected) {
          newViewColumns.push(dataColumn);
          // Find this dataColumn's supporting columns (whose role !== 'data')
          // A dataColumn has its supporting columns (can be many) follow it immediately
          for (let i = dataColumn.indexInAllInitialColumns + 1; i < allInitialColumns.length; i++) {
            if (allInitialColumns[i].role !== 'data') {
              newViewColumns.push(allInitialColumns[i]);
            }
            // If this loop encounter the next dataColumn, break the loop, all supporting columns for this dataColumn have been discovered
            else {
              break;
            }
          }
        }
      });
      _chartWrapper?.setView({ columns: newViewColumns });

      const newOptions = { ...options };
      // Preserve the initial vAxis range so that the vAxis doesn't shift based on the visible serie(s)
      // newOptions.vAxis.viewWindow = {
      //   min: (options.vAxis.viewWindow.min == null) ? initialVAxisRange.min : options.vAxis.viewWindow.min,
      //   max: (options.vAxis.viewWindow.max == null) ? initialVAxisRange.max : options.vAxis.viewWindow.max,
      // }
      // Set the new color array
      newOptions.colors = newDataColumns.filter((col) => col.selected).map((col) => col.color);
      // Set the new series object (if any)
      // this contains other series' attributes (lineWidth, seriesType...)
      const series = {};
      let selectedSeriesCount = 0;
      newDataColumns.forEach((col) => {
        if (!col.selected) return;
        if (col.serieAttribute != null) {
          series[selectedSeriesCount] = col.serieAttribute;
        }
        selectedSeriesCount++;
      })
      newOptions.series = series;
      _chartWrapper?.setOptions(newOptions);
    }

    // Call draw to apply the new DataView and 'refresh' the chart
    _chartWrapper?.draw();

    if (hasChartControl) {
      controlWrapper?.draw();
    }
  };

  const reconstructFunctionFromJSONstring = (columns) => {
    if (!columns) return;

    const evaluatedColumns = [];
    for (const column of columns) {
      if (typeof column === 'number') {
        // If it's a number, add it as-is
        evaluatedColumns.push(column);
      } else if (typeof column === 'object') {
        if (column.calc && column.calc !== 'stringify') {
          // If it's an object with a 'calc' property, evaluate the 'calc' function
          // using new Function() and add the result to the evaluatedColumns array
          const calcFunction = new Function("dataTable", "rowNum", column.calc);
          evaluatedColumns.push({
            ...column,
            calc: calcFunction,
          });
        } else {
          // If it's an object without a 'calc' property, or with calc = 'stringify', add it as-is
          evaluatedColumns.push(column);
        }
      }
    }
    return evaluatedColumns;
  }


  // Call this function to fetch the data and draw the initial chart
  useEffect(() => {
    if (google && chartData) {
      // Not applicable for Calendar chart
      if (chartData.chartType === "Calendar") return;

      // Get and set the dataArray 
      const dataArray = chartData.dataArray
        || (chartData.subcharts
          && chartData.subcharts[subchartIndex].dataArray)
        || null
        || null;
      if (!dataArray) return; // early return if there is no data to render

      const thisDataTable = google.visualization.arrayToDataTable(dataArray);
      setDataTable(thisDataTable);

      // Get dataColumn views
      const columns = chartData.columns
        || (chartData.subcharts
          && chartData.subcharts[subchartIndex].columns)
        || null
        || null;
      const reconstructedColumns = reconstructFunctionFromJSONstring(columns);

      // Create chartWrapper
      const thisChartWrapper = new google.visualization.ChartWrapper({
        chartType: chartData.chartType,
        dataTable: (!hasChartControl) ? thisDataTable : undefined,
        options: options,
        view: {
          columns: reconstructedColumns
        },
        containerId: chartID
      });
      setChartWrapper(thisChartWrapper);

      if (hasChartControl) {
        const thisDashboardWrapper = new google.visualization.Dashboard(
          document.getElementById(`dashboard-${chartID}`));
        setDashboardWrapper(thisDashboardWrapper);

        google.visualization.events.addListener(thisDashboardWrapper, 'ready', onChartReady);

        const thisControlWrapper = new google.visualization.ControlWrapper({
          controlType: chartControl.controlType,
          options: chartControlOptions,
          containerId: `control-${chartID}`
        });
        setControlWrapper(thisControlWrapper);

        // Establish dependencies
        thisDashboardWrapper.bind(thisControlWrapper, thisChartWrapper);

        thisDashboardWrapper.draw(thisDataTable);
      }
      else {
        google.visualization.events.addListener(thisChartWrapper, 'ready', onChartReady);
        thisChartWrapper.draw();
      }

      // Run the seriesSelector for the first time
      if (seriesSelector) {
        const initColumns = getInitialColumns({ chartWrapper: thisChartWrapper, dataTable: thisDataTable, seriesSelector: seriesSelector });
        handleSeriesSelection(initColumns, thisChartWrapper);
      }
    }
  }, [google, chartData]);

  const renderChart = () => {
    if (hasChartControl) {
      return (
        <Stack
          id={`dashboard-${chartID}`}
          direction={ChartControlType[chartControl.controlType]?.stackDirection || 'column-reverse'}
          sx={{ height: '100%' }}
        >
          <Box
            id={`control-${chartID}`}
            sx={{
              height: `calc(${height} / 8)`,
              opacity: 0.8,
              filter: 'saturate(0.3)'
            }}
          />
          <Box id={chartID} sx={{ height: height, maxHeight: maxHeight }} />
        </Stack>
      )
    }
    else return <Box id={chartID} sx={{ height: height, maxHeight: maxHeight }} />;
  }

  const onChartReady = () => {
    if (!isFirstRender) return;
    // Hide the circleProgress when chart finishes rendering the first time
    setIsFirstRender(false);
  };

  return (
    <GoogleChartStyleWrapper
      isPortrait={isPortrait}
      className={className}
      position="relative"
      height="100%"
      minHeight={chartData.chartType === 'Calendar' && '200px'}
    >
      {/* Conditionally display loading animation here */}
      {isFirstRender && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <LoadingAnimation />
        </Box>
      )}

      {/* Conditionally display seriesSelector here */}
      {(seriesSelector && !isFirstRender) && (
        <SeriesSelector
          items={dataColumns}
          allowMultiple={seriesSelector.allowMultiple}
          selectorID={`${chartData.title}-selector`}
          onSeriesSelection={handleSeriesSelection}
        />
      )}

      {/* Display chart here */}
      {renderChart()}
    </GoogleChartStyleWrapper>
  );
}
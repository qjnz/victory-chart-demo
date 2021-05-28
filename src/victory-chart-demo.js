import React, { useCallback, useState } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryStack,
  ZoomHelpers,
  createContainer
} from "victory";

const data = [
  { month: 1, earnings: 13000 },
  { month: 2, earnings: 16500 },
  { month: 3, earnings: 14250 },
  { month: 4, earnings: 19000 },
  { month: 5, earnings: 18500 },
  { month: 6, earnings: 17900 },
  { month: 7, earnings: 20000 },
  { month: 8, earnings: 16590 },
  { month: 9, earnings: 18680 },
  { month: 10, earnings: 16740 },
  { month: 11, earnings: 21000 },
  { month: 12, earnings: 19850 }
];

const data2 = [
  { month: 5, earnings: 5000 },
  { month: 7, earnings: 4600 },
  { month: 9, earnings: 6000 }
];

const barWidth = 30;
const barPadding = 4.5;
const chartWidth = 350;
const zoomDomain = chartWidth / (barWidth + barPadding * 2);
const bar1Color = "#B686C1";
const bar1SelectedColor = "#6E0D83";
const bar2Color = "#CBC3CA";
const bar2SelectedColor = "#988896";

export function StackedBarDemo() {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const bar1Fill = useCallback(
    ({ index }) => {
      return index === selectedIndex ? bar1SelectedColor : bar1Color;
    },
    [selectedIndex]
  );

  const bar2Fill = useCallback(
    ({ index }) => {
      return index === selectedIndex ? bar2SelectedColor : bar2Color;
    },
    [selectedIndex]
  );

  const handleClick = useCallback(({ index }) => {
    console.log(index);
    setSelectedIndex(index);
  }, []);

  return (
    <VictoryChart
      width={chartWidth}
      // style={{ ticks: { stroke: "transparent" } }}
      // theme={VictoryTheme.material}
      containerComponent={
        <VictoryZoomContainer
          allowZoom={false}
          zoomDimension="x"
          zoomDomain={{ x: [1, zoomDomain] }}
          // zoomDomain={20}
        />
      }
    >
      <VictoryStack
        colorScale={[bar1Color, bar2Color]}
        style={{
          data: {
            stroke: "rgba(255,255,255,1)",
            strokeWidth: 0.5
          }
        }}
      >
        <VictoryBar
          name="bar1"
          data={data}
          x="month"
          y="earnings"
          barWidth={barWidth}
          style={{
            data: {
              fill: bar1Fill
            }
          }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: (evt, targetProps) => {
                  return [
                    {
                      target: "data",
                      mutation: handleClick
                    }
                  ];
                }
              }
            }
          ]}
        />
        <VictoryBar
          name="bar2"
          data={data2}
          barWidth={barWidth}
          x="month"
          y="earnings"
          style={{
            data: {
              fill: bar2Fill
            }
          }}
        />
      </VictoryStack>
    </VictoryChart>
  );
}

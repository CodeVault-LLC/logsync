import { colors } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type MonitorStatisticsProps = {
  data: Highcharts.SeriesOptionsType[];
  dates: string[];
};

export const MonitorStatistics: React.FC<MonitorStatisticsProps> = ({
  data,
  dates,
}) => {
  const options: Highcharts.Options = {
    accessibility: { enabled: false },

    colors: [colors.blue[500]],
    chart: {
      backgroundColor: undefined,
      width: undefined,
      height: undefined,
    },
    title: {
      text: new Date().getFullYear().toString(),
      y: 30,
      style: {
        color: "#FFF",
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      itemStyle: {
        color: "#ccc",
      },
      itemHoverStyle: {
        color: "#fff",
      },
    },
    xAxis: {
      categories: dates,
      labels: {
        style: {
          color: "#bbb",
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        style: {
          color: "#bbb",
        },
      },
    },
    series: data,
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

import { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import { RECYCLE_URL } from "../services/configuration";
import { fetchGetData } from "../services";
import "./styles.css";

const STACK_BAR_OPTIONS = {
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    },
    responsive: true,
    maintainAspectRatio: false
  };

const RecycleChart = () => {

    const [
      recycleChartData, 
      setRecycleChartData
    ] = useState<ChartData<"bar", number[], string>>({
        labels: [],
        datasets: []
      });

    useEffect(() => {
      getRecycleData();
    }, []);
    
    const getRecycleData = async () => {
        let response = await fetchGetData(RECYCLE_URL);

        if (response && response.data) {
            const chartData = {
                labels: response.data.labels,
                datasets: [
                  {
                    label: "Recycle",
                    data: response.data.chartData[1].data,
                    backgroundColor: "#32c9c9"
                  },
                  {
                    label: "Non Recycle",
                    data: response.data.chartData[0].data,
                    backgroundColor: "#1a2424"
                  }
                ]
              };
              setRecycleChartData(chartData);
        }
    };

    return (
        <Card className="cardContainer" style={{width: "49.5%"}}>
            <CardBody 
              style={{  height: "350px" }} 
              className="d-flex align-items-center justify-content-center">
                <h6 className="h6-title">Recyclable vs non-recyclable</h6>
                <div style={ { height: "210px", width:"80%" } }>
                  <Bar 
                      options={ STACK_BAR_OPTIONS } 
                      data={ recycleChartData }  />
                </div>
            </CardBody>
        </Card>
    );
};

export default RecycleChart;
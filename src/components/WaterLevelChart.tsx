import { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Chart } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { WATER_LEVEL_URL } from "../services/configuration";
import { WaterLevelData, BAR_CHART_OPTIONS } from "../services/types";
import { fetchGetData } from "../services";
import "./styles.css";


const WaterLevelChart = () => {

    const [
        waterLevelData, 
        setWaterLevelData
    ] = useState<WaterLevelData>();
    const [
        waterLevelChartData,
        setWaterLevelChartData
      ] = useState<ChartData>({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        getWaterLevelData();
    }, []);
    
    const getWaterLevelData = async () => {
        let response = await fetchGetData(WATER_LEVEL_URL);

        if (response && response.data) {
            setWaterLevelData(response.data);
        }
    };


    useEffect(() => {
        if (!!waterLevelData) {
            
            const chartDatset: ChartData = {
                labels: waterLevelData.labels,
                datasets: [
                    {
                        label: "Water Level (m)", 
                        data: waterLevelData.chartData[0].data,
                        borderColor: "#4575ab",
                        backgroundColor: "#4575ab",
                        order: 2
                    }
                ]
            };
            setWaterLevelChartData(chartDatset);
        }
    }, [waterLevelData])

    return (
        <Card className="cardContainer" style={{width: "69.5%"}}>
            <CardBody style={{  height: "350px" }}>
                <h6 className="title">Water Level (Water Detention Tank)</h6>
                <div style={ { height: "280px" } } className="p-3">
                    <Chart
                        type={ "bar" }
                        options={ BAR_CHART_OPTIONS }
                        data={ waterLevelChartData } />
                </div>
            </CardBody>
        </Card>
    );
};

export default WaterLevelChart;
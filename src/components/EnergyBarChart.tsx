import { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { Chart } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { ENERGY_CONSUMPTION__URL } from "../services/configuration";
import { EnergyData, BAR_CHART_OPTIONS } from "../services/types";
import { fetchGetData } from "../services";
import "./styles.css";

const EnergyBarChart = () => {

    const [
        consumptionData, 
        setConsumptionData
    ] = useState<EnergyData>();
    const [
        energyChartData,
        setEnergyChartData
      ] = useState<ChartData>({
        labels: [],
        datasets: []
      });
    
    useEffect(() => {
        getEnergyData();
    }, []);
    
    const getEnergyData = async () => {
        let response = await fetchGetData(ENERGY_CONSUMPTION__URL);
        if (response && response.data) {
            setConsumptionData(response.data);
        }
    };

    useEffect(() => {
        if (!!consumptionData) {
            const energyChartDataset: ChartData = {
                labels: consumptionData.labels,
                datasets: [
                    {
                        label: consumptionData.chartData[0].label,
                        data: consumptionData.chartData[0].data,
                        borderColor: "#4575ab",
                        backgroundColor: "#4575ab",
                        order: 2
                    }
                ]
            };
            setEnergyChartData(energyChartDataset);
        }
    }, [consumptionData])

    return (
        <div>
            <Row className="pb-2">
                <Col className="d-flex flex-column align-items-center">
                    <div className="d-flex flex-row justify-content-center align-items-end">
                        <span className="total-label">
                            { consumptionData?.totalConsumption ? consumptionData.totalConsumption.toFixed(2) : 0 }
                        </span>
                        <span className="change-percent">+18%</span>
                    </div>
                    <span className="consumption-label">Consumption (kWh)</span>
                </Col>
                <Col className="d-flex flex-column align-items-center">
                    <div className="d-flex flex-row justify-content-center align-items-end">
                        <span className="total-label">
                            { `${ consumptionData?.totalCost ? consumptionData?.totalCost.toFixed(3) : 0 }` }
                        </span>
                        <span className="change-percent">+15% </span>
                    </div>
                    <span className="consumption-label">Cost</span>
                </Col>
            </Row>
    
            <div style={{ height: "250px" }}>
                <Chart
                    type={ "bar" }
                    options={ BAR_CHART_OPTIONS }
                    data={ energyChartData } />
            </div>
        </div>
    );
};

export default EnergyBarChart;
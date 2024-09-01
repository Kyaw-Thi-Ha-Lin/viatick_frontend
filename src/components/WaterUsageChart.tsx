import { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import "./styles.css";
import { WATER_USAGE_URL } from "../services/configuration";
import { fetchGetData } from "../services";

const LiquidFillGauge: any = require('react-liquid-gauge');

const WaterUsageChart = () => {

    const [
        waterPercentage, 
        setWaterPercentage
    ] = useState<number>(0);
    const [
        waterLevel, 
        setWaterLevel
    ] = useState<number>(0);

    useEffect(() => {
        getWaterUsageData();
    }, []);
    
    const getWaterUsageData = async () => {
        let response = await fetchGetData(WATER_USAGE_URL);

        if (response && response.data) {
            if (response.data.percentage) {
                setWaterPercentage(response.data.percentage)
            }
            if (response.data.waterLevel) {
                setWaterLevel(response.data.waterLevel)
            }
        }
    };

    return (
        <Card className="cardContainer" style={{width: "29.5%"}}>
            <CardBody  
                style={{  height: "350px" }} 
                className="d-flex flex-column align-items-center justify-content-center">

                <h6 className="h6-title">WATER USAGE</h6>
                
                <div className="flex-fill d-flex flex-column justify-content-center">
                    <LiquidFillGauge
                        width={ 170 }
                        height={ 170 }
                        value={ waterPercentage }
                        riseAnimation
                        circleStyle={{ fill: "#3376b0" }}  />
                </div>
                
                <p className="water-level-laebl">{`Current Water Level: ${waterLevel}`}</p>
            </CardBody>
        </Card>
    );
};

export default WaterUsageChart;
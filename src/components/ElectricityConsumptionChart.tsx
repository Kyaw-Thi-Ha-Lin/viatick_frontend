import { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { ELECTRICITY_CONSUMPTION_URL } from "../services/configuration";
import { fetchGetData } from "../services";
import "./styles.css";
import plugImage from "../assets/plug.png";

const ElectricityConsumptionChart = () => {

    const [
        electricityConsumption, 
        setElectricityConsumption
    ] = useState<number>(0);

    useEffect(() => {
        getElectricityConsumptionData();
    }, []);
    
    const getElectricityConsumptionData = async () => {
        let response = await fetchGetData(ELECTRICITY_CONSUMPTION_URL);
     
        if (response && response.data && response.data.consumption) {
            setElectricityConsumption(response.data.consumption);
        }
    };

    return (
        <Card className="cardContainer" style={{width: "49.5%"}}>
            <CardBody 
                className="d-flex flex-column align-items-center justify-content-end" 
                style={{  height: "250px" }}>
                <h6 className="h6-title">ELECTRICITY CONSUMPTION</h6>
                <img className="plug-img" src={plugImage} />
                <span className="consumption-value">{`${electricityConsumption}  kWh`}</span>
            </CardBody>
        </Card>
    );
};

export default ElectricityConsumptionChart;
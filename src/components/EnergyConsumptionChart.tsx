import { Card, CardBody } from "reactstrap";
import OverviewChart from "./OverviewChart";
import EnergyBarChart from "./EnergyBarChart";
import "./styles.css";

const EnergyConsumptionChart = () => {

  return (
        <Card className="cardContainer">
            <CardBody className="d-flex" style={{  height: "350px" }}>
                <div style={{ flex: '0 0 25%' }} className="d-flex justify-content-center">
                    <OverviewChart />
                </div>
                <div style={{ flex: '0 0 75%' }}>
                    <EnergyBarChart />
                </div>
            </CardBody>
        </Card>
    );
};

export default EnergyConsumptionChart;
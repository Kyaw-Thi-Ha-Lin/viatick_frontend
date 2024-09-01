import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
  } from "chart.js";
import ConsumptionChart from "../components/EnergyConsumptionChart";
import ElectricityConsumptionChart from "../components/ElectricityConsumptionChart";
import CarbonFootprintChart from "../components/CarbonFootprintChart";
import WaterLevelChart from "../components/WaterLevelChart";
import WaterUsageChart from "../components/WaterUsageChart";
import RecycleChart from "../components/RecycleChart";
import AbnormalChart from "../components/AbnormalChart";
import WasteCollectionChart from "../components/WasteCollectionChart";

ChartJS.register(
  CategoryScale,
  PointElement,
  LineElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
    return (
      <div className="dashboard-report" style={{ padding: '15px' }}>
        <ConsumptionChart />
        <div className="d-flex mt-3 justify-content-between">
            <ElectricityConsumptionChart />
            <CarbonFootprintChart />
        </div>
        <div className="d-flex mt-3 justify-content-between">
            <WaterLevelChart />
            <WaterUsageChart />
        </div>
        <div className="d-flex mt-3 mb-3 justify-content-between">
            <RecycleChart />
            <WasteCollectionChart />
        </div>
        <AbnormalChart />
      </div>
    );
  };
  
  export default Dashboard;
  
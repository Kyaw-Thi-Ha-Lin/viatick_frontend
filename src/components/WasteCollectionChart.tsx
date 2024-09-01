import { Card, CardBody } from "reactstrap";
import "./styles.css";

const WasteCollectionChart = () => {

  const values = [16.0, 54.3, 92.1, 24.5, 55.0, 11.5];

    return (
        <Card className="cardContainer" style={{width: "49.5%"}}>
            <CardBody 
              style={{  height: "350px" }} 
              className="d-flex align-items-center justify-content-center">
                <div className="text-center">
                  <div className="waste-title">Waste Collection</div>
                  <div className="text-orange">Tonnes</div>
                  <div className="mt-2 mb-3">
                    {values.map((v, k) => (
                      <div key={k} className="border-b border px-5 text-lg">
                        {v}
                      </div>
                    ))}
                  </div>
                  <div className="waste-label">
                    Current month vs <br /> last 3 months average
                  </div>
                  <div className="flex mt-1">
                    <span className="text-bold">21.0</span>{" "}
                    <span className="text-orange">30.65%</span>
                  </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default WasteCollectionChart;
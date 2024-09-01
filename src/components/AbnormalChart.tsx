import { useEffect, useState } from "react";
import { Card, CardBody, Badge, Row, Col } from "reactstrap";
import { ABNORMAL_LIST_URL } from "../services/configuration";
import { AbnormalDataType } from "../services/types";
import { fetchGetData } from "../services";
import "./styles.css";

const AbnormalChart = () => {

    const [
        abnormalData,
        setAbnormalData
    ] = useState<AbnormalDataType[]>();

    useEffect(() => {
        getAbnormalData();
    }, []);
    
    const getAbnormalData = async () => {
        let response = await fetchGetData(ABNORMAL_LIST_URL);

        if (response && response.data) {
            setAbnormalData(response.data);
        }
    };


  return (
        <Card className="cardContainer">
            <CardBody>
                <h6 className="title" style={{paddingBottom: 10}}>ABNORMALITIES</h6>

                {abnormalData && abnormalData.length > 0 && <>
                    {abnormalData.map((data: AbnormalDataType, index: number) => {

                        const {
                            item,
                            status,
                            type,
                            date
                        } = data;

                        return <Col
                            xs={ 12 }
                            key={ index }
                            className="pb-2 pb-md-3">
                            <Card className="cardContainer">
                                <CardBody>
                                <div>
                                    <Row>
                                        <div className="col-12 col-md-3" style={{textAlign: "left"}}>
                                            <span className="asset-name">{item}</span>&nbsp;&nbsp;
                                            <span className="asset-status">
                                                {status ? "Plug is Open" : "Plug is Closed"}
                                            </span>
                                        </div>
                                    <div className="col-12 col-md-2 d-flex align-items-center">
                                        <Badge
                                            pill
                                            color={ "success" }>
                                            {type}
                                        </Badge>
                                    </div>
                                    <div className={"col-12 col-md-4 datetime"}>      
                                        { date }
                                    </div>

                                    <div className="col-12 col-md-3 d-flex align-items-center">
                                        <Badge
                                            pill
                                            color={ status ? "success" : "danger" }>
                                            <span className="badge-text">
                                                {status ? "Plug Open" : "Plug Close"}
                                            </span>
                                        </Badge>
                                    </div>
                                    </Row>
                                </div>
                                </CardBody>
                            </Card>
                        </Col>
                    })}
                </>}

            </CardBody>
        </Card>
    );
};

export default AbnormalChart;
import { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { CARBON_SUMMARY_URL } from "../services/configuration";
import { fetchGetData } from "../services";
import { CarbonDataType, CarbonRangeType } from "../services/types";
import "./styles.css";

const CarbonFootprintChart = () => {

    const [
        carbonFootprintData, 
        setCarbonFootprintData
    ] = useState<CarbonDataType>();

    useEffect(() => {
        getCarbonFootprintData();
    }, []);
    
    const getCarbonFootprintData = async () => {
        let response = await fetchGetData(CARBON_SUMMARY_URL);
        if (response && response.data) {
            setCarbonFootprintData(response.data);
            console.log("setCarbonFootprintData>> ", JSON.stringify(response.data));
            
        }
    };

    const calculateCurrentCarbonPosition = (min: number, max: number, value: number): number => {
        return ((value - min) / (max - min)) * 100;
    }

    const maxRange = carbonFootprintData?.carbonData?.categories?.high?.max ?  carbonFootprintData?.carbonData?.categories?.high?.max : 50;
    const minRange = carbonFootprintData?.carbonData?.categories?.low?.min ? carbonFootprintData?.carbonData?.categories?.low?.min : 0;
    const totalRange = maxRange - minRange;

    let currentCarbonLevel = carbonFootprintData?.percentage ? carbonFootprintData.percentage : 25;
    currentCarbonLevel = currentCarbonLevel > maxRange ? 25 : currentCarbonLevel;

    const calculateWidth = (category: CarbonRangeType) => {
        return ((category.max - category.min) / totalRange) * 100;
    };

    return (
        <Card className="cardContainer" style={{width: "49.5%"}}>
            <CardBody 
                className="d-flex flex-column align-items-center justify-content-end" 
                style={{  height: "250px" }}>

                <h6 className="h6-title">CARBON FOOTPRINT</h6>

                <div style={{width: "85%", height:"80%", paddingTop: 15}}>
                    <div
                        className="d-flex"
                        style={ { height: "148px" } }>

                        <div className="h6 pt-3 pe-2">
                            Negligible
                        </div>
                        
                        <div style={{width: "75%"}}>
                            {carbonFootprintData &&  <div style={{ position: 'relative', display: 'flex', width: '100%'}}>
                                <div
                                    style={{
                                    position: 'absolute',
                                    top: '-15px',
                                    left: `${calculateCurrentCarbonPosition(minRange, maxRange, currentCarbonLevel)}%`,
                                    backgroundColor: '#000',
                                    color: '#fff',
                                    padding: '2px 11px',
                                    borderRadius: "50px",
                                    borderBottomLeftRadius: '0px',
                                    fontSize: 15
                                    }}>
                                    {currentCarbonLevel}
                                </div>

                                <div
                                    style={{
                                    width: `${calculateWidth(carbonFootprintData?.carbonData.categories.low)}%`,
                                    height: 50,
                                    textAlign: 'center',
                                    padding: '10px',
                                    borderTopLeftRadius: 30,
                                    borderBottomLeftRadius: 30,
                                    background: "linear-gradient(to right, #b1f2bd, #ebdb8a)",
                                    borderRightWidth: 1,
                                    borderRightColor:"#fff",
                                    borderRightStyle: "solid", 
                                    }} />
                                <div
                                    style={{
                                    width: `${calculateWidth(carbonFootprintData.carbonData.categories.medium)}%`,
                                    height: 50,
                                    textAlign: 'center',
                                    padding: '10px',
                                    background: "linear-gradient(to right, #ebdb8a, #edc5a8)",
                                    borderRightWidth: 1,
                                    borderRightColor:"#fff",
                                    borderRightStyle: "solid", 
                                    }} />
                                <div
                                    style={{
                                    width: `${calculateWidth(carbonFootprintData.carbonData.categories.high)}%`,
                                    background: "linear-gradient(to right, #edc5a8, #f2ab9b)",
                                    height: 50,
                                    textAlign: 'center',
                                    padding: '10px',
                                    borderTopRightRadius: 30,
                                    borderBottomRightRadius: 30
                                    }} />
                            </div>}

                            {carbonFootprintData &&  <div style={{ display: 'flex', width: '100%' }}>
                                <div
                                    style={{
                                    width: `${calculateWidth(carbonFootprintData.carbonData.categories.low)}%`,
                                    textAlign: 'center',
                                    fontSize: 13,
                                    fontWeight: 'bold',
                                    paddingTop: 2
                                    }}>
                                    Low<br></br>
                                    <span
                                        style={{
                                            fontSize: 13,
                                            paddingTop: 2,
                                            fontWeight: 'normal'
                                        }}>
                                        {carbonFootprintData.carbonData.categories.low.min} - {carbonFootprintData.carbonData.categories.low.max}
                                    </span>
                                </div>
                                <div
                                    style={{
                                    width: `${calculateWidth(carbonFootprintData.carbonData.categories.medium)}%`,
                                    textAlign: 'center',
                                    fontSize: 13,
                                    fontWeight: 'bold',
                                    paddingTop: 2
                                    }}>
                                    Medium
                                    <br></br>
                                    <span
                                        style={{
                                            fontSize: 13,
                                            paddingTop: 2,
                                            fontWeight: 'normal'
                                        }}>
                                        {carbonFootprintData.carbonData.categories.medium.min} - {carbonFootprintData.carbonData.categories.medium.max}
                                    </span>
                                </div>
                                <div
                                    style={{
                                    width: `${calculateWidth(carbonFootprintData.carbonData.categories.high)}%`,

                                    textAlign: 'center',
                                    fontSize: 13,
                                    fontWeight: 'bold',
                                    paddingTop: 2
                                    }}>
                                    High<br></br>
                                    <span
                                        style={{
                                            fontSize: 13,
                                            paddingTop: 2,
                                            fontWeight: 'normal'
                                        }}>
                                        {carbonFootprintData.carbonData.categories.high.min} - {carbonFootprintData.carbonData.categories.high.max}
                                    </span>
                                </div>
                            </div>}
                        </div>
                        <div className="flex h6 pt-3 ps-2">
                            Severe
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default CarbonFootprintChart;
import { Card, Col, Row, Select } from "antd";
import React from "react";
import InternshipChart from "./InternshipChart";
import InterningChart from "./InterningChart";
import InternedChart from "./InternedChart";

const Dashboard = () => {

  const monthOptions = [
    { label: 'All Months', value: 'all' },
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];
  function generateYearOptions() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 10;
    const endYear = currentYear + 10;
  
    const yearOptions = [];
  
    for (let year = startYear; year <= endYear; year++) {
      yearOptions.push({ value: year.toString(), label: year.toString() });
    }
  
    return yearOptions;
  }
  return (
    <div>
      <Row justify="space-around">
        <Col span={4}>
          <Card
            headStyle={{
              borderBottom: "0",
              fontSize: "250%",
              fontWeight: "bold",
            }}
            style={{ border: " 3px solid purple", textAlign: "center", height:"100%" }}
            bodyStyle={{ padding: "15px" }}
            title="200"
          >
            Total students received CV
          </Card>
        </Col>
        <Col span={4}>
          <Card
            headStyle={{
              borderBottom: "0",
              fontSize: "250%",
              fontWeight: "bold",
            }}
            style={{ border: " 3px solid purple", textAlign: "center", height:"100%" }}
            bodyStyle={{ padding: "15px" }}
            title="200"
          >
            Total students interviewed{" "}
          </Card>
        </Col>
        <Col span={4}>
          <Card
            headStyle={{
              borderBottom: "0",
              fontSize: "250%",
              fontWeight: "bold",
            }}
            style={{ border: " 3px solid purple", textAlign: "center", height:"100%" }}
            bodyStyle={{ padding: "15px" }}
            title="200"
          >
            Total students passed{" "}
          </Card>
        </Col>
        <Col span={4}>
          <Card
            headStyle={{
              borderBottom: "0",
              fontSize: "250%",
              fontWeight: "bold",
            }}
            style={{ border: " 3px solid purple", textAlign: "center", height:"100%" }}
            bodyStyle={{ padding: "15px" }}
            title="200"
          >
            Total students interning{" "}
          </Card>
        </Col>
        <Col span={4}>
          <Card
            headStyle={{
              borderBottom: "0",
              fontSize: "250%",
              fontWeight: "bold",
            }}
            style={{ border: " 3px solid purple", textAlign: "center", height:"100%" }}
            bodyStyle={{ padding: "15px" }}
            title="200"
          >
            Total students interned{" "}
          </Card>
        </Col>
      </Row>

      <Row style={{marginTop:"10px"}}>
        <Col span={11}>
        <InternshipChart/>
        </Col>
        <Col span={11}>
            <Row justify="end">
              <Col span={4}>
                <Select style={{width:"90%"}} options={monthOptions} defaultValue={"01"}></Select>
              </Col>
              <Col span={4}>
                <Select style={{width:"90%"}} defaultValue={"2024"} options={generateYearOptions()}></Select>
              </Col>
            </Row>
        </Col>
      </Row>
      <Row style={{marginTop:"10px"}}>
        <Col span={11}>
        <InterningChart/>
        </Col>
        <Col span={11} offset={2}>
        <InternedChart/>
        </Col>
      </Row>
      <Row style={{marginTop:"20px"}} justify="center">Number of students interning in year 2023 by schools</Row>
    </div>
  );
};

export default Dashboard;

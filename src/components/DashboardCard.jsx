import { Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col } from "reactstrap";

const DashboardCard = ({ icon, iconColor, title, value, footerText, footerIcon }) => {
    return (
        <>
        <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className={`icon-big text-center ${iconColor}`}>
                      <i className={icon} />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                        <p className="card-category">{title}</p>
                        <CardTitle tag="p">{ value }</CardTitle>
                        <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className={footerIcon} /> {footerText}
                </div>
              </CardFooter>
            </Card>
        </Col>
        </>
    );
}

export default DashboardCard;
import React from "react";
import { Alert, Button, Col, Container, Row, Table } from "reactstrap";

// add custom types to model data
type ViewComponentProps = {
  patients: any[];
  type: string;
  error: boolean;
};

function ViewComponent({
  patients,
  type,
  error,
}: ViewComponentProps): React.ReactElement {
  const [hideView, setHideView] = React.useState(false);
  // change string literals to enums
  return (
    <Container>
      <Row>
        <Col>
          <h4>{type === "event" ? "Event Code" : "Code Category"}</h4>
        </Col>
        <Col>
          {!error && (
            <Button
              tag="button"
              color={!hideView ? "info" : "success"}
              size="large"
              style={{ marginLeft: "2em", marginBottom: "2em" }}
              onClick={(e) => setHideView(!hideView)}
            >
              {!hideView ? "Close" : "Open"}
            </Button>
          )}
        </Col>
      </Row>
      {error && (
        <Alert color="danger">
          {type === "event"
            ? "Error loading event code data"
            : "Error loading code category data"}
        </Alert>
      )}
      {!error && patients.length <= 0 && !hideView && (
        <Alert color="info">Nothing to see here! Select an search above.</Alert>
      )}
      {!error && patients.length >= 1 && !hideView && (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Patient Name</th>
              <th>Patient Age</th>
              <th>Event Code</th>
              <th>Event Date</th>
              <th>Code Category</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => {
              return (
                <tr key={patient + index}>
                  <th scope="row">1</th>
                  <td>{patient.patient_name}</td>
                  <td>{patient.patient_age}</td>
                  <td>{patient.event_code}</td>
                  <td>{patient.event_date}</td>
                  <td>{patient.code_category}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ViewComponent;

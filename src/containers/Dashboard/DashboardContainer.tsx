import React from "react";
import SearchComponent from "../../components/About/Patient/SearchComponent";
import ViewComponent from "../../components/About/Patient/ViewComponent";
import { getAllPatients, getTestApi } from "../../apis/resources/patients";
import { Alert, Button } from "reactstrap";

type DashboardContainerProps = { title?: string };

function DashboardContainer({
  title = "Dashboard | Erion",
}: DashboardContainerProps): React.ReactElement {
  const [patients, setPatients] = React.useState([]);
  const [eventPatients, setEventPatients] = React.useState([]);
  const [categoryPatients, setCategoryPatients] = React.useState([]);
  const [hideView, setHideView] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("no issues");

  // set title
  React.useEffect(() => {
    document.title = title;
  });

  // retrieve data from api
  // test api connection
  React.useEffect(() => {
    getTestApi().then((resp) => console.log(resp));
  }, []);

  // GET /patient/all
  React.useEffect(() => {
    getAllPatients()
      .then((resp) => {
        setPatients(resp);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <SearchComponent
        handleEvent={eventDropdown}
        handleCategory={categoryDropdown}
        eventCodes={["D234", "D456", "L122", "L223", "M222", "M333"]}
        categories={["A", "B", "C", "D"]}
      />
      {error && <Alert color="danger">{errorMsg}</Alert>}
      <Button
        tag="button"
        color="success"
        size="large"
        style={{ marginLeft: "2em", marginBottom: "2em" }}
        onClick={(e) => setHideView(!hideView)}
      >
        {!hideView ? "Hide View" : "Display View"}
      </Button>
      {!hideView && <ViewComponent patients={eventPatients} type="event" />}
      {!hideView && (
        <ViewComponent patients={categoryPatients} type="category" />
      )}
    </React.Fragment>
  );

  function eventDropdown(eventCode: string) {
    try {
      setEventPatients(
        patients.filter((patient) => patient.event_code === eventCode)
      );
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMsg("Patients data was not fetched from API");
    }
  }

  function categoryDropdown(category: string) {
    try {
      setCategoryPatients(
        patients.filter((patient) => patient.code_category === category)
      );
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMsg("Patients data was not fetched from API");
    }
  }

  // utility function I may use
  // function onlyUnique(value, index, self) {
  //   return self.indexOf(value) === index;
  // }
}

export default DashboardContainer;

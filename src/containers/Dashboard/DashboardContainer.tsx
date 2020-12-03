import React from "react";
import SearchComponent from "../../components/About/Patient/SearchComponent";
import ViewComponent from "../../components/About/Patient/ViewComponent";
import { getAllPatients, getTestApi } from "../../apis/resources/patients";
import { Alert } from "reactstrap";

type DashboardContainerProps = { title?: string };

function DashboardContainer({
  title = "Dashboard | Erion",
}: DashboardContainerProps): React.ReactElement {
  const [patients, setPatients] = React.useState([]);
  const [eventPatients, setEventPatients] = React.useState([]);
  const [categoryPatients, setCategoryPatients] = React.useState([]);
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
        eventCodes={["D234", "D456", "L123", "L222", "M222", "M333"]}
        categories={["A", "B", "C", "D"]}
      />
      {error && <Alert color="danger">{errorMsg}</Alert>}
      <ViewComponent patients={eventPatients} type="event" />
      <ViewComponent patients={categoryPatients} type="category" />
    </React.Fragment>
  );

  function eventDropdown(eventCode: string) {
    try {
      console.log(eventCode);
      setEventPatients(
        patients.filter((patient) => patient.event_code === eventCode)
      );
    } catch (error) {
      // attempt api call for /patient/eventCode/${eventCode} endpoint
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
      // attempt api call for /patient/category?${category} endpoint
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

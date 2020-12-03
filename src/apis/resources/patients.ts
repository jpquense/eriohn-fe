import eriohn from "../eriohn";

// Test Server
export function getTestApi(): Promise<any> {
  return eriohn
    .get("/")
    .then((resp) => resp.data)
    .catch((err) => err);
}
// GET /all
export function getAllPatients(): Promise<any> {
  return eriohn
    .get("/patient/all")
    .then((resp) => resp.data)
    .catch((err) => err);
}
// GET /event_code
export function getPatientByEventCode(eventCode: string): Promise<any> {
  return eriohn
    .get(`/patient/code/${eventCode}`)
    .then((resp) => resp.data)
    .catch((err) => err);
}

// GET /code_category
export function getPatientByCategory(category: string): Promise<any> {
  return eriohn
    .get(`/patient/code/${category}`)
    .then((resp) => resp.data)
    .catch((err) => err);
}

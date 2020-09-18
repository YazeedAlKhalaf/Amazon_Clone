import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://us-central1-amzn-clone-yazeed-alkhalaf.cloudfunctions.net/api", // THE API (cloud function) url
});

export default instance;

// URLs
// LOCAL: http://localhost:5001/amzn-clone-yazeed-alkhalaf/us-central1/api
// PROD: https://us-central1-amzn-clone-yazeed-alkhalaf.cloudfunctions.net/api

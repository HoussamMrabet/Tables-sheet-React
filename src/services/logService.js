//1 import * as Sentry from '@sentry/browser';

//2 import Raven from "raven-js";

function init() {
  //1 Sentry.init({dsn: "https://d2df9a7d37914f65885e0d2c949123ac@sentry.io/1502050"});

  //2 Raven.config("ADD YOUR OWN API KEY", {
  //   release: "1.0.0",
  //   environment: "development-test"
  // }).install();
}

function log(error) {
  //1 Sentry.captureException(error);

  //2 Raven.captureException(error);
  
  console.error(error);
}

export default {
  init,
  log
}
class ConfigurationError extends Error {
  constructor(...params) {
    super(...params);
  }
}

const NOT_STARTED = "NOT_STARTED";
const PENDING = "PENDING";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";


class QueryObject extends Object {

  constructor(data) {
    super(data);
    if (data.apiParams && data.apiParams.constructor.name !== "Object") {
      throw new ConfigurationError("api params must be a plain object");
    }
    if (!data.api) {
      throw new ConfigurationError("API class must be provided");
    }
    if (!data.api.reduxDataType || data.api.reduxDataType.toString() !== data.api.reduxDataType) {
      throw new ConfigurationError("redux data type must be provided and must be a string");
    }
    this.apiParams = data.apiParams || {};
    this.reduxDataType = data.api.reduxDataType;
    this.api = data.api;

    this.result = null;
    this.error = null;
    this.status = NOT_STARTED;
    this.request = null;
  }
  initializeRequest() {
    this.status = PENDING;
    this.request = this.api.query(this.apiParams).then(
      response => {
        this.result = response.data
        this.status = SUCCESS;
      }
    ).catch(
      error => {
        this.status = ERROR;
        this.error = error;
      }
    );
  }
  retrieveResult() {
    if (this.status === NOT_STARTED || this.status === PENDING) {
      throw this.request;
    }
    if (this.status === SUCCESS) {
      return this.result;
    }
    if (this.status === ERROR) {
      throw this.error;
    }
    throw new ConfigurationError("Internal request status invalid");
  }
}

export default QueryObject;

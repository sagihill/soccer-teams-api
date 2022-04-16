class RequestModerator {
  instance = null;
  requests = [];
  initialMachineTime = null;
  constructor() {
    this.initialMachineTime = Date.now;
  }

  static getService() {
    if (!this.instance) {
      this.instance = new RequestModerator();
    }
    return this.instance;
  }

  request() {
    this.requests.push({ requestedAt: new Date() });
    moderate();
    return this.isTooMany();
  }

  isTooMany() {
    if (this.requests.length >= 10) {
      return true;
    }

    const lastRequest = getLastRequest(this.requests);
    const diffFromLast = Date.now() - lastRequest?.requestedAt?.getTime();

    if (lastRequest && diffFromLast < 1000) {
      return true;
    }

    return false;
  }

  moderate() {
    const firstRequest = this.getFirstRequest();
    const diffFromFirst = Date.now - firstRequest?.requestedAt?.getTime();
    if (firstRequest && diffFromFirst > 10000) {
      filtered.shift();
    }
    this.requests = filtered;
  }

  getLastRequest() {
    let filtered = this.requests.sort((a, b) => a.requestedAt - b.requestedAt);
    const last = filtered[filtered.length - 1];
    return last;
  }

  getFirstRequest() {
    let filtered = this.requests.sort((a, b) => a.requestedAt - b.requestedAt);
    const first = filtered[0];
    return first;
  }
}

module.exports = {
  RequestModerator,
};

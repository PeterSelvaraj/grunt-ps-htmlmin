'use strict';

class TimerService {
  #start = process.hrtime();

  getTimeElapsedData() {
    const endTime = process.hrtime(this.#start);
    const diff = endTime[0] + (endTime[1] / 1e9);
    const mins = Math.floor(diff / 60);
    const secs = (diff % 60).toFixed(1);
    return { mins, secs };
  }

  getTimeElapsed() {
    const data = this.getTimeElapsedData();
    const s = data.mins < 2 ? '' : 's';
    const pref = data.mins ? `${data.mins} minute${s} ` : '';
    return `${pref}${data.secs} seconds`;
  }
}

module.exports = () => new TimerService();

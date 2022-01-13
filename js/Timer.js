export default class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();
    console.log(Timer.getHTML());
    this.el = {
      minutes: root.querySelector(".timer__part--minute"),
      seconds: root.querySelector(".timer__part--second"),
      control: root.querySelector(".timer__btn--control"),
      reset: root.querySelector(".timer__btn--reset"),
    };
    console.log(this.el);
    this.interval = null;
    this.remainingSeconds = 90;
    this.start();
    this.stop();
    this.updateInterfaceTime();

    this.updateInterfaceControl();

    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });
    this.el.reset.addEventListener("click", () => {
      const inputMinutes = prompt("Enter number of Minutes:");
      if (inputMinutes < 60) {
        this.stop();
        this.remainingSeconds = inputMinutes * 60;
        this.updateInterfaceTime();
      }
    });
  }

  start() {
    if (this.remainingSeconds === 0) return;
    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        this.stop();
      }
    }, 1000);
    this.updateInterfaceControl();
  }
  stop() {
    clearInterval(this.interval);
    this.interval = null;
    this.updateInterfaceControl();
  }

  /****start the function for counting the timer  ****/

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    // this.el.minutes.textContent = minutes.toString();
    // this.el.seconds.textContent = seconds.toString();

    //N.b: here `toString().padStart(2, '0')` is used to convert the number to string & give the timer 2 digit number and "0", is used to put this befor any number in timers.

    console.log(minutes, seconds);
  }

  updateInterfaceControl() {
    if (this.interval === null) {
      this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
      this.el.control.classList.add("timer__btn--start");
      this.el.control.classList.remove("timer__btn--stop");
    } else {
      this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
      this.el.control.classList.add("timer__btn--stop");
      this.el.control.classList.remove("timer__btn--start");
    }
  }

  /****end the function for counting the timer end ****/

  static getHTML() {
    return `
         <span class="timer__part timer__part--minute">00</span>
        <span class="timer__part">:</span>
        <span class="timer__part timer__part--second">00</span>
        <button type="button" class="timer__btn timer__btn--control timer__btn--start">
            <span class="material-icons">play_arrow</span>
        </button>
        <button type="button" class="timer__btn timer__btn--reset">
            <span class="material-icons">timer</span>
        </button> `;
  }
}

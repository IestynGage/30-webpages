class TodaysLuck extends HTMLElement {

  connectedCallback() {
    // const now = new Date();
    const shadow = this.attachShadow({ mode: 'open' });
    this
    // this.textContent = now.toLocaleDateString();
    setTimeout(elipsesNumber)
  }

   elipses(elipsesNumber) {
    this.textContent =  "...";
  }
}

// Register the CurrentDate component using the tag name <current-date>.
customElements.define('today-luck', TodaysLuck);

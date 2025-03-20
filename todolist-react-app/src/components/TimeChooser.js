import { LitElement, html, css } from 'lit';

class TimeChooser extends LitElement {
  static styles = css`
    .time-picker {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-right: 5px;
      font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    select, button {
      padding: 5px;
      font-size: large;
      border: 2px solid black;
      background-color: #eee;
      border-radius: 5px;
      font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
  `;

  static properties = {
    hour: { type: Number },
    minute: { type: Number },
    ampm: { type: String }
  };

  constructor() {
    super();
    this.hour = 12; // Default hour
    this.minute = 0; // Default minute
    this.ampm = 'AM'; // Default AM/PM
  }

  handleTimeChange(e, type) {
    if (type === 'hour') this.hour = Number(e.target.value);
    else if (type === 'minute') this.minute = Number(e.target.value);
    else if (type === 'ampm') this.ampm = e.target.value;
    this.dispatchEvent(new CustomEvent('time-change', { detail: { hour: this.hour, minute: this.minute, ampm: this.ampm } }));
  }

  render() {
    return html`
      <div class="time-picker">
        <select @change="${e => this.handleTimeChange(e, 'hour')}">
          ${Array.from({ length: 12 }, (_, i) => i + 1).map(hour => html`<option ?selected="${hour === this.hour}">${hour}</option>`)}
        </select>
        :
        <select @change="${e => this.handleTimeChange(e, 'minute')}">
          ${Array.from({ length: 60 }, (_, i) => html`<option ?selected="${i === this.minute}">${i.toString().padStart(2, '0')}</option>`)}
        </select>
        <select @change="${e => this.handleTimeChange(e, 'ampm')}">
          <option ?selected="${this.ampm === 'AM'}">AM</option>
          <option ?selected="${this.ampm === 'PM'}">PM</option>
        </select>
      </div>
    `;
  }
}

customElements.define('time-picker', TimeChooser);

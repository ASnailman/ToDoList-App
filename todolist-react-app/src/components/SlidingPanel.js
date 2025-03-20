import { LitElement, html, css } from 'lit';

class SlidingPanel extends LitElement {
  static styles = css`
    .panel {
      position: fixed;
      top: 0;
      left: 0;
      width: 300px;
      height: 100%;
      background-color: #333;
      color: white;
      box-shadow: 5px 0 15px rgba(0, 0, 0, 0.3);
      transform: translateX(-100%); /* Initially hidden */
      transition: transform 0.3s ease;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      display: flex;
      flex-direction: column;
      padding: 20px;
    }

    .panel.visible {
      transform: translateX(0); /* Slide in */
    }

    .close-btn {
      align-self: flex-end;
      background-color: #ff5f5f;
      border: none;
      color: white;
      padding: 10px 15px;
      font-size: 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .close-btn:hover {
      background-color: #d94b4b;
    }
  `;

  static properties = {
    visible: { type: Boolean }, // Control visibility
  };

  constructor() {
    super();
    this.visible = false; // Default hidden
  }

  toggleVisibility() {
    this.visible = !this.visible;
    this.dispatchEvent(new CustomEvent('visibility-changed', { detail: { visible: this.visible } }));
  }

  render() {
    return html`
      <div class="panel ${this.visible ? 'visible' : ''}">
        <button class="close-btn" @click="${this.toggleVisibility}">Close</button>
        <slot></slot> <!-- Content can be added dynamically -->
      </div>
    `;
  }
}

customElements.define('sliding-panel', SlidingPanel);

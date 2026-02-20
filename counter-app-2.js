/**
 * Copyright 2026 interested-learner
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app-2`
 * 
 * @demo index.html
 * @element counter-app-2
 */
export class CounterApp2 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app-2";
  }

  constructor() {
    super();
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.count = 0;
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app-2.ar.json", import.meta.url).href +
        "/../",
    });
    this.minimum = -10;
    this.maximum = 25;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      count: { type: Number, reflect: true },
      minimum: { type: Number },
      maximum: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      :host([count="18"]) h3 {
      color: var(--ddd-theme-default-keystoneYellow); 
      }
      :host([count="21"]) h3 {
        color: var(--ddd-theme-default-beaverBlue);
      }
      :host([count="-10"]) h3 {
        color: var(--ddd-theme-default-original87Pink);
      }
      :host([count="25"]) h3 {
        color: var(--ddd-theme-default-original87Pink);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 {
        font-size: var(--counter-app-2-label-font-size, var(--ddd-font-size-xl));
      }
      button {
        margin: var(--ddd-spacing-1);
        padding: var(--ddd-spacing-2);
        font-size: var(--counter-app-2-button-font-size, var(--ddd-font-size-lg));
        background-color: var(--ddd-theme-default-accent);
        border: none;
        cursor: pointer;
      }

      button:hover{
        background-color: var(--ddd-theme-default-keystoneYellow);
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<confetti-container id="confetti">
  <div class="wrapper">
    <h3>${this.count}</h3>
    <button @click="${this.decrement}" ?disabled="${this.minimum === this.count}">-</button>
    <button @click="${this.increment}" ?disabled="${this.maximum === this.count}">+</button>
    <slot></slot>
  </div>
</confetti-container>
    `;
  }

  //this adds 1 to the count if the count is less than the maximum value
  increment() {
    if (this.count < this.maximum) {
      this.count++;
    }
  }

  //this subtracts 1 from the count if the count is greater than the minimum value
  decrement() {
    if (this.count > this.minimum) {
      this.count--;
    }
  }


  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has('count')) {
      if(this.count === 18) {
        this.makeItRain();
      }
      // do your testing of the value and make it rain by calling makeItRain
    }
  }

  makeItRain() {
    // this is called a dynamic import. It means it won't import the code for confetti until this method is called
    // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
    // will only run AFTER the code is imported and available to us
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        // This is a minor timing 'hack'. We know the code library above will import prior to this running
        // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
        // this "hack" ensures the element has had time to process in the DOM so that when we set popped
        // it's listening for changes so it can react
        setTimeout(() => {
          // forcibly set the poppped attribute on something with id confetti
          // while I've said in general NOT to do this, the confetti container element will reset this
          // after the animation runs so it's a simple way to generate the effect over and over again
          this.shadowRoot.querySelector("confetti-container").setAttribute("popped", "");
        }, 0);
      }
    );
  }
}

globalThis.customElements.define(CounterApp2.tag, CounterApp2);
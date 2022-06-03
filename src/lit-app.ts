import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('lit-app')
export class LitApp extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    @property() name = 'Lit App';
    @state() count = 0;
    @state() isDisabled = false;

    increment() {
        this.count++;
        if (this.count > 0) {
            this.isDisabled = false;
        }
    }

    decrement() {
        if(this.count > 0) {
            this.count--;
        }
        if (this.count === 0) {
            this.isDisabled = true;
        }
    }
    
    render() {
        return html`<h1>Hello, ${this.name}</h1>
            <p>Count: ${this.count}</p>
            <button @click=${this.increment}>Increment</button>
            <button ?disabled=${this.isDisabled} @click=${this.decrement}>Decrement</button>
        `;
    }
}

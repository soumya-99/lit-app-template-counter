import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Hct } from '@material/material-color-utilities';
import { argbFromHex, themeFromSourceColor, applyTheme } from "@material/material-color-utilities";

@customElement('lit-app')
export class LitApp extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                height: 100vh;
                width: 100vw;
                background-color: var(--md-sys-color-primary);
                color: var(--md-sys-color-on-primary);
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
        if (this.count > 0) {
            this.count--;
        }
        if (this.count === 0) {
            this.isDisabled = true;
        }
    }

    render() {

        const color = Hct.fromInt(0xff4285f4);
        console.log(`Hue: ${color.hue}`);
        console.log(`Chrome: ${color.chroma}`);
        console.log(`Tone: ${color.tone}`);


        // Get the theme from a hex color
        const theme = themeFromSourceColor(argbFromHex('#00ffff'), [
            {
                name: "custom-1",
                value: argbFromHex("#ff0000"),
                blend: true,
            },
        ]);

        // Print out the theme as JSON
        console.log(JSON.stringify(theme, null, 2));

        // Check if the user has dark mode turned on
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        // Apply the theme to the body by updating custom properties for material tokens
        applyTheme(theme, { target: document.body, dark: systemDark });


        return html`<h1>Hello, ${this.name}</h1>
            <p>Count: ${this.count}</p>
            <button @click=${this.increment}>Increment</button>
            <button ?disabled=${this.isDisabled} @click=${this.decrement}>Decrement</button>
        `;
    }
}

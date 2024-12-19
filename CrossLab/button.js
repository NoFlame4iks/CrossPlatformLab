// Custom Button Class in JavaScript
class Button {
    /**
     * A custom button class that simulates basic functionality of a standard button.
     * @param {string} label - The text displayed on the button.
     * @param {number} width - Width of the button in pixels.
     * @param {number} height - Height of the button in pixels.
     * @param {string} backgroundColor - Background color of the button.
     * @param {string} textColor - Text color of the button.
     * @param {string} borderColor - Border color of the button.
     * @param {number} borderRadius - Border radius of the button in pixels.
     */
    constructor({
                    label = "Button",
                    width = 100,
                    height = 50,
                    backgroundColor = "gray",
                    textColor = "white",
                    borderColor = "black",
                    borderRadius = 5
                } = {}) {
        this.label = label;
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.textColor = textColor;
        this.borderColor = borderColor;
        this.borderRadius = borderRadius;
        this.isPressed = false;
        this.element = null;
    }

    /**
     * Render the button into the DOM.
     * @param {HTMLElement} parent - The parent element to which the button will be appended.
     */
    render(parent) {
        // Create button element
        this.element = document.createElement("button");
        this.element.textContent = this.label;

        // Apply styles
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.backgroundColor = this.backgroundColor;
        this.element.style.color = this.textColor;
        this.element.style.border = `2px solid ${this.borderColor}`;
        this.element.style.borderRadius = `${this.borderRadius}px`;
        this.element.style.cursor = "pointer";
        this.element.style.fontSize = "16px";
        this.element.style.textAlign = "center";
        this.element.style.transition = "background-color 0.3s, transform 0.2s";

        // Add hover effect
        this.element.addEventListener("mouseover", () => {
            this.element.style.backgroundColor = this.darkenColor(this.backgroundColor, 0.8);
        });
        this.element.addEventListener("mouseout", () => {
            this.element.style.backgroundColor = this.backgroundColor;
        });

        // Add click effect
        this.element.addEventListener("mousedown", () => {
            this.isPressed = true;
            this.element.style.transform = "scale(0.95)";
        });
        this.element.addEventListener("mouseup", () => {
            this.isPressed = false;
            this.element.style.transform = "scale(1)";
            console.log(`Button '${this.label}' clicked!`);
        });

        // Append to parent
        parent.appendChild(this.element);
    }

    /**
     * Darken a color by a given factor.
     * @param {string} color - The original color in hex format.
     * @param {number} factor - The factor by which to darken the color.
     * @returns {string} - The darkened color in hex format.
     */
    darkenColor(color, factor) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        const darken = (channel) => Math.max(0, Math.min(255, Math.floor(channel * factor)));

        const newColor = `#${darken(r).toString(16).padStart(2, "0")}` +
            `${darken(g).toString(16).padStart(2, "0")}` +
            `${darken(b).toString(16).padStart(2, "0")}`;
        return newColor;
    }

    /**
     * Update the button's label.
     * @param {string} newLabel - The new label for the button.
     */
    updateLabel(newLabel) {
        this.label = newLabel;
        if (this.element) {
            this.element.textContent = this.label;
        }
    }

    /**
     * Update the button's styles.
     * @param {Object} styles - An object containing the new styles.
     */
    updateStyles(styles) {
        Object.assign(this, styles);
        if (this.element) {
            this.render(this.element.parentElement);
        }
    }
}

// Example Usage
function testButton() {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "10px";
    container.style.padding = "20px";
    document.body.appendChild(container);

    // Create buttons
    const button1 = new Button({ label: "Submit", backgroundColor: "#4CAF50" });
    const button2 = new Button({ label: "Cancel", width: 120, backgroundColor: "#F44336" });
    const button3 = new Button({ label: "More Info", width: 150, height: 60, backgroundColor: "#2196F3" });

    // Render buttons
    button1.render(container);
    button2.render(container);
    button3.render(container);

    // Update styles dynamically
    setTimeout(() => {
        button1.updateLabel("Confirmed");
        button1.updateStyles({ backgroundColor: "#FFC107" });
    }, 3000);
}

document.addEventListener("DOMContentLoaded", testButton);
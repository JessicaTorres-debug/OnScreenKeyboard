const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false
  },

  init() {
    const { elements: { main, keysContainer, keys }, _createKeys } = this;

    // Create the main elements
    main = document.createElement("div");
    keysContainer = document.createElement("div");

    // Setup main elements
    main.classList.add("keyboard", "keyboard--hidden");
    keysContainer.classList.add("keyboard__keys");

    keys = keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    main.appendChild(keysContainer);
    document.body.appendChild(main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },

  open(initialValue, oninput, onclose) {
    const { properties: { value }, eventHandlers: { oninput, onclose }, elements: { main } } = this;

    value = initialValue || "";
    oninput = oninput;
    onclose = onclose;

    main.classList.remove("keyboard--hidden");
  },

  close() {
    const { properties: { value }, eventHandlers: { oninput, onclose }, elements: { main } } = this;

    value = "";
    oninput = oninput;
    onclose = onclose;

    main.classList.add("keyboard--hidden");
  },

}

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});

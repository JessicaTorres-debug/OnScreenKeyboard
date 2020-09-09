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
    keysContainer.appendChild(_createKeys());

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

  _createKeys() {
    const { properties: { value, capsLock }, close,  _triggerEvent, _toggleCapsLock } = this;

    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
      "space"
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");
          keyElement.addEventListener("click", () => {
            value = value.substring(0, value.length - 1);
            _triggerEvent("oninput");
          });
          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          keyElement.addEventListener("click", () => {
            _toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", capsLock);
          });
          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");
          keyElement.addEventListener("click", () => {
            value += "\n";
            _triggerEvent("oninput");
          });
          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");
          keyElement.addEventListener("click", () => {
            value += " ";
            _triggerEvent("oninput");
          });
          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");
          keyElement.addEventListener("click", () => {
            close();
            _triggerEvent("onclose");
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", () => {
            value += capsLock ? key.toUpperCase() : key.toLowerCase();
            _triggerEvent("oninput");
          });
          break;
      }
      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
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

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
    main = document.createElement('div');
    keysContainer = document.createElement('div');

  },

}

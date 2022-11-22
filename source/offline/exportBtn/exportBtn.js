// exportBtn.js

class ExportBtn extends HTMLElement {
    // Called once when document.createElement('export-button') is called, or
    // the element is written into the DOM directly as <export-button>
    constructor() {
      super();

      let shadow = this.attachShadow({mode:'open'});
    }
  }
  
  // Define the ExportBtn Class as customElement 'export-button'
  customElements.define("export-button", ExportBtn);
  
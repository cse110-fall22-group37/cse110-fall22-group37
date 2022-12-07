// exportBtn.js

/**
 * ExportBtn is a class representing the export button
 * @extends HTMLElement
 */
class ExportBtn extends HTMLElement {
	/**
     * @constructor constructs the exportBtn element
     * @description Called once when document.createElement('export-button') is called, or
     * the element is written into the DOM directly as <export-button>
     * Attaches the ShadowDOM to the element
     */
	constructor() {
		super()
		let shadow = this.attachShadow({mode:"open"})
	}
}
  
/**
   * Define the ExportBtn Class as customElement 'export-button'
   */
customElements.define("export-button", ExportBtn)
  

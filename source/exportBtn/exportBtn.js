// exportBtn.js

/**
 * ExportBtn is a class representing the export button
 * @extends HTMLElement
 */
class ExportBtn extends HTMLElement {
	/**
   	 * generates a export btn element
   	 * @constructor
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
  

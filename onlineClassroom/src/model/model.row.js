"bathtub", null, "bath"], ["s15", null, "bath"], ["window-maximize", "far", null], ["window-restore", "far", null], ["times-rectangle", null, "window-close"], ["window-close-o", "far", "window-close"], ["times-rectangle-o", "far", "window-close"], ["bandcamp", "fab", null], ["grav", "fab", null], ["etsy", "fab", null], ["imdb", "fab", null], ["ravelry", "fab", null], ["eercast", "fab", "sellcast"], ["snowflake-o", "far", "snowflake"], ["superpowers", "fab", null], ["wpexplorer", "fab", null], ["spotify", "fab", null]];
  bunker(function () {
    if (typeof namespace.hooks.addShims === 'function') {
      namespace.hooks.addShims(shims);
    } else {
      var _namespace$shims;

      (_namespace$shims = namespace.shims).push.apply(_namespace$shims, shims);
    }
  });

  return shims;

})));
                                                                                                                                                                                                                             ly once for each cell
	 * per sort. This array should not be read from or written to by anything
	 * other than the master sorting methods.
	 *  @type array
	 *  @default []
	 *  @private
	 */
	"_aSortData": [],

	/**
	 * Array of TD elements that are cached for hidden rows, so they can be
	 * reinserted into the table if a column is made visible again (or to act
	 * as a store if a column is made hidden). Only hidden columns have a 
	 * reference in the array. For non-hidden columns the value is either
	 * undefined or null.
	 *  @type array nodes
	 *  @default []
	 *  @private
	 */
	"_anHidden": [],

	/**
	 * Cache of the class name that DataTables has applied to the row, so we
	 * can quickly look at this variable rather than needing to do a DOM check
	 * on className for the nTr property.
	 *  @type string
	 *  @default <i>Empty string</i>
	 *  @private
	 */
	"_sRowStripe": ""
};

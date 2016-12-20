define(['../override', 'jquery',], function(override, $) {
    'use strict';
    /**
     * Simple usage
     *  cellSelection: {
     *      highlightRow: true,
     *      onCellSelected: function(event, position) {
     *          // do something with position
     *      }
     *  }
     */
    return function(grid, pluginOptions) {
        override(grid, function($super) {
            return {
                init: function init() {
                    $super.init.apply(this, arguments);

                    this.container.on('click', '.pg-cell', function(evt) {

                        var row = $(evt.currentTarget.parentNode).data('row-id');
                        var col = $(evt.currentTarget).data('column-key');

                        const highlightRow = pluginOptions.highlightRow && pluginOptions.highlightRow == true;

                        grid.selection.selectRow({row, col, highlightRow});
                    });

                    if (pluginOptions.onCellSelected) grid.on('onCellSelected', pluginOptions.onCellSelected);
                },

                selection: {
                    selectRow: function(position) {

                        if (position.highlightRow) {
                            if (this.selectedElements) {
                                this.selectedElements.removeClass('pg-selected');
                            }

                            this.selectedElements = grid.container.find('> .pg-rowgroup > .pg-container > .pg-row[data-row-id=\'' + position.row + '\']');
                            this.selectedElements.addClass('pg-selected');
                        }

                        grid.trigger('onCellSelected', position);
                    }
                }
            }
        });
    };
});

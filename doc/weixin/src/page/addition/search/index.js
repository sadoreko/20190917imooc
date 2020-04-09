'use strict';
require('./index.css');
var _mm           = require('util/common.js');

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        $('#searchInput').focus(); 
    },
    bindEvent: function () {
        var _this = this;
        var $searchClear = $('#searchClear'),
            $searchCancel = $('#searchCancel'),
            $searchBar = $('#searchBar'),
            $searchResult = $('#searchResult'),
            $searchText = $('#searchText'),
            $searchInput = $('#searchInput');

        $searchText.on('click', function () {
            $('#searchBar').addClass('weui-search-bar_focusing');
            $('#searchInput').focus();
        });
        $searchInput
            .on('blur', function () {
                if (!this.value.length) _this.cancelSearch();
            })
            .on('input', function () {
                if (this.value.length) {
                    $searchResult.show();
                } else {
                    $searchResult.hide();
                }
            })
            ;
        $searchClear.on('click', function () {
            _this.hideSearchResult();
            $searchInput.focus();
        });
        $searchCancel.on('click', function () {
            _this.cancelSearch();
            $searchInput.blur();
        });

    },
    cancelSearch: function () {
        this.hideSearchResult();
        $('#searchBar').removeClass('weui-search-bar_focusing');
        $('#searchText').show();
    },
    hideSearchResult: function () {
        $('#searchResult').hide();
        $('#searchInput').val('');
    }
};

$(function () {
    page.init();
});

// $(function () {
//     var $searchBar = $('#searchBar'),
//         $searchResult = $('#searchResult'),
//         $searchText = $('#searchText'),
//         $searchInput = $('#searchInput'),
//         $searchClear = $('#searchClear'),
//         $searchCancel = $('#searchCancel'),
//         $searchForm = $('#searchForm');

//     function hideSearchResult() {
//         $searchResult.hide();
//         $searchInput.val('');
//     }
//     function cancelSearch() {
//         hideSearchResult();
//         $searchBar.removeClass('weui-search-bar_focusing');
//         $searchText.show();
//     }

//     $searchText.on('click', function () {
//         $searchBar.addClass('weui-search-bar_focusing');
//         $searchInput.focus();
//     });
//     $searchInput
//         .on('blur', function () {
//             if (!this.value.length) cancelSearch();
//         })
//         .on('input', function () {
//             if (this.value.length) {
//                 $searchResult.show();
//             } else {
//                 $searchResult.hide();
//             }
//         })
//         ;
//     $searchClear.on('click', function () {
//         hideSearchResult();
//         $searchInput.focus();
//     });
//     $searchCancel.on('click', function () {
//         cancelSearch();
//         $searchInput.blur();
//     });
//     $searchForm.on('submit', function () {
//         console.log(111);
//         var text = $.trim($searchInput.val());

//     });
// });
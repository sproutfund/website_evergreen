/* global instantsearch */

window.addEventListener('load', function() {
  var search = instantsearch({
    appId: 'NWCVVYDLQV',
    apiKey: '054fce7f83acc9d7d52aa88bcb8f997e',
    indexName: 'sproutfund_grants',
    routing: true
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#q',
      placeholder: 'Search projects & programs',
      magnifier: false,
      poweredBy: false,
      wrapInput: false
    })
  );

  search.addWidget(
    instantsearch.widgets.stats({
      container: '#stats'
    })
  );

  var modalTemplate =
    '<div class=""'

  var hitTemplate =
    '<div class="ais-hits--item--header">' +
      '{{#featured}}<a title="{{name}}, a {{superprogram}} Project Highlight" target="_blank" href="{{url}}">{{/featured}}' +
      '<h4>{{{_highlightResult.name.value}}}</h4>' +
      '{{#featured}}<span><i class="icon icon--xs stack-plus-circled"></i></span></a>{{/featured}}' +
    '</div>' +
    '<p>{{{_highlightResult.description.value}}}<br/><span class="type--fine-print">{{{_highlightResult.addon.value}}}</span></p>';

  var noResultsTemplate = '<div class="text-center">' +
    'No projects found{{#query}} matching <strong>{{query}}</strong>{{/query}}.' +
    ' <a class="btn btn--sm" href="."><span class="btn__text">Start Over</span></a>'
    '</div>';

  var checkboxRefinementListTemplate =
    '<div class="input-checkbox">' +
      '<input type="checkbox" class="ais-refinement-list--checkbox" value="{{label}}" {{#isRefined}}checked{{/isRefined}} />' +
      '<label for=""></label>' +
    '</div>' +
    '<span><span class="ais-refinement-list--label">{{label}}</span><span class="label facet-count">{{count}}</span></span>';

  var radioInnerRefinementListTemplate =
    '<div class="input-radio input-radio--innerlabel">' +
      '<input type="radio" class="ais-refinement-list--radio" value="{{label}}" {{#isRefined}}checked{{/isRefined}} />' +
      '<label for=""><span class="ais-refinement-list--label">{{label}}</span></label>' +
    '</div>';

  var toggleItemTemplate =
    '<div class="d-flex">' +
      '<div class="pr-2 pt-1"><span class="ais-toggle--label {{^isRefined}}active{{/isRefined}}">Show All</span></div>' +
      '<div class="align-self-center">' +
        '<div class="input-checkbox input-checkbox--switch">' +
          '<input type="checkbox" {{#isRefined}}checked{{/isRefined}}/>' +
          '<label for=""></label>' +
        '</div>' +
      '</div>' +
      '<div class="pl-2 pt-1"><span class="ais-toggle--label {{#isRefined}}active{{/isRefined}}">Only Highlights</span></div>' +
    '</div>';

  search.addWidget(
      instantsearch.widgets.hits({
        container: '#hits',
        templates: {
          empty: noResultsTemplate,
          item: hitTemplate
        }
      })
    );

  search.addWidget(
    instantsearch.widgets.rangeInput({
      container: '#filter_year',
      attributeName: 'year',
      cssClasses: {
        submit   : 'btn btn--secondary'
      },
      labels: {
        separator: ' to ',
        submit: 'Filter'
      },
      templates: {
        header: '<h5>Year</h5>'
      },
      autoHideContainer: true
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#filter_superprogram',
      attributeName: 'superprogram',
      operator: 'or',
      limit: 10,
      sortBy: ['name:asc'],
      templates: {
        item: radioInnerRefinementListTemplate,
        header: '<h5>Category</h5>'
      },
      autoHideContainer: true
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#filter_program',
      attributeName: 'program',
      operator: 'or',
      limit: 10,
      sortBy: ['isRefined','count:desc'],
      showMore: {
        templates: {
          active: '<a class="ais-show-more ais-show-more__active" title="show less">less<i class="icon icon--xs stack-up-dir"></i></a>',
          inactive: '<a class="ais-show-more ais-show-more__inactive" title="show more">more<i class="icon icon--xs stack-down-dir"></i></a>'
        }
      },
      templates: {
        item: checkboxRefinementListTemplate,
        header: '<h5>Program</h5>'
      },
      autoHideContainer: true
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#filter_type',
      attributeName: 'type',
      operator: 'or',
      sortBy: ['isRefined','count:desc'],
      templates: {
        item: checkboxRefinementListTemplate,
        header: '<h5>Grant Type</h5>'
      },
      autoHideContainer: true
    })
  );

  search.addWidget(
    instantsearch.widgets.numericRefinementList({
      container: '#filter_amount',
      attributeName: 'amount',
      options: [
        {name: 'Any'},
        {              end:  1499, name: 'less than $1,500'},
        {start:  1500, end:  5000, name: '$1,500 – $5,000'},
        {start:  5001, end: 10000, name: '$5,001 – $10,000'},
        {start: 10001, end: 25000, name: '$10,001 – $25,000'},
        {start: 25001,             name: 'greater than $25,000'}
      ],
      templates: {
        item: radioInnerRefinementListTemplate,
        header: '<h5>Amount</h5>'
      },
      autoHideContainer: false
    })
  );

  search.addWidget(
    instantsearch.widgets.toggle({
      container: '#filter_featured',
      attributeName: 'featured',
      label: 'Show Only Project Highlights',
      values: {
        on: true,
      },
      templates: {
        item: toggleItemTemplate,
        header: ''
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.clearAll({
      container: '#clear-all',
      templates: {
        link: 'Reset All Filters'
      },
      cssClasses: {
        root: 'btn btn-block btn-default'
      },
      autoHideContainer: true
    })
  );

  // custom `renderFn` to render the custom Pagination widget
  function renderFn(PaginationRenderingOptions, isFirstRendering) {
    if (isFirstRendering) {
      PaginationRenderingOptions.widgetParams.containerNode.html('<div class="pagination"><a class="pagination__prev" href="#" title="Previous Page">«</a><ol></ol><a class="pagination__next" href="#" title="Next Page">»</a></div>');
    }

    // remove event listeners before replacing markup
    PaginationRenderingOptions.widgetParams.containerNode
      .find('a[data-page]')
      .each(function() { $(this).off('click'); });

    var pages = PaginationRenderingOptions.pages
      .map(function(page) {
        if (PaginationRenderingOptions.currentRefinement == parseInt(page)) {
          return '<li class="pagination__current">' + (parseInt(page) + 1) + '</li>';
        } else {
          return '<li><a href="' + PaginationRenderingOptions.createURL(page) + '" data-page="' + page + '">' +
            (parseInt(page) + 1) + '</a></li>';
        }
      });

    var previousPageNum = parseInt(PaginationRenderingOptions.currentRefinement) - 1;
    if (PaginationRenderingOptions.isFirstPage) {
      PaginationRenderingOptions.widgetParams.containerNode
        .find('.pagination__prev')
        .removeAttr("href");
    } else {
      PaginationRenderingOptions.widgetParams.containerNode
        .find('.pagination__prev')
        .attr("href", PaginationRenderingOptions.createURL(previousPageNum) );
    }

    var nextPageNum = parseInt(PaginationRenderingOptions.currentRefinement) + 1;
    if (PaginationRenderingOptions.isLastPage) {
      PaginationRenderingOptions.widgetParams.containerNode
        .find('.pagination__next')
        .removeAttr("href");
    } else {
      PaginationRenderingOptions.widgetParams.containerNode
        .find('.pagination__next')
        .attr("href", PaginationRenderingOptions.createURL(nextPageNum) );
    }

    PaginationRenderingOptions.widgetParams.containerNode
      .find('ol')
      .html(pages);

    PaginationRenderingOptions.widgetParams.containerNode
      .find('a[data-page]')
      .each(function() {
        $(this).on('click', function(event) {
          event.preventDefault();
          PaginationRenderingOptions.refine($(this).data('page'));
        });
      });

    if (PaginationRenderingOptions.nbPages === 0 || PaginationRenderingOptions.nbPages === 1) {
      PaginationRenderingOptions.widgetParams.containerNode.attr("style", "display: none;");
    } else {
      PaginationRenderingOptions.widgetParams.containerNode.attr("style", "display: block;");
    }

  }

  // connect `renderFn` to Pagination logic
  var customPagination = instantsearch.connectors.connectPagination(renderFn);

  // mount custom Pagination widget on the page
  search.addWidget(
    customPagination({
      containerNode: $('#custom-pagination-container'),
      padding: 3,
    })
  );

  search.start();

});

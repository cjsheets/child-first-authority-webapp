'use strict';

var app = angular.module('app');

function OutreachSummaryReportCtrl($scope, $timeout, uiGridGroupingConstants,
  Student) {
  $scope.loading = true;
  $scope.gridOptions = {
    rowHeight: 27,
    enableSorting: true,
    enableGridMenu: true,
    enableFiltering: true,
    treeRowHeaderAlwaysVisible: false,
    exporterPdfDefaultStyle: {fontSize: 9},
    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, color: 'grey'},
    exporterPdfHeader: {
      text: 'Chronically Absent Students',
      style: 'headerStyle'
    },
    exporterPdfOrientation: 'landscape',
    exporterPdfPageSize: 'LETTER',
    exporterPdfMaxGridWidth: 500,
    exporterPdfFooter: function(currentPage, pageCount) {
      return {
        text: currentPage.toString() + ' of ' + pageCount.toString(),
        style: 'footerStyle'
      };
    },
    exporterPdfCustomFormatter: function(docDefinition) {
      docDefinition.styles.headerStyle =
      {fontSize: 22, bold: true, color: '#265E6D'};
      docDefinition.styles.footerStyle = {fontSize: 10, bold: true};
      return docDefinition;
    }
  };

  $scope.gridOptions.columnDefs = [{
    name: 'student.currentSchool.name',
    displayName: 'School Name',
    minWidth: 150,
    grouping: {groupPriority: 0},
    sort: {priority: 0, direction: 'asc'}
  }, {
    name: 'student.studentId',
    displayName: 'Student Id',
    minWidth: 150,
    cellTemplate: '<div class="ui-grid-cell-contents">' +
                  '<a ui-sref="student.outreaches({studentId: ' +
                  'row.entity.student._id})">' +
                  '{{row.entity.student.studentId}}</a>' +
                  '</div>'
  }, {
    name: 'student.firstName',
    displayName: 'First Name',
    minWidth: 150
  }, {
    name: 'student.lastName',
    displayName: 'Last Name',
    minWidth: 150
  }, {
    name: 'totals.all',
    displayName: 'Total',
    minWidth: 80,
    treeAggregationType: uiGridGroupingConstants.aggregation.SUM
  }, {
    name: 'totals["Phone Call"] || 0',
    displayName: 'Calls',
    minWidth: 100,
    treeAggregationType: uiGridGroupingConstants.aggregation.SUM
  }, {
    name: 'totals["Letter Sent"] || 0',
    displayName: 'Letters',
    minWidth: 100,
    treeAggregationType: uiGridGroupingConstants.aggregation.SUM
  }, {
    name: 'totals["Home Visit"] || 0',
    displayName: 'Visits',
    minWidth: 100,
    treeAggregationType: uiGridGroupingConstants.aggregation.SUM
  }, {
    name: 'totals["SST Referral"] || 0',
    displayName: 'SST',
    minWidth: 100,
    treeAggregationType: uiGridGroupingConstants.aggregation.SUM
  }, {
    name: 'totals["Court Referral"] || 0',
    displayName: 'Court',
    minWidth: 100,
    treeAggregationType: uiGridGroupingConstants.aggregation.SUM
  }, {
    name: 'student.withdrawn',
    displayName: 'Withdrawn',
    enableCellEdit: true,
    type: 'boolean',
    width: 100,
    filter: {
      noTerm: true,
      condition: function(searchTerm, cellValue) {
        if ($scope.showWithdrawn) {
          return true;
        }
        return cellValue === false;
      }
    },
    visible: false
  }];

  $scope.gridOptions.onRegisterApi = function(gridApi) {
    $scope.gridApi = gridApi;
    $scope.gridOptions.data = Student.outreachSummary();

    gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, n, o) {
      if (n !== o) {
        switch (colDef.name) {
          case 'student.withdrawn':
            $scope.updateWithdrawn(rowEntity.entries.student);
            break;
        }
      }
    });

    $scope.gridOptions.data.$promise.then(function(data) {
      // Convert counts array to object, generate total intervention property
      _.forEach(data, function(student) {
        student.totals = _(student.counts)
          .keyBy('type').mapValues('count').value();
        student.totals.all = _.sumBy(student.counts, 'count');
      });
      // NOTE: Hack to default to expanded rows on initial load.
      // https://github.com/angular-ui/ui-grid/issues/3841
      $timeout(gridApi.treeBase.expandAllRows);
      $scope.loading = false;
    });
  };

  $scope.menuItems = [{
    text: ' Withdrawn Students',
    action: function() {
      $scope.showWithdrawn = !$scope.showWithdrawn;
    },
    iconFn: function() {
      return $scope.showWithdrawn ?
             'fa-check-square-o text-success' : 'fa-square-o';
    }
  }];

  $scope.$watch('showWithdrawn', function(n, o) {
    if (n !== o) {
      $scope.gridApi.grid.refresh();
      $timeout($scope.gridApi.treeBase.expandAllRows);
    }
  });
}

app.controller('OutreachSummaryReportCtrl', OutreachSummaryReportCtrl);

'use strict';

var app = angular.module('app');

function SchoolReportsCtrl($scope, $timeout, Auth, uiGridGroupingConstants,
  Student, AbsenceRecord, toastr) {
  $scope.atRiskGridOptions = {
    rowHeight: 27,
    enableSorting: true,
    enableGridMenu: true,
    enableFiltering: true,
    treeRowHeaderAlwaysVisible: false,
    exporterPdfDefaultStyle: {fontSize: 9},
    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, color: 'grey'},
    exporterPdfHeader: {
      text: 'At Risk Chronically absent students',
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
  $scope.atRiskGridOptions.columnDefs = [{
    name: 'entries.student.studentId',
    displayName: 'Student Id',
    minWidth: 150,
    cellTemplate: '<div class="ui-grid-cell-contents">' +
                  '<a href="/student/{{row.entity.entries.student._id}}">' +
                  '{{row.entity.entries.student.studentId}}</a>' +
                  '</div>'
  }, {
    name: 'entries.student.firstName',
    displayName: 'First Name',
    minWidth: 150
  }, {
    name: 'entries.student.lastName',
    displayName: 'Last Name',
    minWidth: 150
  }, {
    name: 'entries.absences',
    displayName: 'Absences',
    type: 'number',
    minWidth: 100,
    treeAggregationType: uiGridGroupingConstants.aggregation.SUM
  }, {
    name: 'entries.absencesDelta',
    displayName: 'Δ',
    type: 'number',
    width: 50
  }, {
    name: 'entries.tardies',
    displayName: 'Tardies',
    type: 'number',
    minWidth: 100,
    treeAggregationType: uiGridGroupingConstants.aggregation.SUM
  }, {
    name: 'entries.tardiesDelta',
    displayName: 'Δ',
    type: 'number',
    width: 50
  }, {
    name: 'entries.present',
    displayName: 'Present',
    type: 'number',
    minWidth: 100
  }, {
    name: 'entries.enrolled',
    displayName: 'Enrolled',
    type: 'number',
    minWidth: 100
  }, {
    name: 'entries.student.iep',
    displayName: 'IEP',
    enableCellEdit: true,
    type: 'boolean',
    width: 100,
    treeAggregationType: uiGridGroupingConstants.aggregation.SUM
  }, {
    name: 'entries.student.cfa',
    displayName: 'CFA',
    enableCellEdit: true,
    type: 'boolean',
    width: 100,
    treeAggregationType: uiGridGroupingConstants.aggregation.SUM
  }, {
    name: 'date',
    displayName: 'Uploaded',
    cellFilter: 'date:\'MM/dd/yy\'',
    width: 125
  }];

  $scope.atRiskGridOptions.onRegisterApi = function(gridApi) {
    $scope.atRiskGridOptions.data =
      AbsenceRecord.listCurrent({filter: 'at-risk'});

    gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, n, o) {
      if (n !== o) {
        switch (colDef.name) {
          case 'entries.student.iep':
            $scope.updateIEP(rowEntity.entries.student);
            break;
          case 'entries.student.cfa':
            $scope.updateCFA(rowEntity.entries.student);
            break;
        }
      }
    });

    $scope.atRiskGridOptions.data.$promise.then(function(data) {
      // NOTE: Hack to default to expanded rows on initial load.
      // https://github.com/angular-ui/ui-grid/issues/3841
      if (gridApi.treeBase.expandAllRows) {
        $timeout(gridApi.treeBase.expandAllRows);
      }
      $scope.atRiskCount = data.length;
    });
  };

  $scope.chronicGridOptions = {
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
  $scope.chronicGridOptions.columnDefs = [{
    name: 'entries.student.studentId',
    displayName: 'Student Id',
    minWidth: 150,
    cellTemplate: '<div class="ui-grid-cell-contents">' +
                  '<a href="/student/{{row.entity.entries.student._id}}">' +
                  '{{row.entity.entries.student.studentId}}</a>' +
                  '</div>'
  }, {
    name: 'entries.student.firstName',
    displayName: 'First Name',
    minWidth: 150
  }, {
    name: 'entries.student.lastName',
    displayName: 'Last Name',
    minWidth: 150
  }, {
    name: 'entries.absences',
    displayName: 'Absences',
    type: 'number',
    minWidth: 100,
    treeAggregationType: uiGridGroupingConstants.aggregation.SUM
  }, {
    name: 'entries.absencesDelta',
    displayName: 'Δ',
    type: 'number',
    width: 50
  }, {
    name: 'entries.tardies',
    displayName: 'Tardies',
    minWidth: 100,
    treeAggregationType: uiGridGroupingConstants.aggregation.SUM
  }, {
    name: 'entries.tardiesDelta',
    displayName: 'Δ',
    type: 'number',
    width: 50
  }, {
    name: 'entries.present',
    displayName: 'Present',
    type: 'number',
    minWidth: 100
  }, {
    name: 'entries.enrolled',
    displayName: 'Enrolled',
    type: 'number',
    minWidth: 100
  }, {
    name: 'entries.student.iep',
    displayName: 'IEP',
    enableCellEdit: true,
    type: 'boolean',
    width: 100,
    treeAggregationType: uiGridGroupingConstants.aggregation.SUM
  }, {
    name: 'entries.student.cfa',
    displayName: 'CFA',
    enableCellEdit: true,
    type: 'boolean',
    width: 100,
    treeAggregationType: uiGridGroupingConstants.aggregation.SUM
  }, {
    name: 'date',
    displayName: 'Uploaded',
    cellFilter: 'date:\'MM/dd/yy\'',
    width: 125
  }];

  $scope.chronicGridOptions.onRegisterApi = function(gridApi) {
    $scope.chronicGridApi = gridApi;
    $scope.chronicGridOptions.data =
      AbsenceRecord.listCurrent({filter: 'chronic'});

    gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, n, o) {
      if (n !== o) {
        switch (colDef.name) {
          case 'entries.student.iep':
            $scope.updateIEP(rowEntity.entries.student);
            break;
          case 'entries.student.cfa':
            $scope.updateCFA(rowEntity.entries.student);
            break;
        }
      }
    });

    $scope.chronicGridOptions.data.$promise.then(function(data) {
      // NOTE: Hack to default to expanded rows on initial load.
      // https://github.com/angular-ui/ui-grid/issues/3841
      if (gridApi.treeBase.expandAllRows) {
        $timeout(gridApi.treeBase.expandAllRows);
      }
      $scope.chronicCount = data.length;
    });
  };

  $scope.outreachesGridOptions = {
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

  $scope.outreachesGridOptions.columnDefs = [{
    name: 'student.studentId',
    displayName: 'Student Id',
    minWidth: 150,
    cellTemplate: '<div class="ui-grid-cell-contents">' +
                  '<a href="/student/{{row.entity.student._id}}">' +
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
  }];

  $scope.outreachesGridOptions.onRegisterApi = function(gridApi) {
    $scope.outreachesGridApi = gridApi;
    $scope.outreachesGridOptions.data =
      Student.outreachSummary();

    $scope.outreachesGridOptions.data.$promise.then(function(data) {
      // Convert counts array to object, generate total intervention property
      _.forEach(data, function(student) {
        student.totals = _(student.counts)
          .keyBy('type').mapValues('count').value();
        student.totals.all = _.sumBy(student.counts, 'count');
      });
      // NOTE: Hack to default to expanded rows on initial load.
      // https://github.com/angular-ui/ui-grid/issues/3841
      if (gridApi.treeBase.expandAllRows) {
        $timeout(gridApi.treeBase.expandAllRows);
      }
      $scope.outreachesCount = data.length;
    });
  };

  if (Auth.getCurrentUser().role !== 'teacher') {
    $scope.atRiskGridOptions.columnDefs.push({
      name: 'school.name',
      displayName: 'School Name',
      minWidth: 150,
      grouping: {groupPriority: 0},
      sort: {priority: 0, direction: 'asc'}
    });
    $scope.chronicGridOptions.columnDefs.push({
      name: 'school.name',
      displayName: 'School Name',
      minWidth: 150,
      grouping: {groupPriority: 0},
      sort: {priority: 0, direction: 'asc'}
    });
    $scope.outreachesGridOptions.columnDefs.push({
      name: 'student.currentSchool.name',
      displayName: 'School Name',
      minWidth: 150,
      grouping: {groupPriority: 0},
      sort: {priority: 0, direction: 'asc'}
    });
  }

  $scope.updateIEP = function(student) {
    if (student._id) {
      var oldVal = !student.iep;
      Student.updateIEP({
        studentId: student._id
      }, {
        iep: student.iep
      }, function() {
        toastr.success(
          'IEP updated to ' + student.iep,
          student.firstName + ' ' + student.lastName);
      }, function(err) {
        student.iep = oldVal;
        toastr.error(err);
      });
    }
  };

  $scope.updateCFA = function(student) {
    if (student._id) {
      var oldVal = !student.cfa;
      Student.updateCFA({
        studentId: student._id
      }, {
        cfa: student.cfa
      }, function() {
        toastr.success(
          'CFA updated to ' + student.cfa,
          student.firstName + ' ' + student.lastName);
      }, function(err) {
        student.cfa = oldVal;
        toastr.error(err);
      });
    }
  };
}

app.controller('SchoolReportsCtrl', SchoolReportsCtrl);
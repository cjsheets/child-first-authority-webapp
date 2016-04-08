'use strict';

function GridDefaults($timeout, uiGridGroupingConstants, Student,
  AbsenceRecord) {
  var colDefs = {};
  colDefs.school = function(name) {
    return {
      name: name || 'school.name',
      displayName: 'School Name',
      minWidth: 150,
      grouping: {groupPriority: 0},
      sort: {priority: 0, direction: 'asc'}
    };
  };
  // This specific colDef requires student to be populated at the root of the
  // row entity. No name parameter.
  colDefs.studentId = function() {
    return {
      name: 'student.studentId',
      displayName: 'Student Id',
      minWidth: 150,
      cellTemplate: 'components/grid-defaults/grid-defaults.student-id.html'
    };
  };
  colDefs.firstName = function(name) {
    return {
      name: name || 'student.firstName',
      displayName: 'First Name',
      minWidth: 150
    };
  };
  colDefs.lastName = function(name) {
    return {
      name: name || 'student.lastName',
      displayName: 'Last Name',
      minWidth: 150
    };
  };
  colDefs.iep = function(name) {
    return {
      name: name || 'student.iep',
      displayName: 'IEP',
      enableCellEdit: true,
      type: 'boolean',
      width: 100,
      treeAggregationType: uiGridGroupingConstants.aggregation.SUM
    };
  };
  colDefs.cfa = function(name) {
    return {
      name: name || 'student.cfa',
      displayName: 'CFA',
      enableCellEdit: true,
      type: 'boolean',
      width: 100,
      treeAggregationType: uiGridGroupingConstants.aggregation.SUM
    };
  };
  colDefs.withdrawn = function(scope, name) {
    return {
      name: name || 'student.withdrawn',
      displayName: 'Withdrawn',
      enableCellEdit: true,
      type: 'boolean',
      width: 100,
      filter: {
        noTerm: true,
        condition: function(searchTerm, cellValue) {
          if (scope.showWithdrawn) {
            return true;
          }
          return cellValue === false;
        }
      },
      visible: false
    };
  };
  colDefs.updated = function() {
    return {
      name: 'updated',
      field: 'updated()',
      displayName: 'Updated',
      type: 'date',
      cellFilter: 'date:\'MM/dd/yy\'',
      width: 125
    };
  };

  function options() {
    return {
      rowHeight: 27,
      enableSorting: true,
      enableGridMenu: true,
      enableFiltering: true,
      enableCellEdit: false,
      treeRowHeaderAlwaysVisible: false,
      exporterMenuPdf: false
    };
  }

  /**
   * NOTE: This grid options object is very tightly coupled to the scope of the
   * controller. It attempts to set properties of the scope object (loading,
   * and gridApi) in the onRegisterApi function.
   */
  function recordOptions(scope, filter) {
    var gridOptions = _.merge(options(), {
      columnDefs: [
        colDefs.school(),
        colDefs.studentId(),
        colDefs.firstName(),
        colDefs.lastName(),
        {
          name: 'entry.absences',
          displayName: 'Absences',
          type: 'number',
          minWidth: 100,
          treeAggregationType: uiGridGroupingConstants.aggregation.SUM
        },
        {
          name: 'entry.absencesDelta',
          displayName: 'Δ',
          type: 'number',
          width: 50
        },
        {
          name: 'entry.tardies',
          displayName: 'Tardies',
          type: 'number',
          minWidth: 100,
          treeAggregationType: uiGridGroupingConstants.aggregation.SUM
        },
        {
          name: 'entry.tardiesDelta',
          displayName: 'Δ',
          type: 'number',
          width: 50
        },
        {
          name: 'entry.present',
          displayName: 'Present',
          type: 'number',
          minWidth: 100
        },
        {
          name: 'entry.enrolled',
          displayName: 'Enrolled',
          type: 'number',
          minWidth: 100
        },
        colDefs.iep(),
        colDefs.cfa(),
        colDefs.withdrawn(scope),
        colDefs.updated()]
    });
    gridOptions.onRegisterApi = function(gridApi) {
      scope.gridApi = gridApi;
      gridApi.edit.on.afterCellEdit(scope, function(row, colDef, n, o) {
        if (n !== o) {
          switch (colDef.name) {
            case 'student.iep':
              Student.updateIEP(row.student);
              break;
            case 'student.cfa':
              Student.updateCFA(row.student);
              break;
            case 'student.withdrawn':
              Student.updateWithdrawn(row.student);
              break;
          }
        }
      });
      gridOptions.data = AbsenceRecord.listCurrent(filter || {});
      gridOptions.data.$promise.then(function(data) {
        _.forEach(data, function(row) {
          row.updated = function() {
            return row.entry.date || row.date;
          };
        });
        // NOTE: Hack to default to expanded rows on initial load.
        // https://github.com/angular-ui/ui-grid/issues/3841
        $timeout(gridApi.treeBase.expandAllRows);
        scope.loading = false;
      });
    };
    return gridOptions;
  }

  return {
    options: options,
    colDefs: colDefs,
    recordOptions: recordOptions
  };
}

angular.module('app').factory('GridDefaults', GridDefaults);

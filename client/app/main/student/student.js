'use strict';

angular.module('app')
  .config(function($stateProvider) {
    $stateProvider
      .state('student', {
        url: '/student/:studentId',
        parent: 'main',
        abstract: '.outreaches',
        templateUrl: 'app/main/student/student.html',
        controller: 'StudentCtrl'
      })
      .state('student.outreaches', {
        url: '/outreaches',
        parent: 'student',
        templateUrl: 'app/main/student/partial/outreaches.html',
        controller: 'StudentOutreachesCtrl'
      })
      .state('student.interventions', {
        url: '/interventions',
        parent: 'student',
        templateUrl: 'app/main/student/partial/interventions.html',
        controller: 'StudentInterventionsCtrl'
      })
      .state('student.notes', {
        url: '/notes',
        parent: 'student',
        templateUrl: 'app/main/student/partial/notes.html',
        controller: 'StudentNotesCtrl'
      });
  });

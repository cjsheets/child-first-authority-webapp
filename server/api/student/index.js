'use strict';

var express = require('express');
var controller = require('./student.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();
var authorize = [auth.hasRole('teacher'), auth.student];

router.get('/outreach-counts',
  auth.hasRole('teacher'),
  controller.outreachCounts);
router.get('/', auth.hasRole('manager'), controller.index);

// CurrentSchool authorization in controller
router.get('/:studentId', authorize, controller.show);
router.put('/:studentId/iep', authorize, controller.updateIEP);
router.put('/:studentId/cfa', authorize, controller.updateCFA);

router.use('/:studentId/interventions', require('./intervention'));
router.use('/:studentId/outreaches', require('./outreach'));
router.use('/:studentId/notes', require('./note'));

module.exports = router;

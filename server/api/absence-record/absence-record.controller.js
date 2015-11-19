'use strict';

var _ = require('lodash');
var AbsenceRecord = require('./absence-record.model');
var School = require('../school/school.model');
var Student = require('../student/student.model');

/**
 * Get list of absence records
 * restriction: 'manager'
 */
exports.index = function(req, res) {
  AbsenceRecord.find(function(err, records) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(records);
  });
};

/**
 * Get list of absence records by school
 * restriction: 'teacher'
 */
exports.bySchool = function(req, res) {
  School.find({name: req.query.school}, function (err, schools) {
      if(err) { return handleError(res, err); }
      var schoolID = schools[0]._id;
      console.log(schoolID);
      AbsenceRecord.find({school: schoolID}, function (err, records) {
        var result = records[0];
        console.log(result);
        return res.status(200).json(result);
      });
  });
};

/**
 * Get a single absence record
 * restriction: 'teacher'
 */
exports.show = function(req, res) {
  AbsenceRecord.findById(req.params.id, function(err, record) {
    if (err) { return handleError(res, err); }
    if (!record) { return res.status(404).send('Not Found'); }
    return res.json(record);
  });
};

/**
 * Creates a new absence record in the DB.
 * restriction: 'teacher'
 */
exports.create = function(req, res) {
  var school = req.params.schoolId;
  var newData = req.body;
  var newStudents = _.pluck(newData.creates, 'student') || [];
  var newEntries = _.pluck(newData.creates, 'entry') || [];
  var existingEntries = _.pluck(newData.updates, 'entry') || [];

  _.map(newStudents, function(student) {
    student.currentSchool = school;
  });
  
  // Create new students from newStudents Array
  Student.collection.insert(newStudents, {ordered: true}, function(err, createdStudents) {
    if (err) { return handleError(res, err); }
    _.forEach(createdStudents.ops, function(student, index) {
      newEntries[index].student = student._id;
    });
    var newAbsRec = {
      schoolYear: (newData.creates[0] || newData.updates[0]).schoolYear,
      school: school,
      entries: [].concat.apply(newEntries, existingEntries)
    };
    // Create new absence record collection
    AbsenceRecord.collection.insert(newAbsRec, function(err, record) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(record);
    });
  });
};

/**
 * Updates an existing absence record in the DB.
 * restriction: 'teacher'
 */
exports.update = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  AbsenceRecord.findById(req.params.id, function(err, record) {
    if (err) { return handleError(res, err); }
    if (!record) { return res.status(404).send('Not Found'); }
    var updated = _.merge(record, req.body);
    updated.save(function(err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(record);
    });
  });
};

/**
 * Deletes a absence record from the DB.
 * restriction: 'teacher'
 */
exports.destroy = function(req, res) {
  AbsenceRecord.findById(req.params.id, function(err, record) {
    if (err) { return handleError(res, err); }
    if (!record) { return res.status(404).send('Not Found'); }
    record.remove(function(err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var State$HoustonPocReasonml = require("./State.bs.js");

function uplinkStart(_uplinkState, sequence) {
  return {
          sequenceId: sequence.id,
          pending: List.map((function (c) {
                  return c.id;
                }), sequence.commands),
          unresolved: State$HoustonPocReasonml.initialUplinkState.unresolved,
          successful: State$HoustonPocReasonml.initialUplinkState.successful,
          failed: State$HoustonPocReasonml.initialUplinkState.failed,
          inProgress: true
        };
}

function uplinkSend(uplinkState, id) {
  var unresolved = uplinkState.unresolved;
  var pending = uplinkState.pending;
  var isPending = List.exists((function (cId) {
          return cId === id;
        }), pending);
  var uplinkState_sequenceId = uplinkState.sequenceId;
  var uplinkState_pending = List.filter(function (cId) {
          return cId !== id;
        })(pending);
  var uplinkState_unresolved = isPending ? ({
        hd: id,
        tl: unresolved
      }) : unresolved;
  var uplinkState_successful = uplinkState.successful;
  var uplinkState_failed = uplinkState.failed;
  var uplinkState_inProgress = uplinkState.inProgress;
  var inProgress = (List.length(uplinkState_pending) + List.length(uplinkState_unresolved) | 0) !== 0;
  return {
          sequenceId: uplinkState_sequenceId,
          pending: uplinkState_pending,
          unresolved: uplinkState_unresolved,
          successful: uplinkState_successful,
          failed: uplinkState_failed,
          inProgress: inProgress
        };
}

function uplinkTimeout(uplinkState, id) {
  var failed = uplinkState.failed;
  var unresolved = uplinkState.unresolved;
  var isUnresolved = List.exists((function (cId) {
          return cId === id;
        }), unresolved);
  var uplinkState_sequenceId = uplinkState.sequenceId;
  var uplinkState_pending = uplinkState.pending;
  var uplinkState_unresolved = List.filter(function (cId) {
          return cId !== id;
        })(unresolved);
  var uplinkState_successful = uplinkState.successful;
  var uplinkState_failed = isUnresolved ? ({
        hd: id,
        tl: failed
      }) : failed;
  var uplinkState_inProgress = uplinkState.inProgress;
  var inProgress = (List.length(uplinkState_pending) + List.length(uplinkState_unresolved) | 0) !== 0;
  return {
          sequenceId: uplinkState_sequenceId,
          pending: uplinkState_pending,
          unresolved: uplinkState_unresolved,
          successful: uplinkState_successful,
          failed: uplinkState_failed,
          inProgress: inProgress
        };
}

function uplinkStop(uplinkState) {
  return {
          sequenceId: uplinkState.sequenceId,
          pending: uplinkState.pending,
          unresolved: uplinkState.unresolved,
          successful: uplinkState.successful,
          failed: uplinkState.failed,
          inProgress: false
        };
}

function reducer(state, action) {
  if (typeof action === "number") {
    return {
            uplink: uplinkStop(state.uplink)
          };
  }
  switch (action.TAG | 0) {
    case /* UplinkStart */0 :
        return {
                uplink: uplinkStart(state.uplink, action._0)
              };
    case /* UplinkSend */1 :
        return {
                uplink: uplinkSend(state.uplink, action._0)
              };
    case /* UplinkAck */2 :
        return state;
    case /* UplinkTimeout */3 :
        return {
                uplink: uplinkTimeout(state.uplink, action._0)
              };
    
  }
}

exports.uplinkStart = uplinkStart;
exports.uplinkSend = uplinkSend;
exports.uplinkTimeout = uplinkTimeout;
exports.uplinkStop = uplinkStop;
exports.reducer = reducer;
/* No side effect */

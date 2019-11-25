open Schema;

[@bs.val] [@bs.module "./helpers"]
external readCommandSequence: string => Js.Promise.t(commandSequence) =
  "readJsonFile";

[@bs.val] [@bs.module "./helpers"]
external writeCommandSequence:
  (string, commandSequence) => Js.Promise.t(string) =
  "writeJsonFile";

[@bs.val] [@bs.module "./helpers"]
external injectSequenceAndCommandIds: commandSequenceInput => commandSequence =
  "injectSequenceAndCommandIds";
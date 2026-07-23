(function () {
  "use strict";

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  window.MOZAIQ_TRAINING_DEFAULTS = {
    schemaVersion: 1,
    lastUpdated: "2026-07-23T08:00:00.000Z",
    activeParticipantId: "handoyo-kristanto",
    activeView: "overview",
    participants: [clone(window.MOZAIQ_HANDOYO_PLAN)],
    settings: {
      autosave: true,
      compactMode: false,
      printScope: "overview"
    }
  };
})();

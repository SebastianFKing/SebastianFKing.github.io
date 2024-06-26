/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global global, Office, self, window, Word */

Office.onReady(() => {
  // If needed, Office.js is ready to be called
});

/**
 * Writes the event source id to the document when ExecuteFunction runs.
 * @param event {Office.AddinCommands.Event}
 */

 async function writeValue(event) {
  Word.run(async (context) => {
    // insert a paragraph at the end of the document.
    const paragraph = context.document.body.insertParagraph(
      "ExecuteFunction works very well. Button ID=" + event.source.id,
      Word.InsertLocation.end
    );

    // change the paragraph color to blue.
    paragraph.font.color = "blue";

    await context.sync();
  });

  // Calling event.completed is required. event.completed lets the platform know that processing has completed.
  event.completed();
}

async function applyBodyParagraph(event) {
  await Word.run(async (context) => {
    const range = context.document.getSelection();
    const styleName = "Body Paragraph";
    const style = context.document.getStyles().getByNameOrNullObject(styleName);
    
    style.load('name');
    
    await context.sync();
    
    if (style.isNullObject) {
      console.warn("There's no existing style with that name.");
    } else {
      range.style = styleName;
    }
    
    await context.sync();
  });
  
  event.completed();
}

function getGlobal() {
  return typeof self !== "undefined"
    ? self
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : undefined;
}

const g = getGlobal();

Office.actions.associate("writeValue", writeValue);
Office.actions.associate("applybodyparagraph", applybodyparagraph);

var Twiorg = {

  /**
   *
   * Function to escape special HTML characters in a string
   * 
   * @param String
   *   The text to escape
   *
   * @return String
   *   The escaped text
   */
  escapeHtml: function(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  /**
   *
   * Function to convert JavaScript templates to Org mode Babel source code blocks
   * 
   * @param String
   *   The text to examine.
   *
   * @return String
   *   The text with js tempalates processed 
   */
  convertJSTemplatesToOrgFormat: function(text) {
    // Regular expression to match JavaScript template tags (<%... %> or <%=... %> or <%-... %>)
    return text.replace(/<%(-)?([A-Za-z-_+ \n].*)%>/g, function(match, trim, code) {
      // If it's a <%- %> tag, trim leading/trailing whitespace from the code
      if (trim) {
	code = code.trim();
      }
      // Escape special HTML characters in the code
      const escapedCode = Twiorg.escapeHtml(code);
      // Construct the Org mode Babel source code block
      return `#+BEGIN_SRC javascript\n${escapedCode}\n#+END_SRC\n`;
    });
  },
  /**
   *
   * Replace Twine javascript source code embedded in a passage with Org Mode format
   *
   * Assumes: Twine 2 Snowman javascript format (<% %>, <%+ %>, <%= %>)
   * 
   * @param String
   *   The text to examine.
   *
   * @return String
   *   The text with links converted to Org format
   */
  convertLinksToOrgFormat: function(text) {
    return text.replace(/\[\[(.*?)-&gt;(.*?)\]\]/g, function(match, linkText, link) {
      return `[[${link}][${linkText}]]`; 
    });
  },
  /**
   * Get the Passage properties
   *
   * @param {Object} passage
   *   The passage data HTML element.
   *
   * @return String
   *   String containing the properties in an Org friendly syntax
   */
  getPassageProperties: function(passage) {
    const attributes = ["name", "pid", "position", "size", "tags"];
    let properties = ":PROPERTIES:\n";

    attributes.forEach((attr) => {
      const value = passage.attributes[attr].value;
      if (value) {
	properties += `:${attr}: ${value}\n`;
      }
    });
    return `${properties}:END:`;
  },
  /**
   * Convert an entire passage.
   *
   * @param {Object} passage
   *   The passage data HTML element.
   *
   * @return String
   *   String containing the procesed passage in org syntax
   */
  convertPassage: function(passage) {
    const passageProperties = Twiorg.getPassageProperties(passage);
    const passageWithLinksUpdated = Twiorg.convertLinksToOrgFormat(passage.innerHTML);
    const convertedPassage = Twiorg.convertJSTemplatesToOrgFormat(passageWithLinksUpdated);

    return `* ${passage.attributes.name.value}\n${passageProperties}\n${convertedPassage}\n`;
  },
  /**
   * Get the Story Metadata
   *
   * @param {Object} story
   *   The story data HTML element.
   *
   * @return String
   *   String containing processed metadata
   */
  getStoryMetaData: function(story) {
    const attributes = ["name", "startnode", "creator", "creator-version", "format-version", "options", "tags", "zoom", "hidden", "ifid"];
    let metadata = `#+TITLE: ${story.attributes.name.value}\n* Twine 2 Metadata:\n:PROPERTIES:\n`;

    attributes.forEach((attr) => {
      const value = story.attributes[attr].value;
      if (value) {
	metadata += `:${attr}: ${value}\n`;
      }
    });
    
    return `${metadata}:END:\n`;
  },
  /**
   * Convert an entire story.
   *
   * @param {Object} story
   *   The story data HTML element.
   *
   * @return String
   *   String containing entire story converted to Org format
   */
  convertStory: function(story) {
    const passages = story.getElementsByTagName("tw-passagedata");

    const convertedPassages = Array.prototype.slice.call(passages).map(Twiorg.convertPassage);

    const orgText = convertedPassages.join("\n");

    const storyMetaData = Twiorg.getStoryMetaData(story).trim();

    return `${storyMetaData}\n${orgText}`;
 
  },
  /**
   * The entry-point for converting Twine data into the Twiorg format.
   */
  convert: function() {
    const storyData = document.getElementsByTagName("tw-storydata")[0];
    const org = Twiorg.convertStory(storyData);
    document.getElementById("output").textContent = org;
  }
}

window.Twiorg = Twiorg;

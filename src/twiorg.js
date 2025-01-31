var Twiorg = {

  /**
   *
   * Replace Twine link format [[link_text->link]] with Org link format [[link][link_text]]
   * 
   * @param String
   *   The text to examine.
   *
   * @return String
   *   The text with links converted to Org format
   */
  convertLinksToOrgFormat: function(text) {
    return text.replace(/\[\[(.*?)\-\&gt;(.*?)\]\]/g, function(match, linkText, link) {
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
    const attributes = ["name", "pid", "position", "tags"];
    let properties = ":PROPERTIES:\n";

    attributes.forEach((attr) => {
      const value = passage.attributes[attr].value;
      if (value) {
	properties += `:${attr}: ${value}\n`;
      }
    });

    return `${properties}\n:END:`;
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
    const convertedPassageText = Twiorg.convertLinksToOrgFormat(passage.innerHTML);

    return `* ${passage.attributes.name.value}\n${passageProperties}\n${convertedPassageText}\n`;
  },
  /**
   * Get the Story Meta Data
   *
   * @param {Object} story
   *   The story data HTML element.
   *
   * @return String
   *   String containing processed metadata
   */
  getStoryMetaData: function(story) {
    const attributes = ["name", "startnode", "creator", "creator-version", "ifid"];
    let metadata = "#+TITLE: ${story.attributes.name.value}\n* About:\n";

    attributes.forEach((attr) => {
      const value = story.attributes[attr].value;
      if (value) {
	metadata += `${attr}: ${value}\n`;
      }
    });
    
    return metadata;
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

    const storyMetaData = Twiorg.getStoryMetaData(story);

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

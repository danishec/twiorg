var Twiorg = {

  /**
   * Extract the link entities from the provided text.
   *
   * Text containing [[foo]] would yield a link named "foo" pointing to the
   * "foo" passage.
   * Text containing [[foo->bar]] would yield a link named "foo" pointing to the
   * "bar" passage.
   *
   * @param {String} text
   *   The text to examine.
   *
   * @return {Array|null}
   *   The array of link objects, containing a `name` and a `link`.
   */
  extractLinksFromText: function(text) {
    var links = text.match(/\[\[.+?\]\]/g);
    if (!links) {
      return null;
    }

    return links.map(function(link) {
      var differentName = link.match(/\[\[(.*?)\-\&gt;(.*?)\]\]/);
      if (differentName) {
        // [[name->link]]
        return {
          name: differentName[1],
          link: differentName[2]
        };
      } else {
        // [[link]]
        link = link.substring(2, link.length-2)
        return {
          name: link,
          link: link
        }
      }
    });
  },

  /**
   * Convert an entire passage.
   *
   * @param {Object} passage
   *   The passage data HTML element.
   *
   * @return {Object}
   *   Object containing specific passage data. Examples include `name`, `pid`,
   *   `position`, etc.
   */
  convertPassage: function(passage) {
  	var dict = {text: passage.innerHTML};

    var links = Twiorg.extractLinksFromText(dict.text);
    if (links) {
      dict.links = links;
    }

    ["name", "pid", "position", "tags"].forEach(function(attr) {
      var value = passage.attributes[attr].value;
      if (value) {
        dict[attr] = value;
      }
    });

    if(dict.position) {
      var position = dict.position.split(',')
      dict.position = {
        x: position[0],
        y: position[1]
      }
    }

    if (dict.tags) {
      dict.tags = dict.tags.split(" ");
    }

    return dict;
	},

  /**
   * Convert an entire story.
   *
   * @param {Object} story
   *   The story data HTML element.
   *
   * @return {Object}
   *   Object containing processed "passages" of data.
   */
  convertStory: function(story) {
    var passages = story.getElementsByTagName("tw-passagedata");
    var convertedPassages = Array.prototype.slice.call(passages).map(Twiorg.convertPassage);

    var dict = {
      passages: convertedPassages
    };

    ["name", "startnode", "creator", "creator-version", "ifid"].forEach(function(attr) {
      var value = story.attributes[attr].value;
      if (value) {
        dict[attr] = value;
      }
    });

    // Add PIDs to links
    var pidsByName = {};
    dict.passages.forEach(function(passage) {
      pidsByName[passage.name] = passage.pid;
    });

    dict.passages.forEach(function(passage) {
      if (!passage.links) return;
      passage.links.forEach(function(link) {
        link.pid = pidsByName[link.link];
        if (!link.pid) {
          link.broken = true;
        }
      });
    });

    return dict;
  },

  /**
   * The entry-point for converting Twine data into the Twiorg format.
   */
  convert: function() {
    var storyData = document.getElementsByTagName("tw-storydata")[0];
    var json = JSON.stringify(Twiorg.convertStory(storyData), null, 2);
    document.getElementById("output").innerHTML = json;
  }
}

window.Twiorg = Twiorg;

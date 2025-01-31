window.storyFormat({
  "name": "Twiorg",
  "version": "0.1",
  "author": "Danish Khatri",
  "description": "Export your Twine 2 story as an Org file",
  "proofing": false,
  "source": "<html>\r\n  <head>\r\n    <title>{{STORY_NAME}}</title>\r\n    <script type=\"text/javascript\">\r\n      /**\r\n       * Twiorg - Twine 2 Org Export Story Format\r\n       *\r\n       * Copyright (c) 2025 Danish Khatri\r\n       * https://github.com/danishec/twiorg\r\n       *\r\n       * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and\r\n       * associated documentation files (the \"Software\"), to deal in the Software without restriction,\r\n       * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,\r\n       * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,\r\n       * subject to the following conditions:\r\n       *\r\n       * The above copyright notice and this permission notice shall be included in all copies or substantial\r\n       * portions of the Software.\r\n       *\r\n       * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT\r\n       * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.\r\n       * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,\r\n       * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE\r\n       * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\r\n       */\r\n      var Twiorg={convertLinksToOrgFormat:function(t){return t.replace(/\\[\\[(.*?)\\-\\&gt;(.*?)\\]\\]/g,function(t,e,r){return`[[${r}][${e}]]`})},getPassageProperties:function(r){let a=\":PROPERTIES:\\n\";return[\"name\",\"pid\",\"position\",\"tags\"].forEach(t=>{var e=r.attributes[t].value;e&&(a+=`:${t}: ${e}\n`)}),a+`\n:END:`},convertPassage:function(t){var e=Twiorg.getPassageProperties(t),r=Twiorg.convertLinksToOrgFormat(t.innerHTML);return`* ${t.attributes.name.value}\n${e}\n${r}\n`},getStoryMetaData:function(r){let a=\"#+TITLE: ${story.attributes.name.value}\\n* About:\\n\";return[\"name\",\"startnode\",\"creator\",\"creator-version\",\"ifid\"].forEach(t=>{var e=r.attributes[t].value;e&&(a+=t+`: ${e}\n`)}),a},convertStory:function(t){var e=t.getElementsByTagName(\"tw-passagedata\"),e=Array.prototype.slice.call(e).map(Twiorg.convertPassage).join(\"\\n\");return Twiorg.getStoryMetaData(t)+`\n`+e},convert:function(){var t=document.getElementsByTagName(\"tw-storydata\")[0],t=Twiorg.convertStory(t);document.getElementById(\"output\").textContent=t}};window.Twiorg=Twiorg;\r\n    </script>\r\n  </head>\r\n  <body>\r\n    <pre id=\"output\"></pre>\r\n    <div id=\"storyData\" style=\"display: none;\">\r\n      {{STORY_DATA}}\r\n    </div>\r\n    <script>\r\n      Twiorg.convert();\r\n    </script>\r\n  </body>\r\n</html>\r\n"
});
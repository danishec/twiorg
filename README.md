# Twiorg

Twiorg is a story format for [Twine 2](http://twinery.org/2) that exports to the [Org](https://orgmode.org/) format.

It is inspired by [Twison](https://github.com/lazerwalker/twison/), a useful format that exports a Twine 2 story to JSON. 

## Installation

From the Twine 2 story select add a story format, and point it to the url (https://cdn.githubraw.com/danishec/twiorg/v0.3.4/dist/format.js). Build the story using the added Twiorg format

## Output

Here's an example of its output:

```org
#+TITLE: Daphne's $10 Adventure
* Twine 2 Metadata:
:PROPERTIES:
:name: Daphne's $10 Adventure
:startnode: 1
:creator: Twine
:creator-version: 2.10.0
:format-version: 0.3.4
:zoom: 1
:ifid: 2DADFBDA-06DE-4776-B912-AC93F4F08CBF
:END:

* Meet Daphne
:PROPERTIES:
:name: Meet Daphne
:pid: 1
:position: 50,250
:size: 100,100
:END:
#+BEGIN_SRC javascript

window.story.state = {
cash: 10,
};

#+END_SRC
.. a 7-year-old girl with a heart full of cheer, a mind full of wonder, and a spirit as strong as a horse.

One Sunday during the Summer, Daphne's parents sat her down for a chat. "Daphne," said Dad, "How about we play a game this week? It is called Entrepreneur."

"Ont-po-what?" Daphne giggled.

"An entrepreneur is someone who is creative in solving problems they or others have," explained Mom. 

Daphne has $#+BEGIN_SRC javascript
 window.story.state.cash 
#+END_SRC

[[A Weeklong Adventure!][continue ]]
```

## License

Twiorg is licensed under the MIT license. See the LICENSE file for more information.

---
title: "Problems with this start template"
date: "2022-09-29"
---

* This is supposed to be a blog - a blog is about posts; writing, posting and showing them
* There is a folder called 'posts', but that is actually the data store/database/persisted state
* All the other folders are about the web, or rather it's about React
  * components
  * lib
  * pages
  * public
  * styles
* Is blogging about the web? Well it's short for web-logging, so of course it must be
* And it is, but it's not implementation specific about the web - we could create blogs before React and a detail like React should be a private matter
* Lets fix the architecture, so it screams with intent and not shows us all it's private parts
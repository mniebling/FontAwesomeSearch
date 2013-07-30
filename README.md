FontAwesomeSearch
=================
FontAwesomeSearch is a simple website that allows you to perform text searches on the descriptions of FontAwesome icons.



Why is this better than the FontAwesome Cheatsheet?
---------------------------------------------------
By itself, it's not really. Before I made this website, I would bring up the cheatsheet and `CTRL+F` for the icon I wanted, then copy it to the clipboard.

However, I also use [Alfred](http://www.alfredapp.com/), the excellent OSX launcher app, and I always wished I could search straight from its prompt. Because FontAwesomeSearch optionally looks at the window hash for search terms, I can now type this:

![Alfred query showing search terms](mniebling.github.com/FontAwesomeSearch/screenshots/alfred.png)

...and get this result for maximum copy & paste speed:

![FontAwesomeSearch results page](mniebling.github.com/FontAwesomeSearch/screenshots/results.png)

Kakow!


Setting up the query in Alfred
------------------------------
Just paste this into the "Search URL" field of an Alfred custom search entry:

`http://mniebling.github.io/FontAwesomeSearch/#{query}`
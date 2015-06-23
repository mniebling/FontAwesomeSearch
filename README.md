FontAwesomeSearch
=================
FontAwesomeSearch is a simple [website](http://mniebling.github.io/FontAwesomeSearch/) that allows you to perform text searches on the descriptions of [FontAwesome](http://fontawesome.io) icons.



#### Why is this better than the FontAwesome Cheatsheet?

By itself, it's not really. Before I made this website, I would bring up the [cheatsheet](http://fortawesome.github.io/Font-Awesome/cheatsheet/) and `CTRL+F` for the icon I wanted, then copy it to the clipboard.

However, I also use [Alfred](http://www.alfredapp.com/), the excellent OSX launcher app, and I always wished I could search straight from its prompt. Because FontAwesomeSearch optionally looks at the window hash for search terms, I can now type this:

![Alfred query showing search terms](https://raw.github.com/mniebling/FontAwesomeSearch/master/screenshots/alfred.png)

...and get this result for maximum copy & paste speed:

![FontAwesomeSearch results page](https://raw.github.com/mniebling/FontAwesomeSearch/master/screenshots/results.png)

Kakow!


#### Setting up the query in Alfred

Just paste this into the "Search URL" field of an Alfred custom search entry:

`http://www.mikeniebling.com/FontAwesomeSearch/#{query}`

# Day 02 - Grids

I first searched for inspiration on the internet.
There I found [Frederik Vanhoutte](https://twitter.com/wblut) on twitter. He has some cool and interesting things, mostly useing isometric styles.
{% raw %}
<blockquote class="twitter-tweet"><p lang="und" dir="ltr">gn <a href="https://t.co/weg04RwYVt">pic.twitter.com/weg04RwYVt</a></p>&mdash; Frederik Vanhoutte - Winterbloed (@wblut) <a href="https://twitter.com/wblut/status/1570181238656466944?ref_src=twsrc%5Etfw">September 14, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>{% endraw %}

So I started to create a grid out of cubes. Those cubes I then stretched to create different heights.
Then I positioned the camera at an isometric point of view and changed it to an orthographic projection to create that look.
I used my own shader material, which I made a few months back for another project, so I could set a color for each side of the cube.

## IsometricCity
For the interactive animations I found the Tween.js library. (Hover/Touche over the cubes to interact)
{% raw %}
<iframe src="content/day02/isometric/index.html" width="100%" height="450" frameborder="no"></iframe> {% endraw %}

[FullScreen](https://mattsymetry.github.io/GENCG/content/day02/isometric/index.html)

## IsometricObject
After that, I tried to create some random isometric objects. (Reload page to get a new one)
{% raw %}
<iframe src="content/day02/iso_stature/index.html" width="100%" height="450" frameborder="no"></iframe> {% endraw %}

[FullScreen](https://mattsymetry.github.io/GENCG/content/day02/iso_stature/index.html)
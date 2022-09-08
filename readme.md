# Day 01 - Getting back into it

## Computing without computer
To start out, we made a few Conditional Designs with pen and paper. This helped me to get my mind back into understanding and thinking about how random things can turn out when certain conditions are given.

![Example Image](content/day01/img1.png)
![Example Image](content/day01/img2.png)

## Computing with computer
To get back into coding visuals, I started to draw some simple shapes with Three.js
{% raw %}
<iframe src="content/day01/shapes/index.html" width="100%" height="450" frameborder="no"></iframe> {% endraw %}

Then I created a little spinning grid of random blocks.
{% raw %}
<iframe src="content/day01/BlockyGrid/index.html" width="100%" height="450" frameborder="no"></iframe> {% endraw %}



# Day 02 - Grids

I first searched for inspiration on the internet. Then I started to create a grid out of cubes. Those cubes I then stretched to create different heights.
Then I positioned the camera at an isometric point of view and changed it to an orthographic projection to create that look.
I used my own shader material so I could set a color for each side of the cube.

For the interactive animations I found the Tween.js library.
{% raw %}
<iframe src="content/day02/isometric/index.html" width="100%" height="450" frameborder="no"></iframe> {% endraw %}


After that, I tried to create some random isometric objects.
{% raw %}
<iframe src="content/day02/iso_stature/index.html" width="100%" height="450" frameborder="no"></iframe> {% endraw %}



# Day 03 - Clock / Time

To get some ideas on how to visualize the passage of time, I first looked at some inspiration from class documentation and also on Pinterest.
I quickly realized that I wanted to create some sort of abstrong clock that was still readable.
Yesterday I created some isometric art, which can also be very abstract. So I decided to create an abstract clock in an isometric view.

To read the clock, you have to count the cubes on the wall. A number consists of two columns of blocks, the first showing the tens digit, the second the ones digit.
The first block on the far left is the hour number. After the " : " follow the minutes, and on the far right the seconds.

{% raw %}
<iframe src="content/day03/isometric_clock/index.html" width="100%" height="450" frameborder="no"></iframe> {% endraw %}
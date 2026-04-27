---
layout: home
---

<h1>felipe lima</h1>
<p class="subtitle">engineer · seattle · originally from southern brazil</p>

<p>
  i write software for a living and have been doing it since the late 2000s.
  past stops include thoughtworks, airbnb, and stripe. these days i mostly tinker,
  read, write, and spend time with my family.
</p>

<hr />

<p class="section-label">[ now ]</p>

<p>
  currently in brazil through january 2026, taking a break from full-time work
  to look after my two-year-old daughter and aging mother, recharge, and think
  about what's next. available for part-time, hourly contracting in the meantime.
  more on the <a href="{{ '/now/' | relative_url }}">now page</a>.
</p>

<hr />

<p class="section-label">[ writing ]</p>

<ul class="entry-list">
  {% for post in site.posts limit:5 %}
  <li>
    <span class="entry-date">{{ post.date | date: "%Y.%m.%d" }}</span>
    <a class="entry-title" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
  </li>
  {% endfor %}
</ul>

<p><a href="{{ '/archives/' | relative_url }}">all writing →</a></p>

<hr />

<p class="section-label">[ projects ]</p>

<ul class="projects-list">
  <li>
    <a class="project-name" href="https://github.com/felipecsl/wombat">wombat</a>
    <span class="project-desc">lightweight ruby crawler with a minimalist dsl</span>
  </li>
  <li>
    <a class="project-name" href="https://github.com/felipecsl/ktnes">ktnes</a>
    <span class="project-desc">multiplatform nes emulator written in kotlin</span>
  </li>
  <li>
    <a class="project-name" href="https://github.com/felipecsl/AsymmetricGridView">AsymmetricGridView</a>
    <span class="project-desc">android listview that mimics a gridview with asymmetric items</span>
  </li>
  <li>
    <a class="project-name" href="https://github.com/felipecsl/GifImageView">GifImageView</a>
    <span class="project-desc">android imageview for animated gifs</span>
  </li>
</ul>

<p><a href="{{ '/projects/' | relative_url }}">more projects →</a></p>

<hr />

<p class="section-label">[ elsewhere ]</p>

<ul class="elsewhere">
  <li><a href="https://github.com/felipecsl">github</a></li>
  <li><a href="https://twitter.com/felipecsl">twitter</a></li>
  <li><a href="https://www.linkedin.com/in/felipecsl">linkedin</a></li>
  <li><a href="mailto:felipe.lima@gmail.com">email</a></li>
</ul>

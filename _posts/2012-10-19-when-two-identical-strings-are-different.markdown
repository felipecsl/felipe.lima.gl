---
comments: true
date: 2012-08-01 03:46:00
layout: post
slug: when-two-identical-strings-are-different
title: When two identical strings are different?
tags:
  - ruby
  - encoding
---

Think these two strings are the same?

```ruby
"R. Padre Chagas 342"
"R. Padre Chagas 342"
```

Pretty much, right? So we open IRB:

```ruby
1.9.3p0 :085 > "R. Padre Chagas 342" == "R. Padre Chagas 342"
  # => false
```

![](http://i0.kym-cdn.com/photos/images/original/000/199/693/disgusted-mother-of-god.png?1321272571)

WTF!!? Took me a couple minutes of head scratching to figure out.. let’s look closer:

```ruby
1.9.3p0 :086 > "R. Padre Chagas 342".bytes.to_a
  # => [82, 46, 32, 80, ... , 67, 104, 97, 103, 97, 115, 32, 51, 52, 50]
1.9.3p0 :087 > "R. Padre Chagas 342".bytes.to_a
  # => [82, 46, 32, 80, ... , 67, 104, 97, 103, 97, 115, 194, 160, 51, 52, 50]
```

Haa. There it is.. an extra hidden byte!. Crazy huh? Even closer:

```ruby
1.9.3p0 :088 > "R. Padre Chagas 342".byteslice(9..15)
 # => "Chagas "
1.9.3p0 :089 > "R. Padre Chagas 342".byteslice(9..15)
 # => "Chagas\xC2"
```

This is what happens when you scrape data from the web… Do not believe everything you see :)

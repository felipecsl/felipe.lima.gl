---
layout: post
title: "Domain names and branding"
date: 2023-05-13 10:31
comments: true
categories:
---

# Some History

I've owned the domain [felipecsl.com](http://felipecsl.com) since 2012. Hard to believe it’s been 13 years now. Before then,
I’ve had [felipel.com](http://felipel.com), which I registered back in 2009!

Even though `felipecsl` is longer and harder to spell than `felipel`, that has been my universal handle pretty much
everywhere in the internet, so I thought it made sense for my personal website to match that because… well,
[consistency](https://felipe.lima.gl/2020/04/12/consistency.html). 🙂

Looking back through my old emails, finding the domain registration order confirmation from GoDaddy, it’s kind of hilarious
to see how their designs and branding has changed dramatically.

![GoDaddy email 1](/images/2023/05/godaddy-email-1.png)

![GoDaddy email 2](/images/2023/05/godaddy-email-2.png)

As an aside, I’ve since stopped using GoDaddy as my go-to registrar, after learning about their insane CEO [Bob Parsons](https://en.wikipedia.org/wiki/Bob_Parsons)
who was at the time seen shooting elephants in Africa and making sexist remarks. It’s really not that surprising, after
looking at his company email designs above. Also not surprising they changed their branding so dramatically.

---

<br/>
Well, enough said, it was time for a change. After getting married last July and now becoming a father, I started thinking 
about how I could create something larger than myself, some kind of family presence, name and branding that could potentially 
outlive me. I know… I’m getting old, but so does everyone else. 😀

Having absolutely zero experience with branding, logo design and the likes, I proceeded to do what any perfectly reasonable
person would do in this situation: Go do it anyways. 😂

**Hint**: I have no idea what I'm doing.

## Ideation

I started doodling with ideas that would join the letters L and G together, representing my last name “Lima” and my wife’s
last name, “Gall”.

![Logo ideation 1](/images/2023/05/ideation-1.png)

If you're a person with training on this, or who has just the slightest eye for good design, I'm sure you're cringing as
you look at these. That's OK. Some of these even look like a wheelchair shaped logo, which is kind of hilarious I think.
Needless to say, not exactly what I was going for here. Anyways, a few months later this idea kept evolving into the
next iteration:

![Logo ideation 2](/images/2023/05/ideation-2.png)

I like this concept a lot better as it uses more angled shapes that remind me of an arrow. It also merges both letters
together nicely in a visually pleasant and balanced equilibrium. I liked where this was going, so I opened up Figma and
started iterating there. I played around with it some more and eventually ended up settling on this:

![Final logo](/images/2023/05/final-logo.png)

I really like the symmetrical angles and the rhombus shaped layout on this one. It's simple, clean and has a nice flow to it.

# Finding a domain name

Having a pretty short last name is both a blessing and a curse, especially when it comes to finding a domain name.
I wanted to go with something short and easy to remember, so I started looking for domains that were an exact match for
my last name "Lima".

I had to quickly abandon the idea of getting anything that resembles a popular TLD like `.com`, `.io`, `.dev`, etc.
Some of these were going for 5+ figures on the secondary market, which is just insane. Being as cheap as I am, I was not
willing to shell out that much money for a domain name. Browsing available domain names turned out to be an adventure itself.
Most registrars only support a fairly small subset of the almost [1500 TLDs](https://textslashplain.com/2023/05/13/new-tlds-not-bad-actually/)
available today, so I had to go through a few different websites to get a picture of what was available.

After spending a completely unreasonable amount of time digging into this, the best registrar websites I could find for
searching were [101domain.com](https://101domain.com) and [Marcaria](https://marcaria.com) (despite its awful 1990 looking design,
it has a pretty good variety of TLDs with decent prices).

I also wrote a small Ruby script that would go through the list of [every TLD available](https://data.iana.org/TLD/tlds-alpha-by-domain.txt)
on the ICANN website and `whois` each one of them to see if it was available. This was a fun exercise and helped me
filter down the list of available TLDs to a more manageable number.

Once I found some TLDs I liked, I went usually to Marcaria to get a sense for how expensive they were. After **a lot**
of filtering and pondering, I ended up finally going with [lima.gl](https://lima.gl) as the new domain name, bought at
[gandi.net](https://gandi.net/) which had a decent price for it.

**Note**: I have no affiliation whatsoever with 101domain, Marcaria, GoDaddy or Gandi.

My main reason for going with `.gl` was that, since "Gall" is my wife's last name, "gl" is a nice way to represent that, plus:

- GL is the TLD for Greenland which is cool 😃
- GL is internet slang for "good luck" which is also cool

# Moving to lima.gl

I've been using [GitHub Pages](https://pages.github.com/) for hosting my personal website for a while now. It's great
if you're well versed with Github and Git, and it's free. I've been also using [Jekyll](https://jekyllrb.com/) as the static
site generator, which is also pretty good.

Now I'm going back to good ol' [Rails](rubyonrails.org) for this new website, because I'm a masochist and I like to do
things the hard way. (This sentence was brought to you by Github Copilot AI's sense of humor. Not bad 😂)

In order to bridge that gap between Jekyll and Rails, I ended up bridging the Jekyll website to Rails using a Rack Application.
The code is fairly straightforward actually (Ruby types thanks to [sorbet](https://sorbet.org)):

```ruby
# /app/lib/static_blog_application.rb
# frozen_string_literal: true
# typed: strict

# A Rack application that routes requests to static files in a directory on the filesystem.
class StaticBlogApplication
  extend T::Sig

  RackEnvironment = T.type_alias { T::Hash[T.untyped, T.untyped] }

  # @param [String] path_prefix: the path prefix to match on the URL (eg "/blog")
  # @param [String] dest_path: the path to the static files directory on the filesystem (eg "public/blog")
  sig { params(path_prefix: String, dest_path: String).void }
  def initialize(path_prefix:, dest_path:)
    @path_prefix = T.let(path_prefix, String)
    @dest_path = T.let(dest_path, String)
    @backend = T.let(Rack::Files.new(@dest_path), Rack::Files)
  end

  sig { params(env: RackEnvironment).returns(T::Array[T.untyped]) }
  def call(env)
    env["PATH_INFO"] = path_info(env).sub(@path_prefix, "")
    if path_info(env).empty? || path_info(env).end_with?("/")
      env["PATH_INFO"] += "index.html"
    end
    response = @backend.call(env)
    if response[0] == 404
      # if we failed to find a matching file (eg when PATH_INFO doesn't end with '/'), try index.html before giving up
      env["PATH_INFO"] += "/index.html"
      @backend.call(env)
    else
      response
    end
  end

  private

  sig { params(env: RackEnvironment).returns(String) }
  def path_info(env)
    env["PATH_INFO"]
  end
end
```

```ruby
# /config/routes.rb
match(
  '(/*path)',
  to: StaticBlogApplication.new(
    path_prefix: "",
    dest_path: 'public/felipecsl/'
  ),
  via: :all,
  constraints: { subdomain: 'felipe' }
)
```

With this setup, I can map the subdomain `felipe.lima.gl` to the path `public/felipecsl`, which is where the Jekyll blog
files are generated. Then, to tie it all up together, build the blog with `bundle exec jekyll build -s felipecsl`.
You'll also need to set `destination: public/felipecsl` in the Jekyll config file `_config.yml`. That's it!

Anyways, I'm still working on the migration and setting things up on the new domain. This article is just the first step.
As I dug into this logo ideation rabbit hole I started diving deeper into 3D frameworks, Three.js, shaders, GLSL, etc.,
but that's a topic for another article. I made a simple 3D rendering at [lima.gl](https://lima.gl) wich you can play
with in the meantime.

![logo 3d](/images/2023/05/logo-3d.png)

✌️ thanks for reading!

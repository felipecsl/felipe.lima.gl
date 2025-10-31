---
layout: post
title: "Breaking up with big tech: A year into homelabbing"
date: 2025-10-31 10:31
comments: true
categories:
---

I have a completely random new hobby that I’ve picked up over the past year or so:

Homelabbing.

## How it started

I call it "random" because I didn't know this was a thing before I started. To me, it's always been "I have a desktop PC at home and like to tinker with it for fun." I haven't had one in a long time—probably since my early twenties, when laptops became ubiquitous. I ported my life to the cloud and ditched my home PC.

Being fully mobile has its benefits, but I've grown increasingly worried about how much big tech companies know about me. Google basically owns my life: Gmail, Messages, Drive, Photos, Calendar, Contacts, Google Fi—the list goes on. My entire life is there. They certainly know more about me than I know about myself, which is scary.

I've been thinking more about breaking that dependency. Buying a desktop PC off Craigslist in May 2024 was the first step. At the time, I inventoried my most heavily used Google services:

- Google Drive: 13.2 GB
- Gmail: 8.7 GB
- Google Photos: 106.5 GB

Gmail will probably be the hardest of these three, so I decided to start with Google Photos—I had a clear migration path: move to [Immich](https://immich.app/).

The migration turned out to be less daunting than I expected. [Google Takeout](https://takeout.google.com) made the whole process much more approachable. I'm definitely grateful for that tool.

## NAS

I started by getting a [NAS](https://en.wikipedia.org/wiki/Network-attached_storage) on eBay, which opened up another huge rabbit hole. [Michael Lynch's](https://mtlynch.io/budget-nas/) excellent blog post helped me a ton—go read it if you're interested, as it goes into much more depth on this topic.

I ended up with a HPE ProLiant MicroServer Gen10 Plus v2 G6405 2-core 1P 16GB-U VROC - P69102-005. It's probably overpowered (and overpriced) for running [TrueNAS](https://www.truenas.com/), but I like the build quality and form factor—it's quite small and the hardware is "enterprise grade," which hopefully means it's built to last. It has 21TB of usable storage, which should last me a few years at least.

![image.png](/images/2025/10/nas.png)

Before I jumped into homelabbing, I had no idea there was an entire [community](https://www.reddit.com/r/homelab/) around it, with tons of content online. It's been perfect for scratching both my nerd itch and my self-reliance itch at the same time!

## How it’s going

Here’s the server config I landed on, as of today, after a few minor upgrades along the way:

- CPU: Intel Core i7-13700K
- GPU: Gigabyte GeForce RTX 4080 16GB
- RAM: Teamforce RGB 64GB 3200MHz DDR4
- Motherboard: [MSI Z790-P DDR4](https://us.msi.com/Motherboard/PRO-Z790-P-DDR4/Specification)
- Air Cooler: 2x Noctua NF A12x25
- Storage: WD_black sn850X 1TB SSD + Seagate Barracuda Pro 12TB HDD SATA
- Power: NZXT C750
- Case: NZXT H7
- Ubuntu 25

It’s a pretty beefy server, capable of running the full workload and not even break a sweat 🥵.

After migrating all my photos to Immich, I started thinking of other low hanging fruit I could [self host](https://www.reddit.com/r/selfhosted/). Fast forward about a year, I ended up with this ever growing list of running services 😅:

- Finances - Self-hosted personal finances management (private, custom built)
- [Frigate](https://frigate.video/) - NVR with AI object detection plus some [Amcrest](https://www.amazon.com/dp/B0BMWFTFLS) cameras
- [Glances](https://nicolargo.github.io/glances/) - System monitoring tool
- [Gluetun](https://github.com/qdm12/gluetun) - VPN client and router
- [Homepage](<[https://gethomepage.dev/](https://gethomepage.dev/)>) - App dashboard
- [Home Assistant](<[https://www.home-assistant.io/](https://www.home-assistant.io/)>) - Home automation
- [Immich](https://immich.app/) - Self-hosted photo and video backup
- [Jackett](https://github.com/Jackett/Jackett) - Torrent tracker indexer
- [Ollama](https://ollama.com/) - Local LLM server
- [Open Web UI](https://openwebui.com/) - Local LLM chat interface
- [Pi-Hole](https://pi-hole.net/) - Network-wide ad blocker
- [QBittorrent](https://www.qbittorrent.org/) - Torrent client
- [Docker Registry](https://docs.docker.com/registry/) - Private Docker image registry
- [Traefik](https://traefik.io/) - Reverse proxy and load balancer
- [Tailscale](<[https://tailscale.com/](https://tailscale.com/)>) - Private VPN
- [Vaultwarden](https://vaultwarden.com/) - Self-hosted password manager
- [Watchtower](https://github.com/containrrr/watchtower) - Automatic container updates

That's quite a list! Everything runs smoothly with Docker Compose 😍—except for Home Assistant, which runs HAOS on its own VirtualBox VM (the Docker installation can't run add-ons, which was a deal breaker for me).

I also registered my own homelab domain with [AWS Route 53](https://aws.amazon.com/route53/) and pointed it to my Tailscale server IP. Now I can access my home network from anywhere on my phone or laptop, as long as I'm connected to Tailscale. Complete with TLS from [Let's Encrypt](https://letsencrypt.org/)!

Not gonna lie, it's a pretty sweet setup! For example, I can navigate to [`photos.lab.example.com`](http://photos.lab.example.com) (not my actual domain, of course) and connect to any of the services above, since they all sit behind the Traefik reverse proxy.

## Next steps

While I’m pretty happy with my current setup, there’s still a long list of cloud services I’d like to get rid of. Namely, Gmail and Drive are probably next on my list for 2026. I’ve also been working on a way to make it much easier to launch and run my own private apps in my home network with a single command. The pitch is:

<aside>
💡

What if you could have your own private [Heroku](https://www.heroku.com/) running in your homelab? That’s why I started working on `hl` (short for “homelab”).

</aside>

My goal is to `hl init appname`, `git remote add production ssh://homelab/app.git` then `git push production master` which builds the Docker image, sets up a `systemctl` service and starts it up behind Traefik. Then, I could immediately go to [`appname.lab.example.com`](http://appname.lab.example.com) and see it running in my VPN automagically. This is already possible today, but I’d like to expand on it so it’s more useful over time and hopefully useful for other people as well!

If you’d like to try it, check out the [Github repo](https://github.com/felipecsl/hl) and let me know! Contributions are always welcome.

\*Disclaimer: An LLM was used to help improve my writing. Nevertheless, rest assured this article was crafted by a human (myself) 🤖.

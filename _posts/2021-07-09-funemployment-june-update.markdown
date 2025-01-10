---
layout: post
title: "Funemployment June Update"
date: 2021-07-09 13:56
comments: true
categories:
---

June marked the second full month of (f)unemployment since I quit my job last April. I wanted to share here an update on how things are going, trips, work, finances and other life updates.

## **Personal**

On [my last update](https://felipecsl.com/2021/05/16/funemployment-first-30-days.html), I shared the news about my mom's ankle accident and surgery. After flying back to Seattle and going on a lovely one week trip to the beautiful [Puerto Vallarta](https://en.wikipedia.org/wiki/Puerto_Vallarta) with my girlfriend, again I received unexpected bad news about my mom's health and had to return to Brazil again for another last minute trip. Turns out that she had another emergency due to a [postoperative complication](https://www.mayoclinic.org/diseases-conditions/pulmonary-embolism/symptoms-causes/syc-20354647), which was incredibly worrying. She's luckily no longer at risk right now and already left the hospital, but I'll be in Brazil for the rest of July to help with her recovery.

I'm lucky to be unemployed right now, which means I have the time and flexibility to help as much as needed. Nevertheless, It's been a stressful time that completely stripped the "fun" out of "funemployment". This has been an especially tough moment for me with all this craziness but I'm trying to remain calm and focused, despite all the sad news. I'm lucky that my mom is alive and well and that's all that matters right now.

## **Finances**

June was also the first month that I've tracked **both** my income and expenses in great detail. A few months ago I started using [beancount](https://beancount.github.io/) to track all my expenses and I've been enjoying it a lot. All the data is tracked in a private Github repository and I get granular access to all expenses by month, category, account, etc. It's much better than other commercial tools I've tried (eg.: [Mint](https://beancount.github.io/)) but it certainly requires a bigger upfront investment in learning the tool and organizing your workflow.

At the end of every month I export my credit card statements from my bank website and import it into a beancount file using a [CSV importer](https://github.com/ArthurFDLR/beancount-chase). The process is not very straightforward and certainly requires some tweaking and hacking around, but now I feel confident that I'm used to the process and know what to do every time. My most common expenses are automatically categorized according to the statement descriptor text to avoid the repetitive and time consuming work of manually going over each one and assigning an expense category, eg.: any expense with `STARBUCKS` is set to `Expenses:Food:Coffee`, `AIRBNB` is set to `Expenses:Travel:Lodging`, `UBER` is set to `Expenses:Transportation:Rideshare`, so on and so forth. This has saved me a lot of time.

After I'm done importing everything, I can then visualize my income statement and balance sheet in a web dashboard using [Fava](https://beancount.github.io/fava/). Overall the tool is very flexible and you're able to completely customize it to your needs.

<div class="text-center">
  <img src="/images/2021/06/expenses-june-2021.png" title="June/2021 expenses" />
  <small>June/2021 expenses</small>
  <br/>
  <br/>
</div>

In June I had ~$ 7k in expenses, which was a lot higher than my usual, due to additional travel costs (airfare, lodging, etc). On the other hand, I had very consistent positive trading returns (~95% success rate), which amounted to ~$19k in trading profit, leaving an overall net profit for June of:

<div class="text-center">
  <img src="/images/2021/06/income-june-2021.png" />
  <small>June/2021 income</small>
  <br/>
  <br/>
</div>

```
Expenses (A): -$7,031.57
Income   (B):  $19,018.10
              ------------
Profit (A+B):  $11,986.53
```

## **Work**

As part of being able to properly and accurately track my trading profits and losses, in June I resumed working on [stocks.dog](http://stocks.dog), which I had started back in 2020 as a fun side project but never actually knew what to do with it. The project had been in an abandoned state for a few months but now I've completely pivoted it into a tool for options traders (like me!) to be able to track their performance, analyze returns and better follow their strategies.

As a result, I've started turning it into exactly the tool I wish I had, with the hopes that later down the road other people might find it useful as well. I haven't officially launched [stocks.dog](http://stocks.dog) yet since I'm still actively working on it, but I'll keep sharing updates here. If you trade options, especially as a seller (eg.: using "the wheel" or [theta gang](http://reddit.com/r/thetagang) strategy) and you use [TD Ameritrade](http://tdameritrade.com) as your broker, please get in touch! I'd love to hear your feedback on it.

---

<br/>

Between trading, working on [stocks.dog](http://stocks.dog), motorcycling and taking care of my mom, life's been keeping me plenty busy recently. Lastly, I'm taking a short break from crypto deep-diving right now, as it can be overwhelming to keep up with an avalanche of news, FUD, new projects and technologies on a daily basis. One article, though, that I **really** enjoyed reading recently was [Zero Knowledge](https://www.notboring.co/p/zero-knowledge), from Packy McCormick's Not Boring newsletter. It was extremely interesting and I learned a ton from it.

That's about it for June!

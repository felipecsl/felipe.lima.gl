---
layout: post
title: "The balance sheet that lets me not work"
date: 2026-05-05 10:31
comments: true
categories:
---

> _Disclaimer: This is not financial, tax, or investment advice. It is a description of how I structure my own balance sheet, with risks I understand and accept for my situation. Borrowing against BTC, using DeFi protocols, and buying preferred stocks can all lose money or create tax consequences. Do your own work and talk to qualified professionals before copying any part of this._

I've never sold a single sat — not because I never needed cash, but because I never needed to sell to get it.

For most of the last decade, my wife and I both worked, ongoing expenses came out of ongoing income, and the BTC stack just sat there doing what it does. Then I started a sabbatical, our household dropped to a single income, and a few months in we got hit with an unexpected tax bill bigger than our checking account.

We covered it. The stack is still intact. The bills are still paid. This article is about how.

## Why not just sell?

A small sale would have covered the tax bill with room to spare, and the dent in the stack would have been minor. So why bother?

1. **Conviction.** I've spent [years](/2021/01/01/bitcoin.html) accumulating a position in what I believe is the best long-term store of value available. Selling to fund consumption — even a tax bill, even a sabbatical — is liquidating the future to pay for the present. If the thesis is right, every sat sold today is many more sats foregone in a decade. The whole point of accumulating a scarce asset is to _not_ sell it under normal circumstances. A tax bill isn't an extraordinary circumstance.
2. **Tax drag.** Every sale is a taxable event. After years of accumulation, the cost basis on most of the stack is deep enough that selling realizes a meaningful gain. That gain compounds the original problem: the tax bill that prompted the sale generates a new tax bill the following April. Selling appreciated BTC to pay taxes is a cycle that gets worse the longer you've held — exactly the opposite of how a good capital structure should behave.
3. **Optionality.** Once converted to dollars and spent, it's gone. While it's still on the balance sheet, it's collateral, it's optionality, it's a reserve. Every dollar of expense covered without selling preserves the entire future of that capital, not just its current value. The stack is more useful as collateral than it ever would be as cash.

The structure below falls out of these three points almost by necessity. If you don't sell appreciated BTC and you have ongoing expenses, you need a way to turn the stack into cash flow without touching the principal. That's the whole problem. The rest of this post is the answer.

## The structure

Three working layers, one output. The diagram shows how capital moves through them; each paragraph after explains what one layer is doing.

![conceptual_structure.svg](/images/2026/05/btc_carry_trade_conceptual_structure.svg)

**BTC collateral.** The stack sits on permissionless lending protocols — primarily [Aave v3][aave-v3] and [Morpho][morpho]. These accept BTC as collateral and lend stablecoins against it, governed by smart contracts and over-collateralization rather than counterparty trust. The stack itself doesn't move when you borrow against it. It's locked in a smart contract, but it's still your BTC, and the position can be unwound at any time by repaying the loan.

**Stablecoin debt.** Against the BTC collateral, I borrow [USDC][usdc]. The borrow is variable-rate, and the rate moves with utilization in the lending market. The borrowed dollars are mine to deploy however I choose; the protocol doesn't care what they're used for. The ratio between borrow size and collateral value, called the health factor, is the key risk dial. More on that later.

**Yield vehicles.** The borrowed USDC is deployed into Bitcoin treasury preferred stocks — publicly traded preferreds issued by companies whose treasuries hold Bitcoin and are over-collateralized. The two I hold are [STRC][strc], issued by [Strategy][strategy] (formerly MicroStrategy), and [SATA][sata], issued by [Strive, Inc.][strive]. Both pay monthly distributions at yields well above current borrow costs. Holding them roughly half-and-half spreads issuer risk while keeping the blended yield in the same band.

**The output.** Distributions land in the brokerage every month. Some of it covers living expenses, some compounds back into more shares, and the cycle continues. The carry — the spread between what the preferreds pay and what the loan costs — is the engine. As long as the spread stays positive and the collateral stays healthy, the structure produces cash flow indefinitely. The stack does not move.

---

That's the structure at a high level. Operationally, getting BTC into the system and dollars out of it involves a few more steps:

![operational_pipeline.svg](/images/2026/05/btc_carry_trade_operational_pipeline.svg)

The on-ramp moves native BTC from cold storage onto a centralized exchange, swaps it for a wrapped form like [`WBTC`][wbtc] or [`cbBTC`][cbbtc], and bridges that token into a self-custody wallet where it can be deposited into Aave or Morpho. The off-ramp runs in reverse: USDC distributions arrive in the brokerage from the preferreds, get converted to dollars at an exchange when needed, and ACH out to a bank account.

Two friction points worth treating carefully. The on-ramp is where custodian risk lives: `WBTC` depends on BitGo honoring redemption, `cbBTC` depends on Coinbase. That's a different kind of trust assumption than the protocol risk on Aave or Morpho, and the choice of wrapped token deserves its own post. The off-ramp is where most of the operational tax and timing questions live — when to convert, how much to keep in stablecoins versus dollars, how to think about reserve sizing across both forms. I'll cover those in a follow-up.

The pipeline is plumbing. The carry is the engine.

## What it produces

Three outputs, each useful for different reasons.

**1. Monthly cash flow.** The preferreds pay distributions monthly. They land in the brokerage on a predictable cadence, in dollar terms, regardless of where BTC is trading. The blended yield on the position sits well above the variable borrow rate on the loan, and the spread between them (the carry) is what makes the whole thing work. As long as that spread stays positive, the position generates more income than it costs to hold. For our household, the carry covers ongoing expenses with room to spare. It's not passive in the sense that it requires no attention; it's passive in the sense that it doesn't require a job.

**2. Liquidity on demand.** This is what the tax bill demonstrated. When the bill came due, I didn't sell anything. I increased the size of the existing loan, withdrew the additional USDC, converted it to dollars, and paid the IRS — all within a couple of days. The stack didn't move. No realized gain, no fire sale into whatever price BTC happened to be trading at that week. Over the following months, the additional borrow gets paid down out of distribution income.

The general point: any large unexpected expense — a tax bill, a medical event, a major repair — can be funded by temporarily increasing the borrow rather than liquidating the underlying asset. The collateral stays in place. The carry continues. The expense gets absorbed into the existing structure rather than triggering a new round of decisions about what to sell and when.

**3. Tax treatment that compounds.** The most counterintuitive of the three, and it makes the strategy meaningfully better than the headline yield suggests.

Distributions from STRC and SATA are expected to be classified as [return of capital][return-of-capital] (ROC), which means the IRS generally treats them as the company returning your own capital to you rather than paying you income. ROC distributions aren't taxed in the year you receive them to the extent you still have basis in the shares. Instead, they reduce your cost basis, and tax is deferred until you eventually sell — at which point the gain is calculated against the lower basis. In practice: much of the cash flow arrives tax-deferred, the eventual tax event is a capital gain at a future date of your choosing, and the compounding inside the position runs with less annual tax drag.

Three outputs, one engine. The stack stays put through all of it.

## Risk management

At this point, this probably sounds either too good or too risky depending on your priors. Both reactions are reasonable. This section is about the dials that determine which one is closer to right.

**1. The health factor.** Every position on a lending protocol carries a health factor (HF) — the ratio between collateral value and borrow value, adjusted for the protocol's liquidation threshold. When HF falls below 1, the protocol liquidates a portion of your collateral to pay down the loan. This is the risk every BTC-collateralized borrower needs to understand before doing anything else.

The dial is set by how much you borrow against a given amount of collateral. Borrow aggressively and HF sits close to the liquidation line; borrow conservatively and there's significant headroom. I run a conservative HF — meaningful headroom against a fast drawdown, with capacity to absorb a sharp drop in BTC price without forced selling. The cushion needs to be large enough to survive the worst drawdown you can plausibly imagine, not the average one. Liquidation isn't as catastrophic as it sounds — the protocol sells a portion of the collateral, not all of it — but forced selling at the worst possible moment is exactly what this entire structure exists to avoid.

**2. The reserve.** A cash reserve held outside the carry engine, sized as a percentage of outstanding debt rather than an absolute number. If BTC drops sharply and HF compresses, the reserve can be deployed to pay down a portion of the loan immediately, restoring headroom without selling a single sat.

The reserve doesn't earn the full carry — it sits in conservative stablecoin vaults that produce a modest return, and that yield drag is real. I think of it as an insurance premium: it doesn't pay for itself in normal markets; it pays for itself by preventing the one moment in a decade when you'd otherwise be forced to make a bad decision. I size it at roughly 15-20% of outstanding debt — enough to absorb a significant drawdown without panic, small enough that the yield drag stays modest. Set this dial yourself based on your own drawdown tolerance and conviction.

**3. The same-asset hedge.** This dial is structural rather than active, and it's the insight that makes the whole structure less fragile than it might look.

The collateral is BTC. The debt is dollars. If BTC drops, the dollar value of the collateral falls but the dollar size of the debt is unchanged — that's what compresses HF. But here's the structural piece: if the goal is to _eventually unwind the loan in BTC terms_ (repay it from future BTC appreciation rather than from current dollar income), the BTC drawdown is exactly when the debt becomes cheaper in BTC terms. A loan that costs 1 BTC today costs 0.5 BTC if the price doubles, 2 BTC if it halves. The drawdown that's compressing your HF today is the same drawdown that's making the loan cheaper to repay tomorrow.

This isn't a substitute for HF discipline — you still have to survive the drawdown to benefit from the recovery. But it reframes what the borrow actually is. You're not "in debt"; you're short dollars and long BTC, with a stablecoin liability whose BTC-denominated cost moves inversely to the asset you're long.

**4. Carry compression.** Slower and less dramatic. The carry is what makes the structure economic. If borrow rates spike or distribution yields compress, the spread narrows. If it goes negative, the engine stops producing income and starts costing money to run.

The management is mostly attention: monitor borrow rates, watch issuer dynamics, be willing to delever or rotate if the carry collapses for structural rather than transient reasons. A short-term utilization spike is something to wait through; a sustained inversion is something to act on.

---

Most of the risks here aren't market risks in the conventional sense. The structure is robust to BTC volatility — that's what the health factor and the same-asset framing are for. The risks that matter are operational and structural: managing the collateral cushion, keeping a reserve, monitoring the carry, making thoughtful protocol choices on the wrap and the lending venue. None of these is dramatic. All are continuous. The strategy doesn't blow up in a single moment; it works or it doesn't based on whether the dials are watched.

The structure isn't risk-free. It's risk-shaped. The shape is one I'm comfortable with at the size I run it.

## Who this isn't for

The strategy works for a specific kind of operator with a specific kind of capital, and it doesn't generalize down. If you recognize yourself in any of these, the right move is to find a different vehicle for your capital.

- **Your stack isn't large enough for the math to work.** The carry produces a percentage spread, not a fixed dollar amount. Below a certain stack size, the absolute income doesn't justify the operational overhead — gas costs, monitoring time, tax complexity, mental load. If your BTC position is small enough that a 5% drawdown wouldn't change your sleep but the resulting carry wouldn't change your life either, the strategy isn't for you.
- **Smart contract risk keeps you up at night.** The structure depends on permissionless lending protocols continuing to function as designed. Aave and Morpho have years of operational history and significant audit footprints, and I've made my peace with the residual risk. Some people reasonably haven't. If meaningful capital exposed to smart contract bugs, oracle failures, or governance attacks is something you'd lose sleep over, that's information. Don't override it.
- **You'd panic-close in a real drawdown.** The strategy survives a 50% drawdown if the operator doesn't intervene at the worst moment. Operators who unwind the moment things look ugly turn a survivable drawdown into a realized loss — exactly the failure mode the structure was built to avoid. Self-knowledge matters more here than analytical understanding. If you've panic-sold before, you'll panic-close this.
- **This would be your survival capital, not your excess capital.** The most important filter. A strategy that depends on not being forced to liquidate during drawdowns can only be run with capital you can afford to have at risk. If a bad year would mean rent issues, tuition issues, or runway issues, do not run it. The structure produces income on excess capital; it cannot turn working capital into something safer than it is.
- **Your conviction in BTC is shakier than you'd like to admit.** The quiet disqualifier most operators skip. The strategy borrows dollars against BTC and depends on the thesis playing out over multi-year horizons. Weak conviction shows up at the worst moments — selling collateral into drawdowns, closing the position when the carry compresses temporarily, second-guessing during macro volatility. The structure rewards conviction and punishes its absence. If you're not sure where you stand, find out before building leverage on top of the position.

## Closing thoughts

My sabbatical is funded by the structure described above. Bills paid, stack intact, distributions arriving monthly, tax bill absorbed without panic. None of that was hypothetical when I started writing this — it's the actual operating reality of the past several months.

Understanding the strategy and running it are different problems. The structure has many small decisions that aren't visible at the level of a blog post: which lending protocol to use for which slice, how to size the wrap relative to the borrow, how to think about reserves across stablecoin vehicles, how to manage the off-ramp, when to delever and when to hold. Most of these don't have right answers — they have answers that fit your situation, your tolerance, and your existing balance sheet. Working through them yourself is entirely possible. It's also slower and more error-prone than working through them with someone who's already operated through the relevant scenarios.

A small number of operators have asked me to think through this with them for their own situations. Some of those conversations turn into ongoing structures; some turn into a single working session and a clean answer. If you're considering whether something like this fits your capital, and you'd find it useful to work through it with someone who's running it, I'm reachable at __carry.degrading227@passmail.com__. A brief note about your situation is more useful than a generic intro.

Either way, the post above is the lay of the land. The case for not selling appreciated BTC during a sabbatical — or any other period of life that requires cash flow without principal erosion — stands on its own. I hope it's useful.

[aave-v3]: https://aave.com/help/aave-101/accessing-aave
[morpho]: https://docs.morpho.org/
[usdc]: https://www.circle.com/usdc
[strc]: https://www.strategy.com/strc/learn
[strategy]: https://www.strategy.com/
[sata]: https://investors.strive.com/news-events/news-releases/news-details/2026/Strive-Announces-Increase-to-SATA-Perpetual-Preferred-Stock-Dividend-Rate-to-13-00-and-Bitcoin-Buy/default.aspx
[strive]: https://www.strive.com/
[wbtc]: https://wbtc.network/
[cbbtc]: https://www.coinbase.com/cbbtc
[return-of-capital]: https://www.irs.gov/publications/p550

Disclosure: I used an LLM as an editing assistant for this essay, mainly for proofreading, wording, structure, and link suggestions. The strategy described here is my own, and I reviewed and approved the final text.

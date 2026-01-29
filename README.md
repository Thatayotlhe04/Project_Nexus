# Project Nexus — Black-Scholes Option Pricing Tool
Live Demo: https://thatayotlhe04.github.io/Project_Nexus/
Project Nexus is a clean, academic-style web application that implements the **Black-Scholes model** for pricing **European call and put options**.  
It is designed as an educational and research-oriented tool, emphasizing clarity, mathematical correctness, and usability.

---

## Overview

The Black-Scholes model provides closed-form solutions for valuing European options under a set of idealized assumptions.  
This project presents the model in an interactive format, allowing users to explore how option prices respond to changes in key parameters such as volatility, interest rates, and time to maturity.

The interface is intentionally minimal and technical, avoiding trading or speculative aesthetics in favor of a finance-engineering and numerical-methods focus.

---

## Features

- Interactive **European option pricing calculator**
- Support for **both call and put options**
- Adjustable parameters:
  - Spot price (S)
  - Strike price (K)
  - Risk-free interest rate (r)
  - Volatility (σ)
  - Time to maturity (T, in years)
- Real-time computation using the Black-Scholes closed-form formulas
- Expandable sections for:
  - Mathematical formulas
  - Model assumptions
  - Conceptual overview
- Academic, corporate-friendly UI
- Fully responsive layout
- Built-in FAQ, feedback, and contact modals

---

## Mathematical Model

The calculator implements the standard Black-Scholes formulas for European options:

### Call Option
\[
C = S_0 N(d_1) - K e^{-rT} N(d_2)
\]

### Put Option
\[
P = K e^{-rT} N(-d_2) - S_0 N(-d_1)
\]

Where:
\[
d_1 = \frac{\ln(S_0/K) + (r + \sigma^2/2)T}{\sigma \sqrt{T}}, \quad
d_2 = d_1 - \sigma \sqrt{T}
\]

and \(N(\cdot)\) denotes the standard normal cumulative distribution function.

The implementation uses a numerical approximation for the normal CDF (Abramowitz–Stegun), accurate to several decimal places.

---

## Model Assumptions

The Black-Scholes framework assumes:

- The underlying asset follows geometric Brownian motion
- Constant volatility and risk-free interest rate
- No dividends during the option’s life
- Frictionless markets (no taxes or transaction costs)
- Continuous trading
- No arbitrage opportunities
- European-style options (exercise only at expiration)

These assumptions are documented within the application for transparency.

---

## Tech Stack

- **HTML5** — application structure
- **CSS3** — layout, typography, and UI styling
- **Vanilla JavaScript** — pricing logic, interactivity, and state handling
- **Google Fonts** — typography (Montserrat, Inconsolata, Raleway, Roboto Mono)

No backend or external APIs are required.

---

## Project Structure


---


---

## Intended Use

This project is intended for:
- Educational exploration of option pricing
- Demonstration of quantitative finance concepts
- Portfolio and learning purposes

It is **not** designed as a trading platform or investment decision tool.

---

## Disclaimer

This tool is provided for **educational and research purposes only**.  
It should not be used as the sole basis for any investment or trading decision.  
Option trading involves significant risk and may not be suitable for all investors.

---

## Author

**Project Nexus**  
Built by Thatayotlhe Tsenang  
📧 tsenangthatayotlhe04@gmail.com

---

## License

This project is released for educational use.  
Commercial or production use should be evaluated independently.


// ─── Blog post data ───────────────────────────────────────────────────────────
// Each post is fully self-contained — no CMS, no external fetch required.
// Add new posts by appending to BLOG_POSTS. The slug becomes the URL.

export type Block =
  | { t: 'h2'; v: string }
  | { t: 'h3'; v: string }
  | { t: 'p'; v: string }
  | { t: 'ul'; v: string[] }
  | { t: 'ol'; v: string[] }
  | { t: 'tip'; title: string; v: string }
  | { t: 'warn'; title: string; v: string }
  | { t: 'table'; headers: string[]; rows: string[][] }
  | { t: 'formula'; v: string; desc?: string }

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string          // ISO — used for display & sitemap
  readTime: number      // minutes
  category: string
  tags: string[]
  content: Block[]
  relatedCalculator?: { label: string; href: string }
  relatedSlugs?: string[]
}

// ─────────────────────────────────────────────────────────────────────────────

export const BLOG_POSTS: BlogPost[] = [

  // ── 1 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-calculate-mortgage-payment',
    title: 'How to Calculate Your Monthly Mortgage Payment (Formula + Examples)',
    description:
      'Learn the exact mortgage payment formula lenders use, see a full worked example, and understand every factor that affects your monthly payment.',
    date: '2026-04-15',
    readTime: 7,
    category: 'Mortgage Basics',
    tags: ['mortgage formula', 'monthly payment', 'amortization'],
    relatedCalculator: { label: 'Try the Mortgage Calculator', href: '/mortgage-calculator' },
    relatedSlugs: ['30-year-vs-15-year-mortgage', 'what-is-pmi-and-how-to-avoid-it'],
    content: [
      { t: 'p', v: 'Every lender uses the same core formula to calculate your monthly mortgage payment. Understanding it lets you estimate payments yourself, verify lender quotes, and make smarter decisions about loan term and down payment.' },
      { t: 'h2', v: 'The Mortgage Payment Formula' },
      { t: 'p', v: 'The standard formula for a fixed-rate mortgage monthly payment is:' },
      { t: 'formula', v: 'M = P × [r(1 + r)ⁿ] / [(1 + r)ⁿ − 1]', desc: 'M = monthly payment · P = principal loan amount · r = monthly interest rate (annual rate ÷ 12) · n = number of payments (years × 12)' },
      { t: 'p', v: 'This formula is called the standard amortization formula. It ensures every payment is identical while the portion going to principal vs. interest shifts each month — early payments are mostly interest, later payments are mostly principal.' },
      { t: 'h2', v: 'Worked Example: $400,000 Home' },
      { t: 'p', v: 'Let\'s calculate the monthly payment on a $400,000 home with 20% down ($80,000), leaving a $320,000 loan at 6.75% annual interest over 30 years.' },
      { t: 'ol', v: [
        'Convert annual rate to monthly: r = 6.75% ÷ 12 = 0.5625% = 0.005625',
        'Calculate number of payments: n = 30 × 12 = 360',
        'Apply the formula: M = 320,000 × [0.005625 × (1.005625)³⁶⁰] / [(1.005625)³⁶⁰ − 1]',
        'Result: Monthly payment = $2,075 (principal & interest only)',
      ]},
      { t: 'tip', title: 'Real total cost', v: 'At $2,075/month for 360 months, you pay $747,000 total — $427,000 in interest on a $320,000 loan. That\'s why choosing the right rate and term matters enormously.' },
      { t: 'h2', v: 'What the Formula Doesn\'t Include (PITI)' },
      { t: 'p', v: 'The formula above gives you principal and interest (P&I) only. Your actual monthly housing payment is usually PITI:' },
      { t: 'table',
        headers: ['Component', 'Typical Amount', 'Notes'],
        rows: [
          ['Principal & Interest', '$2,075', 'From formula above'],
          ['Property Tax', '$375', '~1.1% of home value ÷ 12'],
          ['Homeowners Insurance', '$125', '~0.4% of home value ÷ 12'],
          ['PMI (if LTV > 80%)', '$0–$267', 'Drops off once you reach 20% equity'],
          ['HOA Fees', 'Varies', 'Condo/community specific'],
          ['Total PITI', '~$2,575', 'Realistic all-in monthly cost'],
        ],
      },
      { t: 'h2', v: '5 Factors That Change Your Payment' },
      { t: 'ul', v: [
        'Loan amount — Every $10,000 more costs roughly $65/month at 6.75%',
        'Interest rate — A 1% rate increase on a $320k loan adds ~$200/month',
        'Loan term — A 15-year loan has higher payments but saves $150k+ in interest',
        'Down payment — 20%+ down eliminates PMI and reduces the loan principal',
        'Property taxes & insurance — These vary by location and insurer',
      ]},
      { t: 'h2', v: 'First Payment Breakdown' },
      { t: 'p', v: 'On your very first payment of $2,075, here\'s where the money goes:' },
      { t: 'table',
        headers: ['Destination', 'Amount', 'Percentage'],
        rows: [
          ['Interest (Month 1)', '$1,800', '86.7%'],
          ['Principal (Month 1)', '$275', '13.3%'],
          ['Remaining Balance', '$319,725', '—'],
        ],
      },
      { t: 'p', v: 'By month 180 (year 15), the split flips: roughly $1,100 goes to principal and $975 to interest. This crossover is why extra payments in early years are so powerful — they directly reduce the principal that generates future interest.' },
      { t: 'h2', v: 'How to Use This in Practice' },
      { t: 'ul', v: [
        'Use our Mortgage Calculator to instantly run any scenario with taxes and insurance',
        'Compare 15-year vs 30-year payments side by side',
        'See how an extra $200/month cuts years off your loan',
        'Check how different down payments affect PMI and total cost',
      ]},
      { t: 'warn', title: 'Estimates only', v: 'Calculator results and the worked example above are for educational purposes. Your actual rate depends on your credit score, lender, loan type, and market conditions at time of application.' },
    ],
  },

  // ── 2 ─────────────────────────────────────────────────────────────────────
  {
    slug: '30-year-vs-15-year-mortgage',
    title: '30-Year vs 15-Year Mortgage: Which Is Right for You in 2026?',
    description:
      'Compare monthly payments, total interest costs, and break-even timelines for 30-year vs 15-year mortgages to find the best fit for your budget.',
    date: '2026-04-22',
    readTime: 6,
    category: 'Mortgage Basics',
    tags: ['loan term', '15-year mortgage', '30-year mortgage', 'interest savings'],
    relatedCalculator: { label: 'Compare Terms with the Mortgage Calculator', href: '/mortgage-calculator' },
    relatedSlugs: ['how-to-calculate-mortgage-payment', 'biweekly-vs-monthly-mortgage-payments'],
    content: [
      { t: 'p', v: 'Choosing between a 30-year and 15-year mortgage is one of the most consequential decisions in the home-buying process. The right answer depends on your income stability, financial goals, and how long you plan to stay in the home.' },
      { t: 'h2', v: 'Side-by-Side Comparison' },
      { t: 'p', v: 'Using a $320,000 loan (a $400,000 home with 20% down) with representative 2026 rates:' },
      { t: 'table',
        headers: ['', '30-Year Mortgage', '15-Year Mortgage'],
        rows: [
          ['Rate (2026 avg)', '6.75%', '6.10%'],
          ['Monthly Payment (P&I)', '$2,075', '$2,717'],
          ['Monthly Difference', '—', '+$642 more'],
          ['Total Interest Paid', '$427,000', '$169,000'],
          ['Interest Savings', '—', '$258,000 saved'],
          ['Payoff Date', '2056', '2041'],
        ],
      },
      { t: 'h2', v: 'Why 15-Year Rates Are Lower' },
      { t: 'p', v: 'Lenders take on less risk with shorter-term loans — you\'re borrowing money for half as long, so there\'s less chance of default or rate fluctuation. That reduced risk translates to interest rates that are typically 0.5%–0.75% lower than 30-year rates, which amplifies the savings.' },
      { t: 'h2', v: 'The Case for a 30-Year Mortgage' },
      { t: 'ul', v: [
        'Lower required monthly payment gives you cash flow flexibility',
        'The $642/month difference can be invested — in the stock market at 8% average return, that grows to $750,000+ over 15 years',
        'Better buffer if income drops (job loss, medical, family)',
        'You can always make extra payments to pay it off early',
        'Mortgage interest deduction (for those who itemize taxes)',
      ]},
      { t: 'h2', v: 'The Case for a 15-Year Mortgage' },
      { t: 'ul', v: [
        '$258,000 less in interest — guaranteed, risk-free "return"',
        'Builds equity twice as fast — great for retirement planning',
        'Paid off 15 years sooner (mortgage-free at 50 vs. 65 for a 35-year-old)',
        'Lower rate reduces monthly payment more than you\'d expect',
        'Psychological value of being debt-free',
      ]},
      { t: 'tip', title: 'The "invest the difference" math', v: '$642/month invested at 8% annual return over 15 years = $216,000. The 15-year saves $258,000 in interest. The 15-year wins — but only if you wouldn\'t actually invest that $642 each month.' },
      { t: 'h2', v: 'When a 30-Year Makes More Sense' },
      { t: 'p', v: 'Choose a 30-year mortgage if any of these apply:' },
      { t: 'ul', v: [
        'Your income is variable (self-employed, commission-based)',
        'You have high-interest debt (credit cards, student loans) to pay off first',
        'You plan to move within 10 years (you\'ll likely sell before the 15-year advantage kicks in)',
        'The higher 15-year payment would stretch your budget past 28% of gross income',
        'You have strong investment discipline and will deploy the difference',
      ]},
      { t: 'h2', v: 'When a 15-Year Makes More Sense' },
      { t: 'p', v: 'Choose a 15-year mortgage if:' },
      { t: 'ul', v: [
        'You have stable, reliable income (W-2 employment)',
        'You\'re within 20 years of retirement and want to enter it debt-free',
        'The 15-year payment is under 30% of your gross monthly income',
        'You already max out retirement accounts (401k, IRA)',
        'You want the lower rate and faster equity building',
      ]},
      { t: 'h2', v: 'The Hybrid Approach: 30-Year with Extra Payments' },
      { t: 'p', v: 'Many homeowners get the best of both worlds: take a 30-year mortgage for the lower required payment, then pay an extra $500–$642/month voluntarily. This pays off the loan in roughly 20 years, saves six figures in interest, and preserves flexibility — if money gets tight one month, you simply skip the extra payment. Use our mortgage calculator to see exactly how much extra payments accelerate your payoff.' },
      { t: 'warn', title: 'Check for prepayment penalties', v: 'Before committing to extra payments, verify your loan has no prepayment penalty. Most conventional loans today do not, but some non-QM and older loans still carry them.' },
    ],
  },

  // ── 3 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'what-is-pmi-and-how-to-avoid-it',
    title: 'What Is PMI? How Private Mortgage Insurance Works and How to Avoid It',
    description:
      'PMI can add hundreds to your monthly payment. Learn exactly what it costs, when it applies, and 5 proven strategies to eliminate or avoid it entirely.',
    date: '2026-04-28',
    readTime: 6,
    category: 'Mortgage Basics',
    tags: ['PMI', 'private mortgage insurance', 'LTV', 'down payment'],
    relatedCalculator: { label: 'Calculate PMI with Our Mortgage Calculator', href: '/mortgage-calculator' },
    relatedSlugs: ['how-to-calculate-mortgage-payment', 'how-much-house-can-you-afford'],
    content: [
      { t: 'p', v: 'Private Mortgage Insurance (PMI) is one of the most misunderstood homebuying costs. It\'s not insurance that protects you — it protects your lender if you default. Yet you pay for it. Here\'s everything you need to know to minimise or eliminate it.' },
      { t: 'h2', v: 'What Exactly Is PMI?' },
      { t: 'p', v: 'When you put down less than 20% of the home\'s purchase price, your loan-to-value ratio (LTV) exceeds 80%. At that level, lenders consider the loan riskier. They require you to purchase PMI, which compensates them if you stop making payments and the home sells for less than you owe.' },
      { t: 'p', v: 'PMI is typically paid monthly as part of your mortgage payment, though some lenders offer upfront or split-premium options.' },
      { t: 'h2', v: 'How Much Does PMI Cost?' },
      { t: 'p', v: 'PMI typically costs 0.5%–1.5% of the original loan amount per year, depending on your credit score, LTV, and loan type.' },
      { t: 'table',
        headers: ['Loan Amount', 'PMI Rate', 'Annual PMI Cost', 'Monthly PMI'],
        rows: [
          ['$250,000', '0.5%', '$1,250', '$104'],
          ['$320,000', '0.8%', '$2,560', '$213'],
          ['$400,000', '1.0%', '$4,000', '$333'],
          ['$500,000', '1.2%', '$6,000', '$500'],
        ],
      },
      { t: 'tip', title: 'Credit score impact', v: 'Borrowers with credit scores above 760 pay roughly half the PMI rate of borrowers with scores around 660. Improving your score before applying can save tens of thousands over the life of the loan.' },
      { t: 'h2', v: 'When Does PMI Go Away?' },
      { t: 'p', v: 'Under the Homeowners Protection Act (HPA), lenders must automatically cancel PMI when:' },
      { t: 'ul', v: [
        'Your LTV reaches 78% of the original purchase price (mandatory automatic cancellation)',
        'You reach the midpoint of your loan term (e.g., year 15 on a 30-year loan)',
      ]},
      { t: 'p', v: 'You can also request cancellation when your LTV drops to 80% through:' },
      { t: 'ul', v: [
        'Regular payments paying down the principal',
        'Extra payments you have made voluntarily',
        'A new appraisal showing the home has increased in value',
      ]},
      { t: 'h2', v: '5 Ways to Avoid or Eliminate PMI' },
      { t: 'h3', v: '1. Put 20% Down' },
      { t: 'p', v: 'The most direct route. On a $400,000 home that means $80,000 down. If you can\'t save that amount, consider buying a less expensive home or waiting until you have the funds. PMI on a $320,000 loan at 0.8% costs over $25,000 over the years it applies.' },
      { t: 'h3', v: '2. Piggyback Loan (80-10-10)' },
      { t: 'p', v: 'Take an 80% first mortgage, a 10% second mortgage (home equity loan or HELOC), and put 10% down. Your first mortgage never exceeds 80% LTV, so no PMI. The second mortgage carries a higher rate, but you can pay it off quickly.' },
      { t: 'h3', v: '3. Lender-Paid PMI (LPMI)' },
      { t: 'p', v: 'Some lenders pay PMI upfront in exchange for a slightly higher interest rate (typically 0.25%–0.5% higher). This can make sense if you plan to sell or refinance within 7 years — after that, the accumulated higher interest may exceed what you\'d have paid in PMI.' },
      { t: 'h3', v: '4. VA Loans (Veterans)' },
      { t: 'p', v: 'VA loans backed by the Department of Veterans Affairs require no PMI regardless of down payment. Eligible veterans and active service members can put 0% down with no PMI — one of the most valuable benefits available in mortgage financing.' },
      { t: 'h3', v: '5. Request Removal via Appraisal' },
      { t: 'p', v: 'If your home has appreciated significantly, you may reach 80% LTV faster than scheduled. Ask your lender about requesting a new appraisal — if the appraised value supports 80%+ equity, you can request PMI removal immediately rather than waiting years.' },
      { t: 'h2', v: 'PMI vs FHA MIP: What\'s the Difference?' },
      { t: 'p', v: 'FHA loans have Mortgage Insurance Premium (MIP) instead of PMI. Unlike PMI, FHA MIP cannot be cancelled on loans originated after June 2013 where the LTV was above 90% at closing — you\'d need to refinance to a conventional loan to remove it. That\'s a key reason why borrowers who qualify for conventional financing should generally choose it over FHA once they have 10%+ down.' },
      { t: 'warn', title: 'FHA loans after 2013', v: 'If you take an FHA loan with less than 10% down today, you will pay MIP for the entire 30-year life of the loan. The only exit is refinancing to a conventional mortgage once you reach 20% equity.' },
    ],
  },

  // ── 4 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'biweekly-vs-monthly-mortgage-payments',
    title: 'Biweekly Mortgage Payments: How Much Interest Can You Really Save?',
    description:
      'Switching to biweekly mortgage payments can save $30,000+ in interest and shave years off your loan. Here\'s exactly how it works and whether it\'s right for you.',
    date: '2026-05-01',
    readTime: 5,
    category: 'Payment Strategies',
    tags: ['biweekly payments', 'pay off mortgage early', 'interest savings'],
    relatedCalculator: { label: 'Try the Biweekly Mortgage Calculator', href: '/biweekly-mortgage-calculator' },
    relatedSlugs: ['30-year-vs-15-year-mortgage', 'how-to-calculate-mortgage-payment'],
    content: [
      { t: 'p', v: 'Most mortgages are structured around 12 monthly payments per year. By switching to biweekly payments — paying half your monthly amount every two weeks — you make 26 half-payments, which equals 13 full payments annually. That one extra payment per year creates surprisingly large savings.' },
      { t: 'h2', v: 'How Biweekly Payments Work' },
      { t: 'p', v: 'There are 52 weeks in a year. Paying biweekly means you pay every two weeks:' },
      { t: 'table',
        headers: ['Payment Type', 'Payments Per Year', 'Annual Total Paid'],
        rows: [
          ['Monthly ($2,075/mo)', '12', '$24,900'],
          ['Biweekly ($1,037.50 per 2 wks)', '26', '$26,975'],
          ['Extra payments per year', '—', '$2,075 (1 full payment)'],
        ],
      },
      { t: 'p', v: 'That extra $2,075 hits your principal every year. Because mortgage interest compounds daily (or monthly, depending on your loan), reducing principal early creates an accelerating snowball effect — each extra dollar reduces the balance on which future interest is calculated.' },
      { t: 'h2', v: 'Real Numbers: $320,000 Loan at 6.75% for 30 Years' },
      { t: 'table',
        headers: ['', 'Monthly Payments', 'Biweekly Payments', 'Savings'],
        rows: [
          ['Total Interest Paid', '$427,000', '$363,000', '$64,000'],
          ['Loan Payoff Time', '30 years', '25 yrs 8 mo', '4 yrs 4 mo faster'],
          ['Monthly Cash Impact', '$2,075/mo', '$2,075/mo*', '—'],
        ],
      },
      { t: 'p', v: '*Biweekly payments average out to the same monthly amount — the savings come purely from timing and that one extra annual payment.' },
      { t: 'tip', title: 'Higher rate = bigger savings', v: 'At 7.5% on the same $320,000 loan, biweekly payments save $78,000 in interest and cut nearly 5 years from the loan. The higher your rate, the more valuable biweekly payments become.' },
      { t: 'h2', v: 'How to Switch to Biweekly Payments' },
      { t: 'h3', v: 'Option 1: Ask Your Lender Directly' },
      { t: 'p', v: 'Some servicers offer a formal biweekly payment program. Ask if they can automatically split your payment. Important: confirm they apply the extra amount directly to principal, not hold it until month-end. If they hold it, you get none of the interest savings.' },
      { t: 'h3', v: 'Option 2: DIY Biweekly (Recommended)' },
      { t: 'p', v: 'Skip the lender program fees and do it yourself: make your normal monthly payment, then divide it by 12 and add that amount as an extra principal payment each month ($2,075 ÷ 12 = $173/month extra). This achieves the same result without any third-party fees.' },
      { t: 'h3', v: 'Option 3: One Extra Annual Payment' },
      { t: 'p', v: 'Simply make one extra mortgage payment per year, applied entirely to principal. Many homeowners use a tax refund or year-end bonus for this. The math is identical to biweekly payments, just structured as a lump sum.' },
      { t: 'h2', v: 'Is Biweekly Right for You?' },
      { t: 'p', v: 'Biweekly payments make the most sense when:' },
      { t: 'ul', v: [
        'You are paid biweekly and want payments aligned with your paycheck',
        'You plan to stay in the home long-term (10+ years to capture savings)',
        'Your rate is relatively high (above 6%) — savings are most dramatic',
        'You have no high-interest debt to prioritise first',
        'You want guaranteed, risk-free interest savings vs. investing',
      ]},
      { t: 'p', v: 'It may not be worth it if:' },
      { t: 'ul', v: [
        'You plan to sell or refinance within 5 years',
        'You carry credit card debt at 20%+ — pay that off first',
        'Your lender charges fees to set up biweekly payments',
        'The extra payment would create financial strain',
      ]},
      { t: 'warn', title: 'Beware third-party biweekly services', v: 'Some companies charge $300–$400 to set up biweekly payments on your behalf. This is completely unnecessary. Use the DIY method instead — it\'s free and achieves the same result.' },
    ],
  },

  // ── 5 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'how-much-house-can-you-afford',
    title: 'How Much House Can You Afford? The Complete 2026 Guide',
    description:
      'Use the 28/36 rule, DTI ratio, and real income examples to calculate exactly how much home you can afford — and avoid the mistakes that trap buyers.',
    date: '2026-05-03',
    readTime: 7,
    category: 'Buying Tips',
    tags: ['affordability', '28/36 rule', 'DTI', 'how much house can I afford'],
    relatedCalculator: { label: 'Use the Affordability Calculator', href: '/affordability-calculator' },
    relatedSlugs: ['what-is-pmi-and-how-to-avoid-it', 'first-time-home-buyer-mortgage-guide-2026'],
    content: [
      { t: 'p', v: 'The most common homebuying mistake is stretching to buy the most expensive house a lender will approve. Lender approval and genuine affordability are very different things. This guide gives you a realistic framework for determining what you can comfortably afford.' },
      { t: 'h2', v: 'The 28/36 Rule Explained' },
      { t: 'p', v: 'The 28/36 rule is the traditional benchmark used by lenders and financial planners:' },
      { t: 'ul', v: [
        '28% Rule: Your monthly housing costs (PITI — principal, interest, taxes, insurance) should not exceed 28% of your gross monthly income',
        '36% Rule: Your total monthly debt (housing + car loans + student loans + credit cards) should not exceed 36% of your gross monthly income',
      ]},
      { t: 'h2', v: 'Real Income Examples' },
      { t: 'table',
        headers: ['Annual Income', 'Gross Monthly', '28% Max Housing', 'Est. Home Price*'],
        rows: [
          ['$60,000', '$5,000', '$1,400/mo', '~$220,000'],
          ['$80,000', '$6,667', '$1,867/mo', '~$295,000'],
          ['$100,000', '$8,333', '$2,333/mo', '~$370,000'],
          ['$120,000', '$10,000', '$2,800/mo', '~$445,000'],
          ['$150,000', '$12,500', '$3,500/mo', '~$560,000'],
        ],
      },
      { t: 'p', v: '*Estimated home price assumes 20% down, 6.75% rate, 30-year term, and $500/mo in taxes and insurance.' },
      { t: 'h2', v: 'Debt-to-Income (DTI) Ratio: What Lenders Actually Use' },
      { t: 'p', v: 'Modern lenders focus heavily on your DTI ratio. There are two types:' },
      { t: 'ul', v: [
        'Front-end DTI: housing costs ÷ gross monthly income (lenders want below 28–31%)',
        'Back-end DTI: all monthly debts ÷ gross monthly income (lenders want below 43–45% for conventional loans)',
      ]},
      { t: 'p', v: 'A $100,000 income buyer with $500/month in student loans and $300/month in car payments already has $800/month in non-housing debt. Their back-end DTI ceiling leaves only $2,933 − $800 = $2,133 for housing — less than the 28% front-end rule suggests.' },
      { t: 'tip', title: 'Pay down debt before buying', v: 'Eliminating a $350/month car payment before applying for a mortgage can increase your borrowing power by $55,000–$65,000 at current rates — far more than the car is worth.' },
      { t: 'h2', v: 'The Hidden Costs Buyers Often Miss' },
      { t: 'p', v: 'When setting your budget, account for costs beyond PITI:' },
      { t: 'table',
        headers: ['Cost', 'Typical Range', 'Notes'],
        rows: [
          ['Closing costs', '2–5% of loan', 'Due at closing; some can be rolled in'],
          ['Moving costs', '$1,000–$5,000', 'Local vs. long-distance'],
          ['Immediate repairs', '$2,000–$20,000', 'Even "move-in ready" homes need work'],
          ['Maintenance reserve', '1% of home value/yr', '$4,000/yr on a $400k home'],
          ['Utilities increase', '$200–$600/mo', 'Larger home = higher costs'],
          ['Furniture & appliances', '$5,000–$20,000', 'Especially first-time buyers'],
        ],
      },
      { t: 'h2', v: 'Beyond the Rules: The "Sleep Test"' },
      { t: 'p', v: 'The 28/36 rule is a starting point, not a ceiling. Run this scenario: if you lost your job today and went two months without income, could you still make mortgage payments? If the honest answer is no, you\'re buying too much house.' },
      { t: 'p', v: 'Financial advisors often recommend a "financial test drive": before buying, set aside the full projected mortgage payment each month for 3–6 months. If you can do it comfortably without lifestyle strain, you can afford the payment. If it\'s a stretch, consider a lower price point.' },
      { t: 'h2', v: 'How Much Down Payment Do You Need?' },
      { t: 'ul', v: [
        'Conventional loan: 3–20% down (under 20% requires PMI)',
        'FHA loan: 3.5% down (with 580+ credit score)',
        'VA loan: 0% down (veterans and active military)',
        'USDA loan: 0% down (rural areas, income limits apply)',
        'Jumbo loan: typically 10–20% down',
      ]},
      { t: 'p', v: 'Putting more down reduces your monthly payment, eliminates PMI sooner, and often gets you a better rate. But don\'t drain your emergency fund to reach 20% — keeping 3–6 months of expenses in cash is more important than avoiding PMI.' },
      { t: 'warn', title: 'Don\'t max out your approval', v: 'Lenders will approve you for more than you should borrow. A lender approval is based on your income and debts — it doesn\'t account for your lifestyle, savings goals, childcare costs, or planned expenses. Set your own limit, then shop within it.' },
    ],
  },

  // ── 6 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'first-time-home-buyer-mortgage-guide-2026',
    title: 'First-Time Home Buyer\'s Complete Mortgage Guide for 2026',
    description:
      'Everything first-time buyers need to know: loan types, down payment options, pre-approval steps, credit requirements, and closing costs explained.',
    date: '2026-05-05',
    readTime: 9,
    category: 'Buying Tips',
    tags: ['first-time buyer', 'FHA loan', 'pre-approval', 'mortgage guide 2026'],
    relatedCalculator: { label: 'Calculate Your First Mortgage', href: '/mortgage-calculator' },
    relatedSlugs: ['how-much-house-can-you-afford', 'what-is-pmi-and-how-to-avoid-it'],
    content: [
      { t: 'p', v: 'Buying your first home is exciting and overwhelming in equal measure. The mortgage process involves unfamiliar terms, large numbers, and decisions that will affect your finances for decades. This guide walks you through every step in plain language.' },
      { t: 'h2', v: 'Step 1: Know Your Credit Score and History' },
      { t: 'p', v: 'Your credit score is the single biggest factor affecting your mortgage rate and approval odds. Here\'s what different score ranges mean for borrowing:' },
      { t: 'table',
        headers: ['Credit Score', 'Loan Options', 'Typical Rate Impact'],
        rows: [
          ['760+', 'All loan types, best rates', 'Best available rate'],
          ['700–759', 'Conventional, FHA, VA', 'Minor rate premium'],
          ['660–699', 'FHA preferred, some conventional', '+0.25%–0.5% above best'],
          ['620–659', 'FHA, VA (limited conventional)', '+0.5%–1.0% above best'],
          ['580–619', 'FHA with 3.5% down only', '+1.0%–1.5% above best'],
          ['Below 580', 'Very limited options', 'May not qualify'],
        ],
      },
      { t: 'p', v: 'Check your credit report for free at AnnualCreditReport.com before applying. Dispute any errors — incorrect late payments or collections can be removed and can boost your score by 20–50 points.' },
      { t: 'h2', v: 'Step 2: Understand Your Loan Options' },
      { t: 'h3', v: 'Conventional Loans' },
      { t: 'p', v: 'Not government-backed. Require 620+ credit score and 3–20% down. Private mortgage insurance required if putting less than 20% down. Best rates available to borrowers with 760+ scores and 20% down. Conforming loan limit in 2026: $806,500 in most US counties.' },
      { t: 'h3', v: 'FHA Loans' },
      { t: 'p', v: 'Backed by the Federal Housing Administration. Accept 580+ credit score with just 3.5% down (500–579 with 10% down). Have MIP (mortgage insurance premium) for the life of the loan if you put less than 10% down. Best for buyers with lower credit scores or limited savings, but refinancing to conventional once you reach 20% equity is often worthwhile.' },
      { t: 'h3', v: 'VA Loans' },
      { t: 'p', v: 'For veterans, active-duty military, and eligible surviving spouses. No down payment required. No PMI. Competitive rates. One-time funding fee (waived for disabled veterans). If you qualify, VA loans are almost always the best option.' },
      { t: 'h3', v: 'USDA Loans' },
      { t: 'p', v: 'For rural and some suburban properties. No down payment required. Income limits apply (generally up to 115% of area median income). Often overlooked — check the USDA eligibility map, as many suburban areas qualify.' },
      { t: 'h2', v: 'Step 3: Get Pre-Approved (Not Just Pre-Qualified)' },
      { t: 'p', v: 'Pre-qualification is a rough estimate based on self-reported information. Pre-approval is a verified assessment where the lender checks your credit, income, and assets. In competitive markets, sellers won\'t consider offers without a pre-approval letter.' },
      { t: 'p', v: 'To get pre-approved, gather:' },
      { t: 'ul', v: [
        'W-2s and tax returns for the past 2 years',
        'Pay stubs from the last 30 days',
        'Bank statements for the last 2–3 months (all accounts)',
        'Investment and retirement account statements',
        'Photo ID and Social Security number',
        'List of all debts (car loans, student loans, credit cards)',
      ]},
      { t: 'tip', title: 'Shop multiple lenders', v: 'Getting pre-approved by 3–5 lenders within a 14-day window counts as only one hard inquiry on your credit report (FICO treats mortgage rate shopping favorably). Rates can vary by 0.5% or more between lenders on identical loans.' },
      { t: 'h2', v: 'Step 4: Understand All the Costs' },
      { t: 'p', v: 'First-time buyers frequently underestimate total purchase costs. Budget for:' },
      { t: 'table',
        headers: ['Cost', 'Typical Amount', 'When Due'],
        rows: [
          ['Down payment', '3–20% of price', 'At closing'],
          ['Closing costs', '2–5% of loan amount', 'At closing'],
          ['Appraisal fee', '$400–$700', 'During escrow'],
          ['Home inspection', '$300–$500', 'During escrow'],
          ['Title insurance', '$500–$1,500', 'At closing'],
          ['Prepaid items (taxes, ins)', '2–6 months', 'At closing (escrow setup)'],
          ['Moving costs', '$1,000–$5,000', 'After closing'],
        ],
      },
      { t: 'h2', v: 'Step 5: The Mortgage Process Timeline' },
      { t: 'ol', v: [
        'Check credit and finances (1–2 weeks to review and fix issues)',
        'Get pre-approved by 2–3 lenders (1–3 days each)',
        'House hunt and make an offer (weeks to months)',
        'Offer accepted → open escrow (same day)',
        'Home inspection and appraisal (1–2 weeks)',
        'Loan underwriting and approval (1–3 weeks)',
        'Final walkthrough (1–2 days before closing)',
        'Closing day — sign documents, pay costs, get keys',
      ]},
      { t: 'h2', v: 'Common First-Time Buyer Mistakes to Avoid' },
      { t: 'ul', v: [
        'Opening new credit cards or financing a car during the mortgage process — this changes your DTI and can kill an approval',
        'Changing jobs before closing — lenders want 2 years of stable employment history',
        'Making large cash deposits without documentation — lenders scrutinize every deposit',
        'Skipping the home inspection to win a bidding war — a $500 inspection can save $50,000 in surprise repairs',
        'Buying right at the top of your approval limit — leave room for rate increases and unexpected costs',
        'Forgetting about ongoing costs — maintenance, property taxes, insurance, and HOA fees add up fast',
      ]},
      { t: 'warn', title: 'Don\'t change your financial profile during underwriting', v: 'From pre-approval to closing, treat your finances as frozen. No new credit applications, no large purchases, no job changes. Lenders re-verify your credit and income right before closing — any change can delay or kill the deal.' },
    ],
  },
]

// ─── Helper functions ─────────────────────────────────────────────────────────

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  if (!post.relatedSlugs?.length) return []
  return post.relatedSlugs
    .map((s) => getPostBySlug(s))
    .filter((p): p is BlogPost => p !== undefined)
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

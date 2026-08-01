---
title: "The book that finally taught me how to tell stories with data"
subtitle: "Cole Nussbaumer's 'Storytelling with Data' should be in every data professional's shelf."
author: Jose Parreño Garcia
published: 2026-01-17
source: https://joseparreogarcia.substack.com/p/storytelling-with-data-book-review
theme: book-reviews
type: standalone
book: "Storytelling with Data"
book_author: Cole Nussbaumer Knaflic
---

# The book that finally taught me how to tell stories with data

*Cole Nussbaumer's "Storytelling with Data" should be in every data professional's shelf.*

---

These days, anyone can create a chart with a few clicks. But creating a chart that tells a compelling story is a whole different challenge.

You might be great with words, crafting insightful documents. You might have a strong eye for design, making things look polished. Or maybe you're skilled at working with numbers, uncovering deep insights. **But none of that guarantees your data will tell a clear, persuasive story.**

Great data storytelling happens when words, visuals, and numbers work together — guided by best practices that ensure your audience truly understands the message.

In this post, I'll share key lessons from *Storytelling with Data* by Cole Nussbaumer that transformed the way I present data.

---

## The moment I realised I had a gap

[Visual: illustration | Dall-E | mood setter — opening concept image for data storytelling]

I'll never forget a particularly tense meeting a few years back. I was presenting a report to a group of stakeholders, and I'd spent hours crafting charts and graphs, layering in as much data as possible. Each slide was a carefully constructed masterpiece — or so I thought. But as I looked around the room, I noticed blank stares and furrowed brows. They weren't connecting with my data. I felt myself losing them.

Nowadays there is a massive hype about AI and Machine Learning. Everyone thinks it's a "push a magic button" and things will get done. The reality? The fanciness of AI means nothing if you can't tell a compelling story about why it matters or how it has delivered real value. I've seen firsthand how a brilliant predictive model or deep data analysis can fall flat in a presentation simply because stakeholders don't understand its relevance.

I know I am good with technical stuff related to data, but my previous experiences clearly highlighted that I had a big gap on conveying clear messages with data. A couple of years ago, I discovered Cole Nussbaumer's *Storytelling with Data*, and it radically improved the way I approach data storytelling and visualisation.

---

## Learning #1: A simple checklist for effective data storytelling

I rarely do large presentations. What I do a lot is write technical documents and business cases for either (1) really technical audiences like data scientists or engineers; or (2) senior stakeholders like senior directors or strategy leads. How to communicate with both groups tends to be different.

There is a clear distinction between **information** and **communication**. Information is the raw data, facts, and figures; communication is the art of making that information meaningful and engaging for your audience. If you really want to communicate, you need to put yourself in the other person's shoes.

[Visual: photo | Unsplash (Glenn Carstens-Peters) | section separator — person writing at a desk, representing preparation and planning]

Cole's book provides a valuable checklist of questions to guide you before any presentation:

1. Who is your audience?
2. Who are the decision makers in your audience?
3. What biases may the audience have to be supportive or against your case?
4. What data do we have and is the audience familiar with it?
5. What would a successful outcome look like?
6. If you only had 5 minutes or a single sentence to tell your audience, what would it be?

These questions are now central to my data communication process. They force me to step back, think critically, and assess whether I'm focused on what truly matters for my audience — from the language I use to the data I choose to highlight.

---

## Learning #2: You only need 5 charts in your toolkit

[Visual: illustration | Dall-E | analogy reinforcer — visual showing the complexity vs simplicity contrast in data visualisation]

It's easy to get carried away with data visualisation. I have seen people using "rainbow charts" or displaying dozens of lines in 1 chart. Honestly, a bomb for the brain.

The reality is that the simpler you keep it, the easier it will be for your audience to understand. One of the biggest lessons from *Storytelling with Data* is that **you really only need 5 types of charts**. If you can't fit your message in these 5 types, you're probably doing something wrong:

1. **Simple text**
2. **Simple tables**
3. **Scatterplot**
4. **Line charts** (timeseries or slopes)
5. **Bar charts** (horizontal or vertical)
6. *(Bonus)* **Area charts**

### Simple text

One of the 'self-assessment' questions was: *"If you had a single sentence to tell your audience, what would it be?"* Simple text is the solution. Think about the number or data point you want your audience to take home. I use simple text all the time in my PowerPoint slides or as header titles in Confluence documents. Using simple text is such a best practice that we even have a template slide for it at Skyscanner.

[Visual: diagram | book excerpt | comparison — showing how a large number displayed as simple text is more impactful than the same number in a complex chart]

### Simple tables

Tables contain so many numbers, rows and headers — I would probably never use a table for a live presentation, unless it's a super simple one. For written documents, I always add tables aided with colours, so that the reader can quickly identify what to focus on.

[Visual: diagram | book excerpt | before/after — table with and without colour-guided formatting]

### Scatterplot

*"Scatterplots can be useful for showing the relationship between two things."* [Chapter 2] However, scatter plots tend to be packed with markers. I use them to show correlation trends, clustering patterns, or to find outliers. But they are prone to "overplotting." My scatter plots tend to: (1) highlight specific data points, (2) highlight a trend line or average, (3) remove unnecessary elements like gridlines.

[Visual: diagram | book excerpt | before/after — cluttered country scatterplot vs clean focused version]

### Line charts

*"Line graphs are most commonly used to plot continuous data."* [Chapter 2] The most common use is time trends. Key: use colour contrast, selective data labels, and minimalistic design.

[Visual: diagram | book excerpt | before/after — before and after applying clean line chart principles]

### Bar charts

*"Bar charts are easy for our eyes to read. Our eyes compare the end points of the bars, so it is easy to see quickly which category is the biggest, which is the smallest, and also the incremental difference between categories."* [Chapter 2] Basic vertical and horizontal bar charts are great, but be careful when the number of categories increases. Stacked bar charts can be useful to highlight a specific segment whilst showing an overall distribution — but be careful with highlighting (position, colours, labels).

### (Bonus) Area charts

Human eyes are not great at discerning differences in 2 dimensions. I normally use area charts in 2 cases: (1) when dealing with big differences between 2 segments, and (2) when showing trends on a % scale — how much does a category represent over a total across time.

---

## Learning #3: How to grab and keep your audience's attention

The span of your audience's attention is short. Whatever the human eye catches, it tries to understand. Our brain works in a specific way and we can leverage its stages and attributes to get our message across much more effectively.

Cole introduces a condensed chapter on how our brain is structured in **3 types of memory**:

### Iconic memory = instant capture of clear differences

*"Iconic memory is super fast. It happens without you consciously realizing it — the ability to quickly pick up differences."* [Chapter 4]

Leverage fast brain recognition by using **pre-attentive attributes** — contrasting attributes that force the reader towards a specific section of your visual. For example: size, colour, spatial position. Use these to direct attention before the brain has even started reading.

### Short-term memory = limited processing capacity

The human brain cannot process more than 3 things at any given time. Size + Colours + Text + 2 dimensions = too many combinations for the brain to hold. Direct focus with few data labels and colours. Show only what matters.

[Visual: diagram | book excerpt | contrast example — cluttered chart vs focused chart using colour contrast and selective labelling]

### Long-term memory = quick reaction to something known

*"Long-term memory is built up over a lifetime and is vitally important for pattern recognition and general cognitive processing."* [Chapter 4]

Trigger long-term memory to reduce cognitive processing: use consistency of colours, re-use the same type of graph, and reduce clutter. If your audience has already understood a chart format, how fast will they understand it if you just add a new line vs changing the chart type entirely?

---

## Learning #4: Why clutter is the biggest enemy of clear data storytelling

> **Every single element you add to that chart takes up cognitive load on your audience — in other words, it takes brain power to process.**

Mark that phrase in your brain. It's the one I always come back to.

Elements that help reduce clutter:

1. **Alignment (both text and shapes).** Always use left alignment for text.
2. **Do not add diagonal text.** If your labels are too long, shift to a horizontal bar chart or add labels to the y-axis.
3. **White space.** Feel comfortable with white. It provides a breathing moment for the brain, allowing it to focus on what is not white space.
4. **Colour contrast.** Don't use 10 colours. If you can use 2, contrasting is way easier.
5. **Consistent colours across multiple plots.** If "blue" represents category A in your first plot, keep it that way throughout your document.
6. **Ink ratio for tables** *(Edward Tufte concept, not from the book)*. Reduce the amount of ink as much as you can without losing information — gridlines, chart borders, data markers, colouring headers.
7. **Strategic addition of text.** In offline written documents, specific bits of text can aid understanding if used strategically.
8. **Hierarchy of information.** Top left to top right, bottom left to bottom right. Put the most important thing at the top.

[Visual: diagram | book excerpt with author annotations | best practice example — annotated chart showing all clutter-reduction principles applied]

---

## Learning #5: Learn from real-world examples

The best way to internalise these principles is through examples. *Storytelling with Data* is packed with before/after transformations — charts that go from confusing and overloaded to clean and focused. Cole shows each transformation step-by-step, explaining the decision behind each change.

[Visual: diagram | book excerpt with author annotations | step-by-step example — executive summary chart with callouts showing best practices applied]

The takeaway: actively study well-made charts and poorly-made ones. Develop an eye for what works and what doesn't. The more you train your eye, the faster your own charts improve.

---

## Summary

Key takeaways I've reused again and again since reading this book:

1. **Create your checklist** before any presentation and stick to it
2. **You can do magic with 5 types of charts** — if you can't fit your message into them, reconsider the message
3. **Grab audience attention intentionally** — our brains work in a specific way, use it
4. **De-clutter** — can't stress that enough
5. **Learn from others' examples** — study great charts and understand why they work

**Closing statement:** If you had to buy a book to improve your data storytelling skills, this is the one you should read first.

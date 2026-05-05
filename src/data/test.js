// Practice test content. Sample original SAT-style questions for MVP.
// Replace/extend with your own question bank as needed.

const ebrwM1 = [
  {
    id: 1,
    type: 'ebrw-mc',
    passage:
      'Botanist Maria Liang has noted that maple trees already grow successfully in a wide range of climates, and as a result they may _____ shifts in temperature better than several other tree species. The adjustments maples may need to make in response to a changing climate are likely to be modest and easily achieved.',
    prompt:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: ['relocate from', 'refer to', 'originate from', 'adapt to'],
    correctIndex: 3,
  },
  {
    id: 2,
    type: 'ebrw-mc',
    passage:
      'In her 2019 study of urban beekeeping, researcher Aisha Okonkwo observed that hives placed near community gardens produced more honey than hives placed near commercial farms. Okonkwo attributes this _____ to the greater diversity of flowering plants in community gardens.',
    prompt:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: ['oversight', 'discrepancy', 'fabrication', 'coincidence'],
    correctIndex: 1,
  },
  {
    id: 3,
    type: 'ebrw-mc',
    passage:
      'The novel My Year of Rest and Relaxation by Ottessa Moshfegh follows an unnamed narrator who attempts to sleep through an entire year using prescription medications. Critics have noted that the narrator’s detachment from her surroundings is _____; she describes even traumatic events with the same flat affect.',
    prompt:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: ['fleeting', 'pervasive', 'reluctant', 'discriminating'],
    correctIndex: 1,
  },
  {
    id: 4,
    type: 'ebrw-mc',
    passage:
      'A student is writing a paper about the history of typography. She wants to introduce the concept of the printing press to readers unfamiliar with the topic. Which sentence would best accomplish her goal?',
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      'The printing press, invented by Johannes Gutenberg around 1440, dramatically reduced the cost of producing books and helped spread literacy across Europe.',
      'Gutenberg used a metal alloy of lead, tin, and antimony for his movable type pieces.',
      'Before the printing press, books were copied by hand by scribes in monasteries.',
      'The first book printed by Gutenberg was a Latin Bible, often called the Gutenberg Bible.',
    ],
    correctIndex: 0,
  },
  {
    id: 5,
    type: 'ebrw-mc',
    passage:
      'While researching the migratory patterns of monarch butterflies, scientists noticed that populations overwintering in central Mexico had declined by nearly 80% since the 1990s. The decline _____ a combination of habitat loss, pesticide use, and climate change.',
    prompt:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: ['attribute to', 'is attributed to', 'are attributed to', 'attributing to'],
    correctIndex: 1,
  },
  {
    id: 6,
    type: 'ebrw-mc',
    passage:
      'Text 1: Some economists argue that minimum wage increases reduce overall employment, claiming that businesses respond by reducing hours or hiring fewer workers.\n\nText 2: A 2020 meta-analysis of 138 studies by Doruk Cengiz and colleagues found no significant effect of moderate minimum wage increases on overall employment, though the authors note that very large increases could have different effects.',
    prompt:
      'Based on the texts, how would Cengiz and colleagues (Text 2) most likely respond to the claim presented in Text 1?',
    choices: [
      'By agreeing that minimum wage increases always reduce employment.',
      'By suggesting that the claim oversimplifies the empirical evidence on moderate increases.',
      'By arguing that minimum wage policies should be eliminated entirely.',
      'By providing additional examples that support the claim.',
    ],
    correctIndex: 1,
  },
  {
    id: 7,
    type: 'ebrw-mc',
    passage:
      'A student is writing about local farming practices. She has the following notes:\n• A community garden in Detroit produces over 200 pounds of vegetables per week during peak season.\n• The garden uses companion planting to reduce pest damage.\n• Volunteers donate roughly 40 hours of labor per week.\n• Vegetables are distributed free to local food banks.',
    prompt:
      'The student wants to emphasize the volume of food the garden produces. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    choices: [
      'A community garden in Detroit, which uses companion planting, distributes its harvest to food banks.',
      'During peak season, a Detroit community garden produces more than 200 pounds of vegetables per week, all distributed free to food banks.',
      'Volunteers at a Detroit community garden donate about 40 hours of labor per week.',
      'Companion planting is one technique used by a community garden in Detroit.',
    ],
    correctIndex: 1,
  },
  {
    id: 8,
    type: 'ebrw-mc',
    passage:
      'The following is adapted from an essay on architectural preservation. Many older urban buildings, while no longer suited to their original purpose, possess structural integrity and historical significance that justify their renovation rather than demolition.',
    prompt:
      'As used in the text, what does the word "renovation" most nearly mean?',
    choices: ['destruction', 'restoration', 'inspection', 'relocation'],
    correctIndex: 1,
  },
  {
    id: 9,
    type: 'ebrw-mc',
    passage:
      'An art historian is comparing two paintings. Painting A uses bold, saturated colors and exaggerated proportions to convey emotion. Painting B uses muted tones and realistic proportions to convey a sense of calm. The historian wants to make a generalization about the relationship between color choice and emotional tone.',
    prompt:
      'Which choice most effectively uses relevant information to draw a generalization?',
    choices: [
      'Painting A is more interesting than Painting B.',
      'Painters who use saturated colors and exaggerated proportions tend to evoke stronger emotional responses than those who use muted tones and realistic proportions.',
      'Both paintings were created in the 20th century.',
      'Painting B is preferred by museum visitors.',
    ],
    correctIndex: 1,
  },
  {
    id: 10,
    type: 'ebrw-mc',
    passage:
      'Many cities have begun installing "cool pavements" — surfaces designed to reflect more sunlight than traditional asphalt. _____ , the city of Phoenix has applied a reflective coating to over 100 miles of streets since 2020.',
    prompt:
      'Which choice completes the text with the most logical transition?',
    choices: ['Nevertheless', 'For example', 'In contrast', 'Otherwise'],
    correctIndex: 1,
  },
];

// Pad to 27 questions by reusing structure (real implementation would have unique content)
const padQuestions = (base, count, type) => {
  const out = [...base];
  let id = base.length + 1;
  while (out.length < count) {
    out.push({
      id: id++,
      type,
      passage:
        'Sample passage text. This question is a placeholder demonstrating the layout. Replace with your own content in src/data/test.js.',
      prompt: 'Which choice best completes the text?',
      choices: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctIndex: 0,
    });
  }
  return out;
};

const ebrwM2Base = [
  {
    id: 1,
    type: 'ebrw-mc',
    passage:
      'Researchers studying the social behavior of crows have found that the birds can recognize individual human faces and remember them for years. In one study, researchers wearing distinctive masks captured and released crows; years later, crows in the area continued to scold researchers wearing the same masks, even when those researchers had not recently interacted with them.',
    prompt:
      'Which choice best states the main idea of the text?',
    choices: [
      'Crows are common in urban environments worldwide.',
      'Crows can recognize and remember individual human faces over extended periods.',
      'Crows are difficult to capture for research purposes.',
      'Crows scold humans whenever they see them.',
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    type: 'ebrw-mc',
    passage:
      'In her short story collection, author Carmen Maria Machado blends elements of horror, fairy tale, and memoir. Critics have praised the collection for its _____ approach, which refuses to commit to a single genre and instead borrows freely from many.',
    prompt:
      'Which choice completes the text with the most logical and precise word?',
    choices: ['rigid', 'eclectic', 'derivative', 'predictable'],
    correctIndex: 1,
  },
];

const mathM1Base = [
  {
    id: 1,
    type: 'math-mc',
    prompt:
      'Lorenzo bought a box of cereal and some strawberries at the grocery store. The cereal cost $2 and strawberries cost $1.90 per pound. If Lorenzo paid a total of $9.60, which equation can be used to find $p$, the number of pounds of strawberries Lorenzo bought? (Assume there is no sales tax.)',
    katex: true,
    choices: [
      '1.90p + 2 = 9.60',
      '1.90p - 2 = 9.60',
      '1.90 + 2p = 9.60',
      '1.90 - 2p = 9.60',
    ],
    choicesKatex: true,
    correctIndex: 0,
  },
  {
    id: 2,
    type: 'math-mc',
    prompt: 'If $3x + 7 = 22$, what is the value of $x$?',
    katex: true,
    choices: ['3', '5', '7', '15'],
    correctIndex: 1,
  },
  {
    id: 3,
    type: 'math-mc',
    prompt:
      'A line in the xy-plane passes through the points $(2, 5)$ and $(4, 11)$. What is the slope of the line?',
    katex: true,
    choices: ['2', '3', '4', '6'],
    correctIndex: 1,
  },
  {
    id: 4,
    type: 'math-mc',
    prompt:
      'A circle in the xy-plane has equation $(x-3)^2 + (y+2)^2 = 25$. What is the radius of the circle?',
    katex: true,
    choices: ['3', '4', '5', '25'],
    correctIndex: 2,
  },
  {
    id: 5,
    type: 'math-mc',
    prompt:
      'A triangle has angles measuring $40°$ and $75°$. What is the measure of the third angle?',
    katex: true,
    choices: ['55°', '65°', '75°', '115°'],
    correctIndex: 1,
  },
  {
    id: 6,
    type: 'math-mc',
    prompt:
      'If $f(x) = 2x^2 - 3x + 1$, what is the value of $f(4)$?',
    katex: true,
    choices: ['17', '21', '25', '29'],
    correctIndex: 1,
  },
  {
    id: 7,
    type: 'math-frq',
    prompt:
      'The ratio of $x$ to $y$ is equivalent to the ratio of $9$ to $5$. If the value of $x$ is $162$, what is the value of $y$?',
    katex: true,
    correctAnswer: '90',
  },
];

const mathM2Base = [
  {
    id: 1,
    type: 'math-mc',
    prompt:
      'A right circular cylinder has radius $4$ and height $10$. What is the volume of the cylinder?',
    katex: true,
    choices: ['40\\pi', '80\\pi', '160\\pi', '400\\pi'],
    choicesKatex: true,
    correctIndex: 2,
  },
  {
    id: 2,
    type: 'math-mc',
    prompt:
      'Solve for $x$: $\\sqrt{2x + 5} = 7$',
    katex: true,
    choices: ['11', '17', '22', '24'],
    correctIndex: 2,
  },
  {
    id: 3,
    type: 'math-frq',
    prompt:
      'If $5x + 3 = 38$, what is the value of $x$?',
    katex: true,
    correctAnswer: '7',
  },
];

export const test = {
  modules: [
    {
      sectionLabel: 'Section 1, Module 1: Reading and Writing',
      shortName: 'Reading and Writing',
      timeSeconds: 32 * 60,
      type: 'ebrw',
      questions: padQuestions(ebrwM1, 27, 'ebrw-mc'),
    },
    {
      sectionLabel: 'Section 1, Module 2: Reading and Writing',
      shortName: 'Reading and Writing',
      timeSeconds: 32 * 60,
      type: 'ebrw',
      questions: padQuestions(ebrwM2Base, 27, 'ebrw-mc'),
    },
    {
      sectionLabel: 'Section 2, Module 1: Math',
      shortName: 'Math',
      timeSeconds: 35 * 60,
      type: 'math',
      questions: padQuestions(mathM1Base, 22, 'math-mc'),
    },
    {
      sectionLabel: 'Section 2, Module 2: Math',
      shortName: 'Math',
      timeSeconds: 35 * 60,
      type: 'math',
      questions: padQuestions(mathM2Base, 22, 'math-mc'),
    },
  ],
};

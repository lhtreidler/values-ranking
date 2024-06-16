export const values1 = [
  {
    name: "ACCEPTANCE",
    description: "To be accepted as I am",
  },
  {
    name: "ACCURACY",
    description: "To be correct in my opinions and actions",
  },
  {
    name: "ACHIEVEMENT",
    description: "To accomplish and achieve",
  },
  {
    name: "ADVENTURE",
    description: "To have new and exciting experiences",
  },
  {
    name: "ATTRACTIVENESS",
    description: "To be physically attractive",
  },
  {
    name: "AUTHORITY",
    description: "To be in charge of others",
  },
  {
    name: "AUTONOMY",
    description: "To be self-determining and independent",
  },
  {
    name: "BEAUTY",
    description: "To appreciate beauty around us",
  },
  {
    name: "CARING",
    description: "To take care of others",
  },
  {
    name: "COMFORT",
    description: "To have a pleasant, enjoyable life",
  },
  {
    name: "COMMITMENT",
    description: "To make a long-lasting and deep commitment to another person",
  },
  {
    name: "COMPASSION",
    description: "To feel and show concern for others",
  },
  {
    name: "COMPLEXITY",
    description: "To have a life full of variety and change",
  },
  {
    name: "CONTRIBUTION",
    description: "To make a contribution that will last after I am gone",
  },
  {
    name: "COURTESY",
    description: "To be polite and considerate to others",
  },
  {
    name: "CREATIVITY",
    description: "To have new and original ideas",
  },
  {
    name: "DEPENDABILITY",
    description: "To be reliable and trustworthy",
  },
  {
    name: "DUTY",
    description: "To carry out my duties and responsibilities",
  },
  {
    name: "ECOLOGY",
    description: "To live in harmony with and protect the environment",
  },
  {
    name: "FAME",
    description: "To be known and recognized",
  },
  {
    name: "FAMILY",
    description: "To have a happy, loving family",
  },
  {
    name: "FLEXIBILITY",
    description: "To adjust to new or unusual situations easily",
  },
  {
    name: "FORGIVENESS",
    description: "To be forgiving of others",
  },
  {
    name: "FRIENDS",
    description: "To have close, supportive friends",
  },
  {
    name: "FUN",
    description: "To play and have fun",
  },
  {
    name: "GENEROSITY",
    description: "To give what I have to others",
  },
  {
    name: "GENUINENESS",
    description: "To behave in a manner that is true to who I am",
  },
  {
    name: "GOD’S WILL",
    description: "To seek and obey the will of God",
  },
  {
    name: "GROWTH",
    description: "To keep changing and growing",
  },
  {
    name: "HEALTH",
    description: "To be physically well and healthy",
  },
  {
    name: "HELPFULNESS",
    description: "To be helpful to others",
  },
  {
    name: "HONESTY",
    description: "To be truthful and genuine",
  },
  {
    name: "HUMILITY",
    description: "To be modest and unassuming",
  },
  {
    name: "HUMOR",
    description: "To see the humorous side of myself and the world",
  },
  {
    name: "INDEPENDENCE",
    description: "To be free from depending on others",
  },
  {
    name: "INDUSTRY",
    description: "To work hard and well at my life tasks",
  },
  {
    name: "INNER PEACE",
    description: "To experience personal peace",
  },
  {
    name: "INTIMACY",
    description: "To share my innermost experience with others",
  },
  {
    name: "JUSTCE",
    description: "To promote equal and fair treatment for all",
  },
  {
    name: "KNOWLEDGE",
    description: "To learn and possess valuable knowledge",
  },
  {
    name: "LEISURE",
    description: "To make time to relax and enjoy",
  },
  {
    name: "LOGIC",
    description: "To live rationally and sensibly",
  },
  {
    name: "LOVED",
    description: "To be loved by those close to me",
  },
  {
    name: "LOVING",
    description: "To give love to others",
  },
  {
    name: "MASTERY",
    description: "To be competent in my everyday activities",
  },
  {
    name: "MODERATION",
    description: "To avoid excess and find a middle ground",
  },
  {
    name: "MONOGAMY",
    description: "To have one close, loving relationship",
  },
  {
    name: "ORDERLINESS",
    description: "To have a life that is well-ordered and organized",
  },
  {
    name: "PLEASURE",
    description: "To have experiences that feel good",
  },
  {
    name: "POPULARITY",
    description: "To be well-liked by many people",
  },
  {
    name: "POWER",
    description: "To have control over others",
  },
  {
    name: "PURPOSE",
    description: "To have meaning and direction in life",
  },
  {
    name: "REALISM",
    description: "To see and act realistically and practically",
  },
  {
    name: "RESPONSIBILITY",
    description: "To make and carry out important decisions",
  },
  {
    name: "RISK",
    description: "To take risks and chances",
  },
  {
    name: "ROMANCE",
    description: "To have intense, exciting love in my life",
  },
  {
    name: "SAFETY",
    description: "To be safe and secure",
  },
  {
    name: "SELF-ACCEPTANCE",
    description: "To like myself as I am",
  },
  {
    name: "SELF-CONTROL",
    description: "To be self-disciplined and govern my own activities",
  },
  {
    name: "SELF-ESTEEM",
    description: "To feel positive about myself",
  },
  {
    name: "SELF-KNOWLEDGE",
    description: "To have a deep, honest understanding of myself",
  },
  {
    name: "SERVICE",
    description: "To be of service to others",
  },
  {
    name: "SEXUALITY",
    description: "To have an active and satisfying sex life",
  },
  {
    name: "SIMPLICITY",
    description: "To live life simply, with minimal needs",
  },
  {
    name: "SPIRITUALITY",
    description: "To grow spiritually",
  },
  {
    name: "STABILITY",
    description: "To have a life that stays fairly consistent",
  },
  {
    name: "STRENGTH",
    description: "To be physically strong",
  },
  {
    name: "TOLERANCE",
    description: "To accept and respect those different from me",
  },
  {
    name: "VIRTURE",
    description: "To live a morally pure and excellent life",
  },
  {
    name: "WEALTH",
    description: "To have plenty of money",
  },
] as const;

export const values = values1.map(({ name, description }) => ({
  name: `${name.slice(0, 1)}${name.slice(1).toLowerCase()}`,
  description,
}));

export const valueNames = values.map(({ name }) => name);

export const initialValues = values.reduce(
  (acc, value) => {
    return [...acc, { ...value, score: 0 }];
  },
  [] as ((typeof values)[number] & {
    score: number;
  })[]
);

export const localStorageKey = "valuesAppState";

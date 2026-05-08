export type Candidate = {
  id: string;
  name: string;
  party: string;
  partyShort: string;
  tagline: string;
  accent: string; // tailwind color class for party badge
};

export const candidates: Candidate[] = [
  {
    id: "c1",
    name: "Dr. Arsalan Khan",
    party: "Progressive Alliance",
    partyShort: "PA",
    tagline: "Reform · Education · Innovation",
    accent: "from-sky-500/20 to-sky-500/5",
  },
  {
    id: "c2",
    name: "Hira Mahmood",
    party: "National Civic Front",
    partyShort: "NCF",
    tagline: "Civic Justice · Transparency",
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    id: "c3",
    name: "Bilal Rehman",
    party: "United Reform Party",
    partyShort: "URP",
    tagline: "Economy · Infrastructure",
    accent: "from-amber-500/20 to-amber-500/5",
  },
  {
    id: "c4",
    name: "Ayesha Siddiqui",
    party: "Democratic Coalition",
    partyShort: "DC",
    tagline: "Healthcare · Equality",
    accent: "from-rose-500/20 to-rose-500/5",
  },
  {
    id: "c5",
    name: "Omar Faruq",
    party: "Independent",
    partyShort: "IND",
    tagline: "Local Voice · Accountability",
    accent: "from-violet-500/20 to-violet-500/5",
  },
  {
    id: "c6",
    name: "Sana Iqbal",
    party: "Future Republic Party",
    partyShort: "FRP",
    tagline: "Technology · Climate",
    accent: "from-teal-500/20 to-teal-500/5",
  },
];

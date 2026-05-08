import {
  TreePine,
  Scale,
  Moon,
  Sun,
  Wheat,
  Anchor,
  type LucideIcon,
} from "lucide-react";

export type Candidate = {
  id: string;
  name: string;
  party: string;
  partyShort: string;
  tagline: string;
  symbol: LucideIcon;
  symbolName: string;
  serial: string;
};

export const candidates: Candidate[] = [
  {
    id: "c1",
    name: "Dr. Arsalan Khan",
    party: "Progressive Alliance",
    partyShort: "PA",
    tagline: "Reform · Education · Innovation",
    symbol: TreePine,
    symbolName: "Tree",
    serial: "01",
  },
  {
    id: "c2",
    name: "Hira Mahmood",
    party: "National Civic Front",
    partyShort: "NCF",
    tagline: "Civic Justice · Transparency",
    symbol: Scale,
    symbolName: "Scale",
    serial: "02",
  },
  {
    id: "c3",
    name: "Bilal Rehman",
    party: "United Reform Party",
    partyShort: "URP",
    tagline: "Economy · Infrastructure",
    symbol: Anchor,
    symbolName: "Anchor",
    serial: "03",
  },
  {
    id: "c4",
    name: "Ayesha Siddiqui",
    party: "Democratic Coalition",
    partyShort: "DC",
    tagline: "Healthcare · Equality",
    symbol: Sun,
    symbolName: "Sun",
    serial: "04",
  },
  {
    id: "c5",
    name: "Omar Faruq",
    party: "Independent",
    partyShort: "IND",
    tagline: "Local Voice · Accountability",
    symbol: Wheat,
    symbolName: "Wheat",
    serial: "05",
  },
  {
    id: "c6",
    name: "Sana Iqbal",
    party: "Future Republic Party",
    partyShort: "FRP",
    tagline: "Technology · Climate",
    symbol: Moon,
    symbolName: "Crescent",
    serial: "06",
  },
];

import { Diamond } from '../models/diamond.model';

export interface ExplanationPoint {
  readonly label: string;
  readonly text: string;
}

export interface DiamondExplanation {
  readonly headline: string;
  readonly points: readonly ExplanationPoint[];
}

const COLOR_TEXT: Record<string, string> = {
  D: 'the very top of the colour scale — icy and colourless',
  E: 'exceptional — colourless to the trained eye',
  F: 'near colourless, appearing white in any setting',
  G: 'colourless in normal viewing — an exceptional-value classic',
  H: 'a warm white that faces up bright and loves yellow gold',
  I: 'a very slight warm tint, chosen for presence over grade',
  J: 'a faint warm glow that feels beautiful in warm settings',
};

const CLARITY_TEXT: Record<string, string> = {
  FL: 'flawless — nothing visible under 10× magnification',
  IF: 'internally flawless — pristine to the trained eye',
  VVS1: 'virtually flawless — inclusions invisible to complete clarity',
  VVS2: 'virtually flawless — incredibly clean under magnification',
  VS1: 'very slightly included — invisible to the naked eye',
  VS2: 'very slightly included — clean to the naked eye, superb value',
  SI1: 'slightly included — eye-clean and a brilliant value choice',
  SI2: 'slightly included — usually eye-clean at this size',
};

const CUT_PRAISE: Record<string, string> = {
  Excellent: 'an outstanding cut — the stone returns light with real fire and symmetry',
  'Very Good': 'a near-excellent cut, bright and lively in almost any light',
  Good: 'a solid, honest cut that holds brilliance at a friendlier price',
};

const SHAPE_NOUN: Record<string, string> = {
  round: 'Round',
  oval: 'Oval',
  emerald: 'Emerald',
  pear: 'Pear',
  princess: 'Princess',
  cushion: 'Cushion',
  radiant: 'Radiant',
  marquise: 'Marquise',
  heart: 'Heart',
};

/**
 * Translates technical grades into customer-friendly language (§22).
 * Pure presentation logic — no business rules, fully unit-testable.
 */
export function explainDiamond(diamond: Diamond): DiamondExplanation {
  const cut = CUT_PRAISE[diamond.cut] ?? `${diamond.cut.toLowerCase()} cut quality`;
  const colour = COLOR_TEXT[diamond.color] ?? `a ${diamond.color} colour grade`;
  const clarity = CLARITY_TEXT[diamond.clarity] ?? `${diamond.clarity} clarity`;
  const noun = SHAPE_NOUN[diamond.shape] ?? diamond.shape;

  const excellentCut = diamond.cut === 'Excellent';
  const highClarity = /^(FL|IF|VVS)/.test(diamond.clarity);
  const significantCarat = diamond.carat >= 1;

  const headline = excellentCut
    ? highClarity
      ? 'A rare combination of cut and clarity.'
      : 'A strong choice for brilliance.'
    : significantCarat
      ? 'A confident centre stone.'
      : 'A well-balanced, considered choice.';

  return {
    headline,
    points: [
      { label: 'Cut', text: `This ${noun} has ${cut} — the single biggest factor in how it sparkles.` },
      { label: 'Colour', text: `At ${diamond.color}, this diamond is ${colour}.` },
      { label: 'Clarity', text: `With ${diamond.clarity} clarity, the stone is ${clarity}.` },
      {
        label: 'Appearance',
        text: `Faced up, this ${noun} presents bright and balanced for its ${diamond.carat} ct size — exactly the effect most people see first.`,
      },
      {
        label: 'Value',
        text: `Its ${diamond.color}/${diamond.clarity} pairing keeps the price honest, concentrating your budget on visible beauty rather than grades only a magnifier can see.`,
      },
    ],
  };
}
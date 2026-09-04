import { MOCK_DIAMONDS } from '../data/mock-diamonds';
import { explainDiamond } from './diamond-explaner';

describe('explainDiamond', () => {
  it('produces a headline and five human-readable points', () => {
    const explanation = explainDiamond(MOCK_DIAMONDS[1]);

    expect(explanation.headline.length).toBeGreaterThan(0);
    expect(explanation.points).toHaveLength(5);
    expect(explanation.points.map(p => p.text).join(' ')).not.toContain('undefined');
  });

  it('celebrates excellent cut', () => {
    const excellent = MOCK_DIAMONDS.find(d => d.cut === 'Excellent')!;
    const explanation = explainDiamond(excellent);
    expect(explanation.headline).toContain('brilliance');
  });
});
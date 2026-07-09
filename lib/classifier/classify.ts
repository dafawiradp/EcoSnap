import { ClassificationResult, ClassifierOptions } from '../../types/classifier';
import { PollutionCategory, WasteType } from '../../types/taxonomy';
import { normalizeText } from '../nlp/normalize';
import { tokenizeText } from '../nlp/tokenize';
import { removeStopwords } from '../nlp/stopwords';
import { stemTokens } from '../nlp/stem';
import { replaceSynonyms } from '../nlp/synonyms';
import { detectPhrases } from '../nlp/phrases';
import { detectCategory } from './category';
import { detectSubtype } from './subtype';
import { scoreKeywords } from '../scoring/urgency';
import { calculateConfidence } from '../scoring/confidence';
import { generateRecommendations } from '../recommendation/generator';

export async function classify(description: string, options?: ClassifierOptions): Promise<ClassificationResult> {
  const normalized = normalizeText(description);
  const tokens = tokenizeText(normalized);
  const filteredTokens = removeStopwords(tokens);
  const stemmedTokens = stemTokens(filteredTokens);
  const synonymTokens = replaceSynonyms(stemmedTokens);
  const phrases = detectPhrases(synonymTokens);

  const category: PollutionCategory = detectCategory(phrases);
  const subtype: WasteType = detectSubtype(phrases);
  const urgency = scoreKeywords(phrases, category);
  const confidence = calculateConfidence(phrases, urgency);
  const recommendations = generateRecommendations(category, subtype);

  return {
    category,
    subtype,
    urgency,
    confidence,
    recommendations,
  };
}

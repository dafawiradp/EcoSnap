import { classify } from './classify';
import { PollutionCategory, WasteType, ClassifierResult } from '../../types/classifier';

export async function classifyReport(description: string): Promise<ClassifierResult> {
  return classify(description);
}

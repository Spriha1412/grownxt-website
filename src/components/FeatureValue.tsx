import { renderFeature } from "../lib/utils";
import type { FeatureValue as FeatureValueType } from "../data/digitalMarketingPlans";

export function FeatureValue({ value }: { value: FeatureValueType }) {
  const rendered = renderFeature(value);
  return <span className={`feature-${rendered.type}`}>{rendered.label}</span>;
}

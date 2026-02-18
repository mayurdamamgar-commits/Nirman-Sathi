import React from 'react';

type FeatureSection = {
  title: string;
  subtitle: string;
  points: string[];
};

const featureSections: FeatureSection[] = [
  {
    title: '1. Core Vision: The Unified Project Ecosystem',
    subtitle:
      'NirmanSathi is designed as a single source of truth for construction projects by connecting procurement, on-site workflows, and AI co-pilots.',
    points: [
      'Unifies fragmented communication, supply chain visibility, and manual site processes.',
      'Creates a connected lifecycle from concept planning to project handover.',
    ],
  },
  {
    title: '2. Resource Hub: Hyperlocal Procurement, Optimized',
    subtitle:
      'A logistics backbone that helps teams source materials, rent machinery, and hire skilled labor with transparent local discovery.',
    points: [
      'Buy Materials: phase-based sourcing, curated checklists, local supplier discovery, ratings, reviews, and digital order trails.',
      'Rent Equipment: category-driven browsing, real-time rate visibility, availability status, and direct booking.',
      'Hire Skilled Labor: trade-based search, verified teams, portfolio visibility, and transparent rate structures.',
    ],
  },
  {
    title: '3. On-Site Tools: The Digital Toolkit, Enhanced',
    subtitle:
      'Professional site utilities that improve engineering precision and daily reporting quality.',
    points: [
      'MixMaster: IS 10262:2009-aligned concrete mix design flow with durability checks and structured output in kg/m³.',
      'SiteLog: structured DPR workflow with cloud sync and Gemini-assisted conversion of rough notes into formal reports.',
    ],
  },
  {
    title: '4. Architectural Suite: From Concept to Client',
    subtitle:
      'Purpose-built capabilities for architects handling compliance, materials, and client communication.',
    points: [
      'Vastu Compass & Analyzer: AR-assisted orientation checks with automated compliance scorecards.',
      'Arch-Source & Mood Board: visual discovery of finishes and shareable, live mood board presentations.',
    ],
  },
  {
    title: '5. Revolutionary AI Co-Pilots: The Intelligent Advantage',
    subtitle:
      'High-impact AI systems that reduce design cycle time, improve cost certainty, and accelerate decision-making.',
    points: [
      'AI Generative Design Co-Pilot: constraint-based plan generation optimized for efficiency, energy performance, and Vastu compliance.',
      'AI Cost & BOQ Estimator: floor plan interpretation with quantity extraction and localized cost estimation.',
      'AI Material & Texture Recommender: inspiration-image analysis with budget-aware, climate-aware local product matching.',
    ],
  },
];

const Welcome: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">NirmanSathi: The Intelligent Construction Platform</h1>
        <p className="text-lg text-gray-600 mt-3">A detailed feature and functionality breakdown</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {featureSections.map((section) => (
          <section key={section.title} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
            <p className="text-gray-600 mt-2">{section.subtitle}</p>
            <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Welcome;

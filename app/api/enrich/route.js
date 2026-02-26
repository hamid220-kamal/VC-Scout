import { NextResponse } from 'next/server';

// Simulations of AI scraping results for mock companies
const simulationData = {
    "1": {
        "summary": "Linear is a next-generation project management tool built for high-performance software teams. It emphasizes speed, keyboard shortcuts, and a minimalist design.",
        "whatTheyDo": [
            "Streamline software development workflows",
            "Real-time synchronization across team members",
            "Native applications for macOS, Windows, and Web",
            "Automated issue tracking and cycle management"
        ],
        "keywords": ["Project Management", "Productivity", "Software Development", "Agile", "Issue Tracking"],
        "derivedSignals": [
            "Active careers page with 15+ open roles",
            "Recent release of AI-powered issue triage",
            "High developer sentiment in community forums"
        ],
        "sources": ["https://linear.app", "https://linear.app/about", "https://linear.app/careers"]
    },
    "2": {
        "summary": "Deel provides a comprehensive global HR and payroll platform that allows companies to hire anyone, anywhere, in compliance with local laws.",
        "whatTheyDo": [
            "Contractor and full-time employee onboarding",
            "Global payroll in 100+ currencies",
            "Automated compliance and tax documentation",
            "Localized benefits administration"
        ],
        "keywords": ["Global Payroll", "HR Tech", "Compliance", "Remote Work", "Fintech"],
        "derivedSignals": [
            "Significant expansion of office footprint in LATAM",
            "Strategic partnership with major banking providers",
            "Consistently high Glassdoor ratings (4.8+)"
        ],
        "sources": ["https://deel.com", "https://deel.com/why-deel", "https://deel.com/global-payroll"]
    },
    "3": {
        "summary": "Scale AI is the leader in providing high-quality training data for artificial intelligence applications, supporting industries from autonomous driving to LLMs.",
        "whatTheyDo": [
            "Data labeling and annotation services",
            "RLHF (Reinforcement Learning from Human Feedback) solutions",
            "AI model evaluation and testing",
            "Synthetic data generation"
        ],
        "keywords": ["Artificial Intelligence", "Data Infrastructure", "Machine Learning", "LLMs", "Autonomous Vehicles"],
        "derivedSignals": [
            "New government contract for defense AI simulation",
            "Strong growth in synthetic data division",
            "Leadership hires from DeepMind and OpenAI"
        ],
        "sources": ["https://scale.com", "https://scale.com/about", "https://scale.com/rlhf"]
    }
};

export async function POST(req) {
    try {
        const { companyId, website } = await req.json();

        // Simulate network delay for "scraping" and "AI analysis"
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Get simulated data or generate a generic one
        const data = simulationData[companyId] || {
            "summary": `General analysis for ${website}. This company appears to be operating in the technology sector with a focus on digital innovation.`,
            "whatTheyDo": [
                "Digital product development",
                "Customer-centric solutions",
                "Enterprise technology strategy"
            ],
            "keywords": ["Technology", "Innovation", "Enterprise"],
            "derivedSignals": [
                "Public website is active and recently updated",
                "LinkedIn presence shows steady headcount growth"
            ],
            "sources": [website]
        };

        return NextResponse.json({
            ...data,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to enrich company data' }, { status: 500 });
    }
}

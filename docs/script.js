// --- Data Storage ---
const moduleData = {
    1: {
        title: "Module 1: Earth Systems & Environmental Basics",
        summary: "Focuses on foundational definitions (Hazard, Vulnerability) and large-scale environmental systems. Recent papers have favored environmental issues like Greenhouse Effect and Ozone Depletion.",
        topics: [
            { name: "Greenhouse Effect / Ozone Depletion", importance: "Very High", trend: "Appearing" },
            { name: "Structure of Earth (Lithosphere/Biosphere)", importance: "High", trend: "Rotation" },
            { name: "Definitions: Hazard, Vulnerability, Exposure", importance: "High", trend: "Consistent Part A" }
        ],
        insight: "If 'Atmosphere' was asked last time, expect 'Lithosphere' or 'Biosphere' this time. Greenhouse effect is an evergreen topic. Be clear on the causes and adverse effects of each.",
        prediction: "High Probability: Greenhouse Effect and Structure of Lithosphere/Biosphere."
    },
    2: {
        title: "Module 2: Hazard Mapping & Risk Assessment",
        summary: "The most predictable module. The Part B question is almost always a choice between detailed 'Risk Assessment Approaches' and 'Hazard Mapping/Vulnerability Assessment'.",
        topics: [
            { name: "Risk Assessment Approaches (Qualitative/Quantitative)", importance: "Very High", trend: "Core Topic" },
            { name: "Hazard Mapping (Data & Application)", importance: "High", trend: "Common Alternative" },
            { name: "Physical Vulnerability Assessment (Approaches)", importance: "Medium", trend: "Growing Importance" }
        ],
        insight: "Do not skip 'Approaches to Risk Assessment'. It appears in nearly 80% of papers. Focus also on the difference between physical and ecological vulnerability.",
        prediction: "High Probability: Comprehensive explanation of all Risk Assessment Approaches and Vulnerability Assessment Methods."
    },
    3: {
        title: "Module 3: Disaster Management Cycle & Response",
        summary: "Focuses on the phases of disaster management (DRM Cycle) and the distinction between similar terms like Mitigation and Prevention, and Response and Relief.",
        topics: [
            { name: "DRM Core Elements / Framework", importance: "Very High", trend: "Foundational" },
            { name: "Mitigation vs. Prevention (Measures)", importance: "High", trend: "Differentiation Focus" },
            { name: "International Relief Organizations & Relief Principles", importance: "High", trend: "List/Short Answer" }
        ],
        insight: "Be clear on the factors that decide the nature of disaster response. Examiners look for specific keywords like 'Long-term' vs. 'Immediate'.",
        prediction: "High Probability: Core Elements of the DRM Cycle and Types/Role of International Relief Organizations."
    },
    4: {
        title: "Module 4: Stakeholders, Capacity & Communication",
        summary: "Shifted from general communication questions to specific 'Participatory Approaches', 'Capacity Building', and 'Crisis Counselling'.",
        topics: [
            { name: "Stakeholder Participation (Steps/Benefits)", importance: "Very High", trend: "Major Shift" },
            { name: "Risk vs. Crisis Communication", importance: "Very High", trend: "Part A Favorite" },
            { name: "Capacity Building (Assessment & Methods)", importance: "Medium", trend: "Recent Focus" }
        ],
        insight: "Stakeholder Participation is the heavyweight topic here, often carrying 10 marks. Ensure you know the barriers to effective communication.",
        prediction: "High Probability: Steps in Participatory Stakeholder Engagement and the difference between Risk and Crisis Communication."
    },
    5: {
        title: "Module 5: Legal & Institutional Frameworks",
        summary: "The 'Sendai Framework' has become the dominant question, replacing general disaster descriptions. Institutional roles (NDMA, SDMA) are consistently tested.",
        topics: [
            { name: "Sendai Framework (Targets/Priorities)", importance: "Very High", trend: "Dominant" },
            { name: "National Policy on DM (Objectives/Features)", importance: "High", trend: "Consistent" },
            { name: "Institutional Roles (NDMA/SDMA/NIDM)", importance: "High", trend: "Rotation" }
        ],
        insight: "Ignore the Sendai Framework at your own peril. It is almost certain to appear. Also, understand the hierarchy and specific roles of the institutional bodies in India.",
        prediction: "High Probability: Targets and Priorities of the Sendai Framework and the Role of NDMA/SDMA."
    }
};

let myChart = null;

// --- Helper Functions ---

// Label Wrapping for Chart.js
function formatLabel(str, maxwidth) {
    const sections = [];
    const words = str.split(" ");
    let temp = "";
    words.forEach(function(item, index) {
        if (temp.length > 0) {
            const concat = temp + ' ' + item;
            if (concat.length > maxwidth) {
                sections.push(temp);
                temp = item;
            } else {
                temp = concat;
            }
        } else {
            temp = item;
        }
        if (index === words.length - 1) {
            sections.push(temp);
        }
    });
    return sections;
}

// Module Interaction
function switchModule(id) {
    // Reset Tabs
    document.querySelectorAll('[id^="tab-"]').forEach(btn => {
        btn.classList.remove('tab-active');
        btn.classList.add('tab-inactive');
    });
    document.getElementById(`tab-${id}`).classList.add('tab-active');
    document.getElementById(`tab-${id}`).classList.remove('tab-inactive');

    const data = moduleData[id];
    const tableBody = document.getElementById('topic-table-body');
    
    // Populate Topic Table
    const topicRows = data.topics.map(t => `
        <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 text-sm font-medium text-slate-900">${t.name}</td>
            <td class="px-6 py-4 text-sm">
                <span class="px-3 py-1 text-xs font-semibold rounded-full ${t.importance === 'Very High' ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'}">${t.importance}</span>
            </td>
            <td class="px-6 py-4 text-sm text-slate-600">${t.trend}</td>
        </tr>
    `).join('');
    tableBody.innerHTML = topicRows;

    // Populate Insights and Prediction
    document.getElementById('module-insight').textContent = data.insight;
    document.getElementById('module-prediction').textContent = data.prediction;
}

// --- Chart Initialization ---
function initializeChart() {
    const ctx = document.getElementById('frequencyChart').getContext('2d');
    
    const topicLabels = [
        "Sendai Framework", 
        "Risk Assessment Approaches", 
        "Stakeholder Participation", 
        "DRM Cycle Elements", 
        "Risk vs Crisis Comm.", 
        "Greenhouse/Ozone", 
        "Hazard Mapping",
        "Mitigation vs Prevention"
    ];
    
    // Process labels for wrapping (15 chars max per line)
    const processedLabels = topicLabels.map(label => formatLabel(label, 15));
    const dataCounts = [6, 6, 5, 5, 5, 5, 4, 4];

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: processedLabels,
            datasets: [{
                label: 'Frequency (Total Appearances)',
                data: dataCounts,
                backgroundColor: [
                    '#4f46e5', '#4f46e5', '#4f46e5',
                    '#06b6d4', '#06b6d4', '#06b6d4',
                    '#64748b', '#64748b'
                ],
                borderColor: 'transparent',
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: function(tooltipItems) {
                            const item = tooltipItems[0];
                            let label = item.chart.data.labels[item.dataIndex];
                            return Array.isArray(label) ? label.join(' ') : label;
                        },
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + ' times';
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Occurrences in 7 Papers'
                    },
                    ticks: {
                        stepSize: 1
                    }
                },
                x: {
                    // Fixes label overlap by increasing font size and disabling rotation
                    grid: {
                        display: false
                    },
                    ticks: {
                        autoSkip: false,
                        maxRotation: 0,
                        minRotation: 0,
                        font: {
                            size: 13, /* Increased font size for readability */
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    // Initialize with Module 1 content
    switchModule(1);
});
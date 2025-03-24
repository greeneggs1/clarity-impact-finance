import pandas as pd
import os
from datetime import datetime

# Create timestamp for the filename
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
filename = f"CDFI_AI_Phased_Implementation_Checklist_{timestamp}.xlsx"

# Create a new Excel writer
excel_writer = pd.ExcelWriter(filename, engine='xlsxwriter')
workbook = excel_writer.book

# Create cell format
header_format = workbook.add_format({
    'bold': True,
    'text_wrap': True,
    'valign': 'top',
    'fg_color': '#1B4620',
    'font_color': 'white',
    'border': 1
})

subheader_format = workbook.add_format({
    'bold': True,
    'text_wrap': True,
    'valign': 'top',
    'fg_color': '#D9EAD3',
    'font_color': '#1B4620',
    'border': 1
})

cell_format = workbook.add_format({
    'text_wrap': True,
    'valign': 'top',
    'border': 1
})

# Intro sheet
intro_df = pd.DataFrame({
    'AI Implementation Checklist for CDFIs': [
        'This phased checklist provides a roadmap for CDFIs implementing AI solutions.',
        'The checklist is organized into five distinct phases to help you track progress.',
        'Each phase includes specific tasks and considerations for successful AI adoption.',
        '',
        'PHASE 1: Data Foundation & Quick Wins (0-6 months)',
        'PHASE 2: Data Infrastructure Enhancement (3-12 months)',
        'PHASE 3: Advanced AI Applications (9-18 months)',
        'PHASE 4: AI Governance & Ethical Framework (12-24 months)',
        'PHASE 5: Scaling & Innovation (18+ months)',
        '',
        'Use this checklist to assess your current state and plan your AI journey.',
        'For each item, mark: "Not Started", "In Progress", "Completed", or "N/A"',
        '',
        'Created by Clarity Impact Finance'
    ]
})

intro_df.to_excel(excel_writer, sheet_name='Introduction', index=False)
intro_sheet = excel_writer.sheets['Introduction']
intro_sheet.set_column('A:A', 80)
intro_sheet.set_row(0, 30)

# Phase 1: Data Foundation & Quick Wins
phase1_data = {
    'Category': [
        'Organizational Assessment',
        'Organizational Assessment',
        'Organizational Assessment',
        'Data Assessment',
        'Data Assessment',
        'Data Assessment',
        'Data Assessment',
        'Quick Wins',
        'Quick Wins',
        'Quick Wins',
        'Quick Wins',
        'Quick Wins',
        'Training & Education',
        'Training & Education',
        'Training & Education'
    ],
    'Task': [
        'Define clear business objectives for AI implementation',
        'Identify pain points and inefficiencies in current processes',
        'Assess organizational readiness for AI adoption',
        'Conduct data audit to inventory existing data sources',
        'Evaluate data quality and completeness',
        'Identify data gaps and create plan to address them',
        'Begin basic data standardization for key datasets',
        'Implement document analysis tool for loan applications',
        'Deploy chatbot for basic customer inquiries',
        'Use Excel-based data analysis with AI plugins',
        'Implement basic automation for repetitive tasks',
        'Integrate with third-party APIs for automated data collection',
        'Provide AI literacy training to leadership team',
        'Educate staff on basic AI concepts and applications',
        'Develop glossary of AI/ML terms for staff reference'
    ],
    'Success Criteria': [
        'Documented AI strategy aligned with business goals',
        'Prioritized list of processes for improvement',
        'Readiness assessment report with recommendations',
        'Complete inventory of all data assets',
        'Data quality score for critical datasets',
        'Data collection plan for missing information',
        'Standardized data formats for key fields',
        'Reduction in document processing time by 30%',
        'Reduced response time for common questions',
        'Enhanced reporting capabilities',
        'Time savings from automated processes',
        'Increased data collection efficiency',
        'Executive team understands AI potential and limitations',
        '80% of staff complete basic AI training',
        'Common AI terminology understood across organization'
    ],
    'Status': [''] * 15,  # Empty column for status tracking
    'Notes': [''] * 15  # Empty column for notes
}

phase1_df = pd.DataFrame(phase1_data)
phase1_df.to_excel(excel_writer, sheet_name='Phase 1', index=False)
phase1_sheet = excel_writer.sheets['Phase 1']

# Set column widths
phase1_sheet.set_column('A:A', 25)
phase1_sheet.set_column('B:B', 40)
phase1_sheet.set_column('C:C', 40)
phase1_sheet.set_column('D:D', 15)
phase1_sheet.set_column('E:E', 30)

# Apply formatting
for col_num, value in enumerate(phase1_df.columns.values):
    phase1_sheet.write(0, col_num, value, header_format)

# Phase 2: Data Infrastructure Enhancement
phase2_data = {
    'Category': [
        'Data Infrastructure',
        'Data Infrastructure',
        'Data Infrastructure',
        'Data Infrastructure',
        'Data Governance',
        'Data Governance',
        'Data Governance',
        'Advanced Data Collection',
        'Advanced Data Collection',
        'Advanced Data Collection',
        'AI Tool Expansion',
        'AI Tool Expansion',
        'AI Tool Expansion',
        'Training & Change Management',
        'Training & Change Management'
    ],
    'Task': [
        'Implement centralized data warehouse',
        'Develop data pipeline for automated collection',
        'Implement data cleaning and normalization processes',
        'Create data dictionary and documentation standards',
        'Establish data governance committee',
        'Define data ownership and access protocols',
        'Create data quality monitoring processes',
        'Deploy enhanced data capture forms and interfaces',
        'Implement digital document management system',
        'Integrate internal and external data sources',
        'Deploy predictive analytics for loan performance',
        'Implement ML-based risk assessment tools',
        'Deploy AI-powered financial analysis tools',
        'Provide specialized AI training for data analysts',
        'Develop change management plan for AI adoption'
    ],
    'Success Criteria': [
        'Single source of truth for organizational data',
        'Automated data flows from key systems',
        'Consistent data quality across systems',
        'Comprehensive data documentation available',
        'Active governance committee meeting regularly',
        'Clear protocols documented and followed',
        'Regular data quality reports generated',
        'Digital-first data collection reducing manual entry',
        'All documents digitized and searchable',
        'Comprehensive dataset incorporating external data',
        'Early warning indicators for portfolio risk',
        'More nuanced risk assessment capabilities',
        'Faster, more accurate financial analysis',
        'Data team capable of building basic ML models',
        'Staff actively engaged with AI implementation'
    ],
    'Status': [''] * 15,  # Empty column for status tracking
    'Notes': [''] * 15  # Empty column for notes
}

phase2_df = pd.DataFrame(phase2_data)
phase2_df.to_excel(excel_writer, sheet_name='Phase 2', index=False)
phase2_sheet = excel_writer.sheets['Phase 2']

# Set column widths
phase2_sheet.set_column('A:A', 25)
phase2_sheet.set_column('B:B', 40)
phase2_sheet.set_column('C:C', 40)
phase2_sheet.set_column('D:D', 15)
phase2_sheet.set_column('E:E', 30)

# Apply formatting
for col_num, value in enumerate(phase2_df.columns.values):
    phase2_sheet.write(0, col_num, value, header_format)

# Phase 3: Advanced AI Applications
phase3_data = {
    'Category': [
        'Advanced Analytics',
        'Advanced Analytics',
        'Advanced Analytics',
        'Advanced Analytics',
        'Process Automation',
        'Process Automation',
        'Process Automation',
        'Customer-Facing AI',
        'Customer-Facing AI',
        'Customer-Facing AI',
        'Integration & Scaling',
        'Integration & Scaling',
        'Integration & Scaling',
        'Specialized Training',
        'Specialized Training'
    ],
    'Task': [
        'Implement machine learning for credit scoring',
        'Deploy AI for market analysis and opportunity identification',
        'Develop impact prediction models',
        'Implement portfolio optimization algorithms',
        'Automate underwriting process with AI',
        'Deploy intelligent document processing across operations',
        'Implement AI-driven compliance monitoring',
        'Launch AI-powered customer service platform',
        'Implement personalized digital experience for borrowers',
        'Deploy borrower early-warning system',
        'Integrate AI systems with core banking platform',
        'Implement API-first architecture for AI services',
        'Develop AI microservices for reusable components',
        'Provide advanced AI training for technical staff',
        'Train business staff on AI-enhanced decision making'
    ],
    'Success Criteria': [
        'More accurate risk assessment and reduced defaults',
        'New market opportunities identified through AI',
        'Impact metrics predicted with greater accuracy',
        'Optimized portfolio allocation based on multiple factors',
        '50% reduction in underwriting processing time',
        '80% of document processing fully automated',
        'Real-time compliance monitoring and alerts',
        '24/7 AI-powered customer support available',
        'Personalized borrower portal with AI assistance',
        'Early intervention reducing default rates',
        'Seamless data flow between AI and core systems',
        'AI capabilities available through standardized APIs',
        'Modular AI components that can be reused',
        'Technical team capable of customizing AI solutions',
        'Staff confidently using AI insights in decision making'
    ],
    'Status': [''] * 15,  # Empty column for status tracking
    'Notes': [''] * 15  # Empty column for notes
}

phase3_df = pd.DataFrame(phase3_data)
phase3_df.to_excel(excel_writer, sheet_name='Phase 3', index=False)
phase3_sheet = excel_writer.sheets['Phase 3']

# Set column widths
phase3_sheet.set_column('A:A', 25)
phase3_sheet.set_column('B:B', 40)
phase3_sheet.set_column('C:C', 40)
phase3_sheet.set_column('D:D', 15)
phase3_sheet.set_column('E:E', 30)

# Apply formatting
for col_num, value in enumerate(phase3_df.columns.values):
    phase3_sheet.write(0, col_num, value, header_format)

# Phase 4: AI Governance & Ethical Framework
phase4_data = {
    'Category': [
        'Ethical AI Framework',
        'Ethical AI Framework',
        'Ethical AI Framework',
        'Ethical AI Framework',
        'Governance Structure',
        'Governance Structure',
        'Governance Structure',
        'Compliance & Risk',
        'Compliance & Risk',
        'Compliance & Risk',
        'Fairness & Bias',
        'Fairness & Bias',
        'Fairness & Bias',
        'Transparency',
        'Transparency'
    ],
    'Task': [
        'Develop AI ethics principles for your CDFI',
        'Establish ethical review process for AI applications',
        'Create AI impact assessment methodology',
        'Develop community engagement plan for AI initiatives',
        'Form AI governance committee with diverse representation',
        'Establish AI development and deployment protocols',
        'Create model governance framework',
        'Implement AI risk management framework',
        'Develop AI compliance documentation standards',
        'Create audit procedures for AI systems',
        'Implement bias detection and mitigation processes',
        'Establish equity metrics for AI applications',
        'Develop remediation procedures for biased outcomes',
        'Create explainability guidelines for AI models',
        'Establish transparency protocols for AI-based decisions'
    ],
    'Success Criteria': [
        'Documented AI ethics principles aligned with mission',
        'All AI applications reviewed for ethical considerations',
        'Impact assessments conducted for all AI deployments',
        'Community feedback incorporated into AI development',
        'Active governance committee with quarterly meetings',
        'Clear protocols for AI development lifecycle',
        'Model inventory with documented governance',
        'Comprehensive AI risk register maintained',
        'Complete compliance documentation for all AI systems',
        'Regular audits of AI systems conducted',
        'Reduction in biased outcomes from AI systems',
        'Equity metrics tracked and improving over time',
        'Prompt remediation of any identified bias issues',
        'All AI models meeting explainability standards',
        'Transparent disclosures about AI use to stakeholders'
    ],
    'Status': [''] * 15,  # Empty column for status tracking
    'Notes': [''] * 15  # Empty column for notes
}

phase4_df = pd.DataFrame(phase4_data)
phase4_df.to_excel(excel_writer, sheet_name='Phase 4', index=False)
phase4_sheet = excel_writer.sheets['Phase 4']

# Set column widths
phase4_sheet.set_column('A:A', 25)
phase4_sheet.set_column('B:B', 40)
phase4_sheet.set_column('C:C', 40)
phase4_sheet.set_column('D:D', 15)
phase4_sheet.set_column('E:E', 30)

# Apply formatting
for col_num, value in enumerate(phase4_df.columns.values):
    phase4_sheet.write(0, col_num, value, header_format)

# Phase 5: Scaling & Innovation
phase5_data = {
    'Category': [
        'Scaling AI Capabilities',
        'Scaling AI Capabilities',
        'Scaling AI Capabilities',
        'Innovation',
        'Innovation',
        'Innovation',
        'Partnerships',
        'Partnerships',
        'Partnerships',
        'Advanced Impact',
        'Advanced Impact',
        'Advanced Impact',
        'Continuous Improvement',
        'Continuous Improvement',
        'Continuous Improvement'
    ],
    'Task': [
        'Scale successful AI applications across organization',
        'Implement enterprise AI platform',
        'Establish AI Center of Excellence',
        'Pilot emerging AI technologies',
        'Implement AI innovation sandbox environment',
        'Develop AI research partnerships with academic institutions',
        'Establish AI vendor management framework',
        'Create CDFI AI consortium for shared resources',
        'Develop open source AI tools for CDFI sector',
        'Implement advanced impact measurement with AI',
        'Develop predictive community impact models',
        'Create AI-powered community needs assessment',
        'Implement continuous learning for AI models',
        'Establish formal AI maturity assessment process',
        'Create long-term AI innovation roadmap'
    ],
    'Success Criteria': [
        'AI capabilities available across all departments',
        'Centralized platform for managing AI applications',
        'Active Center of Excellence driving adoption',
        'Regular pilots of new AI technologies',
        'Innovation sandbox used for testing new ideas',
        'Active research partnerships with universities',
        'Effective management of AI vendor relationships',
        'Active participation in CDFI AI consortium',
        'Contribution to open source AI tools for CDFIs',
        'Sophisticated impact metrics powered by AI',
        'Accurate predictions of community outcomes',
        'Data-driven community needs assessment process',
        'AI models that improve automatically over time',
        'Regular assessment of AI maturity with improvements',
        'Strategic roadmap guiding long-term AI innovation'
    ],
    'Status': [''] * 15,  # Empty column for status tracking
    'Notes': [''] * 15  # Empty column for notes
}

phase5_df = pd.DataFrame(phase5_data)
phase5_df.to_excel(excel_writer, sheet_name='Phase 5', index=False)
phase5_sheet = excel_writer.sheets['Phase 5']

# Set column widths
phase5_sheet.set_column('A:A', 25)
phase5_sheet.set_column('B:B', 40)
phase5_sheet.set_column('C:C', 40)
phase5_sheet.set_column('D:D', 15)
phase5_sheet.set_column('E:E', 30)

# Apply formatting
for col_num, value in enumerate(phase5_df.columns.values):
    phase5_sheet.write(0, col_num, value, header_format)

# Success Stories sheet
stories_data = {
    'CDFI Success Stories: AI Implementation': [
        'Piedmont Community Lenders (PCL)',
        'PCL started with a simple document analysis tool to process loan applications faster. This quick win reduced processing time by 40% while improving accuracy. Building on this success, they implemented data standardization and centralized storage before moving to more advanced AI applications over an 18-month period.',
        '',
        'Key Lessons:',
        '• Start with a clear business problem and measurable outcomes',
        '• Focus on data quality before implementing sophisticated AI',
        '• Ensure staff are trained and comfortable with new tools',
        '• Regularly measure and communicate impact of AI initiatives',
        '',
        'Horizon Community Capital',
        'Horizon created an "AI roadmap" that began with basic process automation and gradually expanded to credit scoring and risk assessment. Their phased approach allowed them to build staff capabilities while demonstrating value. After 24 months, they had fully integrated AI into core operations, with significant improvements in efficiency and loan performance.',
        '',
        'Key Lessons:',
        '• Develop a phased implementation plan with clear milestones',
        '• Address data gaps early in the process',
        '• Create a governance structure to oversee AI initiatives',
        '• Balance innovation with mission alignment and ethical considerations'
    ]
}

stories_df = pd.DataFrame(stories_data)
stories_df.to_excel(excel_writer, sheet_name='Success Stories', index=False)
stories_sheet = excel_writer.sheets['Success Stories']
stories_sheet.set_column('A:A', 80)

# Save the Excel file
excel_writer.close()

# Copy the file to the public directory
public_resources_dir = "public/resources"
if not os.path.exists(public_resources_dir):
    os.makedirs(public_resources_dir)

public_file = os.path.join(public_resources_dir, filename)
os.system(f"cp {filename} {public_file}")

print(f"Excel file created: {filename}")
print(f"Excel file copied to public directory: {public_file}")

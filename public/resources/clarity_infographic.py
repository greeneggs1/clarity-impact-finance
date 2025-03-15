#!/usr/bin/env python3
"""
Clarity Impact Finance Infographic Generator
Creates a static infographic showcasing services and contact information
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
import os
from PIL import Image
import matplotlib.font_manager as fm
from matplotlib.figure import Figure
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas

def create_clarity_infographic():
    """Generate a static infographic for Clarity Impact Finance"""
    
    # Set up the figure with a professional aspect ratio
    width, height = 1200, 1800
    fig = Figure(figsize=(width/100, height/100), dpi=100)
    canvas = FigureCanvas(fig)
    ax = fig.add_subplot(111)
    
    # Set background color
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    
    # Remove axis ticks and labels
    ax.set_xticks([])
    ax.set_yticks([])
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['bottom'].set_visible(False)
    ax.spines['left'].set_visible(False)
    
    # Company title and tagline
    ax.text(0.5, 0.95, 'CLARITY IMPACT FINANCE', 
            fontsize=32, ha='center', weight='bold', color='#1B4620')
    ax.text(0.5, 0.91, 'Transforming Communities Through Finance', 
            fontsize=20, ha='center', style='italic', color='#333333')
    ax.text(0.5, 0.88, 'Strategic consulting and innovative solutions for mission-driven lenders', 
            fontsize=16, ha='center', color='#666666')
    
    # Services section
    services = [
        {
            'name': 'UNDERWRITING',
            'icon': '💼',
            'description': 'Rigorous financial analysis and risk assessment for community development projects.'
        },
        {
            'name': 'LENDING STRATEGY',
            'icon': '📈',
            'description': 'Customized lending approaches to maximize impact and sustainability.'
        },
        {
            'name': 'PROCESS MAPPING',
            'icon': '🔄',
            'description': 'Streamlined workflows and systems for operational efficiency.'
        },
        {
            'name': 'TRAINING',
            'icon': '🎓',
            'description': 'Capacity building and skill development for lending professionals.'
        },
        {
            'name': 'COMPLIANCE & ASSET MANAGEMENT',
            'icon': '📋',
            'description': 'Ensuring regulatory compliance and effective portfolio oversight.'
        }
    ]
    
    # Calculate positions for service blocks
    start_y = 0.78
    block_height = 0.1
    spacing = 0.02
    
    # Draw service blocks
    for i, service in enumerate(services):
        y_pos = start_y - i * (block_height + spacing)
        
        # Service block background
        rect = patches.Rectangle((0.15, y_pos - block_height), 0.7, block_height,
                            fill=True, alpha=0.1, fc='#FF7F00', ec='#FF7F00')
        ax.add_patch(rect)
        
        # Service icon and name
        ax.text(0.2, y_pos - 0.03, service['icon'], fontsize=24)
        ax.text(0.26, y_pos - 0.03, service['name'], fontsize=18, weight='bold', color='#1B4620')
        
        # Service description
        ax.text(0.26, y_pos - 0.07, service['description'], 
                fontsize=12, color='#333333')
    
    # Client login info section (based on your memory)
    login_y = 0.22
    login_box = patches.Rectangle((0.15, login_y - 0.12), 0.7, 0.12,
                        fill=True, alpha=0.1, fc='#1B4620', ec='#1B4620')
    ax.add_patch(login_box)
    
    ax.text(0.5, login_y - 0.03, 'CLIENT ACCESS', fontsize=18, ha='center', weight='bold', color='#1B4620')
    ax.text(0.5, login_y - 0.07, 'Secure client portal access with invitation code system', 
            fontsize=12, ha='center', color='#333333')
    ax.text(0.5, login_y - 0.10, 'Contact us to request your personalized invitation code', 
            fontsize=12, ha='center', color='#333333')
    
    # Bottom section with contact information
    footer_y = 0.08
    ax.axhline(y=footer_y + 0.05, xmin=0.1, xmax=0.9, color='#1B4620', alpha=0.5)
    
    ax.text(0.5, footer_y, 'CONTACT US', fontsize=16, ha='center', weight='bold', color='#1B4620')
    ax.text(0.5, footer_y - 0.03, 'Email: contact@clarityimpactfinance.com', fontsize=12, ha='center')
    ax.text(0.5, footer_y - 0.05, 'Web: www.clarityimpactfinance.com', fontsize=12, ha='center')
    
    # Save as PNG
    output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
    os.makedirs(os.path.join(output_dir, 'images'), exist_ok=True)
    output_path = os.path.join(output_dir, 'images', 'clarity_impact_finance_infographic.png')
    
    fig.savefig(output_path, format='png', bbox_inches='tight', dpi=300)
    
    print(f"Infographic created successfully at: {output_path}")
    return output_path

if __name__ == "__main__":
    output_file = create_clarity_infographic()
    print(f"Generated infographic: {output_file}")
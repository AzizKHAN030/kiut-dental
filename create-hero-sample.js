/**
 * Sample Hero Content Creator
 * 
 * This script creates sample hero content in Sanity.
 * Run with: node create-hero-sample.js
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'mh9vfjvg',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // You'll need to set this
});

const samplePage = {
  _type: 'page',
  title: 'Home',
  slug: {
    _type: 'slug',
    current: '/'
  },
  locale: 'en',
  sections: [
    {
      _type: 'heroSection',
      displayMode: 'single',
      slides: [
        {
          _type: 'heroSlideImageRight',
          tagline: 'Premium Dental Care from Uzbekistan',
          heading: 'World-Class Smiles at Half the Price',
          body: 'Experience premium dental treatments in Uzbekistan. Save up to 70% compared to Western countries while receiving world-class care from internationally trained specialists.',
          primaryCtaLabel: 'Get Free Consultation',
          primaryCtaHref: '#contact',
          secondaryCtaLabel: 'View Treatments',
          secondaryCtaHref: '#services',
          stats: [
            { value: '70%', label: 'Cost Savings' },
            { value: '15K+', label: 'Happy Patients' },
            { value: '24/7', label: 'Support' }
          ],
          badgeTitle: 'ISO Certified',
          badgeSubtitle: 'International Standards'
        }
      ]
    }
  ]
};

async function createSampleContent() {
  try {
    console.log('Creating sample hero content...');
    const result = await client.create(samplePage);
    console.log('✓ Sample content created successfully!');
    console.log('Document ID:', result._id);
    console.log('\nNow visit http://localhost:3000/en to see your hero section!');
    console.log('\nNote: You still need to add an image in Sanity Studio at http://localhost:3333');
  } catch (error) {
    console.error('Error creating sample content:', error.message);
    console.log('\nPlease create the content manually in Sanity Studio at http://localhost:3333');
  }
}

createSampleContent();


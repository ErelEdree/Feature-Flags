const mongoose = require('mongoose');
const FeatureFlag = require('./models/Feature_Flag');
const SeedTrack = require('./models/SeedTrack');

const seedFeatureFlags = async () => {
    let seedTrack = await SeedTrack.findOne({ name: 'featureFlags' });

    if (seedTrack && seedTrack.seeded) {
        console.log('Feature flags have already been seeded.');
        return;
    }

    const featureFlags = [
        {
            name: 'newUserInterface',
            development: true,
            production: false,
            permission: 'Developer',
            country: 'Ghana',
            description: 'Enables the new user interface for testing in development environment'
        },
        {
            name: 'enhancedSearch',
            development: true,
            production: true,
            permission: 'Admin',
            country: 'Uganda',
            description: 'Activates enhanced search capabilities for admins in Uganda'
        },
        {
            name: 'betaFeature',
            development: true,
            production: false,
            permission: 'Developer',
            country: 'Ghana',
            description: 'Enables access to beta features for developers in Ghana'
        },
        {
            name: 'dataAnalytics',
            development: true,
            production: true,
            permission: 'Admin',
            country: 'Uganda',
            description: 'Turns on advanced data analytics for admins in Uganda'
        },
        {
            name: 'mobileOptimization',
            development: true,
            production: true,
            permission: 'Developer',
            country: 'Ghana',
            description: 'Optimizes the app for mobile devices in Ghana'
        }
    ];

    try {
        await FeatureFlag.insertMany(featureFlags);
        console.log('Feature flags seeded successfully');

        // Update or create the seed track
        if (!seedTrack) {
            seedTrack = new SeedTrack({ name: 'featureFlags' });
        }
        seedTrack.seeded = true;
        seedTrack.lastSeeded = new Date();
        await seedTrack.save();

    } catch (error) {
        console.error('Error seeding feature flags:', error);
    }
};

module.exports = seedFeatureFlags;
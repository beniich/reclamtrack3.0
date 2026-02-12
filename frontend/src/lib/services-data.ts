export const SERVICES = [
    {
        id: 'water',
        title: 'Water & Sanitation',
        status: 'operational' as const,
        details: [
            { label: 'Emergency Line', value: '0800-WATER-99', highlight: true },
            { label: 'Operating Hours', value: 'Mon-Fri, 08:00 - 18:00' },
            { label: 'Maintenance', value: '24/7 Emergency' },
        ],
    },
    {
        id: 'electricity',
        title: 'Electricity & Power',
        status: 'maintenance' as const,
        details: [
            { label: 'Outage Hotline', value: '0800-POWER-24', highlight: true },
            { label: 'Billing Support', value: 'Mon-Sat, 09:00 - 17:00' },
            { label: 'Service Areas', value: 'Districts 1-12, 14, 18' },
        ],
    },
    {
        id: 'lighting',
        title: 'Public Lighting',
        status: 'operational' as const,
        details: [
            { label: 'Faulty Light Unit', value: '0800-LIGHT-01', highlight: true },
            { label: 'Repair TAT', value: '48-72 Business Hours' },
            { label: 'Street Coverage', value: 'Urban & Suburban Zones' },
        ],
    },
    {
        id: 'waste',
        title: 'Waste Management',
        status: 'operational' as const,
        details: [
            { label: 'Missed Pickup', value: '0800-WASTE-44', highlight: true },
            { label: 'Hazardous Waste', value: 'Appt. Only (Saturdays)' },
            { label: 'Recycling', value: 'Bi-Weekly Schedule' },
        ],
    },
    {
        id: 'roads',
        title: 'Roads & Infrastructure',
        status: 'planning' as const,
        details: [
            { label: 'Pothole Repair', value: '0800-ROADS-55', highlight: true },
            { label: 'Signal Faults', value: 'Emergency 24/7 Team' },
            { label: 'Major Works', value: 'See Construction Map' },
        ],
    },
    {
        id: 'parks',
        title: 'Parks & Recreation',
        status: 'operational' as const,
        details: [
            { label: 'Facility Bookings', value: '0800-PARKS-11', highlight: true },
            { label: 'Maintenance', value: 'Tue-Sat, 07:00 - 15:00' },
            { label: 'Status', value: 'All parks currently open' },
        ],
    },
];
